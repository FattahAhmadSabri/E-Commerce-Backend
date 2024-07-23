const mongoose = require('mongoose')

const orderSchema = new  mongoose.Schema({
    user : {
    type : mongoose.Schema.Types.ObjectId,
    ref: "users"
},
orderItem : {
    type : mongoose.Schema.Types.ObjectId,
    ref: "orderItems" 
},
orderDate : {
    type : Date,
   required : true,
   default : Date.now()
},
deliveryDate : {
    type : Date
},
ShippingAddress : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "addresses"
},
 paymentDetails : {
    paymentMethod : {
        type : String,
    },
    transectionId : {
        type : String,
        required : true
    },
    paymentId : {
        type : String,
    },
    paymentStatus : {
        type : String, 
        default : "PENDING"   
    }
 },
 totalPrice : {
    type : Number,
    required : true
 }, 
 totalDiscountedPrice : {
    type : Number,
    required : true
 },
 discount : {
    type : Number,
    required : true
 },
 orderStatus : {
    type : String,
    required : true,
    default : "PENDING" 
 },
  totalItem : {
    type : String,
    required : true
  },
  createdAt : {
    type : Date,
    default : Date.now()
    
  }
})

const Order = mongoose.model("orders",orderSchema);
module.exports= Order