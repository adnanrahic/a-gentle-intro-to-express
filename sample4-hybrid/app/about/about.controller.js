(function () {
	"use strict"
	
	angular
		.module('app')
		.controller('aboutController', aboutController);

	aboutController.$inject = [];
	function aboutController() {
		var vm = this;

		activate();

		function activate() {
			getAbout();
		}

		///////////////////

		function getAbout() {
      vm.about = 'This is the about page!';
			return vm.about;
		}

		
	}
	
})();