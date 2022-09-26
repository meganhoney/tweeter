$(document).ready(function() {
  $("#tweet-text").on( "keyup", function(event) {
    
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