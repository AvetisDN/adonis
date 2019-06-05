'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'SiteController.index').as('home')
Route.get('/signup', 'SiteController.signup').middleware(['guest'])
Route.get('/signin', 'SiteController.signin').middleware(['guest'])

Route.post('/register', 'AuthController.register')
Route.post('/login', 'AuthController.login')
Route.get('/logout', 'AuthController.logout')

Route.put('/posts/:id', 'PostController.update').middleware(['auth'])
Route.delete('posts/id', 'PostController.delete').middleware(['auth'])
Route.post('/posts', 'PostController.store').middleware(['auth'])
Route.get('/posts', 'PostController.getPosts');

