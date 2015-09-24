console.log( "DEFINE app.Model.Pdb" );

app.Model.Pdb = Backbone.Model.extend({
  //urlRoot: "/api/data/pdb",
  urlRoot: "./assets",
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
