define(function(){
	'use strict';

	return function(){
	// trim polyfill
	if ( !String.prototype.trim ) {
		String.prototype.trim = function() {
			return this.replace( /^\s+|\s+$/g, '' );
		};
	}
  };

});