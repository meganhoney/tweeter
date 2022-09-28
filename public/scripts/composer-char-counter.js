// Character counter for tweet form input
// Counts characters as they are type into form input via keyup
// Adjusts text display via counter id to show characters remaining/characters over
$(document).ready(function() {
  $("#tweet-text").on("keyup", function(event) {
    
    $text = $(this).val();
    $charsLeft = 140 - $text.length;
    
    $counter = $(this).closest("form").find(".counter")
    $counter.text($charsLeft);

    if ($charsLeft < 0) {
      $counter.addClass("over-limit");
    } else {
      $counter.removeClass("over-limit");
    }

  });
});