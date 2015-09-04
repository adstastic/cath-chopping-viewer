console.log("domchop.js executing...");

var pvOpts = {
  width: 'auto',
  height: 600,
  antialias: true,
  quality: 'medium'
};

var app = {};

app.Model = {};
app.View  = {};
app.Collection = {};

// svn:/update/trunk/ddmake/colourlist.txt (got bored at 'gold')
var domainColors = ['blue', 'red', 'green', 'yellow', 'pink', 'grey', 'purple', '#9cf', '#8e7', '#f80', '#0ff', '#863', '#385', '#f07', '#f0f', '#fa8', '#ee8', '#f90' ];

console.log( "DEFINE app.Model.PdbInfo" );

app.Model.PdbInfo = Backbone.Model.extend({
  defaults: {
    header: null,
    title: null,
    keywords: null,
    expdata: null,
    author: null,
    journal_author: null,
    journal_title: null,
    journal_ref: null,
    journal_doi: null
  },
  parseFromPdb: function(data) {
    var line,
      re_line = /^([A-Z]+)\s+(.*?)$/mg,
      re_jrnl = /^([A-Z]+)\s+/;

    var h = this;

    PDB: while (line = re_line.exec(data)) {
      var key = line[1],
        content = line[2].trim();

      switch (key) {
        case 'HEADER':
          var tmp = h.get('header') || '';
          h.set('header', tmp + content);
          break;
        case 'TITLE':
          var tmp = h.get('title') || '';
          h.set('title', tmp + content);
          break;
        case 'KEYWDS':
          var tmp = h.get('keywords') || '';
          h.set('keywords', tmp + content);
          break;
        case 'JRNL':
          var parts = re_jrnl.exec( content );
          if ( ! parts ) {
            console.warn("Failed to parse journal key from '" + content + "' (skipping)");
            break;
          }
          var jrnl_key = parts[1];
          var jrnl_content = content.substr(7).trim();
          switch (jrnl_key) {
            case 'AUTH':
              var tmp = h.get('journal_author') || '';
              h.set('journal_author', tmp + jrnl_content);
              break;
            case 'TITL':
              var tmp = h.get('journal_title') || '';
              h.set('journal_title', tmp + jrnl_content);
              break;
            case 'REF':
              var tmp = h.get('journal_ref') || '';
              h.set('journal_ref', tmp + jrnl_content);
              break;
            case 'DOI':
              var tmp = h.get('journal_doi') || '';
              h.set('journal_doi', tmp + jrnl_content);
              break;
          }
          break;
        case 'ATOM':
        case 'REMARK':
        case 'SEQRES':
          break PDB;

      }
    }

    console.log( "pdbInfo: parseFromPdb: ", this );
  }
});

console.log( "DEFINE app.Model.Pdb" );

app.Model.Pdb = Backbone.Model.extend({
  //urlRoot: "/api/data/pdb",
  urlRoot: "./pdb",
  defaults: {
    pdbId: '',
    title: '',
    pdbInfo: null,
    pvStructure: null,
  },
  load: function( pdbId, callback ) {
    var url = this.urlRoot + '/' + pdbId;
    var self = this;
    var pdbInfo = new app.Model.PdbInfo();

    console.log( "pdb.load", pdbId, url);

    self.set({
      'pdbId': pdbId,
      'title': "PDB " + pdbId
    });

    // create molecular structure from pdb using bio-pv
    $.ajax( url )
      .done(function(data) {

        pdbInfo.parseFromPdb(data);

        var structure = pv.io.pdb( data );
        console.log("STRUCTURE: ", structure);
        self.set({
          'pdbInfo': pdbInfo,
          'pvStructure': structure
        });

        if ( callback ) {
          callback( structure );
        }
      });
  },

});

console.log( "DEFINE app.Model.StructureObjectSegment" );

