steal
	.css('todo_list')
	.plugins('jquery/controller',
	'jquery/dom/form_params',
	'jquery/view/ejs').then(function($){
		$.Controller.extend('Todoit.todoList', 
		/* @static */
		{
			defaults: {
				todoController: ''
			}
		}, 
		/* @prototype */
		{
			init: function(){
				this._list = [];
				
				this.element.html(this.view(this.options));
			},
			
			prepend: function(todo){
				return this.insertAt(this._createTodo(todo), { 
						index: 0,
						at: 'before'
					});
			},
			
			append: function(todo){
				return this.insertAt(this._createTodo(todo), {
						index: this._list.length,
						at: 'after'
					});
			},
			
			insertAt: function(todo, options){
				// CURRENTLY NOT WORKING
				index = options.index ? options.index : 0;
				
				if (this._list.length){
					if (options.at !== 'after'){
						todo = $(todo).insertBefore(this._list[index]);
					} else {
						todo = $(todo).insertAfter(this._list[index]);
					}
					
				} else {
					todo = $(todo).appendTo(this.element);
				}
				
				this._list.splice(index, 0, todo);
				return this._list;
			},
			
			getTodo: function(index){
				return this._list[index];
			},
			
			deleteTodo: function(){
				
			},
			
			_createTodo: function(params){
				if ($.trim(this.options.todoController) !== ''){
					return $('<li>')[this.options.todoController](params);
				} else {
					return $('<li>').html(params.toString());
				}
				
			}
		});
});