// Dependencies =========================
const
  twit = require('twit'),
  config = require('./config'),
  Twitter = new twit(config),
  paramText = ['parameters', 'of', 'your', 'choice'];

// function to generate a random tweet 
function randomParam(arr) {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

  const params = {
    q: randomParam(paramText),
    result_type: 'recent',
    lang: 'en'
  };

// RETWEET BOT ==========================
const retweet = function() {
  params.q = randomParam(paramText);
  Twitter.get('search/tweets', params, function(err, data) {
    // if there no errors
    if (!err) {
      // data.statuses.map(newData => console.log(newData));
      // grab ID of tweet to retweet
      const tweet = data.statuses;
      const randomTweet = randomParam(tweet);
      // Tell TWITTER to retweet
      Twitter.post('statuses/retweet/:id', { id: randomTweet.id_str }, function(err, response) {
        if (response) {
          console.log('Retweet success -----', params.q, '-----', randomTweet.text.slice(0, 50));
        } else {
          console.log('Retweet failure');
        }
      });
    } else {
      console.log('Something went wrong while SEARCHING...');
    }
  });
}
retweet();
setInterval(retweet, 300000);