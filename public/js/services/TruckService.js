angular.module('TruckService', []).factory('Truck', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function() {
            return $http.get('/api/trucks');
        },

        put : function(id) {
            return $http.put('/api/trucks/' + id);
        },

                // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        create : function(truckData) {
            return $http.post('/api/trucks', truckData);
        },

        // call to DELETE a nerd
        delete : function(id) {
            return $http.delete('/api/trucks/' + id);
        }
    }

}]);
