(function(){
	module("todo test", { 
		setup: function(){
			S.open("//todoit/plugins/todo/todo.html");
		}
	});

	var sel = {
		todo : '#todo',
		span : '#todo span',
		input : '#todo input'
	};

	test('Click to edit', function() {
		S(sel.span).click();
	
		S(sel.input).exists(function(){
			ok(S(sel.input).size(), 'The input exists!');
		});
		
		S(sel.input).type('Hello!\r', function(){
			ok( S(sel.span).size(), 'The input is gone!' );
			ok( /Hello!/.test(S(sel.span).text()), 'The text "Hello!" has been saved' );
		});
	});
})();