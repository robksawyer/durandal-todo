define([
	'durandal/system',
	'viewmodels/model',
	'scripts/config'
	],
	function(system, model, config){
		
		var getTodos = function (todoObservables){
			//reset the observable 
			todoObservables([]);

			var todos = [];

			// check local storage for todos
			var data = ko.utils.parseJson(localStorage.getItem(config.localStorageItem));
			if(data){
				data.forEach(function(item){
					todos.push(new model.Todo(item.title, item.completed));
				});
			}
			todoObservables(todos); //Make the observable fire a change	
			return todoObservables;
		};

        return {
			getTodos: getTodos
		};

	}
);