'use strict'

class XoController {
    async index({request, view, response}) {
        return view.render('games.xo')
    }
}

module.exports = XoController
