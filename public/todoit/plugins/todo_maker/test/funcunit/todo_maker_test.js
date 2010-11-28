steal.plugins('funcunit').then(function(){
	module("todoMaker test", { 
		setup: function(){
			S.open("//todoit/plugins/todo_maker/todo_maker.html");
		}
	});

	var sel = {
		txtBox : 'input[type=text]',
		submit : 'input[type=submit]',
		output : '.output'
	};

	test('Input focusing and blurring', function(){
	
		ok(S(sel.txtBox).hasClass('inactive', true), 'Input not selected, has "inactive" class.');
		ok(S(sel.txtBox).hasClass('active', false), 'Input not selected, does not have "active" class.');

		S(sel.txtBox).click(function(){
			ok(S(sel.txtBox).hasClass('active', true), 'Input selected, has "active" class.');
			ok(S(sel.txtBox).hasClass('inactive', false), 'Input selected, does not have "inactive" class.');
		});
	});

	test('todo creation', function(){
		S(sel.txtBox).click().type('A todo!');
		S(sel.submit).click();
	
		S(sel.output).exists(function(){
			ok( /A todo!/.test(S(sel.output).text()), 'A todo was created!');
		});
	});
});