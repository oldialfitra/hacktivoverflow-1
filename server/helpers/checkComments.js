module.exports = (oneQuestion, parameter) => {
    oneQuestion.comments.forEach((e, index) => {
        if (e.toString() === parameter) {
            oneQuestion.comments.splice(index, 1)
        }
    });
    return oneQuestion.save()
}