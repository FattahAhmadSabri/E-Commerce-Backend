const Rating = require("../Models/Ratings.model");
const ProductService = require("../Service/ProductService");

const createRating = async (req,user)=>{
    const product = await ProductService.findProductById(req.productId)
    const rating = new Rating({
        product:product._id,
        user:user._id,
        rating:req.rating,
        createdAt: new Date()
    })

    return await rating.save()
}

const getProductRating = async(productId) =>{
    return await Rating.find({product:productId})
}

module.exports= {createRating,getProductRating}