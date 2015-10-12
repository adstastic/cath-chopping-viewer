var CV = CV || {};
// Segments for each domain with drop down to select start/end
CV.View.SegmentItem = Backbone.Marionette.ItemView.extend({

  template: '#template-segment-item',
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

    console.log( "CV.View.SegmentItem.render", this );

    return this;
  },

  info: function() {
    console.log(this.model.attributes);
  },
});

CV.View.SegmentList = Backbone.Marionette.CollectionView.extend({

  template: '#tempalate-segment-list',

  ItemView: CV.View.SegmentItem,

  initialize: function() {
    console.log("CV.View.SegmentList.initialize", this.model);
  },

  render: function() {
    console.log( "CV.View.Segments.render" );

    var $list = [];
    console.log("CV.View.SegmentList", this);

    var i = 0;
    this.model.forEach(function(model) {
      model.attributes.segment_number = ++i;
      var item = new CV.View.SegmentItem( { model: model } );
      $list.push(item.render());
      console.log( "CV.View.SegmentList.render", model, item, $list.toJSON );
    }, this);

    return this;
  },
});

CV.View.StructureObjectItem = Backbone.Marionette.CompositeView.extend({

  tagName: 'li',

  template: '#template-structure-object-item',

  childView: CV.View.SegmentList,

  events: {
    'click': 'onClick'
  },

  render: function() {

  console.log( "CV.View.StructureObjectItem.render", this.model.toJSON());

  var segments = this.model.get('segments').models;


  var $list = [];
  console.log("CV.View.SegmentList", this);

  segments.forEach(function(segment) {
    var item = new CV.View.SegmentItem( { model: segment } );
    $list.push(item.render());
    console.log( "CV.View.SegmentList.render", segment.attributes, item.info(), $list );
  }, this);

  return this;
  },

  onClick: function() {
    this.model.get('segments').forEach(function(segment) {
        console.log(segment.get('chainCode'), segment.get('parent').id+'.'+segment.get('segmentNo'), segment.get('start'), segment.get('end'));
      });
  }
});

CV.View.StructureObjectList = Backbone.Marionette.CollectionView.extend({

  template: '#template-structure-object-list',

  itemView: CV.View.StructureObjectItem,

  initialize: function() {
    console.log( "CV.View.Choppings.initialize" );
    this.listenTo(this.collection, 'sync change', this.render);

    this.segmentList = new CV.View.SegmentList();

    console.log('CV.View.StructureObjectList HTML'. html);
    this.render();
  },

  render: function() {
    console.log( "CV.View.Choppings.render" );

    var $list = this.$('ul.structure-object-list');

    this.collection.each(function(model) {
      var item = new CV.View.StructureObjectItem( { model: model } );
      $list.append(item.render().$el);
      console.log( "CV.View.StructureObjectList.render", model, item, $list );
    }, this);

    console.log(this.segmentList);
    return this;
  },
});
