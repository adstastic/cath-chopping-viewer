// Attaches to model PdbInfo
CCV.View.PdbInfo = Backbone.Marionette.ItemView.extend({
  el: '#cv-pdb-info',
  template: '#template-pdb-info',
  initialize: function() {
    console.log( "CCV.View.PdbInfo", this );
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
