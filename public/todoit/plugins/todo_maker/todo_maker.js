steal.css('todo_maker')
	.plugins('jquery/controller',
	'jquery/dom/form_params',
	'jquery/view/ejs').then(function($){
	$.Controller.extend('Todoit.todoMaker', 
		/* @static */
		{
			defaults: {
				watermark : 'Make a todo...'
			}
		},
		
		/* @prototype */
		{
			init: function(){
				
				this.element.html(this.view(this.options));
				this.find('input[type=text]').addClass('inactive');
			},
			
			/**
			 * Prevent browser submit behavior and publish an event with the
			 * text of a new `todo`.  Then reset the input to the default watermark text.
			 */
			'form submit': function(el, ev){
				
				ev.preventDefault();
				
				var todo = this.text();
				
				if (todo !== Todoit.todoMaker.defaults.watermark){
					steal.dev.log('Making a todo: "' + todo + '"');
					
					el.trigger("todo", todo);
					this.text(Todoit.todoMaker.defaults.watermark);
					this.input().blur();
				}
			},
			
			'form input[type=text] focus': function(el, ev){
				
				this.toggleFocus(el, true);
			},
			
			'form input[type=text] blur': function(el, ev){
				
				this.toggleFocus(el, false);
			},
			
			/**
			 * Get or update the text of the input.
			 */
			text: function(newText){
			
				if (!newText){
					return this.input().val();
				}
				
				this.input().val(newText);
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
			toggleFocus: function(el, focused){
			
				var state = focused ? 'active' : 'inactive';
				
				if (el.val() === Todoit.todoMaker.defaults.watermark){
			
					el.removeClass();
					el.addClass(state);
				}
				
			}
		}	
	)
});