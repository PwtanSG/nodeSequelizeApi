const db = require('../models')
const multer = require('multer')
const path = require('path')

//create model
const Product = db.products
const Review = db.reviews
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

//1. create product
const addProduct = async (req, res) => {

    console.log(req.file)
    let data = {
        name: req.body.name,
        price: req.body.price,
        descriptions: req.body.descriptions,
        image: req?.file?.path || req.body.image,
        published: req.body.published ? req.body.published : false,
        category_id: req.body.category_id
    }
    try {
        const product = await Product.create(data)
        res.status(200).send(product)
    } catch (err) {
        errResult(res, err)
    }
}

// 2. get all products
const getAllProducts = async (req, res) => {
    const products = await Product.findAll({
        include: [
            { model: Category },
            { model: Review },
        ]
    })
    // const products = await Product.findAll({ include: Category })
    // const products = await Product.findAll({})
    res.status(200).send(products)
}

// 3. get one products
const getProduct = async (req, res) => {
    let id = req.params.id
    const product = await Product.findOne({ where: { id: id } })
    res.status(200).send(product)
}

// 4. Update product
const updateProduct = async (req, res) => {
    let req_id = req.params.id
    console.log(req_id)
    console.log('body:', req.body)
    const { id, uuid, ...updateFields } = req.body //destruct to exclude if payload consist of id , uuid
    try {
        const product = await Product.update(updateFields, { where: { id: req_id } })
        res.status(200).send(product)
    } catch (err) {
        errResult(res, err)
    }
}

// 5. delete product by id
const deleteProduct = async (req, res) => {
    let id = req.params.id
    const product = await Product.destroy({ where: { id: id } })
    res.status(200).send('Product is deleted')
}

// 6. get published product
const getPublishedProducts = async (req, res) => {
    const publishedProducts = await Product.findAll({ where: { published: true } })
    res.status(200).send(publishedProducts)
}

//7. get product reviews
const getProductReviews = async (req, res) => {

    const id = req.params.id

    const data = await Product.findOne({
        include: [{
            model: Review
        }],
        where: { id: id }
    })

    // SELECT * 
    // FROM `products` LEFT OUTER JOIN `reviews` 
    // ` ON `product`.`id` = `reviews`.`product_id` 
    // WHERE `product`.`id` = '2';

    res.status(200).send(data)
}

// 8. Upload files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const UploadImage = multer({

    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extname) {
            return cb(null, true)
        }

        cb('Invalid file formate found!')
    }

}).single('image')

module.exports = {
    addProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    getPublishedProducts,
    getProductReviews,
    UploadImage
}