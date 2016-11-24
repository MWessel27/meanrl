// grab the nerd model we just created
var Route = require('./models/route');

    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        // sample api route
        app.get('/api/routes', function(req, res) {
          //res.json({ message: 'hooray! welcome to our api!' });
            // use mongoose to get all nerds in the database
            Route.find(function(err, routes) {

                // if there is an error retrieving, send the error.
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(routes); // return all nerds in JSON format
            });
        });

        // sample api route
        app.get('/api/routes/:routes_id', function(req, res) {
              Route.findById(req.params.routes_id, function(err, route) {
                  if (err)
                      res.send(err);
                  res.json(route);
              });
        });

        app.put('/api/routes/:routes_id', function(req, res) {

        // use our bear model to find the bear we want
        Route.findById(req.params.routes_id, function(err, route) {

            if (err)
                res.send(err);

            route.address = req.body.address;  // update the bears info
            route.isOrigin = req.body.isOrigin;
            // save the bear
            route.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Address updated!' });
            });
          });

        });

        app.delete('/api/routes/:routes_id', function(req, res) {

          Route.remove({
              _id: req.params.routes_id
          }, function(err, bear) {
              if (err)
                  res.send(err);

              res.json({ message: 'Successfully deleted' });
          });

        });

        app.post('/api/routes', function(req, res) {
            var route = new Route();
            route.address = req.body.address;
            route.isOrigin = 0;
            route.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: route.address });
                });
        });

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });

    };
