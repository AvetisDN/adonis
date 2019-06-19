'use strict'

class ChatController {
    async index({request, view}) {
        return view.render('chat.index')
    }
}

module.exports = ChatController
