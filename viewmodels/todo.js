define(['durandal/app', 'ko', 'durandal/system'], function(app, ko, system) {

	var self = this;

	var current = ko.observable(), // store the new todo value being entered
	 	showMode = ko.observable('all');

	var todos = ko.observableArray(ko.utils.arrayMap(todos, function (todo) {
			// map array of passed in todos to an observableArray of Todo objects
			return new Todo(todo.title, todo.completed);
		}));

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

	// add a new todo, when enter key is pressed
	var add = function () {
		var current = current().trim();
		if (current) {
			todos.push(new Todo(current));
			current('');
		}
	};

	// remove a single todo
	var remove = function (todo) {
		todos.remove(todo);
	};

	// remove all completed todos
	var removeCompleted = function () {
		todos.remove(function (todo) {
			return todo.completed();
		});
	};

	// edit an item
	var editItem = function (item) {
		item.editing(true);
	};

	// stop editing an item.  Remove the item, if it is now empty
	var stopEditing = function (item) {
		item.editing(false);

		if (!item.title().trim()) {
			remove(item);
		}
	};

	// count of all completed todos
	var completedCount = ko.computed(function () {
		return ko.utils.arrayFilter(todos(), function (todo) {
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

	// helper function to keep expressions out of markup
	var getLabel = function (count) {
		return ko.utils.unwrapObservable(count) === 1 ? 'item' : 'items';
	};

	return {
		showMode: showMode,
		current: current,
		todos: todos,
		filteredTodos: filteredTodos,
		add: add,
		remove: remove,
		removeCompleted: removeCompleted,
		editItem: editItem,
		stopEditing: stopEditing,
		completedCount: completedCount,
		remainingCount: remainingCount,
		allCompleted: allCompleted,
		getLabel: getLabel,
		viewAttached: function () {
			system.log('Total todos: ' + todos().length);
			return;
		},
		completed: function(){
			return false;
		}
	};
});