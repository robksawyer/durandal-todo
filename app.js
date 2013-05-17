require.config({
	//'baseUrl': './',
	'paths': {
		'jquery': 'components/jquery/jquery.min',
		'sammy': 'components/sammy/lib/min/sammy-latest.min',
		'knockout': 'components/knockout/build/output/knockout-latest',
		'text': 'components/text/text',
		'r': 'components/dist/r'
	}
});

// Load the main app module to start the app
define([
		'durandal/app',
		'durandal/viewLocator',
		'durandal/system',
		'durandal/plugins/router',
		'durandal/transitions/fadein'
	],
	function(app, viewLocator, system, router) {
	'use strict';

	// Your starting point. Enjoy the ride!

	system.debug(true);

	app.title = 'Durandal • TodoMVC';
	app.start().then(function () {
		//Replace 'viewmodels' in the moduleId with 'views' to locate the view.
		//Look for partial views in a 'views' folder in the root.
		viewLocator.useConvention();

		//configure routing
		router.useConvention();
		router.mapAuto();
		//router.mapNav('todos');

		app.adaptToDevice();

		//Show the app by setting the root view model for our application with a transition.
		app.setRoot('viewmodels/shell', 'fadein');
	});
});