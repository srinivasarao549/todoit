//js todoit/todo/scripts/doc.js

load('steal/rhino/steal.js');
steal.plugins("documentjs").then(function(){
	DocumentJS('todoit/todo/todo.html');
});