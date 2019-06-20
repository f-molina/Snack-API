const Product = require('../models/product');
const productController = {};

//Add a product and save
productController.store = (req, res, next) => {
    let product = new Product({
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        likes: req.body.likes
    })

    product.save((err) => {
        if(err)
        return res.status(400).send({"err": err});
        return res.status(200).json({"message": "Successfully created"});
    })
}

//Get the list of all the products sorted by name
productController.getProducts = (req, res, next) => {
    let listSort = {name: -1};
    Product.find({}, (err, products) => {
        if(err)
        return res.status(400).send({"err": err});
        return res.status(200).send({products});
    }).sort(listSort);
}

//Get the list sorted by likes
productController.getProductsByLikes = (req, res, next) => {
    let likeSort = {likes: -1};
    Product.find({}, (err, products) => {
        if(err)
        return res.status(400).send({"err": err});
        return res.status(200).send({products});
    }).sort(likeSort);
}

//Delete a product from the list by id
productController.deleteProduct = (req, res, next) => {
    let {id} = req.params;
    Product.deleteOne({_id:id}, (err) => {
        if(err){
            return res.status(400).send({"err": err});
        }
        return res.status(200).json({"message": "Successfully deleted"});
    });
}

//Search a product by name
productController.searchProductByName = (req, res, next) => {
    let {name} = req.params;
    Product.find({name: {$regex : name, $options: "$i"}}, (err, products) => {
        if(err){
            return res.status(400).send({"err": err});
        }
        return res.status(200).json({products});
    });
}

//Update a product by id
productController.updateById = async (req, res, next) => {
    let {id} = req.params;
    await Product.findOneAndUpdate({_id:id}, req.price, {new: true, useFindAndModify: false });
    return res.status(200).json({"message": "Successfully updated"});
}

//Like a product by name
productController.likesByName = async (req, res, next) => {
    let {name} = req.params;
    await Product.findOneAndUpdate({name: {$regex : name, $options: "$i"}}, { $inc: { likes: 1 } }, {new: true, useFindAndModify: false });
    return res.status(200).json({"message": "Liked!"});
}

//Buy a product and reduce stock
productController.buyByName = async (req, res, next) => {
    let {name} = req.params;
    await Product.findOneAndUpdate({name: {$regex: name, $options: "$i"}}, { $inc: { stock: -1 } }, {new: true, useFindAndModify: false });
    return res.status(200).json({"message": "Product purchased!"});
}

module.exports = productController;