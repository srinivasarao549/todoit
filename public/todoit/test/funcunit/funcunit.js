/*steal
 .plugins("funcunit")
 .then("todoit_test");*/

steal
	.plugins("funcunit")
	.then("//todoit/plugins/todo/test/funcunit/todo_test")
	.then("//todoit/plugins/todo_maker/test/funcunit/todo_maker_test")
	.then("//todoit/plugins/todo_list/test/funcunit/todo_list_test");