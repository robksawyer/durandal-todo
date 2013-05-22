define(
	[
	'durandal/app',
	'durandal/system', 
	'scripts/dataservice', 
	'viewmodels/model'
	],
	function(app, system, dataservice, model) {
	'use strict';

	var current = ko.observable(), // store the new todo value being entered
		todos = ko.observableArray([]),
		showMode = ko.observable('all');

	// count of all completed todos
	var completedCount = ko.computed(function() {
		return ko.utils.arrayFilter(todos(), function (todo) {
			return todo.completed();
		}).length;
	});

	// count of todos that are not complete
	var remainingCount = ko.computed(function () {
		return todos().length - vm.completedCount();
	});

	var vm = {
		activate: function(){
			todos.push(new model.Todo('test'));
			todos.push(new model.Todo('test2'));
			todos.push(new model.Todo('test3'));
		},
		add: add,
		remainingCount: remainingCount,
		completedCount: completedCount
	};
	return vm;

	// add a new todo, when enter key is pressed
	function add () {
		system.log("TEST");
	}
});