function rooms() {
    $.get('http://173.94.229.0/Blossom%20Back%20End/rooms/getRooms.php', {
        user: localStorage.getItem('user'),
        pass: localStorage.getItem('pass')
    }, function (data) {
        const rooms = []
        for (const room in data.rooms) {
            data.rooms[room].lastmessage == null ? data.rooms[room].lastmessage = 'No messages' : ''
            rooms.push(`
                <div onclick="select(${data.rooms[room].id}, this)" room="${data.rooms[room].id}" class="room">
                    <div class="room-icon">
                        <img src="${data.rooms[room].icon}" alt="">
                    </div>
                    <div>
                        <span class="room-name">${twemoji.parse(data.rooms[room].name)}</span>
                        <span class="room-last-sent">${twemoji.parse(data.rooms[room].lastmessage)}</span>
                    </div>
                </div>
            `)
        }

        $('.room-bar').html(`<!---->${rooms.join('<!---->')}<!---->`)
    })
}

function select(id, elem) {
    if ($(elem).hasClass('selected')) return
    $('.room').removeClass('selected')
    $(elem).addClass('selected')
    $('.chat-feed').html('<div class="loading">Loading Messages</div>')
    $('.user-bar').html('<div class="loading">Loading Users</div>')
    messages(id)
    users(id)
}