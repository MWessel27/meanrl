// grab the nerd model we just created
var Truck = require('./models/truck');

    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        app.put('/api/trucks/:trucks_id', function(req, res) {

        // use our bear model to find the bear we want
        Truck.findById(req.params.trucks_id, function(err, truck) {

            if (err)
                res.send(err);

            truck.crewSize = req.body.crewSize;  // update the bears info
            truck.startTime = req.body.startTime;
            truck.endTime = req.body.endTime;
            truck.avgTime = req.body.avgTime;
            // save the bear
            truck.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Truck updated!' });
            });
          });

        });

        app.delete('/api/trucks/:trucks_id', function(req, res) {

          Truck.remove({
              _id: req.params.trucks_id
          }, function(err, truck) {
              if (err)
                  res.send(err);

              res.json({ message: 'Successfully deleted' });
          });

        });

        app.post('/api/trucks', function(req, res) {
            var truck = new Truck();
            truck.crewSize = req.body.crewSize;  // update the bears info
            truck.startTime = 0;
            truck.endTime = 0;
            truck.avgTime = 0;
            truck.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({ crewSize: truck.crewSize, startTime: truck.startTime, endTime: truck.endTime, avgTime: truck.avgTime });
                });
        });

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });

    };
