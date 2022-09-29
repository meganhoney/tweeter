// Character counter for tweet form input
// Counts characters as they are type into form input via keyup
// Adjusts text display via counter id to show characters remaining/characters over
$(document).ready(function() {
  $("#tweet-text").on("keyup", function(event) {
    
    const $text = $(this).val();
    const $charsLeft = 140 - $text.length;
    
    const $counter = $("#counter");
    $counter.text($charsLeft);

    if ($charsLeft < 0) {
      $counter.addClass("over-limit");
    } else {
      $counter.removeClass("over-limit");
    }

  });
});