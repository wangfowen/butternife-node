$(function() {
  var rerenderPlaylist = function() {
    document.getElementById('gallery').innerHTML = gallery.render(playlist);
    document.getElementById('player').innerHTML = player.render(playlist);
  };

  //TODO: replace this with an API call to fetch songs
  var playlist = {
          currentSong: 0,
          songs: [
            {
              image: '/img/young-the-giant.jpeg',
              name: 'Cough Syrup',
              imageist: 'Young the Giant'
            },
            {
              image: '/img/all-american.jpeg',
              name: 'No Interruption',
              imageist: 'Hoodie Allen'
            },
            {
              image: '/img/southern-air.jpg',
              name: 'Awakening',
              imageist: 'Yellowcard'
            },
            {
              image: '/img/viva-la-vida.jpg',
              name: 'Viva La Vida',
              artist: 'Coldplay'
            }
          ],
          nextSong: function(currSong) {
            return (currSong + 1) % playlist.songs.length;
          },
          prevSong: function(currSong) {
            return currSong - 1 >= 0 ? currSong - 1 : playlist.songs.length - 1;
          }
        };

  /* GALLERY */
  var gallery = new EJS({url: '/js/template/gallery.ejs'});
      player = new EJS({url: '/js/template/player.ejs'});
  rerenderPlaylist();

  /* SEARCH */
    var cookie = JSON.parse($.cookie('butternife'));
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

    /* PLAYER */
    $('#close-results').click(function(e) {
        $results.animate({top: resultsBot});
    });

    var $toggle = $('#toggle'),
        $play = $('#play'),
        $pause = $('#pause'),
        $next = $('#next'),
        $prev = $('#prev');

    $toggle.click(function(e) {
        $play.toggleClass('selected');
        $pause.toggleClass('selected');
    });

    $next.click(function(e) {
      playlist.currentSong = playlist.nextSong(playlist.currentSong);
      //TODO: fix rerendering so it doesn't lose event listeners
      rerenderPlaylist();
      //TODO: make API call
    });

    $prev.click(function(e) {
      playlist.currentSong = playlist.prevSong(playlist.currentSong);
      rerenderPlaylist();
      //TODO: make API call
    });

});
