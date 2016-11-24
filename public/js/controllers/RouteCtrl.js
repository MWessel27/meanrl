angular.module('RouteCtrl', []).controller('RouteController', function($scope, $http, Route) {

    $scope.logo = 'images/rl.png';

    $scope.getAddresses = function() {
      $http.get('http://localhost:8080/api/routes/').
        then(function(response) {
            $scope.addresses = response.data;
        });
    };

    $scope.createAddress = function(address) {
      $http.post('http://localhost:8080/api/routes/', {'address' : address.$viewValue});
      $scope.addresses = $scope.getAddresses();
    }

    $scope.deleteAddress = function(addressId) {
      $http.delete('http://localhost:8080/api/routes/'+addressId);
      $scope.addresses = $scope.getAddresses();
    }

    $scope.originExists = function() {
      // for(var i=0; i<$scope.getAddresses.length(); i++){
      //   if($scope.address[i].isOrigin == 1){
      //     console.log('test');
      //     console.log($scope.address[i]);
      //     return true;
      //   }
      // }
    }

    $scope.setOrigin = function(addressId, address) {
      $http.put('http://localhost:8080/api/routes/'+addressId, {'address' : address, 'isOrigin' : 1});
      $scope.addresses = $scope.getAddresses();
    }

    $scope.removeOrigin = function(addressId, address) {
      $http.put('http://localhost:8080/api/routes/'+addressId, {'address' : address, 'isOrigin' : 0});
      $scope.addresses = $scope.getAddresses();
    }

    $scope.addresses = $scope.getAddresses();

});
