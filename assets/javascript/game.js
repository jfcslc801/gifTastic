var topics = ["The Little Mermaid", "Beauty and the Beast", "Aladdin", "Tangled", "Pocahontas", "Snow White", "Pinocchio", "Dumbo ", "Bambi", "Cinderella", "Peter Pan", "Alice in Wonderland","Sleeping Beauy", "The Jungle Book"];

$(function () {
    populateButtons(topics, 'searchButton', '#buttonsArea');
})

function populateButtons(topics, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $('<button>');
        a.addClass(classToAdd);
        a.attr('data-type', topics[i]);
        a.text(topics[i]);
        $(areaToAddTo).append(a);
    }
}

$(document).on('click', '.searchButton', function () {
    $('#searches').empty();
    var type = $(this).data('type');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        type + "&api_key=W0R1kQZTbvtUYYhybCKuin2QvCxLFrip&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .done(function (response) {
            for (var i = 0; i < response.data.length; i++) {

                var searchDiv = $('<div class="search-item">');
                var rating = response.data[i].rating;
                var p = $('<p>').text('Rating: ' + rating);
                var animated = response.data[i].images.fixed_height.url;
                var still = response.data[i].images.fixed_height_still.url;
                var image = $('<img>');
                image.attr('src', still);
                image.attr('data-still', still);
                image.attr('data-animated', animated);
                image.attr('data-state', 'still');
                image.addClass('searchImage');
                // searchDiv.append(p);
                searchDiv.append(image,p);
                $('#searches').append(searchDiv);


            }

        })
})

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

