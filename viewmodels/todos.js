define(
	[
	'jquery',
	'knockout',
	'scripts/config',
	'durandal/app', 
	'durandal/system', 
	'scripts/dataservice', 
	'scripts/model',
	'scripts/bindings'
	], 
	function($, ko, config, app, system, dataservice, model) {
	'use strict';

	var self = this;

	var todos = ko.observableArray([]),
		current = ko.observable(), // store the new todo value being entered
		showMode = ko.observable('all');

		// count of all completed todos
	var completedCount = ko.computed(function () {
		return ko.utils.arrayFilter(todos(), function (todo) {
			if(!todo) return;
			return todo.completed();
		}).length;
	});

	// count of todos that are not complete
	var remainingCount = ko.computed(function () {
		return todos().length - completedCount();
	});

	// writeable computed observable to handle marking all complete/incomplete
	var allCompleted = ko.computed({
		//always return true/false based on the done flag of all todos
		read: function () {
			return !remainingCount();
		},
		// set all todos to the written value (true/false)
		write: function (newValue) {
			ko.utils.arrayForEach(todos(), function (todo) {
				// set even if value is the same, as subscribers are not notified in that case
				todo.completed(newValue);
			});
		}
	});

	//filter the todos based on the completion status
	var filteredTodos = ko.computed(function () {
		switch (showMode()) {
			case 'active':
				return todos().filter(function (todo) {
					return !todo.completed();
				});
			case 'completed':
				return todos().filter(function (todo) {
					return todo.completed();
				});
			default:
				return todos();
		}
	});

	var vm = {
		displayName: 'Todos',
		activate: function(){
			system.log("Todo ViewModel Activated");
			dataservice.getTodos(todos);
			system.log(todos());

			if(todos().length > 0){
				// internal computed observable that fires whenever anything changes in our todos
				ko.computed(function () {
					// store a clean copy to local storage, which also creates a dependency on the observableArray and all observables in each item
					localStorage.setItem(config.localStorageItem, ko.toJSON( todos ));
				}).extend({
					throttle: 500
				}); // save at most twice per second
			}
		},
		todos: todos,
		current: current,
		showMode: showMode,
		add: add,
		remove: remove,
		removeCompleted: removeCompleted,
		editItem: editItem,
		stopEditing: stopEditing,
		getLabel: getLabel,
		filteredTodos: filteredTodos,
		allCompleted: allCompleted,
		remainingCount: remainingCount,
		completedCount: completedCount
	};

	return vm;

	// add a new todo, when enter key is pressed
	function add() {
		system.log("Adding item");
		var current = current().trim();
		if (current) {
			todos.push(new model.Todo(current));
			current('');
		}
	}

	// remove a single todo
	function remove(todo) {
		todos.remove(todo);
	}

	// remove all completed todos
	function removeCompleted() {
		todos.remove(function(todo) {
			return todo.completed();
		});
	}

	// edit an item
	function editItem(item) {
		item.editing(true);
	}

	// stop editing an item.  Remove the item, if it is now empty
	function stopEditing(item) {
		item.editing(false);

		if (!item.title().trim()) {
			remove(item);
		}
	}

	// helper function to keep expressions out of markup
	function getLabel(count) {
		return ko.utils.unwrapObservable(count) === 1 ? 'item' : 'items';
	}
});