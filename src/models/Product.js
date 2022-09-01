import {Schema, model} from 'mongoose'

const productScheme = new Schema({
    name: String,
    category: String,
    estatus: String,
    price: Number,
    imgUrl: String
}, {
    timestamps: true,
    versionkey: false
})

export default model('Product', productScheme);