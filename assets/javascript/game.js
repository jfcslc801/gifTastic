//VAR topics used to store strings search topics.........................................................................
var topics = ["The Little Mermaid", "Beauty and the Beast", "Aladdin", "Tangled", "Pocahontas", "Snow White", "Pinocchio", "Dumbo ", "Bambi", "Cinderella", "Peter Pan", "Alice in Wonderland","Sleeping Beauy", "The Jungle Book"];


//jquery function runs upon page loading
//search array 'topics', 
//adds class 'searchButton' to every button, 
//ID '#buttonsArea' where buttons will generate on html.
$(function () {
    populateButtons(topics, 'searchButton', '#buttonsArea');
})

//...............................................
//Function Populates '#buttonsArea' in html with buttons...
function populateButtons(topics, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();                                  //clears button area to avoid adding duplicates
    for (var i = 0; i < topics.length; i++) {
        var btn = $('<button>');
        btn.addClass(classToAdd);
        btn.attr('data-type', topics[i]);
        btn.text(topics[i]);
        $(areaToAddTo).append(btn);
    }
}

// ......................................................
//  reference data-type using jquery
//
$(document).on('click', '.searchButton', function () {
    $('#searches').empty();
    var type = $(this).data('type');
    //API KEY
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        type + "&api_key=W0R1kQZTbvtUYYhybCKuin2QvCxLFrip&limit=10";

    //API call
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .done(function (response) {

            //for loop generating
            for (var i = 0; i < response.data.length; i++) {
               
                // local variables
                var searchDiv = $('<div class="search-item">');
                var rating = response.data[i].rating;
                var p = $('<p>').text('Rating: ' + rating);
                var image = $('<img>');
                var animated = response.data[i].images.fixed_height.url;
                var still = response.data[i].images.fixed_height_still.url;
                // adding attributes to the image
                image.attr('src', still);
                image.attr('data-still', still);
                image.attr('data-animated', animated);
                image.attr('data-state', 'still');
                // adding class to image
                image.addClass('searchImage');
                // appending image with classes, attr to searchDiv
                searchDiv.append(image,p);
                //linking searchDiv  html page
                $('#searches').append(searchDiv);
            }

        })
})

//onclick to aniname image from still to animated
$(document).on('click', '.searchImage', function () {
    var state = $(this).attr('data-state');
    if (state === 'still') {
        $(this).attr('src', $(this).data('animated'));
        $(this).attr('data-state', 'animated')
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still')
    }
})

//on click function
//links to html form via addSearch
//var newSearch given a value
//pushed out newSearch to topics array
//populates new buttons to array, .searchButton, #buttonsArea in html
//returns false =prevents page from reloading
$('#addSearch').on('click', function () {
    var newSearch = $('input').eq(0).val();
    topics.push(newSearch);
    populateButtons(topics, 'searchButton', '#buttonsArea');
    return false;
})

