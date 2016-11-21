angular.module('MainCtrl', []).controller('MainController', function($scope, $http) {

    $scope.tagline = 'To the moon and back!';
    $scope.logo = 'images/rl.png';

    // $scope.test = function() {
    //   $http({
    //     method : "GET",
    //     url : "upload.json"
    // }).then(function mySucces(response) {
    //     $scope.test = response.data;
    // }, function myError(response) {
    //     $scope.test = response.statusText;
    // });
    //   $scope.test = "test";
    // }
});
