const Router = require('koa-router')
const login = new Router()
const api = require('../mongoControl/queryData')
// const response = require('koa2-response');

// /login
login.post('/', async (ctx, next) => {
    const response = await api.getQueryData('user', ctx.request.body || {})
    ctx.response.status = 200
    ctx.body = response
    await next()
})

// login/list
login.get('/list', async (ctx, next) => {
    ctx.response.status = 200
    ctx.response.body = 'login-list'
    await next()
})

module.exports = login.routes()