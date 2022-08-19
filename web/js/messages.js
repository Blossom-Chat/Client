function messages(room) {
    $('.chat-feed').html('')
    $.get('http://173.94.229.0/Blossom%20Back%20End/messages/getMessages.php', {
        user: localStorage.getItem('user'),
        pass: localStorage.getItem('pass'),
        room: room
    }, function (data) {
        const messages = []
        for (const message in data.messages) {
            const date = new Date(data.messages[message].timestamp * 1000)
            var timeformat = date.getHours() < 13 ? `${date.getHours()}:${date.getMinutes()}` : `${date.getHours() - 12}:${date.getMinutes()}`
            var ToD = date.getHours() < 12 ? 'AM' : 'PM'
            messages.push(`
                <div class="feed-message" message="">
                    <div class="message-column-side">
                        <img class="message-profile-picture" src="${data.messages[message].avatar}" alt=" ">
                    </div>
                    <div class="message-column-main">
                        <div class="message-username">
                            <h4>${data.messages[message].user}</h4><h5>${timeformat}</h5><h6>${ToD}</h6>
                        </div>
                        <div class="message-content">
                            <p>${data.messages[message].content}</p>
                        </div>
                    </div>
                </div>
            `)
            console.log(messages[message])
        }

        $('.chat-feed').html(`<!---->${messages.join('<!---->')}<!---->`)
    })
}

function send() {
    if (!$('.chat-send').hasClass('valid')) return
    const message = $('.chat-input').html()
    const room = $('.selected').attr('room')
    $('.chat-input').html('')
    $('.chat-send').removeClass('valid')
    $.post('http://173.94.229.0/Blossom%20Back%20End/messages/sendMessage.php', {
        user: localStorage.getItem('user'),
        pass: localStorage.getItem('pass'),
        room: room,
        content: message
    }, function (data) {
        console.log(data)
    }).done(function () {
        messages(room)
    })
}