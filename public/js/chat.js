let ws = null

$(function () {
    if (window.username) {
        startChat()
    }
})

function startChat () {
    ws = adonis.Ws().connect()

    ws.on('open', () => {
        $('.connection-status').addClass('connected')
        subscribeToChannel()
    })

    ws.on('error', () => {
        $('.connection-status').removeClass('connected')
    })
}

function subscribeToChannel () {
    const chat = ws.subscribe('chat')

    chat.on('error', () => {
        $('.connection-status').removeClass('connected')
    })

    chat.on('message', (message) => {
        if(message.type === 1) {
            $('.messages').append(`<div class="message"><b>${message.username}: </b> <span> ${message.body} </span> </div>`)
            $('.status[data-user=' + message.user_id + ']').remove()
        } else if(message.user_id !== window.user_id) {
            $('.status[data-user=' + message.user_id + ']').remove()
            $('.messages').append(`<div class="status" data-user="${message.user_id}"><b>${message.username}: </b> <span> ${message.body} </span> </div>`)
            removeStatus($('.status[data-user=' + message.user_id + ']'), 3000)
        }
    })
}
function removeStatus(element, timer) {
    setTimeout(function(){
        element.remove()
    }, timer)
}
$('#message').keyup(function (e) {

    if (e.which === 13 && $(this).val() !== '' && !/^\s+$/.test($(this).val())) {
        e.preventDefault()

        const message = $(this).val()
        $(this).val('')
        if(message !== '') {
            ws.getSubscription('chat').emit('message', {
                type: 1,
                user_id: window.user_id,
                username: window.username,
                body: message
            })
        }
        return
    } else if($(this).val() !== '' ) {
        e.preventDefault()
        ws.getSubscription('chat').emit('message', {
            type: 0,
            user_id: window.user_id,
            username: window.username,
            body: 'Typing...'
        })
        return
    }
})