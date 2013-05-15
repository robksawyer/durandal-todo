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
define(function(require) {
	'use strict';

	// Your starting point. Enjoy the ride!

	var app = require('durandal/app'),
		viewLocator = require('durandal/viewLocator'),
		system = require('durandal/system'),
		router = require('durandal/plugins/router');

	//This second set of requirejs is temporary, until a custom mimosa module to handle it.
	require('text');
	require('sammy');
	require('viewmodels/shell');
	require('scripts/dataservice');
	require('durandal/transitions/fadein');

	system.debug(true);

	app.title = 'Durandal • TodoMVC';
	app.start().then(function () {
		//Replace 'viewmodels' in the moduleId with 'views' to locate the view.
		//Look for partial views in a 'views' folder in the root.
		viewLocator.useConvention();

		//configure routing
		router.useConvention();
		router.mapNav('todos');

		app.adaptToDevice();

		//Show the app by setting the root view model for our application with a transition.
		app.setRoot('viewmodels/shell', 'fadein');
	});
});