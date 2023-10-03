const mongoose = require('mongoose')

const Schema = mongoose.Schema


const promotionSchema = new Schema({

    name: {type: String},
    precoPromo: {type: Number},
    codPromo: {type: String, unique: true}
    
    

})

module.exports = mongoose.model("Promotion", promotionSchema)