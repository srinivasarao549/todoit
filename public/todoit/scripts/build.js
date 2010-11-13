//steal/js todoit/scripts/compress.js

load("steal/rhino/steal.js");
steal.plugins('steal/build','steal/build/scripts','steal/build/styles',function(){
	steal.build('todoit/scripts/build.html',{to: 'todoit'});
});
