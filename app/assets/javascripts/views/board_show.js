TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST["boards/show"],
  className: "board-show",
  
  initialize: function () {
    $('body').css('background-color', 'grey');
    // this.collection = this.model.lists();
    // this.listenTo(this.model, 'sync', this.render)
    //this.listenTo(this.collection, 'add', this.addList)
  },
  
  addList: function (list) {
    var view = new TrelloClone.Views.ListShow({
      model: list
    });
    this.addSubview('#lists', view);
  },
  
  render: function () {
    var content = this.template({
      board: this.model
    })
    this.$el.html(content);
    this.renderLists();
    this.renderListForm();
    return this;
  },
  
  renderLists: function () {
    this.model.lists().each(this.addList.bind(this));
    // this.$('#lists').sortable();
  },
  
  renderListForm: function () {
    var view = new TrelloClone.Views.ListForm({
      collection: this.collection
    });
    this.addSubview('#list-form', view);
  }
  
})