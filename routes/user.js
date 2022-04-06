const Router = require('koa-router')
const user = new Router()

// /user
user.get('/', async (ctx, next) => {
    ctx.response.status = 200
    ctx.response.body = 'user'
    await next()
})

// user/list
user.get('/list', async (ctx, next) => {
    ctx.response.status = 200
    ctx.response.body = 'user-list'
    await next()
})

module.exports = user.routes()