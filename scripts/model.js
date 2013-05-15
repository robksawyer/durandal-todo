define([
	'knockout'
	],
	function (ko) {
	'use strict';
	// represent a single todo item
	var Todo = function (title, completed) {
		//This is just a hack to build a model. In a real world example, this would likely come from an API.
		this.title = ko.observable( title );
		this.completed = ko.observable( completed );
		this.editing = ko.observable( false );

		//make the properties actual Knockout observables and then add any Knockout computeds
		/*return addTodoComputeds(
				mapToObservable(this)
			);*/
	};

	return {
		Todo: Todo
	};


	function mapToObservable(dto){
		var mapped = {};
		for (var prop in dto) {
			if (dto.hasOwnProperty(prop) && !ko.isComputed(dto[prop])) {
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