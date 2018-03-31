(function() {
homeCtrl.$inject = ['$scope', 'loc8rData', 'geolocation'];	
function homeCtrl($scope, loc8rData, geolocation){
	if (window.location.pathname !== '/') {
		window.location.href = '/#' + window.location.pathname;
	}
	var vm = this;
	vm.pageHeader = {
			title: "Loc8r",
			strapline: "Find place to work with wifi near you!"
	};
	vm.sidebar = {
			content: "Looking for wifi and seat etc etc"
	}
	vm.message = "Checking you location";
	
	vm.getData = function(position){
		var lat = position.coords.latitude,
		    lng = position.coords.longitude;
		vm.message = "Searching for nearby places";
		loc8rData.locationByCoords(lat,lng)
		.then(function (success){			
			vm.message = success.data.length > 0 ? "" : "No locations found";  
			vm.data = {locations: success.data};
        },function (e){
        	console.log(e);
        });
		  /*.success(function(data){
			  vm.message = data.length > 0 ? "" : "No locations found";  
			  vm.data = {locations: data};
		  })
		  .error(function(e){
			  console.log(e);
			  vm.message = "Sorry, something's gone wrong ";
		  });*/
	};
	vm.showError = function(error){
		$scope.$apply(function(){
			vm.message = error.message;
		});
	};
	vm.noGeo =function(){
		$scope.$apply(function(){
			vm.message = "Geolocation not supported by this browser.";
		});
	}	
	geolocation.getPosition(vm.getData, vm.showError, vm.noGeo);
}

angular
.module('loc8rApp')
.controller('homeCtrl', homeCtrl);
})();