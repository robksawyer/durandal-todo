define([
	'knockout',
	'durandal/system', 
	'scripts/model',
	'scripts/config'
	],
	function(ko, system, model, config){
		
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
	
			todoObservables(todos); //Make the observable fire a change	
			return todos;
		};

		var dataservice = {
			getTodos: getTodos
		};
		return dataservice;
	}
);