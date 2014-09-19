TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST["boards/show"],
  className: "board-show",
  
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

  
})