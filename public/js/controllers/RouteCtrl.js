// angular.module('RouteCtrl', []).controller('RouteController', function($scope, $http, Route) {
angular.module('RouteCtrl', []).controller('RouteController', function($scope, $http, Route, gservice) {
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
      document.getElementById("addressbox").value = "";
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

    $scope.getOrigin = function() {
      $http.get('http://localhost:8080/api/routes/').
        then(function(response) {
            $scope.addresses = response.data;
            for(var i=0; i<$scope.addresses.length; i++){
              if($scope.addresses[i].isOrigin == 1){
                return $scope.addresses[i];
              }
            }
        });
    }

    $scope.getOrigin = function() {
      $http.get('http://localhost:8080/api/routes/').
        then(function(response) {
            $scope.addresses = response.data;
            $scope.destinationList = [];
            $scope.origin = [];
            for(var i=0; i<$scope.addresses.length; i++){
              if($scope.addresses[i].isOrigin == 1){
                $scope.origin.push($scope.addresses[i].address);
              } else {
                $scope.destinationList.push($scope.addresses[i].address);
              }
            }
            gservice.initRoute($scope.origin, $scope.destinationList);
        });
    }

    $scope.setOrigin = function(addressId, address, timeFrom, distanceFrom) {
      $http.put('http://localhost:8080/api/routes/'+addressId, {'address' : address, 'isOrigin' : 1, 'timeFrom' : timeFrom, 'distanceFrom' : distanceFrom});
      $scope.addresses = $scope.getAddresses();
    }

    $scope.removeOrigin = function(addressId, address, timeFrom, distanceFrom) {
      $http.put('http://localhost:8080/api/routes/'+addressId, {'address' : address, 'isOrigin' : 0, 'timeFrom' : timeFrom, 'distanceFrom' : distanceFrom});
      $scope.addresses = $scope.getAddresses();
    }

    $scope.getOrigin();
    $scope.addresses = $scope.getAddresses();

});
