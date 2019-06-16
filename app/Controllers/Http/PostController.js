'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Post = use('App/Models/Post')
const User = use('App/Models/User')
const Database = use('Database')

/**
 * Resourceful controller for interacting with posts
 */
class PostController {

  /**
   * Show a list of all posts.
   * GET posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    let page = 1
    let field = 'id'
    let sort = 'desc'
    if(request.get().page) page = request.get().page
    if(request.get().field) field = request.get().field
    if(request.get().sort) sort = request.get().sort
    let posts = await Post.query().with('user').orderBy(field, sort).paginate(page, 5)
    return view.render('post.index', {posts: posts.toJSON(), sort: sort, field: field})
  }

  /**
   * Render a form to be used for creating a new post.
   * GET posts/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    return view.render('post.create')
  }

  /**
   * Create/save a new post.
   * POST posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth, response, session }) {
    let post = await  Post.create(request.except('_csrf'))
    session.flash({ notification: {type: 'success', message: 'Post was created successfully!'} })
    return response.route('/posts')
  }

  /**
   * Display a single post.
   * GET posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    let post = await Post.query().where('id', params.id).with('user').fetch()
    return view.render('post.view', {post: post.toJSON()[0]})
  }

  /**
   * Render a form to update an existing post.
   * GET posts/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    let post = await Post.query().where('id', params.id).with('user').fetch()
    let users = await User.query().fetch()
    return view.render('post.edit', {post: post.toJSON()[0], users: users.toJSON()})
  }

  /**
   * Update post details.
   * PUT or PATCH posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    let post = await Post.find(params.id)


    post.title = request.input('title')
    post.description = request.input('description');
    post.user_id = request.input('user_id');

    await post.save()
    await post.load('user');

    return response.json(post)
  }

  /**
   * Delete a post with id.
   * DELETE posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async delete({auth, request, params, response}) {

    await Database
        .table('posts')
        .where('id', request.all().id)
        .delete()

    return response.send(1)
  }
}

module.exports = PostController
