/*global confirm: true */

/**
 * @tag controllers, home
 * Displays a table of todos.	 Lets the user 
 * ["Todoit.Controllers.todo.prototype.form submit" create], 
 * ["Todoit.Controllers.todo.prototype.&#46;edit click" edit],
 * or ["Todoit.Controllers.todo.prototype.&#46;destroy click" destroy] todos.
 */
$.Controller.extend('Todoit.Controllers.todo',
/* @Static */
{
	onDocument: true
},
/* @Prototype */
{
 /**
 * When the page loads, gets all todos to be displayed.
 */
 load: function(){
	/*if(!$("#todo").length){
	 $(document.body).append($('<div/>').attr('id','todo'));
		 Todoit.Models.todo.findAll({}, this.callback('list'));*/
 	}
});