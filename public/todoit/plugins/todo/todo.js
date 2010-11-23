steal.css('todo')
	.plugins('jquery/controller',
	'jquery/dom/form_params',
	'jquery/view/ejs').then(function($){
	$.Controller.extend('Todoit.todo', 
		/* @static */
		{
			defaults: {
				text : 'A todo...'
			}
		},
		
		/* @prototype */
		{
			init: function(){
				
				this.element.html(this.view(this.options));
			},
			
			'.text click': function(el, ev){
			
				/*  @hide
					Swap out the clicked span with with an input.
					If the todo text has not been updated from the default, blank out the input value.
					If it has been updated, set the input to the current todo text. */
				this.initialEl = el.replaceWith($('<input>', {
					type: 'text',
					value: this.text() === Todoit.todo.defaults.text ? '' : this.text()
				}));
				
				// Save a reference to the new input and focus it.
				this.input = this.element.find('input[type=text]')
					.focus();
					
				// Bind the new input to some events with callbacks to this controller.
				this.bind(this.input, 'blur', this.callback(['update']));
				this.bind(this.input, 'keydown', this.callback(['keyhandle']));
			},
			
			/**
			 * An interface for this todo's `options.text` value.
			 * @param {String|null} newText The text to set this todo to, if it is being updated.
			 * @return {String} This todo's `options.text` value.
			 */
			text: function(newText){
				
				if (!newText){
					return this.options.text;
				}
				
				return this.options.text = newText;
			},
			
			/**
			 * If the user hits the `enter` key, `update()` this todo.
			 */
			keyhandle: function(ev){
				
				if (ev.keyCode === 13){
					this.update();
				}
			},
			
			/**
			 * Update the value of this todo with the text of the input.
			 */
			update: function(){
				
				this.text(this.input.val());
				this.initialEl.html(this.text())
				this.input.replaceWith(this.initialEl);
			}
		}	
	)
});