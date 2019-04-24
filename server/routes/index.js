const router = require('express').Router(),
routerUser = require('./user'),
routerQuestion = require('./question'),
routerAnswer = require('./answer'),
{authentication} = require('../middleware/auth')

router.use('/users', routerUser)

router.use('', authentication)

router.use('/questions', routerQuestion)

router.use('/answers', routerAnswer)

module.exports = router