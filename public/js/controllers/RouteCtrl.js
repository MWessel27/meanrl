// angular.module('RouteCtrl', []).controller('RouteController', function($scope, $http, Route) {
angular.module('RouteCtrl', []).controller('RouteController', function($scope, $http, Route, Truck, gservice) {
    $scope.logo = 'images/rl.png';

    $scope.crewSize = ('1 2 3 4 5 6 7 8 9 10').split(' ').map(function(num) {
        return {size: num};
      });

    $scope.timings = ('7:00AM 7:15AM 7:30AM 7:45AM 8:00AM 8:15AM 8:30AM 8:45AM 9:00AM 9:15AM 9:30AM 9:45AM 10:00AM 10:15AM 10:30AM 10:45AM 11:00AM 11:15AM 11:30AM 11:45AM 12:00PM 12:15PM 12:30PM 12:45PM 1:00PM 1:15PM 1:30PM 1:45PM 2:00PM 2:15PM 2:30PM 2:45PM 3:00PM 3:15PM 3:30PM 3:45PM 4:00PM 4:15PM 4:30PM 4:45PM 5:00PM 5:15PM 5:30PM 5:45PM 6:00PM 6:15PM 6:30PM 6:45PM 7:00PM 7:15PM 7:30PM 7:45PM 8:00PM 8:15PM 8:30PM 8:45PM 9:00PM 9:15PM 9:30PM 9:45PM 10:00PM 10:15PM 10:30PM 10:45PM 11:00PM 11:15PM 11:30PM 11:45PM 12:00AM 12:15AM 12:30AM 12:45AM 1:00AM 1:15AM 1:30AM 1:45AM 2:00AM 2:15AM 2:30AM 2:45AM 3:00AM 3:15AM 3:30AM 3:45AM 4:00AM 4:15AM 4:30AM 4:45AM 5:00AM 5:15AM 5:30AM 5:45AM 6:00AM 6:15AM 6:30AM 6:45AM').split(' ').map(function(tim) {
      return {time: tim};
    });

    $scope.avgTime = ('5 10 15 20 25 30 35 40 45 50 55 60').split(' ').map(function(avg) {
        return {time: avg};
      });
    //set truck params
    $scope.addTruck = function() {
      $http.post('http://localhost:8080/api/trucks/', {'crewSize' : 1, 'startTime' : '7:00AM', 'endTime' : '5:00PM', 'avgTime' : 30});
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

    $scope.updateTruck = function(truckId, crewSize, startTime, endTime, avgTime) {
      $http.put('http://localhost:8080/api/trucks/'+truckId, {'crewSize' : crewSize, 'startTime' : startTime, 'endTime' : endTime, 'avgTime' : avgTime});
    }

    $scope.updateTruckStartTime = function(truckId, crewSize, startTime, endTime, avgTime) {
      $http.put('http://localhost:8080/api/trucks/'+truckId, {'crewSize' : crewSize, 'startTime' : startTime, 'endTime' : endTime, 'avgTime' : avgTime});
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
