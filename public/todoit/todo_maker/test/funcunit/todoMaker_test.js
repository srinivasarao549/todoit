module("todoMaker test", { 
	setup: function(){
		S.open("//todoit/todoMaker/todoMaker.html");
	}
});

test("Copy Test", function(){
	equals(S("h1").text(), "Welcome to JavaScriptMVC 3.0!","welcome text");
});