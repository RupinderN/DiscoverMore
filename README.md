# Discover More

View the project [here](https://github.com/RupinderN/DiscoverMore)!

This web application displays artist recommendations based on the artists you've listened to the most on Spotify in the past 6 months. It then gives you the ability to follow or unfollow the artists on Spotify, view their popularity alongside other artists, and also links you to their Spotify pages.

# Motivation

The Spotify API is an extremely well-written and versatile API rich with different possibilities, and I thought it would be interesting to be able to see what I could achieve with it. Although Spotify already shows you all these related artists in their app, the app's visual design and functionality of seeing an artists popularity makes you more likely to scroll and click on an artist you're interested in. It also makes you more likely to click on the artists with a low popularity rating, due to seeing them alongside the artists you've most likely heard of or listen to. The application also identifies your favourite artists for you and only chooses recommendations based on those artists.

# Project Screenshots

![Home Page](https://github.com/RupinderN/DiscoverMore/blob/master/public/assets/home.PNG)

Top of Main Page:

![Main Page Top](https://github.com/RupinderN/DiscoverMore/blob/master/public/assets/main1.PNG)

Other Artists on Main Page:

![Main Page Continued](https://github.com/RupinderN/DiscoverMore/blob/master/public/assets/main2.PNG)


# Installation and Setup Instructions

Clone down this repository. You will need ```node``` and ```npm``` installed globally on your machine.

```clientId``` and ```clientSecret``` variables must be obtained from creating an account with the [Spotify API](https://developer.spotify.com).

Installation:

```npm install```

Open http://localhost:3000 to view it in the browser.


# Built With

* [Node.js](https://nodejs.org/en/) - Runtime Environment used
* [Express.js](https://expressjs.com/) - Back-end framework
* [Bootstrap](https://getbootstrap.com/) - Front-end framework
* [spotify-web-api-node](https://github.com/thelinmichael/spotify-web-api-node) - Wrapper for Spotify Web API
* [EJS](https://ejs.co/) - used to generate HTML markup with plain JavaScript




