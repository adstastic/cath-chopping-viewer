
var pvOpts = {
  width: 'auto',
  height: 600,
  antialias: true,
  quality: 'medium'
};

// Domain color legend
// svn:/update/trunk/ddmake/colourlist.txt (got bored at 'gold')
var domainColors = ['blue', 'red', 'green', 'yellow', 'pink', 'grey', 'purple', '#9cf', '#8e7', '#f80', '#0ff', '#863', '#385', '#f07', '#f0f', '#fa8', '#ee8', '#f90' ];

app.App = Backbone.Marionette.Application.extend({
  el: '#cv-container',
  query: null,
  viewer: null,
  pdb: null,
  pdbInfo: null,
  structureObjectList: null,
  structureObjectView: null,
  activeColorer: null,
  focusChainCode: null,
  style: 'cartoon',

  // It's the first function called when this view it's instantiated.
  initialize: function(options){
    _.extend(this, _.pick(options, "query"));

    var self = this;

    console.log( "app.App.initialize", this );

    this.viewer = pv.Viewer( document.getElementById('cv-pdb-viewer'), pvOpts );
    // console.log("VIEWER:", this.viewer);

    this.pdb = new app.Model.Pdb();

    this.structureObjectList = new app.Collection.StructureObjectList({
        query : this.query
    });

    this.structureObjectView = new app.View.StructureObjectList({ collection: this.structureObjectList });

    this.setActiveColorer( 'colorByChopping' );
    // this.setActiveColorer( 'colorBySS' );

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
          console.log('Chain residues', ch.residues());
          return ch.residues();
        });

        var bgColor = [ 0.9, 0.9, 0.9, 0.3 ];

        var i = 0;
        otherChainCodes.forEach( function(chainCode) {
          var obj = self.structureObjectList.add({
            id: pdbId + chainCode,
            label: 'Chain ' + chainCode,
            type: 'CHAIN',
            color: bgColor,
          });

          obj.get('segments').add( {
            chainCode: chainCode,
            segmentNo: ++i
          } );
        });

        // this.structureObjectList.each( function(dom) {
        //   dom.segments.each( function(seg) {
        //     var chainCode = seg.get('chainCode');
        //     var domainId = dom.get('domainId');
        //     residuesByChainCode[chainCode] ||= [];
        //   });
        // });

        // console.log( "built structure object list: ", self.structureObjectList.toJSON() );

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
        sel = picked.node().selection();
      } else {
        sel = picked.node().structure().createEmptyView();
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
        document.getElementById('cv-pdb-selection').innerHTML = "Chain: "+chain+", Residue: "+residueName+", Number: "+residueNumber;
        var color = [0,0,0,0];
        picked.node().getColorForAtom(atom, color);
        prevPicked = { atom : atom, color : color, node : picked.node() };
        setColorForAtom(picked.node(), atom, 'red');
      } else {
        document.getElementById('cv-pdb-selection').innerHTML = '&nbsp;';
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

    var residues = [];
    for (var i = 1; i <= 547; i++) {
      residues.push(i);
    }

    var residueSelect = document.getElementById('residue_number');
    console.log(document.getElementById("residue_number"));
    var fragment = document.createDocumentFragment();

    residues.forEach(function(residue, index) {
      var residueNumber = document.createElement('option');
      residueNumber.innerHTML = residue;
      residueNumber.value = residue;
      fragment.appendChild(residueNumber);
    });

    residueSelect.appendChild(fragment);

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
          }


        var segView = seg.getMolView( structure );
        var uid = 'obj' + obj.cid + '-seg' + seg.cid;
        console.log( "colorByChopping.seg", uid, seg.toJSON(), segView.atomCount(), colorname );
        self.styleView( uid, segView, { color: c } );
      });
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

  var queryString = 'colouring=chopping&id=1fup&chopping=1fup%20D79-109%5BB%5D%2B225-393%5BB%5D%20D110-224%5BB%5D%20D410-547%5BB%5D%20F43-78%5BB%5D%20F394-409%5BB%5D';

  var pdbViewer = new app.App({
    query: queryString
  });
