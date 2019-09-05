// ==============
// REQUIRE ROUTES
// ==============
const express = require('express'),
	  app = express(),
	  request = require("request"),
	  mongoose = require('mongoose'),
	  bodyParser = require('body-parser'),
	  imdb = require('imdb'),
	  rp = require('request-promise');

