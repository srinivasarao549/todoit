module("todoMaker test", { 
	setup: function(){
		S.open("//todoit/plugins/todo_maker/todo_maker.html");
	}
});

var sel = {
	txtBox : 'input[type=text]'
};

test('Input focusing and blurring', function(){
	
	ok(S(sel.txtBox).hasClass('inactive', true), 'Input not selected, has "inactive" class.');
	ok(S(sel.txtBox).hasClass('active', false), 'Input not selected, does not have "active" class.');

	S(sel.txtBox).click(function(){
		ok(S(sel.txtBox).hasClass('active', true), 'Input selected, has "active" class.');
		ok(S(sel.txtBox).hasClass('inactive', false), 'Input selected, does not have "inactive" class.');
	});
});