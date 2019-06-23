let ws = null
let gameStatus = ['','','','','','','','','']

$(function () {
    if (window.username) {
        startGame()
    }
})

function startGame () {
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
    const game = ws.subscribe('xo')

    game.on('error', () => {
        $('.connection-status').removeClass('connected')
    })

    //0 - connect
    //1 - move
    game.emit('message', {
        type: 0,
        username: window.username,
        body: ''
    })

    game.on('message', (message) => {
        if(message.type == 1) {
            renderField(message.gameStatus)
            if(checkResult(message.gameStatus)) {
                console.log(checkResult(message.gameStatus) + ' wins')
                $('.xo-container .xo-table li').addClass('taken')
            }
        }
    })

}

$('.xo-container .xo-table li').click(function(){
    if(!$(this).hasClass('taken') && gameStatus[$(this).index()] === '') {
        if(window.username === 'user') {
            gameStatus[$(this).index()] = 'x'
        } else {
            gameStatus[$(this).index()] = 'o'
        }
        ws.getSubscription('xo').emit('message', {
            type: 1,
            username: window.username,
            gameStatus: gameStatus
        })
    }
})

function renderField(array) {
    $('.xo-table li').each(function (index, element) {
        if(array[index] !== '') {
            $(element).addClass("taken")
            $(element).addClass(array[index])
        }
    })
}

function checkResult(array) {
    return checkArray(array,0,1,2) || checkArray(array,3,4,5) || checkArray(array,6,7,8) || checkArray(array,0,3,6) || checkArray(array,1,4,7) || checkArray(array,2,5,8) || checkArray(array,0,4,8) || checkArray(array,2,4,6)
}

function checkArray(array, a,b,c) {
    if( (array[a] !== '' && array[b] !== '' && array[c] !== '') && (array[a] === array[b] && array[a] === array[c]))
        return array[a]
    else
        return false
}