steal.plugins('jquery/controller',
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
			},
			
			'form submit': function(el, ev){
				
				ev.preventDefault();
				
				var todo = this.find('input[type=text]').val();
				
				if (todo !== Todoit.todoMaker.defaults.watermark){
					steal.dev.log('Making a todo: "' + todo + '"');
					el.trigger("todo", todo);
				}
			} 
		}	
	)
});