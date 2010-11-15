module("todoMaker test", { 
	setup: function(){
		S.open("//todoit/todo_maker/todo_maker.html");
	}
});

test('Input focusing and blurring', function(){
	var sel = 'input[type=text]';
	
	ok(S(sel).hasClass('inactive', true), 'Input not selected, has "inactive" class.');
	ok(S(sel).hasClass('active', false), 'Input not selected, does not have "active" class.');

	S(sel).click();
	
	ok(S(sel).hasClass('active', true), 'Input selected, has "active" class.');
	ok(S(sel).hasClass('inactive', false), 'Input selected, does not have "inactive" class.');
});