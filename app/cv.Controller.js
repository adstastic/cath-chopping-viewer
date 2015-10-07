var CV = CV || {};

CV.Controller = Backbone.Marionette.Object.extend({

  pdbInfo: null,
  pdb: null,
  structureObjectList: null,
  viewer: null,

  setRootLayout: function() {
    this.root = new CV.View.RootLayout();
  },

  showPdbInfo: function(pdbInfoModel) {
    this.pdbInfo = new CV.View.PdbInfo({ model: pdbInfoModel });
    console.log(this.pdbInfo);
    CV.App.Root.showChildView('info', new CV.View.PdbInfo({
      model: this.pdbInfo
    }));
  },

  showStructureObjectList: function() {
    var pdbId = this.structureObjectList.pdbId;

    var self = this;
    self.pdb.load( pdbId, function(pvStructure) {

      var pdbInfoModel = self.pdb.get('pdbInfo');
      self.showPdbInfo(pdbInfoModel);

      var focusChainCode  = self.structureObjectList.focusChainCode;
      var allChainCodes   = _.map( pvStructure.chains(), function(ch) {
        return ch.name();
      });
      var otherChainCodes = _.filter( allChainCodes, function(chCode) {
        return chCode != focusChainCode ? chCode : false;
      });

      // build up list of available residues for each chain
      // to be given to the segment view for start/end drop down
      var allChainResidues = [{}];
      pvStructure.chains().forEach( function(ch) {
        console.log('Chain residues', ch.residues());
        allChainResidues.push(ch.residues());
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
        });
      });
    });
    CV.App.Root.showChildView('objects', this.structureObjectView);
  },

  showViewer: function () {
    this.viewer = new CV.View.Viewer({
      pdb: this.pdb,
      pdbInfo: this.pdbInfo,
      structureObjectList: this.structureObjectList,
      structureObjectView: this.structureObjectView,
    });

    CV.App.Root.showChildView('viewer', this.viewer);
  },

  initialize: function (options) {
    _.extend(this, _.pick(options, "query"));
    this.structureObjectList = new CV.Collection.StructureObjectList({
        query : this.query
    });

    this.pdb = new CV.Model.Pdb();

    this.structureObjectView = new CV.View.StructureObjectList({
      collection: this.structureObjectList
    });

    var has_been_populated = 0;

    if ( options.structure_data ) {
      has_been_populated = this.structureObjectList.populateFromOptions(options.query);
    }
    else {
      has_been_populated = this.structureObjectList.populateFromCGIParams();
    }
  },
  start: function() {
    this.showStructureObjectList();
    // this.showViewer();
  }
});
