define(['durandal/system', 'scripts/model'],
	function(system, model){
		
		var getTodos = function (todoObservables){
			//reset the observable 
			todoObservables([]);

			var todos = [];

			// check local storage for todos
			data = ko.utils.parseJson(localStorage.getItem('todos-durandal'));
			data.forEach(function(item){
				var t = new model.Todo(item);
				todos.push(t);
			});
			todoObservables(todos); //Make the observable fire a change
			return todos;
		};

		return {
			getTodos: getTodos
		};
	}
);