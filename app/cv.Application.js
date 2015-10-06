var CCV = CCV || {};

CCV.Model = {};
CCV.View = {};
CCV.Collection = {};

CCV.View.RootLayout = Backbone.Marionette.LayoutView.extend({
  el: "#cv-container",

  regions: {
    viewer: "#cv-pdb-viewer",
    info: "#cv-pdb-info",
    objects: "#cv-pdb-objects",
    selection: "#cv-pdb-selection"
  }
});


var CathChoppingViewer = Backbone.Marionette.Application.extend({
  setRootLayout: function () {
    this.root = new CCV.View.RootLayout();
  }
});

CCV.App = new CathChoppingViewer();

CCV.App.on('before:start', function() {
  CCV.App.setRootLayout();
});
