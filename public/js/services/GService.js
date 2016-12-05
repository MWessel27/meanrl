// Creates the gservice factory. This will be the primary means by which we interact with Google Maps
angular.module('gservice', [])
    .factory('gservice', function($http){

        // Initialize Variables
        // -------------------------------------------------------------
        // Service our factory will return
        var googleMapService = {};

        googleMapService.initRoute = function(origin1, destinationList){
            initialize(origin1, destinationList);
        };

    var initialize = function(origin, destinationList) {

      var geocoder = new google.maps.Geocoder;

      var service = new google.maps.DistanceMatrixService;

      service.getDistanceMatrix({
        origins: origin,
        destinations: destinationList,
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false
      }, function(response, status) {
        if (status !== 'OK') {
          console.log('Error was: ' + status);
        } else {
          //now that we can get the distance from the origin properly, now to update the DB with the distances and Time
          var outputHeaderDiv = document.getElementById('outputHeader');
          outputHeaderDiv.innerHTML = '<h1>Truck #1 Route</h1>';
          
          var outputDiv = document.getElementById('output');
          outputDiv.innerHTML = '';

          var testDiv = '';
          testDiv +='<table>' + '<tr>'+'<th>#</th>'+'<th>Address</th>'+'<th>Distance</th>'+'<th>Time</th>'+'</tr>';
            var results = [response];

            var distResults = [];
            for(var x = 0; x<response.destinationAddresses.length;x++){
              if(response.rows[0].elements[x].duration.text.includes('hour')){
                //first convert hours to minutes
                var durationFull = response.rows[0].elements[x].duration.text;
                var tempHours = durationFull[durationFull.length - 14];
                var hoursToMin = tempHours * 60;
                var tempMinutes = durationFull[durationFull.length - 7] + durationFull[durationFull.length - 6];
                var conDuration = parseInt(hoursToMin) + parseInt(tempMinutes);
                var dur = conDuration + ' mins';

                distResults[x]={address:response.destinationAddresses[x], distance:response.rows[0].elements[x].distance.text, duration:dur};
              } else {
                distResults[x]={address:response.destinationAddresses[x], distance:response.rows[0].elements[x].distance.text, duration:response.rows[0].elements[x].duration.text};
              }
            }
            distResults.sort(function(a, b){
              var tempDurA = a.duration;
              var tempDurB = b.duration;
              var durA = tempDurA.substring(0, tempDurA.length - 5);
              var durB = tempDurB.substring(0, tempDurB.length - 5);
              return durA-durB;
            });

            for (var j = 0; j < distResults.length; j++) {
              var count = j+1;
              testDiv += '<td>' + count + '</td>' + '<td>' + distResults[j].address + '</td>'+ '<td>' + distResults[j].distance + '</td>'+ '<td>' + distResults[j].duration + '</td>' + '</tr>';
            }
            outputDiv.innerHTML += testDiv;
        }
      });
  };

  // Refresh the page upon window load. Use the initial latitude and longitude
  google.maps.event.addDomListener(window, 'load',
      googleMapService.initRoute());



  return googleMapService;
});
