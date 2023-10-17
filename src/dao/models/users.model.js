import mongoose from 'mongoose';

const collection = 'Users';

const schema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    birth_date: {
        type: Date,
    },
    password: {
        type: String,
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Carts",
        required: false
    },
    user_role: {
        type: String,
        enum: ['user', 'premium', 'admin'],
        default: 'user'
    },
    documents: [{
        name: String,
        reference: String
    }],
    last_connection: {
        type: Date,
        required: false
    },
})

const userModel = mongoose.model(collection, schema);

export default userModel;