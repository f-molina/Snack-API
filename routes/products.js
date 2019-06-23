var express = require('express');
var router = express.Router();

const productController = require('../controllers/ProductController');

/**
* @swagger
* definitions:
*   product:
*     properties:
*       name:
*         type: string
*       price:
*         type: float
*       stock:
*         type: integer
*       required:
*          - name
*          - price
*          - stock
*/

/**
* @swagger
* /products/create:
*   post:
*     tags:
*       - products
*     summary: Create/add a product
*     description: Creates a new product
*     produces:
*       - application/json
*     parameters:
*       - name: body 
*         in: body
*         schema:
*           $ref: '#/definitions/product'
*           properties:
*              name:
*                type: string
*              price:
*                type: float
*              stock:
*                type: integer
*         required:
*          - name
*          - price
*          - stock
*     responses:
*       200:
*         description: Successfully created
*/
router.post('/products/create', productController.store);

/**
* @swagger
* /products:
*   get:
*     tags:
*       - products
*     summary: List of all products sorted by name
*     description: Returns all products
*     produces:
*       - application/json
*     responses:
*       200:
*         description: An array of products
*         schema:
*           $ref: '#/definitions/product'
*/
router.get('/products', productController.getProducts);
/**
* @swagger
* /products/productlikes:
*   get:
*     tags:
*       - products
*     summary: List of all products sorted by likes
*     description: Returns all products sorted by likes
*     produces:
*       - application/json
*     responses:
*       200:
*         description: An array of products
*         schema:
*           $ref: '#/definitions/product'
*/
router.get('/products/productlikes', productController.getProductsByLikes);
/**
 * @swagger
 * /products/search/{name}:
 *   get:
 *     tags:
 *       - products
 *     summary: Search for a product by it's name
 *     description: Returns all products by name
 *     produces:
 *       - application/json
 *     parameters:
 *      - in: path 
 *        name: name
 *        required: true
 *     responses:
 *       200:
 *         description: An array of products
 *         schema:
 *           $ref: '#/definitions/product'
 */
router.get('/products/search/:name', productController.searchProductByName);
/**
 * @swagger
 * /products/delete/{id}:
 *   delete:
 *     tags:
 *       - products
 *     summary: Delete a product
 *     description: Deletes a single product
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: product's id
 *         required: true
 *         type: string
 *     schema:
 *           $ref: '#/definitions/product'
 *     responses:
 *       200:
 *         description: Deleted product
 */
router.delete('/products/delete/:id', productController.deleteProduct);
/**
* @swagger
* /products/update/{id}:
*   put:
*     tags: 
*      - products
*     summary: Update price
*     description: Updates a single product price
*     produces: application/json
*     parameters:
*       - name: price
*         in: path
*         properties:
*              id:
*                type: string
*              price:
*                type: float
*         required:
*          - id
*          - price
*     schema:
*           $ref: '#/definitions/product'
*     responses:
*       200:
*         description: Successfully updated
*/
router.put('/products/update/:id', productController.updateById);
/**
 * @swagger
 * /products/like/{name}:
 *   put:
 *     tags: 
 *      - products
 *     summary: Like a product
 *     description: Like a product by name
 *     produces: application/json
 *     parameters:
 *       - name: name 
 *         in: path
 *         properties:
 *              name:
 *                type: string
 *         required:
 *          - name
 *     schema:
 *        $ref: '#/definitions/product'
 *     responses:
 *       200:
 *         description: Liked!
 */
router.put('/products/like/:name', isLoggedIn, productController.likesByName);
/**
 * @swagger
 * /products/buy/{name}:
 *   put:
 *     tags: 
 *      - products
 *     summary: Buy a product
 *     description: Buy a product
 *     produces: application/json
 *     parameters:
 *       - name: name 
 *         in: path
 *         properties:
 *              name:
 *                type: string
 *         required:
 *          - name
 *     schema:
 *        $ref: '#/definitions/product'
 *     responses:
 *       200:
 *         description: Purchased!
 */
router.put('/products/buy/:name', isLoggedIn, productController.buyByName);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.status(400).json({
        'message': 'access denied'
    });
}

module.exports = router;