var app = app || {};
// Segments for each domain with drop down to select start/end
app.View.SegmentItem = Backbone.Marionette.ItemView.extend({

  template: '#segment-item',
  events: {

    'click': 'info'
  },

  initialize: function() {
      console.log('SegmentItem has been created');

  },

  render: function() {
    var attr = this.model.attributes;
    if (attr.start === null) {
      attrstart = "null";
    }
    if (attr.end === null) {
      attr.end = "null";
    }

    console.log( "app.View.SegmentItem.render", this );

    return this;
  },

  info: function() {
    console.log(this.model.attributes);
  },
});

app.View.SegmentList = Backbone.Marionette.CollectionView.extend({

  template: '#segment-list',

  ItemView: app.View.SegmentItem,

  initialize: function() {
    console.log("app.View.SegmentList.initialize", this.model);
  },

  render: function() {
    console.log( "app.View.Segments.render" );

    var $list = [];
    console.log("app.View.SegmentList", this);

    var i = 0;
    this.model.forEach(function(model) {
      model.attributes.segment_number = ++i;
      var item = new app.View.SegmentItem( { model: model } );
      $list.push(item.render());
      console.log( "app.View.SegmentList.render", model, item, $list.toJSON );
    }, this);

    return this;
  },
});

app.View.StructureObjectItem = Backbone.Marionette.CompositeView.extend({

  tagName: 'li',

  template: '#template-structure-object-item',

  childView: app.View.SegmentList,

  events: {
    'click': 'onClick'
  },

  render: function() {

  console.log( "app.View.StructureObjectItem.render", this.model.toJSON());

  var segments = this.model.get('segments').models;


  var $list = [];
  console.log("app.View.SegmentList", this);

  segments.forEach(function(segment) {
    var item = new app.View.SegmentItem( { model: segment } );
    $list.push(item.render());
    console.log( "app.View.SegmentList.render", segment.attributes, item.info(), $list );
  }, this);

  return this;
  },

  onClick: function() {
    this.model.get('segments').forEach(function(segment) {
        console.log(segment.get('chainCode'), segment.get('parent').id+'.'+segment.get('segmentNo'), segment.get('start'), segment.get('end'));
      });
  }
});

app.View.StructureObjectList = Backbone.Marionette.CollectionView.extend({

  el: '#cv-pdb-objects',

  template: '#template-structure-object-list',

  itemView: app.View.StructureObjectItem,

  initialize: function() {
    console.log( "app.View.Choppings.initialize" );
    this.listenTo(this.collection, 'sync change', this.render);

    this.segmentList = new app.View.SegmentList();

    console.log('app.View.StructureObjectList HTML'. html);
  },

  render: function() {
    console.log( "app.View.Choppings.render" );

    var $list = this.$('ul.structure-object-list');

    this.collection.each(function(model) {
      var item = new app.View.StructureObjectItem( { model: model } );
      $list.append(item.render().$el);
      console.log( "app.View.StructureObjectList.render", model, item, $list );
    }, this);

    console.log(this.segmentList);
    return this;
  },
});
