(function(){
  function footerGeneric(){
	return {
		restrict:"EA",
		templateUrl: "/common/directives/footerGeneric/footerGeneric.template.html"
	};
  }	
  angular
  .module('loc8rApp')
  .directive('footerGeneric', footerGeneric);
})();