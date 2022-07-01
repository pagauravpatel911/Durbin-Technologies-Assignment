const mongoose = require("mongoose")




const resumeSchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        required: true,
        enum: ['Mr', 'Mrs', 'Miss']
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    
    phone: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

     address: {
        type: String,
        required: true,
    },
    education:{
        type: String,
        require: true
    },
    skills:{
        type:[String],
        require:true
    },
    experience:{
        type:[Object]
    },
    experienceYear:{
        type:Number,
        require:true 

    }
    

    
}, { timestamps: true })

module.exports = mongoose.model('newResume', resumeSchema)










