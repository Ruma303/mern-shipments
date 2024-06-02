const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
        default: 'order description...'
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        required: false,
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
