steal.plugins('jquery/controller',
	'jquery/dom/form_params',
	'jquery/view/ejs').then(function($){
	$.Controller.extend('Todoit.todoMaker', 
		/* @static */
		{
			defaults: {
				watermark : 'Make a todo...',
				id : 'todo_maker'
			}
		},
		
		/* @prototype */
		{
			init: function(){
				this.element.html(this.view(this.options));
			}
		}	
	)
});