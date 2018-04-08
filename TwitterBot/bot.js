const twit = require('twit');
const config = require('./config.js');

const Twitter = new twit(config);

const retweet = function() {
  const params = {
    q: '#js, #javascript',
    result_type: 'recent',
    lang: 'en'
  }

  Twitter.get('search/tweets', params, function(err, data) {
    // if there no errors
    if (!err) {
      // grab ID of tweet to retweet
      var retweetId = data.statuses[0].id_str;
      // Tell TWITTER to retweet
      Twitter.post('statuses/retweet/:id', {
        id: retweetId
      }, function(err, response) {
        if (response) {
          console.log('Retweeted!!!');
        }
        // if there was an error while tweeting
        if (err) {
          console.log('Something went wrong while RETWEETING... Duplication maybe...');
        }
      });
    }
    // if unable to Search a tweet
    else {
      console.log('Something went wrong while SEARCHING...');
    }
  });
}

retweet();

setInterval(retweet, 300000)

// function to generate a random tweet tweet
function generateRandom (arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

const favourite = function() {
  const params = {
    q: '#js, #javascript',
    result_type: 'recent',
    lang: 'en'
  }

  Twitter.get('search/tweets', params, function(err, data) {

    // find tweets
    var tweet = data.statuses;
    var randomTweet = generateRandom(tweet); // pick a random tweet
    // if random tweet exists
    if (typeof randomTweet != 'undefined') {
      // Tell TWITTER to 'favorite'
      Twitter.post('favorites/create', { id: randomTweet.id_str }, function(err, response) {
        // if there was an error while 'favorite'
        if (err) {
          console.log('CANNOT BE FAVORITE... Error');
        } else {
          console.log('FAVORITED... Success!!!');
        }
      });
    }
  });
}

favourite();

setInterval(favourite, 300000);