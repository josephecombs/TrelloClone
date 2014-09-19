TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST["boards/show"],
  
  events: {
    'sortstop': 'saveOrds'
  },

  orderOptions: {
    modelElement: '.list-display',
    modelName: 'list',
  },
  
  className: 'clearfix',
  // className: "board-show",
  
  initialize: function () {
    $('body').css('background-color', 'LightGray');
    this.collection = this.model.lists();
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addList);
  },
  
  addList: function (list) {
    var view = new TrelloClone.Views.ListShow({
      model: list
    });
    this.addSubview('#lists', view);
  },
  
  render: function () {
    showView = this;
    var content = this.template({
      board: this.model,
      lists: this.collection
    })
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },
  
  renderLists: function () {
    this.model.lists().each(this.addList.bind(this));
    this.$('#lists').sortable();
  },

  renderListForm: function () {
    var view = new TrelloClone.Views.ListForm({
      collection: this.collection
    });
    this.addSubview('#list-form', view);
  }
});

_.extend(TrelloClone.Views.BoardShow.prototype, TrelloClone.Utils.OrdView);