// Attaches to model PdbInfo
CV.View.PdbInfo = Backbone.Marionette.ItemView.extend({
  template: '#template-pdb-info',
  initialize: function() {
    console.log( "CV.View.PdbInfo.initialize()");
    // this.render();
  }
});
