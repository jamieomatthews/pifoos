var express = require('express');
var hal = require("express-hal");
var bodyParser = require('body-parser');
var request = require('request');
var path = require("path");
var Q = require('q');

var pong = require('./pong');
var pong_routes = require('./routes');
var api_routes = require('./api');


var Player = require('../models/Player');
var Challenge = require('../models/Challenge');

module.exports.instance = function () {
  var app = express();

  app.set('view engine', 'jade');
  app.set('views', './views')

  app.use(express.static('public'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(hal.middleware);

  app.use(require('./url').middleware);
  app.use(require('./hal').middleware);
  app.use(require('./player_middleware').middleware);


  app.get('/players', function (req, res) {
    Player.find({}, function(err, results) {
      console.log(results);
      res.render('index', { _players: results});
    });
    
  });

  app.post('/players', function(req, res){
    var playerName = req.body.player_name;
    if(playerName && playerName != ""){
      var promises = [];
      promises.push(pong.findPlayer(playerName));
      
      Q.any(promises).then(
        function (player) {
          res.json({ text: "You've already registered!" });
        },
        function (err) {
          pong.registerPlayer(playerName).then(function (player) {
            res.json({ text: 'Successfully registered! Welcome to the system, ' + playerName + '.' });
          }, function (err) {
            res.json({ text: err.toString() });
          });
        }
      );
    }
  });

  // api access to the player data
  app.get('/api', api_routes.root);
  app.post('/api', pong_routes.index);
  app.get('/api/players', api_routes.players);
  app.get('/api/players/:id', api_routes.player);
  app.get('/api/challenges', api_routes.challenges);
  app.get('/api/challenges/:id', api_routes.challenge);

  return app;
};

