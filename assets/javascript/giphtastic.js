$(document).ready(function(){

// Default topic array
 var subject = ["Spaceballs", "The Matrix", "Fifth Element", "Jason Bourne", "Full Metal Jacket", "Independence Day", "Mel Brooks"];

// Create buttons for default subjects
function buttonCreate(){
    $('#button-panel').empty();
    
    for ( var i=0; i < subject.length; i++) {

        var a = $('<button>');
        a.addClass('buttonClick btn btn-primary btn-lg');
        a.attr('data-name', subject[i]);
        a.text(subject[i]);
        $('#button-panel').append(a);
    }
}    
buttonCreate();



$(document).on('click', '.buttonClick', function() {

var buttonSubject = $(this).html(); 
console.log(buttonSubject);

// Ajax and API call(s)
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonSubject + "&api_key=QKBZvWiPgbaEHCWME3tpqkV5lzihvNhn&limit=10";
    // console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        var results = response.data;
        $('#giph-panel').empty();
            // For Loop(ing) through results
            for ( var j=0; j < results.length; j++) {
                var giphyDiv = $('<div>');
                var giphyURL = results[j].images.fixed_height.url;
                var still = results[j].images.fixed_height_still.url;
                    // console.log(giphyURL);  
                var imageSubject = $('<img>').attr("src", still).attr('data-animate', giphyURL).attr('data-still', still);
                imageSubject.attr('data-state', 'still');
                $('#giph-panel').prepend(imageSubject);
                imageSubject.on('click', stateClick);
                
                // Rating logic (to do: limiting to SFW?)
                    var rating = results[j].rating.toUpperCase();
                        // console.log(rating);
                    var showRating= $('<p>').text("Rating: " + rating);
                    $('#giph-panel').prepend(showRating);
        
            }
    });

    // Button click function (still <-> animated)
    function stateClick() { 
                var state = $(this).attr('data-state');
                // console.log(state);
             if ( state == 'still'){
                 $(this).attr('src', $(this).data('animate'));
                  $(this).attr('data-state', 'animate');
             } else{
                 $(this).attr('src', $(this).data('still'));
                 $(this).attr('data-state', 'still');
                }

            }
            
})

   


// Adding new button(s)
$(document).on('click', '#addSubject', function(){
if ($('#subject-input').val().trim() == ''){
  alert('Please enter something first!');
}
else {
var buttonSubject = $('#subject-input').val().trim();
subject.push(buttonSubject);
$('#subject-input').val('');
buttonCreate();
return false;

}

});

});