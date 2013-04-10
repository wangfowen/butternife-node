$(function() {
    var $searchContainer = $('#search'),
        $searchSlide = $('#search-slide'),
        $searchBar = $('#search-bar'),
        $results = $('#results'),
        barWidth = -$searchBar.outerWidth(),
        resultsTop = $searchBar.outerHeight(),
        resultsBot = -($results.outerHeight() + 10);

    $searchSlide.css("left", barWidth);
    $results.css("top", resultsBot);

    $searchContainer.hover(function(e) {
        $searchSlide.stop().animate({left: 0});
    }, function(e) {
        if ($searchBar.is(":focus") || $results.css("top") === resultsTop + "px") {
            return;
        } else {
            $searchSlide.stop().animate({left: barWidth});
        }
    });

    $('#search-button').click(function(e) {
        e.preventDefault();
        e.stopPropagation();

        if ($searchBar.val() !== "") {
            $results.animate({top: resultsTop});
        }
    });

    $('#close-results').click(function(e) {
        $results.animate({top: resultsBot});
    });

    var $toggle = $('#toggle'),
        $play = $('#play'),
        $pause = $('#pause');

    $toggle.click(function(e) {
        $play.toggleClass('selected');
        $pause.toggleClass('selected');
    });
});
