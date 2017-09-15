(function () {
  "use strict"
  
  angular
      .module('app')
      .run(run);

  run.$inject = [];
  function run() {
      console.log('App is running!');
  }

})();