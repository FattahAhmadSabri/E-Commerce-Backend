const ProductService = require("../Service/ProductService")


const createProduct = async (req, res) => {
    
    try {
        const product = await ProductService.createProduct(req.body)
        
        return res.status(201).send(product)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const deleteProduct = async (req, res) => {
    const productId = req.params.id
    try {
        const product = await ProductService.deleteProduct(productId)
        return res.status(200).send(product)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
};


const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await ProductService.updateProduct(productId, req.body)
        return res.status(201).send(product)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const findProductById = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await ProductService.findProductById(productId)
        return res.status(200).send(product)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const getallProduct = async (req, res) => {
    try {
        const allProduct = await ProductService.getAllProduct(req.query)
        return res.status(200).send(allProduct)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const createMultipleProduct = async (req, res) => {
    try {
        const products = await ProductService.createMultipleProduct(req.body)
        return res.status(201).send({ message: "Product are added successfullly" })
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }

}

module.exports = { createProduct, deleteProduct, updateProduct, findProductById, getallProduct, createMultipleProduct }