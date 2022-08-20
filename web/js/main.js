

setInterval(function () {
    var room = $('.selected').attr('room')
    if (room == undefined) $('.chat-input-frame').hide()
    else $('.chat-input-frame').show()
    messages(room)
    users(room)
}, 2000)