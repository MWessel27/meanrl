angular.module('RouteService', []).factory('Route', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function() {
            return $http.get('/api/routes');
        },


                // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        create : function(routeData) {
            return $http.post('/api/routes', routeData);
        },

        // call to DELETE a nerd
        delete : function(id) {
            return $http.delete('/api/routes/' + id);
        }
    }

}]);
