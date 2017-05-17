# twitterStreamerMeteor

# Nicbuitr:
- This app uses Meteor + React + D3 + Canvas + Bootstrap
- Connects to Twitter API to retrieve tweets that contain the query typed
- Uses bootstrap features to improve the look & feel
- Front End integrates correctly with Back End
- Filtered responses to only retrieve the ones with coordinates
- ** Creativity Addons: **
  - ** Added a counter to know how many dots have been plotted around the world since not all are plotted at Colombia**
  - ** Added responsiveness as much as possible with help of bootstrap to improve UI friendliness to users of multiple viewport devices.**
  - ** Attempted to achieve zoom of the plotted dots but still nothing, to make it work I have to store them in an array and redraw when zoom as Mike Bostock does at https://bl.ocks.org/mbostock/3680958.**
- Extra Work: Implemented scalable and dynamic code to avoid redundant code in an effort to make the app as lightweight as possible and also to make it much more understandable and easy to interpret for both developers and browsers.
- The app is deployed at: https://nicbuitr-twitterapp.herokuapp.com/

A simple boilerplate for a Meteor 1.4 Twitter streamer application with React. Uses the twitter [npm](https://www.npmjs.com/package/twitter) module for connecting to twitter. It requires you to setup your credentials on the server using environment variables:

```
export TWITTER_CONSUMER_KEY="yourCredentialsHere"
export TWITTER_CONSUMER_SECRET="yourCredentialsHere"
export TWITTER_ACCESS_TOKEN_KEY="yourCredentialsHere"
export TWITTER_ACCESS_TOKEN_SECRET="yourCredentialsHere"

meteor npm install
meteor
```

This is a very basic implementation that handles a global search shared by all users and doesn't implement any security or restriction. It's intended as a starting point, so add your own requirements.
