const fs = require('fs');
const { connection } = require(`mongoose`)

module.exports = (client) => {
    client.handleEvents = async () => {
        const folders = fs.readdirSync('./src/events');
        for (const folder of folders) {
            const eventFolders = fs
                .readdirSync(`./src/events/${folder}`)
            //.filter((file) => file.endsWith(`.js`));
            switch (folder) {
                case "client":
                    for (const eventFolder of eventFolders) {
                        const eventFiles = fs
                            .readdirSync(`./src/events/${folder}/${eventFolder}`)
                            .filter((file) => file.endsWith(`.js`));;

                        for (const file of eventFiles) {
                            const event = require(`../../events/${folder}/${eventFolder}/${file}`)
                            if (event.once) client.once(event.name, (...args) => event.execute(...args, client))
                            else client.on(event.name, (...args) => event.execute(...args, client));
                        }

                    }
                    break;



                case "mongo": {
                    for (const eventFolder of eventFolders) {
                        const eventFiles = fs
                            .readdirSync(`./src/events/${folder}/${eventFolder}`)
                            .filter((file) => file.endsWith(`.js`));;

                        for (const file of eventFiles) {
                            const event = require(`../../events/${folder}/${eventFolder}/${file}`)
                            if (event.once) connection.once(event.name, (...args) => event.execute(...args, client))
                            else connection.on(event.name, (...args) => event.execute(...args, client));
                        }

                    }
                }
                    break;

                default:
                    break;
            }
        };

    }
}