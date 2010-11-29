(function(){
	module("todo_list test", { 
		setup: function(){
			S.open("//todoit/plugins/todo_list/todo_list.html");
		}
	});

	var sel = {
		insertTxt : '#insertTxt',
		insertIndex : '#insertIndex',
		insertBtn : '#insertBtn',
		list : '.todoit_todo_list',
		li : '.todoit_todo_list li',
		prependTxt : '#prependTxt',
		prependBtn : '#prependBtn',
		appendTxt : '#appendTxt',
		appendBtn : '#appendBtn',
		removeIndex : '#removeIndex',
		removeIndexes : '#removeIndexes',
		removeIndexesBtn : '#removeIndexesBtn',
		removeBtn : '#removeBtn',
		getIndex : '#getIndex',
		getBtn : '#getBtn',
		getOutput : '#getOutput'
	};

	function insert(){
		S(sel.insertTxt).click().type('A todo!');
		S(sel.insertIndex).click().type('500');
		S(sel.insertBtn).click();
	}

	function prepend(){
		S(sel.prependTxt).click().type('Prepended text');
		S(sel.prependBtn).click();
	}

	function append(){
		S(sel.appendTxt).click().type('Appended text');
		S(sel.appendBtn).click();
	}

	test("Insertion tests", function(){
	
		insert();
	
		S(sel.li).size(1, function(){
			ok( /A todo!/.test(S(sel.li).text()), 'A list item was inserted!' );
		});
	
		prepend();
	
		S(sel.li).size(2, function(){
			ok( /Prepended text/.test(S(sel.li + ':eq(0)').text()), 'A list item was prepended!' );
		});
	
		append();
	
		S(sel.li).size(3, function(){
			ok( /Appended text/.test(S(sel.li + ':eq(2)').text()), 'A list item was appended!' );
		});
	});

	test('Get test', function(){
		insert();
		prepend();
		append();
	
		S(sel.getIndex).click().type('2');
	
		S(sel.li).size(3, function(){
			S(sel.getBtn).click();
		
			S(sel.getOutput).text(/\-\->/, function(){
				ok(/A todo!/.test(S(sel.getOutput).text()), 'List item "2" was retrieved!');
			});
		});
	});

	test("Delete test", function(){
		insert();
		prepend();
		append();
	
		S(sel.li).exists(function(){
		
			S(sel.removeIndex).click().type('1');
			S(sel.removeBtn).click(function(){
				equals(S(sel.li).size(), 2, 'A list item was deleted!');
			});
		
			S(sel.removeIndexes).click().type('1, 2');
			S(sel.removeIndexesBtn).click(function(){
				equals(S(sel.li).size(), 0, 'Multiple list items were deleted!');
			});
		});
	
	});
})();