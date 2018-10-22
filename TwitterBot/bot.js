// Dependencies =========================
const twit = require("twit"),
  config = require("./config"),
  Twitter = new twit(config),
  paramText = ["#put", "#your", "#tags", "#here"];

// function to choose a random entry from the list of tags
const randomParam = arr => {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};
//function to generate a random number fro a given range
const randomFromRange = (from, to) => {
  const min = from;
  const max = to;
  const random = Math.floor(Math.random() * (+max - +min) + +min);
  return random;
};
//array to the tweeted tweets to check for duplicates
var tweetsArr = [];
//function to check if the tweet is unique or a Retweet
const checkUnique = tweetText => {
  if (tweetsArr.includes(tweetText) || tweetText.includes("RT")) {
    return false;
  } else {
    return true;
  }
};

/*
above function can also be written as

const checkUnique = tweetText => return tweetsArr.includes(tweetText) || tweetText.includes("RT");

*/

// RETWEET BOT ==========================
const retweet = function() {
  const params = {
    q: randomParam(paramText),
    result_type: "mixed",
    lang: "en",
    count: randomFromRange(20, 100)
  };

  /* 
    RATE LIMITS OF 'GET' REQUESTS
    here: search/tweets is a GET request  
    180 & 450 requests for userAuth and appAuth respectively(for every window of 15 mins)

    Refer https://developer.twitter.com/en/docs/basics/rate-limits for latest data
  */
  Twitter.get("search/tweets", params, function(err, data) {
    console.log(
      "============================================================================="
    );
    console.log("************     START     ************");
    if (!err) {
      console.log(
        "Search success -----",
        data.statuses.length,
        "-----",
        params.q
      );

      data.statuses.map((randomTweet, index) => {
        const uniqChk = checkUnique(randomTweet.text.slice(0, 50));
        //below conditions can be modified as per requirements
        if (
          (randomTweet.retweet_count > 15 || randomTweet.favorite_count > 15) &&
          uniqChk
        ) {
          tweetsArr.push(randomTweet.text.slice(0, 50));
          /* 
            RATE LIMITS OF 'POST' REQUESTS
            here: statuses/retweet is a POST request  
            Refer https://help.twitter.com/en/rules-and-policies/twitter-limits
          */
          // Tell TWITTER to retweet
          Twitter.post(
            "statuses/retweet/:id",
            { id: randomTweet.id_str },
            function(err, response) {
              if (response) {
                console.log("Retweet success 🎉🎉🎉🎉🎉");
              } else {
                console.log("Retweet failure -----", err);
              }
            }
          );
        }
      });
    } else {
      console.log("Search failure -----", err);
    }
    console.log("************     END     ************");
    console.log(
      "============================================================================="
    );
  });
};
retweet();
setInterval(retweet, randomFromRange(5000, 50000));
