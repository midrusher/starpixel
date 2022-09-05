const { MsgData } = require(`../../../src/schemas/msgdata`)
const chalk = require(`chalk`)

module.exports = (client) => {
    client.msgdata = async () => {
        setInterval(async () => {
            const results = await MsgData.findOne({ guildid: `320193302844669959`})
            let i = 0
            for (let result of results) {
                let { messages } = result
                let remove = await MsgData.findOneAndUpdate({ guildid: `320193302844669959`}, { $pull: { messages: {  }}})
            }
            
        }, 10000)
    }
}