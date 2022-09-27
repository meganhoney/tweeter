/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $(".new-tweet form").submit((event)=> {
    event.preventDefault();

    const $data = $("#tweet-text");
    $data.serialize();
    $.ajax("/tweets/", {
      method: "POST",
      data: $data
    })
    console.log($data);
  });

  const loadTweets = function() {
    $.ajax("/tweets/", {
      method: "GET"
    })
    .then((response) => {
      renderTweets(response);
    })
  }

  loadTweets();

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
  const $tweets = $("#tweets-container").empty();
  for (let key of Object.keys(tweets)) {
    $(createTweetElement(tweets[key])).appendTo($tweets);
  }
  };


  // Test / driver code (temporary). Eventually will get this from the server.

//renderTweets(data);

});