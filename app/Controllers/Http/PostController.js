'use strict'

// Bring in model
const Post = use('App/Models/Post')

// Bring in validator class
const { validate } = use('Validator')

class PostController {
  async index({ view }) {
    // return 'Posts'
    /*
    const posts = [
      {title: 'Post One', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
      {title: 'Post Two', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
      {title: 'Post Three', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
      {title: 'Post Four', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
      {title: 'Post Five', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
    ]
    */
    // getting the posts from the model
    const posts = await Post.all()
    return view.render('posts.index', {
      title: 'Latest Posts',
      posts: posts.toJSON()
    })
  }

  async post({ params, view }){
    const post = await Post.find(params.id)
    return view.render('posts.dat',{
        post: post.toJSON()
    })
  }

  async add({ view }){
    return view.render('posts.add')
  }

  async store({ request, response, session }){

    // Validate input
    const validation = await validate(request.all(), {
      title: 'required|min:3|max:255',
      body: 'required|max:255',
      author: 'required'
    })

    // check if the validation fails
    if(validation.fails()){
      session.withErrors(validation.messages()).flashAll()
      return response.redirect('back')
    }

    const post = new Post()

    post.title = request.input('title')
    post.body = request.input('body')
    post.author = request.input('author')
    await post.save()

    session.flash({ notification: 'Post Added!'})
    return response.redirect('/posts')
  }

  async edit({ params, view}){
    const post = await Post.find(params.id)

    return view.render('posts.edit', {
      post: post
    })
  }

  async update({ params, request, session, response }){
    // Validate input
    const validation = await validate(request.all(), {
      title: 'required|min:3|max:255',
      body: 'required|max:255',
      author: 'required'
    })

    const post = await Post.find(params.id)
    post.title = request.input('title')
    post.body = request.input('body')
    post.author = request.input('author')
    await post.save()
    session.flash({ notification: 'Post Updated!'})
    return response.redirect('/posts')

  }

  async destroy({ params, session, response }){
    const post = await Post.find(params.id)
    await post.delete()
    session.flash({ notification: 'Post Deleted!'})
    return response.redirect('/posts')
  }


}

module.exports = PostController
