'use strict'

class SiteController {
    async index({request, response, view, auth}){
        return view.render('site.index')
    }
    async signin({request, response, view, auth}){
        return view.render('site.signin')
    }
    async signup({request, response, view, auth}){
        return view.render('site.signup')
    }
}

module.exports = SiteController
