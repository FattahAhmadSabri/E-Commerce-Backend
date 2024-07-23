const CartItemService = require("../Service/CartItemService");
const {updateCartItem,RemoveCartItem} =require("../Service/CartItemService")

const UpdateCartItem = async (req, res) => {
    const user = req.user;
    try {
        const updatedCartItem = await updateCartItem(user._id, req.params.id, req.body);
        res.status(200).send(updatedCartItem);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};
const removeCartItem = async (req, res) => {
    const user =await req.user;
    console.log(req.params.id)
    try {
        const result = await RemoveCartItem(user._id, req.params.id);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}


module.exports = { UpdateCartItem, removeCartItem };
