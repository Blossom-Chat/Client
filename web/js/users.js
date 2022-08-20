function users(room) {
    $.get('http://173.94.229.0/Blossom%20Back%20End/users/getUsers.php', {
        user: localStorage.getItem('user'),
        pass: localStorage.getItem('pass'),
        room: room
    }, function (data) {
        if (data.reason == 'Invalid room') rooms()
        else {
            const users = []
            for (const user in data.users) {
                switch (data.users[user].status) {
                    default:
                        data.users[user].status = 'online'
                        break
                    case '2':
                        data.users[user].status = 'idle'
                        break
                    case '3':
                        data.users[user].status = 'do-not-disturb'
                        break
                }
                users.push(`
                    <div class="${data.users[user].status}">
                        <div class="user-profile-picture">
                            <img src="${data.users[user].avatar}" alt=" ">
                        </div>
                        <div>
                            <span class="user-username">${twemoji.parse(data.users[user].user)}</span>
                            <span class="user-status"></span>
                        </div>
                    </div>
                `)
            }

            $('.user-bar').html(`<!---->${users.join('<!---->')}<!---->`)
        }
    })
}