app.Model.StructureObjectSegment = Backbone.RelationalModel.extend({
  urlRoot: '/segment/',
  defaults: {
    start: null,
    end: null,
    chainCode: null,
  },

  // pvStructure is structure is pv.io.pdb(data) where data is contents of PDB file in text form
  getMolView: function(pvStructure) {
    var chainCode = this.get('chainCode'),
      start = this.get('start'),
      end = this.get('end');

    if ( start && end ) {
      console.log( "selecting residue range", this.toJSON() );
      return pvStructure.select( { chain: chainCode, rnumRange: [start, end] } );
    }
    else {
      console.log( "selecting chain", this.toJSON() );
      return pvStructure.select( { chain: chainCode } );
    }
  }
});

console.log( "DEFINE app.Collection.StructureObjectSegmentList" );

// Collection of StructureObjectSegment's
app.Collection.StructureObjectSegmentList = Backbone.Collection.extend({
  model: app.Model.StructureObjectSegment,
  // Using HTML5 localStorage instead of backend
  localStorage: new Backbone.LocalStorage( 'structure-object-segment-list' )
});

console.log( "DEFINE app.Model.StructureObjectItem" );

// When user action changes many models, instead of updating each model individually,
// this configures relationalships between models and syncs all models with single call
app.Model.StructureObjectItem = Backbone.RelationalModel.extend({
  relations: [{
    type: Backbone.HasMany, // one-to-many relationship to collection StructureObjectSegmentList
    key: 'segments', // reference to attribute name on relatedModel
    relatedModel: app.Model.StructureObjectSegment,
    collectionType: app.Collection.StructureObjectSegmentList,
    reverseRelation: { // how StructureObjectSegmentList points back to StructureObjectItem
      key: 'parent',
      includeInJSON: 'id'
    }
  }],
  defaults: {
    id: null,
    label: 'Domain/Chain 1ABC',
    color: '#999',
    type: 'DOMAIN',
    segments: null,
  },
});

