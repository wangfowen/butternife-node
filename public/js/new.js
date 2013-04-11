$(function() {
  $('#party-tooltip').tooltip({
    title: "One person plays the music, everyone adds songs"
  });

  $('#shared-tooltip').tooltip({
    title: "Everyone plays and adds songs"
  });

  var user;
  $.get("/user", {}, function(data) {
    user = data;
    console.log(user);
  });
  
  /*
  $.ajax({
    dataType:'jsonp',
    jsonp:'callback',
    url:'http://192.168.31.24:8000/user?callback=?',
    success: function(data) {
      user = data;
      console.log("user: " + user);
    }
  });
  */

  $('#join-submit').click(function(e) {
    e.stopPropagation();
    e.preventDefault();

    var joinName = $('#join-name').val(),
      mode = $('input[name=music-mode]:checked').val();

    $.post("/butternife/" + joinName + "/user", {
        user: user,
        mode: mode
      },
      function() {
          $.cookie('butternife', JSON.stringify(user), {path: '/'});
          window.location.href = "/" + joinName;
      }
    ).fail(function() {
      console.log("Error");
    });

  /*
    $.ajax({
      dataType:'jsonp',
      jsonp:'callback',
      data: {user: user.id, mode: mode},
      url:'http://192.168.31.24:8000/butternife/' + joinName + '/user?callback=?',
      success: function(data) {
        //store data in cookie
        window.location.href = "/butternife/" + joinName;
      }
    });
  */
    //window.location.href = "/" + joinName;
  });
});
