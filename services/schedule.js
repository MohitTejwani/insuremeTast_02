const schedule = require('node-schedule');
const messageSchema = require('../model/messageModel');
const { getDatabase } = require("./utils");
var osu = require('node-os-utils')



exports.messageTransferToSecondDB = async () => {
    const db = await getDatabase('firstDB');
    const Messages = db.model("Messages", messageSchema);
    const messageToTransfer = await Messages.find().sort({ recoredTransferAtDateTime: 1 }).limit(1)
    await monitorServer();
    if (messageToTransfer.length) {
        let nextDateTimeToTransfer = new Date(messageToTransfer[0].recoredTransferAtDateTime);
        //    '1/10 * * * * *'
        console.log("next job schedule at ", nextDateTimeToTransfer)
        const job = schedule.scheduleJob(nextDateTimeToTransfer, async () => {
            const db2 = await getDatabase('secondDB');
            const MessagesOfSecondDB = db2.model("Messages", messageSchema);
            const newMessagesOfSecondDB = new MessagesOfSecondDB({
                message: messageToTransfer[0].message,
                recoredTransferAtDateTime: messageToTransfer[0].recoredTransferAtDateTime
            })
            const result = newMessagesOfSecondDB.save();
            if (result) {
                const removeMessageFromFirstDB = await Messages.deleteOne({ _id: messageToTransfer[0]._id });
                if (removeMessageFromFirstDB) {
                    console.log("message has been transfer from first DB to second DB")
                    this.messageTransferToSecondDB();
                }
            }
        });
    } else {
        console.log("there was 0 message in first DB and schedule  will restart after 1 min ")
        setTimeout(() => {
            this.messageTransferToSecondDB()
        }, 1000 * 60);
    }
}
function monitorServer() {
    var cpu = osu.cpu
    cpu.usage()
        .then(info => {
            console.log(`system usage is ${info}%`)
            if (info > 70) {
                shell.exec('../startNodeServer.sh')
            }
        })
}
