import { Schema, model, models } from 'mongoose'


const ProductSchema = new Schema({
    id: {type:Number, require:true},
    name: {type:String,require:true},
    slug: {type:String,require:true},
    price: {type:Number, require:true},
    brand: {type:String,require:true},
    maxPayload: {type:String,require:true},
    endurace: {type:String,require:true},
    speed: {type:String,require:true},
    usage: {type:String,require:true},
    dimention: {
      height: {type:String,require:true},
      width: {type:String,require:true},
    },
    totalWeigth: {type:String,require:true},
    countInStock: {type:Number, require:true},
    rating: {type:Number, require:true},
    sellerName: {type:String,require:true},
    image: {type:Array,require:true},
    category: {type:String,require:true},

},{timestamps:true})



const ProductModel = models.ProductModel || model("ProductModel", ProductSchema)
export default ProductModel