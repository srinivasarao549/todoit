steal
	.css('todo_list')
	.plugins('jquery/controller',
	'jquery/dom/form_params',
	'jquery/view/ejs',
	'jquery/controller/view').then(function($){
		$.Controller.extend('Todoit.todoList', 
		/* @static */
		{
			defaults: {
				todoController: '',
				views : {
					init: '../../plugins/todo_list/views/init'
				}
			}
		}, 
		/* @prototype */
		{
			init: function(){
				this._list = [];
				
				this.element.html(this.view(this.options.views.init, this.options));
			},
			
			/** 
			 * Create a `todo` from `todoText` and add it to the beginning of the list
			 *
			 * @param {String} todoText The text of the new `todo`
			 * @return {Object} The DOM-inserted `todo` Object
			 */
			prepend: function(todoText){
				return this.insertAt(todoText, 0);
			},
			
			/** 
			 * Create a `todo` from `todoText and add it to the end of the list
			 *
			 * @param {String} todoText The text of the new `todo`
			 * @return {Object} The DOM-inserted `todo` Object
			 */
			append: function(todoText){
				return this.insertAt(todoText, this._list.length);
			},
			
			/** 
			 * Create a `todo` from `todoText and insert it at the specified `index` of the list
			 *
			 * @param {String} todoText The text of the new `todo`
			 * @param {Number} index The index at which to insert the `todo`.
			 * @return {Object} The DOM inserted `todo` Object
			 */
			insertAt: function(todoText, index){
				// Convert `todoText` into a usable todo 
				var todo = this._createTodo( { text : todoText} );
				
				// Force the index to a valid value
				index = index || 0;
				
				// If the list has contents, insert `todo`.
				// Otherwise just append it to the list.
				if (this._list.length){
					// If `index` is the less than the size of the list, 
					// insert it before the current element at `index`.
					// Otherwise insert it after the last element in the list
					if(index < this._list.length){
						todo = $(todo).insertBefore(this._list[index]);
					} else {
						todo = $(todo).insertAfter(this._list[this._list.length - 1]);
					}
					
				} else {
					todo = $(todo).appendTo(this.element.find('ol'));
				}
				
				// `todo` is now in the DOM, add it to the internal list
				this._list.splice(index, 0, todo);
				
				// Return the new `todo`
				return this._list[index];
			},
			
			/**
			 * Retrieve the `todo` object at the specified `index`.
			 * 
			 * @param {Number} index The index of the `todo` to return
			 * @return {Object|null} The requested `todo` or null, if it wasn't found
			 */
			getTodo: function(index){
				index = +index;
				
				// If the index isn't valid, return `null`.
				return this._list[index] ? this._list[index] : null;
			},
			
			/**
			 * Remove a `todo` from the page and internal `todo` list.
			 *
			 * @param {Number} index The `todo` to remove
			 * @return {Object} The removed `todo` object
			 */
			removeTodo: function(index){
				var removedLI = this._list.splice(+index, 1);
				return removedLI[0] ? removedLI[0].remove() : null;
			},
			
			/**
			 * Remove a collection of `todo`s, as specified by an array.
			 * 
			 * @param {Array} indexes The indexes of `todo`s to be removed
			 * @return {Array} The `todo`s that were removed
			 */
			removeTodos: function(indexes){
				
				var self = this, removedTodos = [];
				
				$.each(indexes.reverse(), function(count, todoToRemove){
					removedTodos.push(self.removeTodo(todoToRemove));
				});
				
				return removedTodos.reverse();
			},
			
			/**
			 * @hide
			 *
			 * Create a `todo` controller object.  If a controller was not specified in the `options`, create a new `LI` instead. 
			 * 
			 * @param {Object} param The parameters to pass to the `todo` controller, if one was specified.  If a controller was not specified in the `option`s, `params.text` becomes the text for the new `LI`. 
			 * @return {Object} The new `todo` object.  It is not in the DOM.
			 */
			_createTodo: function(params){
				params.text = params.text || '';
				
				// If a todo controller has been specified, return a new instance of it in an LI
				// Otherwise just return a new LI element with params.text as the contents.
				if ($.trim(this.options.todoController) !== ''){
					return $('<li>')[this.options.todoController](params);
				} else {
					return $('<li>').html(params.text.toString());
				}
				
			}
		});
});