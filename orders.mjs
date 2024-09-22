// Import necessary libraries
import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
// Define user schema
const OrderSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    zip: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    prods: [{
        orderitemId: String,
        orderitemsize: String,
        orderitemquantity: Number,
        track: String,
        method: String
    }]
});


// Plugin Passport-Local Mongoose to handle hashing and salting of passwords
OrderSchema.plugin(passportLocalMongoose);


const orders = mongoose.model('Orders', OrderSchema);

export default orders;
