load("steal/rhino/steal.js");

function File(path){
	return new java.io.File(path || './');
}

function getFiles(path){
	
	var file = File(path),
		javaArr = file.list(),
		dir = [];
		
	for (var i = 0; i < javaArr.length; i++){
		
		file = File(path + javaArr[i]);
		
		if (file.isFile()){
			dir.push(readFile(path + javaArr[i]));
		} else {
			dir.push(file);
		}
	}
	
	return dir;
}

function inspect(obj, recurse){
	
	for (props in obj){
		print(('[ ' + typeof obj[props] + ' ]') + ' ' + props + ': ' + obj[props]);
		
		if (recurse
			&& typeof obj[props] === 'object'){
			inspect(obj[props]);
		}
	}
}

inspect(getFiles('./'), false);