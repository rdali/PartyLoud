$(function() {
    var socket = io();
    var roomid = getParameterByName("id")

    $("#partyId").text(roomid);

    socket.on('audio message ' + roomid,
        function(msg) {
          if(msg.command == "play"){
            play();
          }
        });
});

var play = function() {
    var audio = document.getElementById("audio")
    audio.play()
}
var pause = function() {
    var audio = document.getElementById("audio")
    audio.pause()
}

var setFullVolume = function() {
    audio.volume = 1.0;
}
//Thank you https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript/901144
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}