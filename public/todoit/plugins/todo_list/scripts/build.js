//steal/js todoit/todo_list/scripts/compress.js

load("steal/rhino/steal.js");
steal.plugins('steal/build','steal/build/scripts','steal/build/styles',function(){
	steal.build('todoit/todo_list/scripts/build.html',{to: 'todoit/todo_list'});
});
