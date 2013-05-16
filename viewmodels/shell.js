define([
	'durandal/system',
	'durandal/plugins/router', 
	'durandal/app',
	'scripts/config'
	], 
	function (system, router, app, config) {
	return {
		router: router,
		activate: function () {
			return router.activate('todos');
		}
	};
});