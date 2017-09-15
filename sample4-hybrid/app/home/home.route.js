(function () {
	"use strict"
	
	angular
		.module('app')
		.config(homeRoutes);

	homeRoutes.$inject = ['$routeProvider'];
	function homeRoutes($routeProvider) {
  		$routeProvider.when("/", {
	        controller: "homeController",
	        controllerAs: "vm",
	        templateUrl: "home/home.html"
	    });
	}
	
})();