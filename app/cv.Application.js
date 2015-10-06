var app = app || {};

app.Model = {};
app.View = {};
app.Collection = {};

app.View.RootLayout = Backbone.Marionette.LayoutView.extend({
  el: "#cv-container",

  regions: {
    viewer: "#cv-pdb-viewer",
    info: "#cv-pdb-info",
    objects: "#cv-pdb-objects",
    selection: "#cv-pdb-selection"
  }
});


var cvApp = Backbone.Marionette.Application.extend({
  setRootLayout: function () {
    this.root = new app.View.RootLayout();
  }
});

app.App = new cvApp();

app.App.on('before:start', function() {
  app.App.setRootLayout();
});
