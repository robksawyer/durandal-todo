define([
	'durandal/app',
	'durandal/system',
	'durandal/plugins/router',
	'scripts/bindings',
	'scripts/native'
	], 
	function (app, system, router) {
	return {
		router: router,
		activate: function () {
			return router.activate('todos');
		}
	};
});