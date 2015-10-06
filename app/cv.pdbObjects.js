var app = app || {};

app.Model.StructureObjectSegment = Backbone.RelationalModel.extend({
  urlRoot: '/segment/',
  defaults: {
    start: null,
    end: null,
    chainCode: null,
    domainId: null,
    segmentNo: null
  },

  // pvStructure is structure is pv.io.pdb(data) where data is contents of PDB file in text form
  getMolView: function(pvStructure) {
    var chainCode = this.get('chainCode'),
      start = this.get('start'),
      end = this.get('end');
      // domainId = this.get('domainId');

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

  query: null,

  initialize: function(options) {
    _.extend(this, _.pick(options, "query"));
  },
  populateFromCGIParams: function() {
    var param = this.parseCgiParam();
    console.log( "setChoppingFromCGIParams.param: ", param );
    var domains = [];
    var chainId = param['id'];
    if ( !chainId ) {
      console.error( "Failed to get CGI param 'id' (expected PDB chain id)" );
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
      });
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

        var segmentNo = 0;
        segs.forEach( function(seg) {
          seg.domainId = domainId;
          seg.segmentNo = ++segmentNo;
          console.log("seg ", seg);
        });

        var domObj = new app.Model.StructureObjectItem({
          id: domainId,
          color: domainColors[domainCount - 1],
          label: 'CATH Domain ' + domainId,
          type: 'DOMAIN',
          segments: segs
        });

        console.log("app.Collection.StructureObjectList.populateFromChoppingString().domObj", domObj);
        console.log("app.Collection.StructureObjectList.populateFromChoppingString().segs", segs);

        self.add( domObj );

        domainCount++;
      }
    });

    console.log("app.Collection.StructureObjectList", self);
    console.log( "Setting focusChainCode", focusChainCode );
    this.focusChainCode = focusChainCode;
    console.log( "Set focusChainCode", this, this.focusChainCode );

    return this;
  },

  // Parse parameters from URL to split chain
  parseCgiParam: function() {
    if (this.query === null) {
      console.log('Taking query from URL substring');
      var query = window.location.search.substring(1);
    } else {
      console.log('Taking query from manual input');
      var query = this.query;
    }

    var qs = query.split('+').join(' ');
    var params = {},
      tokens,
      re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
      params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    console.log("params", params);
    return params;
  },
});
