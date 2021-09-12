const messageSchema = require('../model/messageModel');
const { getDatabase } = require("../services/utils");

const storeMessage = async (req, res) => {
    try {
        const { message, sheduleDateTime } = req.body;

        if (message == "" || !sheduleDateTime) {
            throw new Error("Invalid Information")
        }
        const db = await getDatabase('firstDB');
        const Messages = db.model("Messages", messageSchema);
        const newMessage = new Messages({
            message,
            recoredTransferAtDateTime: sheduleDateTime,
        })
        const result = await newMessage.save();
        res.status(200).json(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
}
module.exports = {
    storeMessage
}