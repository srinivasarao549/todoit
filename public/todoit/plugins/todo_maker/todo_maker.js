steal.css('todo_maker')
	.plugins('jquery/controller',
	'jquery/dom/form_params',
	'jquery/view/ejs',
	'jquery/controller/view').then(function($){
	$.Controller.extend('Todoit.todoMaker', 
		/* @static */
		{
			defaults: {
				todoController: '',
				watermark : 'Make a todo...',
				views : {
					init: '../../plugins/todo_maker/views/init'
				}
			}
		},
		
		/* @prototype */
		{
			init: function(){
				
				this.element.html(this.view(this.options.views.init, this.options));
				this.find('input[type=text]').addClass('inactive');
			},
			
			/**
			 * Prevent browser submit behavior and publish an event with the
			 * text of a new `todo`.  Then reset the input to the default watermark text.
			 */
			'form submit': function(el, ev){
				
				var todoText = this.text();
				
				ev.preventDefault();
				
				if (todoText !== Todoit.todoMaker.defaults.watermark){
					steal.dev.log('Making a todo: "' + todoText + '"');
					
					//el.trigger("todo", todo);
					el.trigger("todo", this._createTodo({
						text : todoText
					}));
					
					this.text(Todoit.todoMaker.defaults.watermark);
					this.input().blur();
				}
			},
			
			'form input[type=text] focus': function(el, ev){
				
				this._toggleFocus(el, true);
				
				if (el.val() === Todoit.todoMaker.defaults.watermark){
					el.val('');
				}
				
			},
			
			'form input[type=text] blur': function(el, ev){
				
				if ($.trim(el.val()) === ''){
					el.val(Todoit.todoMaker.defaults.watermark);
				}
				
				this._toggleFocus(el, false);
			},
			
			/**
			 * Get or update the text of the input.
			 */
			text: function(newText){
			
				if (!newText){
					return this.input().val();
				}
				
				return this.input().val(newText);
			},
			
			/**
			 * Find, cache, and return the input element.
			 */
			input: function(){
			
				if (!this._input){
					this._input = this.find('input[type=text]');
				}
				
				return this._input;
			},
			
			/**
			 * If the text input is focused, give it the `active` class.
			 * If blurred, give it `inactive`.
			 * 
			 * Also remove unnecessary classes as needed.
			 *
			 * @param {Object} el The element to modify.
			 * @param {Boolean} focused Whether the element is focused or blurred.
			 
			 */
			_toggleFocus: function(el, focused){
			
				var state = focused ? 'active' : 'inactive';
				
				if (el.val() === Todoit.todoMaker.defaults.watermark){
			
					el.removeClass();
					el.addClass(state);
				}
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
					return $('<div>')[this.options.todoController](params);
				} else {
					return $('<div>').html(params.text.toString());
				}
				
			}
		}	
	);
});