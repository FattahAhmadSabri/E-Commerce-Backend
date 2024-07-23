const RatingService = require("../Service/RatingService");

const createRating = async (req, res) => {
    const user = req.user;
    try {
        const rating = await RatingService.createRating(req.body, user);
        return res.status(201).send(rating);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const getAllRating = async (req, res) => {
    const productId = req.params.productId;
    try {
        const ratings = await RatingService.getProductRating(productId);
        return res.status(200).send(ratings);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = { createRating, getAllRating };
