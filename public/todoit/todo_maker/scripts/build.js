//steal/js todoit/todoMaker/scripts/compress.js

load("steal/rhino/steal.js");
steal.plugins('steal/build','steal/build/scripts','steal/build/styles',function(){
	steal.build('todoit/todoMaker/scripts/build.html',{to: 'todoit/todoMaker'});
});
