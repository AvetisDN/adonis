'use strict'

const User = use('App/Models/User')

class AuthController {
    async register({request, auth, response, session}) {

        let user = await User.create(request.except(['_csrf']))

        await auth.login(user)

        session.flash({ notification: {type: 'success', message: 'You are now registered'} })
        return response.route('home')
    }

    async login({request, auth, response, session}) {

        let {email, password, remember} = request.all();
        try {
            await auth.remember(!!remember).attempt(email, password)
            session.flash({ notification: {type: 'success', message: 'Welcome back!'} })
            return response.route('home')
        }
        catch (e) {
            session.flash({ notification: {type: 'error', message: 'Authentication error'} })
            return response.redirect('back')
        }
    }

    async logout({request, auth, response, session}) {
        await auth.logout()
        session.flash({ notification: {type: 'warning', message: 'Bye! See you later'} })
        return response.route('home')
    }
}

module.exports = AuthController
