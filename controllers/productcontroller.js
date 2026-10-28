const products = require('../data/productArr');
// GET ALL PRODUCTS
const getProducts = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: `Products fetched successfully`,
            data: products
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: `Something went wrong while fetching products`,
            error: err.message
        });
    }
};

// GET SINGLE PRODUCT
const getProductById = (req, res) => {
    try {
        let productId = req.params.id;
        let obj = products.find(product => product.id === productId);
        if (!obj) {
            return res.status(404).json({
                success: false,
                message: `Product not found`
            });
        }
        res.status(200).json({
            success: true,
            message: `Product fetched successfully`,
            data: obj
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: `Something went wrong while fetching single product`,
            error: err.message
        });
    }
};

// CREATE PRODUCT
const createProduct = (req, res) => {
    try {
        let body = req.body;

        if (!body || !body.title || typeof body.price !== "number" || body.price < 0) {
            return res.status(400).json({
                success: false,
                message: `Valid title and price are required`
            });
        }

        let product_obj = {
            title: body.title,
            price: body.price,
            category: body.category || "General",
            brand: body.brand || "Unknown",
            inStock: body.inStock ?? true,
            id: Date.now().toString()
        };
        products.unshift(product_obj);
        res.status(201).json({
            success: true,
            data: product_obj,
            message: `Product created successfully`
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: `Something went wrong while creating product`,
            error: err.message
        });
    }
};

// UPDATE PRODUCT
const updateProduct = (req, res) => {
    try {
        let update_id = req.params.id;
        let getIndex = products.findIndex(product => product.id === update_id);
        if (getIndex === -1) {
            return res.status(404).json({
                success: false,
                message: `The product with id ${update_id} is not found`
            });
        }
        let body = req.body || {};
        if (
            (body.price !== undefined &&
                (typeof body.price !== "number" || body.price < 0)) ||
            (body.inStock !== undefined &&
                typeof body.inStock !== "boolean")
        ) {
            return res.status(400).json({
                success: false,
                message: `Invalid price or inStock value`
            });
        }

        let updated_product = {
            ...products[getIndex],
            ...body,
            id: update_id
        };

        products[getIndex] = updated_product;

        res.status(200).json({
            success: true,
            data: updated_product,
            message: `The product with id ${update_id} updated successfully`
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: `Something went wrong while updating product`,
            error: err.message
        });
    }
};

// DELETE PRODUCT
const deleteProduct = (req, res) => {
    try {
        let remove_id = req.params.id;
        let getIndex = products.findIndex(product => product.id === remove_id);
        if (getIndex === -1) {
            return res.status(404).json({
                success: false,
                message: `The product with id ${remove_id} is not found`
            });
        }
        let remove_product = products.splice(getIndex, 1);
        res.status(200).json({
            success: true,
            message: `Product with id ${remove_id} removed successfully`,
            data: remove_product[0]
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: `Something went wrong while deleting product`,
            error: err.message
        });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
