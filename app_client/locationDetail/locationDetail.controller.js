(function(){
	locationDetailCtrl.$inject = ['$routeParams', '$uibModal', 'loc8rData' ];
	function locationDetailCtrl($routeParams, $uibModal, loc8rData ){
		var vm = this;
		vm.locationid = $routeParams.locationid;
		
		loc8rData.locationById(vm.locationid)
		  .then(function (success){
		    vm.data = {location: success.data};
			vm.pageHeader = {
						title: vm.data.location.name
			};
			
		  },function (e){
        	console.log(e);
          });		  
		
		vm.popupReviewForm = function () {
			var modalInstance = $uibModal.open({			     
			      templateUrl: '/reviewModal/reviewModal.view.html',
			      controller: 'reviewModalCtrl',
			      controllerAs: 'vm',
			      resolve: {
			    	  locationData: function(){
			    		  return{
			    			  locationid: vm.locationid,
			    			  locationName: vm.data.location.name
			    		  };
			    	  }
			      }
			    });
			modalInstance.result.then(function(data){
				vm.data.location.reviews.push(data);
			})
		};
		
	}
	angular
	.module('loc8rApp')
	.controller('locationDetailCtrl', locationDetailCtrl);
})()