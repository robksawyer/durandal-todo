define([
	'durandal/system', 
	'scripts/model',
	'scripts/config'
	],
	function(system, model, config){
		
		var getTodos = function (todoObservables){
			//reset the observable 
			todoObservables([]);

			var todos = [];

			// check local storage for todos
			data = ko.utils.parseJson(localStorage.getItem(config.localStorageItem));
			data.forEach(function(item){
				var t = new model.Todo(item);
				todos.push(t);
			});

			/*if(todos.length < 1){
				system.log('Mapping todos to observable array.');
				return todos = ko.observableArray(ko.utils.arrayMap(todos, function (todo) {
					return new Todo(todo.title, todo.completed);
				}));
			}*/
	
			todoObservables(todos); //Make the observable fire a change	
			return todos;
		};

		var dataservice = {
			getTodos: getTodos
		};
		return dataservice;
	}
);