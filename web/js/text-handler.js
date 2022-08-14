var send_button = document.getElementsByClassName("chat-send")[0]

function text(elem) {
    elem.innerHTML.replace(/<br>/g, '').length > 0 ? send_button.classList.add('valid') : send_button.classList.remove('valid')
    twemoji.parse(elem)
}