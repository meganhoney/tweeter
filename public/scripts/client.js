/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  $(".new-tweet form").submit((event)=> {
    event.preventDefault();

    $(`#error-message`).empty();

    const $data = $("#tweet-text");

    if (!$data.val()) {

      const $emptyMsgHTML = 
      `<div class="error">
      <i class="fa-solid fa-circle-exclamation"></i>
      <span>Please input a valid tweet.</span>
      <i class="fa-solid fa-circle-exclamation"></i>
      </div>`;

      $("#error-message").append($emptyMsgHTML);
      $("#error-message").slideDown();
      
    } else if ($data.val().length > 140) {
      const $longMsgHTML = 
      `<div class="error">
      <i class="fa-solid fa-circle-exclamation"></i>
      <span>Please keep your tweet to under 140 characters.</span>
      <i class="fa-solid fa-circle-exclamation"></i>
      </div>`;
      
      $("#error-message").append($longMsgHTML);
      $("#error-message").slideDown();

    } else {
      $data.serialize();
      $.ajax("/tweets/", {
        method: "POST",
        data: $data
      })
        .then(() => {
        $("#tweet-text").val('');
        loadTweets();
      });
    }
    
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

// escape function to escape unsafe characters from user input (tweet text)
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

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
            <p>${escape(tweet.content.text)}</p>
          </div>
          <footer>
            <p>${timeago.format(tweet.created_at)}</p>
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
    $(createTweetElement(tweets[key])).prependTo($tweets);
  }
  };


  // Test / driver code (temporary). Eventually will get this from the server.

//renderTweets(data);

});