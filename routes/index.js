const Router = require('koa-router');
const router = new Router();

const loginRouter = require('./login')
const userRouter = require('./user')

router.use('/login', loginRouter)
router.use('/user', userRouter)

module.exports = router