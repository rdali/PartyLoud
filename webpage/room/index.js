$(function() {
    var socket = io();
    var roomid = getParameterByName("id")

    $("#partyId").text(roomid);

    socket.on('audio message ' + roomid,
        function(msg) {
            if (msg.command == "play") {
                play();
            } else if (msg.command == "pause") {
                pause();
            } else if (msg.command == "reset") {
                reset();
            }
        });
});

//needs the body to load to select use document.querySelector
$(document).ready(
    function() {
        var copyTextareaBtn = document.querySelector('.js-textareacopybtn');

        copyTextareaBtn.addEventListener('click', function(event) {
            var copyTextarea = document.querySelector('.js-copytextarea');
            copyTextarea.select();

            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                console.log('Copying text command was ' + msg);
            } catch (err) {
                console.log('Oops, unable to copy');
            }
        });
    }
);

var play = function() {
    var audio = document.getElementById("audio")
    audio.play()
}
var pause = function() {
    var audio = document.getElementById("audio")
    audio.pause()
}

var reset = function() {
    var audio = document.getElementById("audio")
    audio.currentTime = 0
    audio.play();
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