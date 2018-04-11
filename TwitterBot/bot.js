const
  twit = require('twit'),
  config = require('./config'),
  Twitter = new twit(config),
  paramText = ['Include', 'multiple', 'parameters', 'seperated', 'by', 'comma'];

// function to generate a random tweet 
function ranDom(arr) {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

const params = {
    q: ranDom(paramText),
    result_type: 'recent',
    lang: 'en'
  }
// RETWEET BOT ==========================

// find latest tweet according the query 'q' in params
const retweet = function() {
  params.q = randomParam(paramText);
  Twitter.get('search/tweets', params, function(err, data) {

    if (!err) {

      const tweet = data.statuses;
      const randomTweet = ranDom(tweet);
      // Tell TWITTER to retweet
      Twitter.post('statuses/retweet/:id', { id: randomTweet.id_str }, function(err, response) {
        if (response) {
          console.log('Retweet success');
        } else {
          console.log('Retweet failure');
        }
      });
    } else {
      console.log('Something went wrong while SEARCHING...');
    }
  });
}

// grab & retweet as soon as program is running...
retweet();

setInterval(retweet, 30000);