module("todo_list test", { 
	setup: function(){
		S.open("//todoit/todo_list/todo_list.html");
	}
});

test("Copy Test", function(){
	equals(S("h1").text(), "Welcome to JavaScriptMVC 3.0!","welcome text");
});