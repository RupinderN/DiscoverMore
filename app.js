// ==============
// REQUIRE ROUTES
// ==============
const express = require('express'),
	  app = express(),
	  http = require("http"),
	  SpotifyWebApi = require("spotify-web-api-node");

app.set('view engine', 'ejs');

// ==============
// CONFIGURATION
// ==============
var spotifyApi = new SpotifyWebApi({
	scopes: ['user-read-private', 'user-read-email'],
	redirectUri: 'https://webprojects-rqwyg.run.goorm.io/callback/',
	clientSecret: 'CLIENT_SECRET',
	clientId: 'CLIENT_ID',
	state: "STATE"
});


// Create the authorization URL
var authorizeURL = spotifyApi.createAuthorizeURL(spotifyApi._credentials.scopes, spotifyApi._credentials.state);

// =======
// ROUTES
// =======
app.get('/login', function(req, res){
	res.redirect(authorizeURL);
});

app.get('/callback', function(req, res) {
	var code = req.query.code;
	
	spotifyApi.authorizationCodeGrant(code).then(function(data) {
		// Set the access token on the API object to use it in later calls
		spotifyApi.setAccessToken(data.body['access_token']);
		spotifyApi.setRefreshToken(data.body['refresh_token']);
		res.redirect('/main');
	}, function(err) {
		console.log('Something went wrong!', err);
	});
});

app.get('/main', function(req, res) {
	spotifyApi.getArtistRelatedArtists('7rkW85dBwwrJtlHRDkJDAC').then(function(data) {
		console.log(data.body.artists);
	}, function(err) {
		done(err);
	});
});


app.listen(3000, (req, res) => {
	console.log("Server is Running...");
});