define(
	[
		'durandal/plugins/router'
	],
	function (router) {
		'use strict';
		
		return {
			router: router,
			activate: function () {
				return router.activate('todos');
			}
		};
	}
);