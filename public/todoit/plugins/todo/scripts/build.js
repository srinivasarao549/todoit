//steal/js todoit/todo/scripts/compress.js

load("steal/rhino/steal.js");
steal.plugins('steal/build','steal/build/scripts','steal/build/styles',function(){
	steal.build('todoit/todo/scripts/build.html',{to: 'todoit/todo'});
});
