const db = require('../models')
const Category = db.categories

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

// 2. get all products
const getCatergories = async (req, res) => {
    const categories = await Category.findAll({})
    res.status(200).send(categories)
}

module.exports = {
    getCatergories
}