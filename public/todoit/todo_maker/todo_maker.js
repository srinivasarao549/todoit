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
			
			'form submit': function(el, ev){
				
				ev.preventDefault();
				
				var todo = this.find('input[type=text]').val();
				
				if (todo !== Todoit.todoMaker.defaults.watermark){
					steal.dev.log('Making a todo: "' + todo + '"');
					el.trigger("todo", todo);
				}
			},
			
			'form input[type=text] focus': function(el, ev){
				
				this.toggleFocus(el, true);
			},
			
			'form input[type=text] blur': function(el, ev){
				
				this.toggleFocus(el, false);
			},
			
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