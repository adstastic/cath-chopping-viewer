var app = app || {};

app.Controller = Backbone.Marionette.Object.extend({
  setRootLayout: function() {
    this.root = new app.View.RootLayout();
  },
  initialize: function (options) {
    _.extend(this, _.pick(options, "query"));
    this.structureObjectList = new app.Collection.StructureObjectList({
        query : this.query
    });

    this.pdb = new app.Model.Pdb();

    this.structureObjectView = new app.View.StructureObjectList({ collection: this.structureObjectList });

    var has_been_populated = 0;

    // initialise in one of many ways...

    if ( options.structure_data ) {
      has_been_populated = this.structureObjectList.populateFromOptions( options.structure_data );
    }
    else {
      has_been_populated = this.structureObjectList.populateFromCGIParams();
    }

    if ( has_been_populated ) {

      var pdbId = this.structureObjectList.pdbId;

      //console.log( "cgiChopping", pdbId, this.activeColorer );

      this.pdb.load( pdbId, function(pvStructure) {
        var pdbInfoModel = this.pdb.get('pdbInfo');

        this.pdbInfo = new app.View.PdbInfo({ model: pdbInfoModel });

        var focusChainCode  = this.structureObjectList.focusChainCode;
        var allChainCodes   = _.map( pvStructure.chains(), function(ch) { return ch.name(); } );
        var otherChainCodes = _.filter( allChainCodes, function(chCode) { return chCode != focusChainCode ? chCode : false; });

        // build up list of available residues for each chain
        // to be given to the segment view for start/end drop down
        var allChainResidues = {};
        pvStructure.chains().forEach( function(ch) {
          console.log('Chain residues', ch.residues());
          allChainResidues.push(ch.residues());
        });

        var bgColor = [ 0.9, 0.9, 0.9, 0.3 ];

        var i = 0;
        otherChainCodes.forEach( function(chainCode) {
          var obj = this.structureObjectList.add({
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

        this.viewer = new app.View.Viewer({
          pdb: this.pdb,
          pdbInfo: this.pdbInfo,
          structureObjectList: this.structureObjectList,
          structureObjectView: this.structureObjectView,
        });
        this.viewer.render();
      });
    }
  }
});
