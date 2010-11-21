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
			
			prepend: function(todoText){
				return this.insertAt(todoText, 0);
			},
			
			append: function(todoText){
				return this.insertAt(todoText, this._list.length);
			},
			
			insertAt: function(todoText, index){
				// Convert `todoText` into a usable todo 
				var todo = this._createTodo( { text : todoText} );
				
				// Force the index to a valid value
				index = index || 0;
				
				// If the list has contents, insert `todo`.
				// Otherwise just append it to the list.
				if (this._list.length){
					// If `index` is the equal to or greater than the size of the list, 
					// just insert it after the end of the last element.
					// Otherwise insert it before the current element at `index`
					if(index >= this._list.length){
						todo = $(todo).insertAfter(this._list[this._list.length - 1]);
					} else {
						todo = $(todo).insertBefore(this._list[index]);
					}
					
				} else {
					todo = $(todo).appendTo(this.element.find('ol'));
				}
				
				// `todo` is now in the DOM, add it to the internal list
				this._list.splice(index, 0, todo);
				return this._list;
			},
			
			getTodo: function(index){
				return this._list[index] ? this._list[index] : null;
			},
			
			deleteTodo: function(){
				
			},
			
			_createTodo: function(params){
				// If a todo controller has been specified, return a new instance of it in an LI
				// Otherwise just return a new LI element with params.text.
				if ($.trim(this.options.todoController) !== ''){
					return $('<li>')[this.options.todoController](params);
				} else {
					return $('<li>').html(params.text.toString());
				}
				
			}
		});
});