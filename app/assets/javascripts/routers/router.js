TrelloClone.Routers.Router = Backbone.Router.extend({
  initialize: function () {
    var dropDownView = new TrelloClone.Views.DropDownView({
      collection: TrelloClone.Collections.Boards
    })
    $('#add-dropdown').append(dropDownView.render().$el);
    this.$rootEl = $('#main');
  },
  
  routes: {
    "": "boardsIndex",
    "boards/:id": "boardShow"
  },
  
  boardsIndex: function () {
    TrelloClone.Collections.boards.fetch();
    
    var view = new TrelloClone.Views.BoardsIndex({
      collection: TrelloClone.Collections.boards
    });
    
    this._swapView(view);
  },
  
  boardShow: function (id) {
    var board = TrelloClone.Collections.boards.getOrFetch(id);
    
    var view = new TrelloClone.Views.BoardShow({
      model: board
    })
    
    this._swapView(view)
  },
  
  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);    
  }
  
});