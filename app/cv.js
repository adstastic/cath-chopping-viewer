var app = app || {};

app.Model = {};
app.View  = {};
app.Collection = {};

app.View.RootLayout = Marionette.LayoutView.extend({
  el: "#cv-container",

  regions: {
    viewer: "#cv-pdb-viewer",
    info: "#cv-pdb-info",
    objects: "#cv-pdb-objects",
    selection: "#cv-pdb-selection"
  }
});
