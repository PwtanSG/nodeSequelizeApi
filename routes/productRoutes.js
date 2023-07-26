const productController = require('../controllers/productController')
const reviewController = require('../controllers/reviewController')
const categoryController = require('../controllers/categoryController')

const router = require('express').Router()

router.get('/', function (req, res) {
    res.send('Hello World')
})
// router.get('/products/getzReviews', function (req, res) {
//     res.send('get all review')
// })
router.post('/products', productController.UploadImage, productController.addProduct)
router.get('/products', productController.getAllProducts)
router.get('/products/getPublished', productController.getPublishedProducts)
router.get('/products/getReviews', reviewController.getAllReviews)

//impt param routes /product/:id must be after the above
router.get('/products/:id', productController.getProduct)
router.put('/products/:id', productController.UploadImage, productController.updateProduct)
router.delete('/products/:id', productController.deleteProduct)

router.post('/products/addReview/:id', reviewController.addReview)
// get product Reviews
router.get('/products/getProductReviews/:id', productController.getProductReviews)

router.get('/categories', categoryController.getCatergories)

module.exports = router