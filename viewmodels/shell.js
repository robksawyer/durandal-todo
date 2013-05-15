define([
	'durandal/plugins/router', 
	'durandal/app',
	'viewmodels/todos',
	'scripts/config'
	], 
	function (router, app, TodoViewModel, config) {
	return {
		router: router,
		activate: function () {
			
			var todos = [];

			// check local storage for todos
			/*if(!localStorage.getItem(config.localStorageItem)){
				todos = ko.utils.parseJson(localStorage.getItem(config.localStorageItem));
			}*/

			// bind a new instance of our view model to the page
			//ko.applyBindings( new TodoViewModel( todos || [] ) );
			/*return router.activate('todos').then(function(){
				router.navigateTo('#/todos');
			});*/
			return router.activate('todos');
		}
	};
});