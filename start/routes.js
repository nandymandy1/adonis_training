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
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.on('/').render('home')

Route.get('/posts', 'PostController.index')

Route.get('/posts/add', 'PostController.add')

Route.get('/posts/edit/:id', 'PostController.edit')

Route.get('/posts/:id', 'PostController.post')

Route.post('/posts', 'PostController.store')

Route.put('/posts/:id', 'PostController.update')

Route.delete('/posts/:id', 'PostController.destroy')

// Typical function
// Route.get('/test', function(){
//   return 'Hello World'
// })

// Arrow Function
// Route.get('/test2', () => 'Hello World')

// Parameteres
// Route.get('/test3/:id', ({ params }) => `This is the id ${params.id}`)