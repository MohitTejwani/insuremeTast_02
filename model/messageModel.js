const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = messageSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    recoredTransferAtDateTime: {
        type: Date
    }
}, { timestamps: true })
// module.exports = mongoose.model('Messages', messageSchema);
