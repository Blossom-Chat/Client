function users(room) {
    $('.user-bar').html('')
    $.get('http://173.94.229.0/Blossom%20Back%20End/users/getUsers.php', {
        user: localStorage.getItem('user'),
        pass: localStorage.getItem('pass'),
        room: room
    }, function (data) {
        const users = []
        for (const user in data.users) {
            switch (data.users[user].status) {
                case '0':
                    data.users[user].status = 'offline'
                    break
                case '1':
                    data.users[user].status = 'online'
                    break
                case '2':
                    data.users[user].status = 'idle'
                    break
                case '3':
                    data.users[user].status = 'do-not-disturb'
                    break
                default:
                    data.users[user].status = 'offline'
                    break
            }
            users.push(`
                <div class="${data.users[user].status}">
                    <div class="user-profile-picture">
                        <img src="${data.users[user].avatar}" alt=" ">
                    </div>
                    <div>
                        <span class="user-username">${data.users[user].user}</span>
                        <span class="user-status"></span>
                    </div>
                </div>
            `)
        }

        $('.user-bar').html(`<!---->${users.join('<!---->')}<!---->`)
    })
}