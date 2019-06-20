var express = require('express');
var router = express.Router();

const productController = require('../controllers/ProductController');

router.post('/', productController.store);
router.get('/products', productController.getProducts);
router.get('/search/:name', productController.searchProductByName);
router.delete('/delete/:id', productController.deleteProduct);
router.put('/update/:id', productController.updateById);
router.put('/like/:name', productController.likesByName);
router.put('/buy/:name', productController.buyByName);

module.exports = router;