const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    code: {
        type : String,
        required : true,
    },
    purchase_datatime: {
        type : Date,
        default : Date.now,
    },
    amount: {
        type : Number,
        required : true,
    },
    purchaser: {
        type : String,
        required : true,
    },
    products: {
        type : Object
    }
});

const ticketModel = mongoose.model('Ticket', ticketSchema);

module.exports = ticketModel;
//