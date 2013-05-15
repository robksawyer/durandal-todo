define(
	[
	'knockout',
	'durandal/app', 
	'durandal/system', 
	'scripts/dataservice', 
	'scripts/model',
	'scripts/config',
	'scripts/bindings'
	], 
	function(ko, app, system, dataservice, model, config) {
	'use strict';

	var vm = function(todos) {

		var self = this;

		// map array of passed in todos to an observableArray of Todo objects
		self.todos = ko.observableArray( ko.utils.arrayMap( todos, function( todo ) {
			return new model.Todo( todo.title, todo.completed );
		}));

		self.current = ko.observable(), // store the new todo value being entered
		self.showMode = ko.observable('all');

		/*self.activate = function(todos) {
			dataservice.getTodos(self.todos);
		};*/

		// add a new todo, when enter key is pressed
		self.add = function() {
			var current = self.current().trim();
			if (current) {
				todos.push(new self.model.Todo(current));
				self.current('');
			}
		};

		// remove a single todo
		self.remove = function(todo) {
			self.todos.remove(todo);
		};

		// remove all completed todos
		self.removeCompleted = function() {
			self.todos.remove(function(todo) {
				return todo.completed();
			});
		};

		// edit an item
		self.editItem = function(item) {
			item.editing(true);
		};

		// stop editing an item.  Remove the item, if it is now empty
		self.stopEditing = function(item) {
			item.editing(false);

			if (!item.title().trim()) {
				self.remove(item);
			}
		};

		// count of all completed todos
		self.completedCount = ko.computed(function () {
			return ko.utils.arrayFilter( self.todos(), function (todo) {
				return todo.completed();
			}).length;
		});

		// count of todos that are not complete
		self.remainingCount = ko.computed(function () {
			return self.todos().length - self.completedCount();
		});

		// writeable computed observable to handle marking all complete/incomplete
		self.allCompleted = ko.computed({
			//always return true/false based on the done flag of all todos
			read: function () {
				return !self.remainingCount();
			},
			// set all todos to the written value (true/false)
			write: function (newValue) {
				ko.utils.arrayForEach(self.todos(), function (todo) {
					// set even if value is the same, as subscribers are not notified in that case
					todo.completed(newValue);
				});
			}
		});

		// helper function to keep expressions out of markup
		self.getLabel = function(count) {
			return ko.utils.unwrapObservable(count) === 1 ? 'item' : 'items';
		};

		//filter the todos based on the completion status
		self.filteredTodos = ko.computed(function () {
			switch (self.showMode()) {
				case 'active':
					return self.todos().filter(function (todo) {
						return !todo.completed();
					});
				case 'completed':
					return self.todos().filter(function (todo) {
						return todo.completed();
					});
				default:
					return self.todos();
			}
		});

		// internal computed observable that fires whenever anything changes in our todos
		ko.computed(function () {
			// store a clean copy to local storage, which also creates a dependency on the observableArray and all observables in each item
			localStorage.setItem(config.localStorageItem, ko.toJSON( self.todos ));
		}).extend({
			throttle: 500
		}); // save at most twice per second

	};
	return vm;

});