console.log( "DEFINE app.Collection.StructureObjectList" );
// collection of StructureObjectItem's
app.Collection.StructureObjectList = Backbone.Collection.extend({

  model: app.Model.StructureObjectItem,

  localStorage: new Backbone.LocalStorage( 'structure-object-list' ),

  pdbId: null,

  focusChainCode: null,

  populateFromCGIParams: function() {
    var param = this.parseCgiParam();
    console.log( "setChoppingFromCGIParams.param: ", param );
    var domains = [];
    var chainId = param['id'];
    if ( !chainId ) {
      console.error( "Failed to get CGI param 'id' (expected PDB chain id)" )
      return false;
    }
    var pdbId = chainId.substr(0, 4);
    var choppingStr = param['chopping'];
    if ( !choppingStr ) {
      console.error( "Failed to get CGI param 'chopping' (expected chopping string)" );
      return false;
    }

    this.pdbId = pdbId;

    this.populateFromChoppingString( choppingStr );

    return 1;
  },

  getChainCodes: function() {
    var self = this;
    var chainCodes = [];
    this.get('domains').forEach(function(dom) {
      dom.get('segments').forEach(function(seg) {
        chainCodes.push( seg.chainCode );
      })
    });
    console.log( "getChainCodes", self, self.domains, chainCodes, _.uniq( chainCodes ) );
    return _.uniq( chainCodes );
  },

  populateFromChoppingString: function(fullChoppingString) {
    var self = this;

    var pdbCode  = fullChoppingString.substr(0, 4);
    var chopping = fullChoppingString.substr(5);
    var domainsAndFragments = chopping.split(' ');
    var focusChainCode;

    var segRegexp = /(-?[^\-]+)-(-?[^\[]+)\[(\S)\]/;  // 3-23[A] OR -5-123[B] OR 1(A)-234[C]
    var insertRegexp = /(-?\d+)\((\w)\)$/;

    var domains = [];

    var domainCount = 1;

    domainsAndFragments.forEach(function(domainStr) {
      var isDomain = domainStr.substr(0, 1) == 'D' ? 1 : 0,
        segmentStrings = domainStr.substr(1).split('+'),
        chainCode;

      //console.log( "parseChoppingString.segmentStrings: ", segmentStrings );

      if ( isDomain ) {

        var segs = [];

        segmentStrings.forEach(function(str) {
          var matches   = str.match( segRegexp );

          var start     = matches[1];
          var end       = matches[2];

          chainCode = matches[3];

          focusChainCode = chainCode;

          console.log( "parseChoppingString.segmentString: ", str, matches );

          var m;
          if ( m = start.match( insertRegexp ) ) {
            start = m[1] + m[2];
          }
          if ( m = end.match( insertRegexp ) ) {
            end = m[1] + m[2];
          }

          segs.push({
            start:     start,
            end:       end,
            chainCode: chainCode,
          });
        });

        var domainId = pdbCode + chainCode + (domainCount < 10 ? '0' : '') + domainCount;

        var domObj = new app.Model.StructureObjectItem({
          id: domainId,
          color: domainColors[domainCount - 1],
          label: 'CATH Domain ' + domainId,
          type: 'DOMAIN',
          segments: segs
        });

        self.add( domObj );

        domainCount++;
      }
    });

    console.log( "Setting focusChainCode", focusChainCode );
    this.focusChainCode = focusChainCode;
    console.log( "Set focusChainCode", this, this.focusChainCode );

    return this;
  },

  // Parse parameters from URL to split chain
  parseCgiParam: function() {
    var query = window.location.search.substring(1);
    var qs = query.split('+').join(' ');
    var params = {},
      tokens,
      re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
      params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
  },
});

// Attaches to model PdbInfo
app.View.PdbInfo = Backbone.View.extend({
  el: '#cv-pdb-info',
  template: _.template(
    '<div class="viewer-pdb-info">' +
      '<div class="pdb-info-title"><%- title %></div>' +
      '<div class="pdb-info-ref">' +
        '<div class="journal-title"><%- journal_title %></div>' +
        '<div class="journal-author"><%- journal_author %></div>' +
        '<div class="journal-doi">doi: <%- journal_doi %></div>' +
      '</div>' +
    '</div>'
  ),
  initialize: function() {
    console.log( "app.View.PdbInfo", this );
    //this.listenTo(this.model, 'sync change', this.render);
    //this.model.fetch();
    this.render();
  },
  render: function() {
    console.log( "render", this, this.model.toJSON() );
    var html = this.template( this.model.toJSON() );
    this.$el.html( html );
    return this;
  }
});

// Segments for each domain with drop down to select start/end
app.View.SegmentItem = Backbone.View.extend({
  tagName: 'li',
  className: 'segment-item',
  template: _.template(
    '<div class="<%- segment_number %>">' +
    '<%- parent.id %>.<%- segment_number %> <%- start %> <%- end %>' +
    '</div>'
  ),
  initialize: function() {
      console.log('SegmentItem has been created');
  },
  render: function() {
    var attr = this.model.attributes;
    if (attr['start'] == null) {
      attr['start'] = "null"
    }
    if (attr['end'] == null) {
      attr['end'] = "null"
    }

    var html = this.template(attr);
    console.log("app.View.SegmentItem HTML", html);

    this.$el.html(html);
    console.log( "app.View.SegmentItem.render", attr, this.$el, html );

    return this;
  },
});

app.View.SegmentList = Backbone.View.extend({
  el: '#cv-pdb-objects',

  template: _.template(
    '<ul class="segment-list"></ul>'
  ),
  initialize: function() {
    console.log(this.model);
    var html = this.template( this.model );
    this.$el.html( html );
  },
  render: function() {
    console.log( "app.View.Segments.render" );

    var $list = this.$('ul.segment-list');
    console.log("app.View.SegmentList.self", this);

    var i = 0;
    this.model.forEach(function(model) {
      model.attributes['segment_number'] = ++i;
      var item = new app.View.SegmentItem( { model: model } );
      $list.append(item.render().$el);
      console.log( "app.View.SegmentList.render", model, item, $list );
    }, this);

    return this;
  },

});


// Domain color legend
app.View.StructureObjectItem = Backbone.View.extend({
  tagName: 'li',
  className: 'structure-object-item',
  template: _.template(
    '<div class="<%- type %>">' +
    '<button class="btn btn-link dropdown-toggle" type="button" data-toggle="dropdown">' +
    '<span class="structure-object-item-color" style="background-color: <%- color %>"></span> <%- id %> <small>(<%- type %>)</small>' +
    '</button>' +
    '</div>'
  ),
  events: {
    'click .remove': 'onRemove',
    'click .expand': 'onExpandSegments',
    'click': 'onClick'
  },
  render: function() {

  console.log( "app.View.StructureObjectItem.render", this.model.toJSON(), this.$el, html );

  var segments = this.model.get('segments').models

  var html = this.template(this.model.toJSON());
  console.log('app.View.StructureObjectItem HTML', html);
  this.$el.html(html);

  return this;
  },

  onClick: function() {
    var self = this;
    var segments = self.model.get('segments').models
    var segmentList = new app.View.SegmentList( {model: segments} );
    console.log( "SegmentList has been created", segments, segmentList);
    segmentList.render();
    // var segmentList = new app.View.SegmentList( {model : segments} );
    segments.forEach(function(model) {
      console.log(model.get('parent').id, model.get('start'), model.get('end'));
    });

    this.render();
  }
});

app.View.StructureObjectList = Backbone.View.extend({
  el: '#cv-pdb-objects',
  segmentList: null,
  template: _.template(
    '<ul class="structure-object-list"></ul>'
  ),

  initialize: function() {
    console.log( "app.View.Choppings.initialize" );
    this.listenTo(this.collection, 'sync change', this.render);

    this.segmentList = new app.View.SegmentList();

    var html = this.template( this.collection.toJSON() );
    console.log('app.View.StructureObjectList HTML'. html);
    this.$el.html( html );
  },

  render: function() {
    console.log( "app.View.Choppings.render" );

    var $list = this.$('ul.structure-object-list')

    this.collection.each(function(model) {
      var item = new app.View.StructureObjectItem( { model: model } );
      $list.append(item.render().$el);
      console.log( "app.View.StructureObjectList.render", model, item, $list );
    }, this);

    console.log(this.segmentList);
    return this;
  },

  events: {
    'click .info': 'onClick'
  },

  onClick: function() {
    this.collection.models.forEach(function(model) {
      console.log(model);
      console.log(model.get('segments'));
      console.log(model.get('segments').models);
      model.get('segments').models.forEach(function(model) {
        console.log(model.get('parent').id, model.get('start'), model.get('end'));
      });
    });
  }

  // onCreate: function() {
  // 	console.error( "Choppings.onCreate: Not yet implemented" );
  // },
  //
  // onRemove: function() {
  // 	this.model.destroy();
  //}
});

app.App = Backbone.View.extend({
  el: '#cv-container',
  viewer: null,
  pdb: null,
  pdbInfo: null,
  structureObjectList: null,
  structureObjectView: null,
  activeColorer: null,
  focusChainCode: null,
  style: 'cartoon',
  events: {
    // 'click #cv-pdb-viewer': 'selectAtom'
  },

  // It's the first function called when this view it's instantiated.
  initialize: function(){
    var self = this;

      console.log( "app.View.StructureObjectList.render", model, item, $list );

    return this;
  },

  events: {
    'click .create': 'onCreate'
  },

  onCreate: function() {
    console.error( "Choppings.onCreate: Not yet implemented" );
  }
});

app.App = Backbone.View.extend({
  el: '#cv-container',
  viewer: null,
  pdb: null,
  pdbInfo: null,
  structureObjectList: null,
  structureObjectView: null,
  activeColorer: null,
  focusChainCode: null,
  style: 'cartoon',
  events: {
    // 'click #cv-pdb-viewer': 'selectAtom'
  },

  // It's the first function called when this view it's instantiated.
  initialize: function(){
    var self = this;

    console.log( "app.App.initialize", this );

    this.viewer = pv.Viewer( document.getElementById('cv-pdb-viewer'), pvOpts );
    // console.log("VIEWER:", this.viewer);



    this.pdb = new app.Model.Pdb();

    this.structureObjectList = new app.Collection.StructureObjectList();

    this.structureObjectView = new app.View.StructureObjectList({ collection: this.structureObjectList });

    this.setActiveColorer( 'colorByChopping' );

    if ( this.structureObjectList.populateFromCGIParams() ) {

      var pdbId = this.structureObjectList.pdbId;

      //console.log( "cgiChopping", pdbId, this.activeColorer );

      this.pdb.load( pdbId, function(pvStructure) {
        var pdbInfoModel = self.pdb.get('pdbInfo');

        self.pdbInfo = new app.View.PdbInfo({ model: pdbInfoModel });

        var focusChainCode  = self.structureObjectList.focusChainCode;
        var allChainCodes   = _.map( pvStructure.chains(), function(ch) { return ch.name(); } );
        var otherChainCodes = _.filter( allChainCodes, function(chCode) { return chCode != focusChainCode ? chCode : false; });

        // build up list of available residues for each chain
        // to be given to the segment view for start/end drop down
        var allChainResidues = {};
        pvStructure.chains().forEach( function(ch) {
          return ch.residues()
          console.log(ch.residues());
        });

        var bgColor = [ 0.9, 0.9, 0.9, 0.3 ];

        otherChainCodes.forEach( function(chainCode) {

          var obj = self.structureObjectList.add({
            id: pdbId + chainCode,
            label: 'Chain ' + chainCode,
            type: 'CHAIN',
            color: bgColor,
          });

          obj.get('segments').add( { chainCode: chainCode } );
        });

        // this.structureObjectList.each( function(dom) {
        //   dom.segments.each( function(seg) {
        //     var chainCode = seg.get('chainCode');
        //     var domainId = dom.get('domainId');
        //     //residuesByChainCode[chainCode] ||= [];
        //
        //   });
        // });

        //console.log( "built structure object list: ", self.structureObjectList.toJSON() );

        self.render();
      });
    }
    this.on('click', this.selectAtom(this.viewer), this);
  },
  selectAtom: function(viewer){
    parent = document.getElementById('cv-pdb-viewer');
    var prevPicked = null;
    parent.addEventListener('click', function(ev){
      // console.log("In Document EventListener; click", $(ev.clientX), $(ev.clientY));

      // viewer = pv.Viewer(parent, pvOpts);
      var rect = viewer.boundingClientRect();
      var picked = viewer.pick({ x : ev.clientX - rect.left, y : ev.clientY - rect.top });
      // console.log("viewer:", viewer, "rect:", rect, "picked:", picked);
      function setColorForAtom(go, atom, color) {
          var view = go.structure().createEmptyView();
          view.addAtom(atom);
          go.colorBy(pv.color.uniform(color), view);
      }
      if (prevPicked !== null && picked !== null &&
      picked.target() === prevPicked.atom) {
        return;
      }
      if (prevPicked !== null) {
        // reset color of previously picked atom.
        setColorForAtom(prevPicked.node, prevPicked.atom, prevPicked.color);
      }
      // don't to anything if the clicked structure does not have an atom.
      if (picked === null) {
        viewer.requestRedraw();
        return;
      }
      // when the shift key is pressed, extend the selection, otherwise
      // only select the clicked atom.
      var extendSelection = ev.shiftKey;
      var sel;
      if (extendSelection) {
        var sel = picked.node().selection();
      } else {
        var sel = picked.node().structure().createEmptyView();
      }
      console.log(picked);
      // in case atom was not part of the view, we have to add it, because
      // it wasn't selected before. Otherwise removeAtom took care of it
      // and we don't have to do anything.
      if (!sel.removeAtom(picked.target(), true)) {
        sel.addAtom(picked.target());
      }
      picked.node().setSelection(sel);
      if (picked !== null) {
        var atom = picked.target();
        var name = atom.qualifiedName().split(".");
        var chain = name[0];
        var residueName = name[1].substring(0,3);
        var residueNumber = name[1].substring(3,name[1].length);
        console.log(atom.qualifiedName());
        document.getElementById('picked-atom-name').innerHTML = "Chain: "+chain+", Residue: "+residueName+", Number: "+residueNumber;
        var color = [0,0,0,0];
        picked.node().getColorForAtom(atom, color);
        prevPicked = { atom : atom, color : color, node : picked.node() };
        setColorForAtom(picked.node(), atom, 'red');
      } else {
        document.getElementById('picked-atom-name').innerHTML = '&nbsp;';
        prevPicked = null;
      }
      viewer.requestRedraw();
    });
  },
  setActiveColorer: function(fname) {
    var func = this[fname];
    if ( typeof func === 'function' ) {
      this.activeColorer = func.bind(this);
    }
    else {
      console.error( "failed to setActiveColorer as " + fname + " (function does not exist: " + typeof func + ")" );
    }
  },
  getColorer: function() {
    return this.activeColorer;
  },
  setStyle: function(fname) {
    var func = this.viewer[fname];
    if ( typeof func === 'function' ) {
      this.style = fname;
    }
    else {
      console.error( "failed to setActiveStyler as " + fname + " (function does not exist: " + typeof func + ")" );
    }
  },
  getStyle: function() {
    return this.style;
  },
  styleView: function(name, view, options) {
    var style = this.getStyle();
          var styler = this.viewer[ style ];

    if ( typeof styler !== 'function' ) {
      console.error( "! Error: style '" + style + "' is not a valid method of PV Viewer", this.viewer );
      return null;
    }

    styler = styler.bind( this.viewer );

    if ( options ) {
      styler( name, view, options );
    }
    else {
      styler( name, view );
    }
  },
  render: function(){
    var self = this;
    var v = this.viewer;

    var structure = this.pdb.get('pvStructure');

    this.structureObjectView.render();

    v.clear();

    var colorer = this.getColorer();
    colorer();

    var focusChainCode = this.structureObjectList.focusChainCode;
    if ( focusChainCode ) {
      console.log( "Fitting to chain " + focusChainCode );
      v.fitTo( structure.select( { chain: focusChainCode } ) );
    }
    else {
      console.log( "Focus chainCode not set, fitting to structure..." );
      v.fitTo( structure );
    }

  },

  colorByChopping: function() {
    console.log( "colorByChopping", this );
    var self = this;
    var v = this.viewer;
    var structure = this.pdb.get( 'pvStructure' );


    var objectList = this.structureObjectList;

    objectList.forEach( function(obj) {
      var segs = obj.get('segments');
      var colorname = obj.get('color');
      var c = pv.color.uniform( colorname );
      //console.log( "colorByChopping.obj", obj.toJSON() );
      segs.forEach( function(seg) {

          // Setting start to 0

          if (seg.get('parent').get('id') == '1fupB03') {
            console.log("Segment to be altered:", seg.toJSON());
            console.log("Chain Code:", seg.get('chainCode'), "Start:", seg.get('start'), "Stop:", seg.get('end'));
            // seg.set({start : 310});
            console.log("Segment Parent ID", seg.get('parent').get('id'));
          };


        var segView = seg.getMolView( structure );
        var uid = 'obj' + obj.cid + '-seg' + seg.cid;
        console.log( "colorByChopping.seg", uid, seg.toJSON(), segView.atomCount(), colorname );
        self.styleView( uid, segView, { color: c } );
      })
    });
    return this;
  },
  colorBySS: function() {
    var self = this,
      v = this.viewer,
      structure = this.pdb.get('pvStructure');

    var c = pv.color.bySS();
    self.styleView( 'ss', structure, { color: c } );
  },
  });

var pdbViewer = new app.App();
