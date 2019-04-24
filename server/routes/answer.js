const router = require('express').Router(),
    controllerAnswer = require('../controllers/answer'),
    { authorizationAnswer } = require('../middleware/auth')

router.post('/:id', controllerAnswer.createAnswer)

router.get('/', controllerAnswer.getAllAnswer)

router.get('/:id', controllerAnswer.getOneAnswer)

router.put('/:id', authorizationAnswer, controllerAnswer.updateAnswer)

router.delete('/:id', authorizationAnswer, controllerAnswer.deleteAnswer)

router.put('/upvote/:id', controllerAnswer.upvoteAnswer)

router.put('/downvote/:id', controllerAnswer.downvoteAnswer)

module.exports = router