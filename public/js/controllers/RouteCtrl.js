angular.module('RouteCtrl', []).controller('RouteController', function($scope, $http, Route) {

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
    $scope.addresses = $scope.getAddresses();

});
