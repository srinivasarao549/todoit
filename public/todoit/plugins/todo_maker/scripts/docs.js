//js todoit/todoMaker/scripts/doc.js

load('steal/rhino/steal.js');
steal.plugins("documentjs").then(function(){
	DocumentJS('todoit/todoMaker/todoMaker.html');
});