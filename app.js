require.config({
	//'baseUrl': './',
	'paths': {
		'jquery': 'bower_components/jquery/jquery.min',
		'sammy': 'bower_components/sammy/lib/min/sammy-latest.min',
		'knockout': 'bower_components/knockout/index',
		'text': 'bower_components/text/text'
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
	require('durandal/transitions/fadein');
	require('viewmodels/shell');

	system.debug(true);

	app.title = 'Template • TodoMVC';
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