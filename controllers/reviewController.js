const db = require('../models')

// model
const Review = db.reviews

const errResult = (res, err) => {
    // console.log('errResult:', err)
    if (err.name === 'SequelizeValidationError') {
        return res.status(422).json({
            success: false,
            msg: err.errors.map(e => e.message)
        })
    } else {
        res.status(400).send('Error')
    }
}

//1. Add Review
const addReview = async (req, res) => {

    const id = req.params.id

    let data = {
        product_id: id,
        rating: req.body.rating,
        descriptions: req.body.descriptions
    }

    try {
        const review = await Review.create(data)
        res.status(200).send(review)
    } catch (err) {
        errResult(res, err)
    }

}

// 2. Get All Reviews
const getAllReviews = async (req, res) => {
    const reviews = await Review.findAll({})
    res.status(200).send(reviews)

}

module.exports = {
    addReview,
    getAllReviews
}