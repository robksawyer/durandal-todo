require.config({
	//'baseUrl': './',
	'paths': {
		'jquery': 'bower_components/jquery/jquery.min',
		'ko': 'bower_components/knockout/index',
		'sammy': 'bower_components/sammy/lib/min/sammy-latest.min',
		'text': 'bower_components/text/text',
		'r': 'bower_components/r/index'
	}
});

// Load the main app module to start the app
define(function(require) {
	'use strict';

	// Your starting point. Enjoy the ride!
	
	var ENTER_KEY = 13;

	var app = require('durandal/app'),
		viewLocator = require('durandal/viewLocator'),
		system = require('durandal/system'),
		router = require('durandal/plugins/router');

	//This second set of requirejs is temporary, until a custom mimosa module to handle it.
	require('durandal/transitions/fadein');
	require('viewmodels/shell');
	require('scripts/bindings'); //custom Knockout bindings
	require('models/Todo'); //the todo model

	system.debug(true);

	app.title = 'Template • TodoMVC';
	app.start().then(function () {
		//Replace 'viewmodels' in the moduleId with 'views' to locate the view.
		//Look for partial views in a 'views' folder in the root.
		viewLocator.useConvention();

		// internal computed observable that fires whenever anything changes in our todos
		ko.computed(function () {
			// store a clean copy to local storage, which also creates a dependency on the observableArray and all observables in each item
			localStorage.setItem('todos-durandal', ko.toJSON(self.todos));
		}).extend({
			throttle: 500
		}); // save at most twice per second


		// check local storage for todos
		//TODO: Figure this out.
		//var todos = ko.utils.parseJson(localStorage.getItem('todos-durandal'));
		//system.log('Total todos: ' + todos.length);

		//configure routing
		router.useConvention();
		router.mapNav('todo');

		app.adaptToDevice();

		//Show the app by setting the root view model for our application with a transition.
		app.setRoot('viewmodels/shell', 'fadein');
	});
});