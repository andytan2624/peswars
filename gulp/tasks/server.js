  'use strict';

var config  = require('../config');
var http    = require('http');
var express = require('express');
var gulp    = require('gulp');
var gutil   = require('gulp-util');
var morgan  = require('morgan');

gulp.task('server', function() {

  var server = express();

  // log all requests to the console
  server.use(morgan('dev'));
  server.use(express.static(config.buildDir));

  // ROUTES FOR OUR API
  // =============================================================================
  var router = express.Router();              // get an instance of the express Router

  // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
  router.get('/api', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
  });

  // Serve index.html for all routes to leave routing up to react-router
  server.all('/*', function(req, res) {
      res.sendFile('index.html', { root: 'build' });
  });

  // Start webserver if not already running
  var s = http.createServer(server);
  s.on('error', function(err){
    if(err.code === 'EADDRINUSE'){
      gutil.log('Development server is already started at port ' + config.serverport);
    }
    else {
      throw err;
    }
  });

  s.listen(config.serverport);

});