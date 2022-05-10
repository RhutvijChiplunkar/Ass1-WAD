const mongoose = require('mongoose');

const StudentMarks = mongoose.Schema({
    Name: {
        type:String,
        required:true
    },
    Roll_no: String,
    WAD_marks:{
        type:Number,
        min:0,
        max:100
    },
    CC_marks:{
        type:Number,
        min:0,
        max:100
    },
    DSBDA_marks:{
        type:Number,
        min:0,
        max:100
    },
    CNS_marks:{
        type:Number,
        min:0,
        max:100
    },
    AI_marks:{
        type:Number,
        min:0,
        max:100
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('StudentMarks', StudentMarks);