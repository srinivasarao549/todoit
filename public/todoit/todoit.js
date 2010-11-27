steal.plugins(	
	'jquery/controller',			// a widget factory
	'jquery/controller/subscribe',	// subscribe to OpenAjax.hub
	'jquery/view/ejs',				// client side templates
	'jquery/model',					// Ajax wrappers
	'jquery/dom/fixture',			// simulated Ajax requests
	'jquery/dom/form_params',
	'todoit/plugins/todo',
	'todoit/plugins/todo_maker',
	'todoit/plugins/todo_list')		// form data helper
	
	.css('todoit')					// loads styles

	.resources()					// 3rd party script's (like jQueryUI), in resources folder

	.models('todo')					// loads files in models folder 

	.views()						// adds views to be added to build
	
	.then(function(){
		
		var sel = {
			maker : '#todoMakerContainer',
			list : '#todoList'
		},
		list = $(sel.list).todoit_todo_list(), 
		maker = $(sel.maker)
					.todoit_todo_maker({
						todoController : "todoit_todo"
					})
					.bind('todo', function(ev, todo){
						//list.prepend(todo);
						list.todoit_todo_list('prepend', todo)
					});
					
	});