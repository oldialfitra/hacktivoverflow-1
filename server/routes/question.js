const router = require('express').Router(),
    controllerQuestion = require('../controllers/question'),
    { authorizationQuestion } = require('../middleware/auth')

router.post('/', controllerQuestion.createQuestion)

router.get('/', controllerQuestion.getAllQuestion)

router.get('/:id', controllerQuestion.getOneQuestion)

router.put('/:id', authorizationQuestion, controllerQuestion.updateQuestion)

router.delete('/:id', authorizationQuestion, controllerQuestion.deleteQuestion)

router.get('/my', controllerQuestion.getMyQuestion)

router.put('/upvote/:id', controllerQuestion.upvoteQuestion)

router.put('/downvote/:id', controllerQuestion.downvoteQuestion)

module.exports = router