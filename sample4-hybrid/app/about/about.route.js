(function () {
	"use strict"
	
	angular
		.module('app')
		.config(aboutRoutes);

	aboutRoutes.$inject = ['$routeProvider'];
	function aboutRoutes($routeProvider) {
  		$routeProvider.when("/about", {
	        controller: "aboutController",
	        controllerAs: "vm",
	        templateUrl: "about/about.html"
	    });
	}
	
})();