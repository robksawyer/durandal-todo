define(
	[
	'knockout',
	'jquery',
	'durandal/app', 
	'durandal/system', 
	'scripts/dataservice', 
	'scripts/model',
	'scripts/config'
	], 
	function(ko, jQuery, app, system, dataservice, model, config) {
	'use strict';

	var self = this;

	var todos = ko.observableArray([]),
		current = ko.observable(), // store the new todo value being entered
		showMode = ko.observable('all');

	// add a new todo, when enter key is pressed
	var add = function() {
		var current = current().trim();
		if (current) {
			todos.push(new model.Todo(current));
			current('');
		}
	};

	// remove a single todo
	var remove = function(todo) {
		todos.remove(todo);
	};

	// remove all completed todos
	var removeCompleted = function() {
		todos.remove(function(todo) {
			return todo.completed();
		});
	};

	// edit an item
	var editItem = function(item) {
		item.editing(true);
	};

	// stop editing an item.  Remove the item, if it is now empty
	var stopEditing = function(item) {
		item.editing(false);

		if (!item.title().trim()) {
			remove(item);
		}
	};

	// helper function to keep expressions out of markup
	var getLabel = function(count) {
		return ko.utils.unwrapObservable(count) === 1 ? 'item' : 'items';
	};

	var vm = {
		todos: todos,
		current: current,
		showMode: showMode,
		activate: function(){
			system.log("Todo ViewModel Activated");
			dataservice.getTodos(todos);
			system.log(todos());
			// map array of passed in todos to an observableArray of Todo objects
			/*todos = ko.observableArray( ko.utils.arrayMap( todos, function( todo ) {
				if(!todo) return;
				return new model.Todo( todo.title, todo.completed );
			}));*/
		},
		add: add,
		remove: remove,
		removeCompleted: removeCompleted,
		editItem: editItem,
		stopEditing: stopEditing,
		getLabel: getLabel
	};

	// count of all completed todos
	vm.completedCount = ko.computed(function () {
		return ko.utils.arrayFilter(todos(), function (todo) {
			if(!todo) return;
			return todo.completed();
		}).length;
	}, vm);

	// count of todos that are not complete
	vm.remainingCount = ko.computed(function () {
		return todos().length - vm.completedCount();
	}, vm);

	// writeable computed observable to handle marking all complete/incomplete
	vm.allCompleted = ko.computed({
		//always return true/false based on the done flag of all todos
		read: function () {
			return !vm.remainingCount();
		},
		// set all todos to the written value (true/false)
		write: function (newValue) {
			ko.utils.arrayForEach(todos(), function (todo) {
				// set even if value is the same, as subscribers are not notified in that case
				todo.completed(newValue);
			});
		}
	}, vm);

	//filter the todos based on the completion status
	vm.filteredTodos = ko.computed(function () {
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
	}, vm);

	// internal computed observable that fires whenever anything changes in our todos
	ko.computed(function () {
		// store a clean copy to local storage, which also creates a dependency on the observableArray and all observables in each item
		localStorage.setItem(config.localStorageItem, ko.toJSON( todos ));
	}).extend({
		throttle: 500
	}); // save at most twice per second

	return vm;
});