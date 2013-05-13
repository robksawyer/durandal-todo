define(function () {
	// represent a single todo item
	var Todo = function (title, completed) {
		var dto = {};
		//This is just a hack to build a model. In a real world example, this would likely come from an API.
		dto.title = title;
		dto.completed = completed;
		dto.editing = false;

		//make the properties actual Knockout observables and then add any Knockout computeds
		return addTodoComputeds(
				mapToObservable(dto)
			);
	};

	return {
		Todo: Todo
	};


	function mapToObservable(dto){
		var mapped = {};
		for (var prop in dto) {
			if (dto.hasOwnProperty(prop)) {
				mapped[prop] = ko.observable(dto[prop]);
			}
		}
		return mapped;
	}

	function addTodoComputeds (entity) {

		//Any Knockout computeds can go here.

		return entity;
	}

});