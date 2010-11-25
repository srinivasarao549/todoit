//js todoit/todo_list/scripts/doc.js

load('steal/rhino/steal.js');
steal.plugins("documentjs").then(function(){
	DocumentJS('todoit/todo_list/todo_list.html');
});