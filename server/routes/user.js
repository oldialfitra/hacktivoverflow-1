const router = require('express').Router(),
    controllerUser = require('../controllers/user'),
    {authentication, authorizationUser} = require('../middleware/auth')

router.post('/signup', controllerUser.signUp)

router.post('/signin', controllerUser.signIn)

router.use('', authentication)

router.use('', authorizationUser)

router.put('/tags', controllerUser.watchedTag)

router.get('/tags', controllerUser.getMyTags)

module.exports = router