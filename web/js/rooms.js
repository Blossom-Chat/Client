function rooms() {
    $('.room-bar').html('')
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
                        <span class="room-name">${data.rooms[room].name}</span>
                        <span class="room-last-sent">${data.rooms[room].lastmessage}</span>
                    </div>
                </div>
            `)
        }

        $('.room-bar').html(`<!---->${rooms.join('<!---->')}<!---->`)
    })
}

function select(id, elem) {
    $('.room').removeClass('selected')
    $(elem).addClass('selected')
    messages(id)
    users(id)
}