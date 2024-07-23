const OrderService = require("../Service/OrderService")

const createOrder = async(req,res)=>{
     const user = await req.user;
     try {
         let createOrder = await OrderService.createOrder(user,req.body)
         return res.status(200).send(createOrder)
     } catch (error) {
        return res.status(500).send({error: error.message})
     }
}

const findOrderById = async(req,res)=>{
      const user = await req.user;
      try {
        let findOrderById = await OrderService.findOrderById(req.params.id)
        return res.status(200).send(findOrderById)
      } catch (error) {
        return res.status(500).send({error:error.message})
      }
}

   const orderHistory = async (req,res)=>{
     const user= await req.user
     try {
        let orderHistory = await OrderService.userOrderHistory(user._id)
        return res.status(200).send(orderHistory)
     } catch (error) {
        return res.status(500).send({error:error.message})
     }
   }


module.exports = {createOrder,findOrderById,orderHistory}