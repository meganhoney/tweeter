/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const createTweetElement = function(tweet) {
    // html markup for tweet
    let $tweet = `
    <article class="ind-tweet">
          <header>
            <div class="avi-name">
              <img src="${tweet.user.avatars}"/>
              <p>${tweet.user.name}</p>
            </div>
            <p class="handle">${tweet.user.handle}</p>
          </header>
          <div class="ind-tweet-text">
            <p>${(tweet.content.text)}</p>
          </div>
          <footer>
            <p>${(tweet.created_at)}</p>
            <div>
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>
    `
    return $tweet;
  };

  const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  const $tweets = $(`#tweets-container`).empty();
  for (let key of Object.keys(tweets)) {
    $(createTweetElement(tweets[key])).appendTo($tweets);
  }
  };


  // Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

renderTweets(data);

});