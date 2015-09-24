// Attaches to model PdbInfo
app.View.PdbInfo = Backbone.Marionette.ItemView.extend({
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
