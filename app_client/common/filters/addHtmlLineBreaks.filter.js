(function() {
	addHtmlLineBreaks.$inject = ['$sce'];
	function addHtmlLineBreaks($sce){
		return function(text){
			var output = text.replace(/\n/g, '<br/>');
			return $sce.trustAsHtml(output);
		}
	}	
	angular
	 .module('loc8rApp')
	 .filter('addHtmlLineBreaks', addHtmlLineBreaks);
})();