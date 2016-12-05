// angular.module('RouteCtrl', []).controller('RouteController', function($scope, $http, Route) {
angular.module('RouteCtrl', []).controller('RouteController', function($scope, $http, Route, Truck, gservice) {
    $scope.logo = 'images/rl.png';

    $scope.crewSize = ('1 2 3 4 5 6 7 8 9 10').split(' ').map(function(num) {
        return {size: num};
      });

    //set truck params
    $scope.addTruck = function() {
      $http.post('http://localhost:8080/api/trucks/', {'crewSize' : 1});
      $scope.trucks = $scope.getTrucks();
      $scope.reload;
    }

    $scope.deleteTruck = function(truckId) {
      $http.delete('http://localhost:8080/api/trucks/'+truckId);
      $scope.trucks = $scope.getTrucks();
      $scope.reload;
    }

    $scope.getTrucks = function() {
      $http.get('http://localhost:8080/api/trucks/').
        then(function(response) {
            $scope.trucks = response.data;
        });
    }

    $scope.updateTruck = function(truckId, crewSize) {
      $http.put('http://localhost:8080/api/trucks/'+truckId, {'crewSize' : crewSize, 'startTime' : 0, 'endTime' : 0, 'avgTime' : 0});
    }

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

    $scope.trucks = $scope.getTrucks();
    $scope.getOrigin();
    $scope.addresses = $scope.getAddresses();

});
