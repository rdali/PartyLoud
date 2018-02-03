$(function () {
    var socket = io();
    $('form').submit(function(){
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });
    socket.on('chat message', function(msg){
      $('#messages').append($('<li>').text(msg));
    });
  });

var audio = document.getElementById("audio")
var play = function() {
    audio.play()
}
var pause = function() {
    audio.pause()
}

function getVolume() {
    alert(audio.volume);
}
var volumeUp = function() {
    audio.volume
}
var setFullVolume = function() {
    audio.volume = 1.0;
}