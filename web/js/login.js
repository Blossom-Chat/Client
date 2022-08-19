$.get('http://173.94.229.0/Blossom%20Back%20End/users/login.php', {
    user: localStorage.getItem('user'),
    pass: localStorage.getItem('pass')
}, function (data) {
    switch (data.status) {
        case 'success':
            window.location.href = './home/index.html'
            break;
        case 'failed':
            $(".login").hide()
            $(".register-modal").hide()
            $(".avatar-backdrop").hide()
            $(".avatar-modal").hide()
            $("p").hide()
            $(".a-interact").hide()
            $(".login").css('background-image', `url("./resources/background${Math.floor(Math.random() * 5)}.jpg")`)
            $('.a-file-img').attr('src', `./resources/defaultavatars/${Math.floor(Math.random() * 4)}.png`)

            setTimeout(function () {
                $(".login").fadeIn(1000)
                setTimeout(function () {
                    $(".login-modal").css('transform', 'scale(1)')
                    $(".login-modal").css('opacity', '1')
                }, 300)
            }, 500)

            $('.login-register span').on('click', function () {
                $(".login-modal").css('transform', 'scale(0.5)')
                $(".login-modal").css('opacity', '0')
                setTimeout(function () {
                $(".login-modal").hide()
                $('input').val('')
                }, 300)
                setTimeout(function () {
                $(".register-modal").show()
                $(".register-modal").css('transform', 'scale(1)')
                $(".register-modal").css('opacity', '1')
                }, 300)
            })

            $('.register-login span').on('click', function () {
                $(".register-modal").css('transform', 'scale(0.5)')
                $(".register-modal").css('opacity', '0')
                setTimeout(function () {
                $(".register-modal").hide()
                $('input').val('')
                }, 300)
                setTimeout(function () {
                $(".login-modal").show()
                $(".login-modal").css('transform', 'scale(1)')
                $(".login-modal").css('opacity', '1')
                }, 300)
            })
    }
})

function login() {
    $('.l-error').hide()
    $('.e-login').removeClass('error');
    $.get('http://173.94.229.0/Blossom%20Back%20End/users/login.php', {
        user: $('#l-user').val(),
        pass: $('#l-pass').val()
    }, function (data) {
        switch (data.status) {
            case 'success':
                $(".login-modal").css('transform', 'scale(0.5)')
                $(".login-modal").css('opacity', '0')
                $(".login").fadeOut(300)
                localStorage.setItem('user', $('#l-user').val())
                localStorage.setItem('pass', $('#l-pass').val())
                setTimeout(function () {
                    window.location.href = './home/index.html';
                }, 300)
                break;
            case 'failed':
                $('.l-error').show()
                $('.e-login').addClass('error');
        }
    })
}

function register() {
    $('.r-error').hide()
    $('#r-user').removeClass('error');
    $('.e-register-pass').removeClass('error');
    if ($('#r-user').val() != '') {
        if ($('#r-pass').val() != '') {
            if ($('#r-pass').val() == $('#r-pass-check').val()) {
                $('.r-error-exists').hide()
                $.get('http://173.94.229.0/Blossom%20Back%20End/users/login.php', {
                    user: $('#r-user').val(),
                    pass: $('#r-pass').val()
                }, function (data) {
                    switch (data.status) {
                        case 'failed':
                            $(".avatar-backdrop").show()
                            $(".avatar-backdrop").css('opacity', '1')
                            $(".avatar-modal").show()
                            $(".avatar-modal").css('transform', 'scale(1)')
                            $(".avatar-modal").css('opacity', '1')
                            break;
                        case 'success':
                            $('.r-error-exists').show()
                            $('#r-user').addClass('error');
                            break;
                    }
                })
            } else {
                $('.r-error-pass').show()
                $('.e-register-pass').addClass('error');
            }
        } else {
            $('.r-error-p-empty').show()
            $('.e-register-pass').addClass('error');
        }
    } else {
        $('#r-user').addClass('error');
        $('.r-error-u-empty').show()
    }
}

$('input').on('focus', function () {
    $(this).removeClass('error');
})

aChoice = 1
function avatar(num, button) {
    switch (num) {
        case 0:
            !$(".a-interact").is(':visible') ? $('.a-file-img').attr('src', `./resources/defaultavatars/${Math.floor(Math.random() * 4)}.png`) : ''
            $(".a-interact").slideDown(200)
            break;
        case 1:
            $(".a-interact").slideUp(200)
            break;
    }

    aChoice = num
    $(".a-list").children().removeClass('active')
    $(button).addClass('active')
}

$('#a-file').on('change', function () {
    const file = this.files[0]
    console.log(file)
    if (file) {
        let reader = new FileReader()
        reader.onload = function (event) {
            if (!file.type.startsWith('image/')) return;
            $('.a-file-img').attr('src', event.target.result)
        }
        reader.readAsDataURL(file)
    }
})

function registerback() {
    $(".avatar-backdrop").css('opacity', '0')
    setTimeout(function () {
        $(".avatar-backdrop").hide()
    }, 300)
    $(".avatar-modal").css('transform', 'scale(0.5)')
    $(".avatar-modal").css('opacity', '0')
    setTimeout(function () {
        $(".avatar-modal").hide()
    }, 300)
}

function registersubmit() {
    registerback()
    $.post('http://173.94.229.0/Blossom%20Back%20End/users/register.php', {
        user: $('#r-user').val(),
        pass: $('#r-pass').val(),
        avatar: aChoice == 0 ? $('.a-file-img').attr('src') : ''
    }, function (data) {
        localStorage.setItem('user', $('#r-user').val())
        localStorage.setItem('pass', $('#r-pass').val())
        data.status == 'success' ? window.location.href = './home/index.html' : ''
    })
}