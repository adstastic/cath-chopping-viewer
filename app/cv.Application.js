var CV = CV || {};

CV.Model = {};
CV.View = {};
CV.Collection = {};

CV.View.RootLayout = Backbone.Marionette.LayoutView.extend({
  el: "#cv-container",

  regions: {
    viewer: "#cv-pdb-viewer",
    info: "#cv-pdb-info",
    objects: "#cv-pdb-objects",
    selection: "#cv-pdb-selection"
  }
});


var ChoppingViewer = Backbone.Marionette.Application.extend({
  setRootLayout: function () {
    this.Root = new CV.View.RootLayout();
  }
});

CV.App = new ChoppingViewer();

CV.App.on('before:start', function() {
  CV.App.setRootLayout();
});
