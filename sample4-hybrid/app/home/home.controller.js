(function () {
	"use strict"
	
	angular
		.module('app')
		.controller('homeController', homeController);

	homeController.$inject = [];
	function homeController() {
		var vm = this;

		activate();

		function activate() {
			getHelloWorld();
		}

		///////////////////

		function getHelloWorld() {
      vm.hello = 'Hello World!';
			return vm.hello;
		}

		
	}
	
})();