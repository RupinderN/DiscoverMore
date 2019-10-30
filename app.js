// ==============
// REQUIRE ROUTES
// ==============


const express = require('express'),
	  app = express(),
	  http = require("http"),
	  request = require('request'),
	  methodOverride = require('method-override'),
	  SpotifyWebApi = require("spotify-web-api-node"),
	  bodyParser = require("body-parser");

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));



// ==============
// CONFIGURATION
// ==============



var spotifyApi = new SpotifyWebApi({
	scopes: ['user-read-private', 'user-read-email', 'user-top-read' , 'user-follow-modify', 'user-follow-read'],
	redirectUri: 'https://webprojects-rqwyg.run.goorm.io/callback/',
	clientSecret: 'secret',
	clientId: 'id',
	state: "rupindern"
});


// Create the authorization URL
var authorizeURL = spotifyApi.createAuthorizeURL(spotifyApi._credentials.scopes, spotifyApi._credentials.state);



// ==========
// FUNCTIONS 
// ==========


async function getRelated(ids) {
	
	var promiseArray = [];
	
	for(var i = 0; i < ids.length; i++) {
		promiseArray.push(new Promise((resolve, reject) => {
			spotifyApi.getArtistRelatedArtists(ids[i])
			.then(function(data) {
				resolve(data);
			}, function(err) {
				done(err);
			});
		}));
	}
	
	await Promise.all(promiseArray).then(result => {
		// console.log(result);
	})
	
    return Promise.all(promiseArray);
}


async function getFollowing() {
	
	
	var options = {
		url: 'https://api.spotify.com/v1/me/following?type=artist',
		headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'Authorization': 'Bearer ' + spotifyApi._credentials.accessToken
		},
	};
	
	var followingList = [];
	
	
	followingList.push(new Promise((resolve, reject) => {
		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				data = JSON.parse(body);
				resolve(data.artists.items);
			} else {
				console.log(error, response.statusCode);
			}
		});
	}));
	
    await Promise.all(followingList);
    return Promise.all(followingList);
	
}



// =======
// ROUTES
// =======



app.get('/', function(req, res){
	res.render('home');
})

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
	spotifyApi.getMe().then(function(data) {
		const options = {
		  url: 'https://api.spotify.com/v1/me/top/artists?limit=5',
		  headers: { Authorization: 'Bearer ' + spotifyApi._credentials.accessToken }
		};

		async function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
				var data = JSON.parse(body);
				var ids = [];

				data.items.forEach(function(artists) {
					ids.push(artists.id);
				});

				let artistsRelated = await getRelated(ids);
				
				let dataFollowing = await getFollowing();

				res.render('index', { artistsFavourite : data, artistsRelated : artistsRelated, dataFollowing: dataFollowing });
			}
		}

		request(options, callback);
	}, function(err) {
		res.redirect("/login");
	});
});

app.post("/main", function(req, res) {
	
	var artist = req.body.artistId.slice(0, req.body.artistId.length - 1);
	var type = req.body.artistId.slice(req.body.artistId.length - 1);
	
	if(type == "P") {
	
		var options = {
			url: 'https://api.spotify.com/v1/me/following?type=artist&ids=' + artist,
			headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + spotifyApi._credentials.accessToken
			},
		};

		function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log(body);
			} else {
				console.log(error, response.statusCode);
			}
		}

		request.put(options, callback);
		
	} else {
		
		var options = {
			url: 'https://api.spotify.com/v1/me/following?type=artist&ids=' + artist,
			headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + spotifyApi._credentials.accessToken
			},
		};

		function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log(body);
			} else {
				console.log(error, response.statusCode);
			}
		}

		request.delete(options, callback);
		
	}
	
	res.redirect('/main');

});



app.get('/info', function(req, res){
	res.render('info');
});


app.get('/:id', function(req, res){
	res.render('error');
});


// ==============
// SERVER STARTUP
// ==============



app.listen(3000, (req, res) => {
	console.log("Server has started!");
});

