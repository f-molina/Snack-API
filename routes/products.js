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
* /api/v1:
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
router.post('/', productController.store);

/**
* @swagger
* /api/v1/products:
*   get:
*     tags:
*       - products
*     description: Returns all products sorted by name
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
* /api/v1/productlikes:
*   get:
*     tags:
*       - products
*     description: Returns all products sorted by likes
*     produces:
*       - application/json
*     responses:
*       200:
*         description: An array of products
*         schema:
*           $ref: '#/definitions/product'
*/
router.get('/productlikes', productController.getProductsByLikes);
/**
 * @swagger
 * /api/v1/search/{name}:
 *   get:
 *     tags:
 *       - products
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
router.get('/search/:name', productController.searchProductByName);
/**
 * @swagger
 * /api/v1/delete/{id}:
 *   delete:
 *     tags:
 *       - products
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
router.delete('/delete/:id', productController.deleteProduct);
/**
* @swagger
* /api/v1/update/{id}:
*   put:
*     tags: 
*      - products
*     description: Updates a single product price
*     produces: application/json
*     parameters:
*       - name: id 
*         in: path
*       - name: price
*         in: path
*         properties:
*              price:
*                type: float
*         required:
*          - price
*     responses:
*       200:
*         description: Successfully updated
*/
router.put('/update/:id', productController.updateById);
/**
 * @swagger
 * /api/v1/like/{name}:
 *   put:
 *     tags: 
 *      - products
 *     description: Like a product
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
router.put('/like/:name', productController.likesByName);
/**
 * @swagger
 * /api/v1/buy/{name}:
 *   put:
 *     tags: 
 *      - products
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
router.put('/buy/:name', productController.buyByName);

module.exports = router;