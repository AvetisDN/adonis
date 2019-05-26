'use strict'

const User = use('App/Models/User')

class UserController {

    async index({request, response, view}) {
        const users = await User.all()
        return view.render('user.index', {users: users.toJSON()})
    }

    async show({request, response, view, params}) {

    }

    async store({request, response}) {
        const user = new User()
        const formData = request.all()
        user.merge(formData)

        await user.save()

        return response.json(user) 
    }
    async save({request, response, view, params}) {
        
    }
    async destroy({request, response, view, params}) {
        
    }
    async create({request, response, view, params}) {
        
    }
    async edit({request, response, view, params}) {
        
    }


}

module.exports = UserController
