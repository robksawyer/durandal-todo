require.config({
	'baseUrl': '.',
	'paths': {
		'text': 'components/text/text'
	}
});

// Load the main app module to start the app
define([
		'durandal/app',
		'durandal/viewLocator',
		'durandal/system',
		'durandal/plugins/router',
        'scripts/bindings',
		'durandal/transitions/fadein'
	],
	function(app, viewLocator, system, router, bindings) {
		'use strict';

		// Your starting point. Enjoy the ride!
		system.debug(true);

        // Add ko.binding
        bindings.init();

		app.title = 'Durandal • TodoMVC';
		app.start().then(function () {
			//Replace 'viewmodels' in the moduleId with 'views' to locate the view.
			//Look for partial views in a 'views' folder in the root.
			viewLocator.useConvention();

			configureRouting();

			app.adaptToDevice();

			//Show the app by setting the root view model for our application with a transition.
			app.setRoot('viewmodels/shell', 'fadein');
		});

		function configureRouting() {
			system.log('Configuring routes');
			
			//sets default convention of all routes being based off of 'viewmodels'
			router.useConvention();                                             

			//creates a route for surveys that is visible in navigation
			//by convention it determines that the viewmodel location is 'viewmodels/surveys'
			//ex: visiting '#/surveys' results in 'viewmodels/surveys'
			router.mapNav('todos');
			router.mapRoute('todos/:mode');

			//creates a route for showing a particular survey
			//':id' extracts the value and it is passed as an argument into the 'activate' function of the viewmodel
			//mapRoute doesn't make the route visible in navigation
			//the viewmodel path doesn't follow the convention so it is explicitly specified
			//router.mapRoute('todos/:id', 'viewmodels/todos/addEditSurveyPage');    
		}
});