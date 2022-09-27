const fs = require('fs');

module.exports = (client) => {
    client.handleComponents = async () => {
        const folders = fs.readdirSync('./src/components');
        for (const folder of folders) {
            const componentFolder = fs
                .readdirSync(`./src/components/${folder}`)

            const { buttons, modals, selectMenus } = client;
            switch (folder) {
                case "buttons":
                    for (const buttonFolder of componentFolder) {
                        const buttonFiles = fs
                            .readdirSync(`./src/components/${folder}/${buttonFolder}`)

                        for (const file of buttonFiles) {
                            const button = require(`../../components/${folder}/${buttonFolder}/${file}`)
                            buttons.set(button.data.name, button)
                        }

                    }
                    break;



                case "modals": {
                    for (const modalFolder of componentFolder) {
                        const modalFiles = fs
                            .readdirSync(`./src/components/${folder}/${modalFolder}`)
                            .filter((file) => file.endsWith(`.js`));;

                        for (const file of modalFiles) {
                            const modal = require(`../../components/${folder}/${modalFolder}/${file}`)
                            modals.set(modal.data.name, modal)
                        }

                    }
                }
                    break;

                case "selectMenus": {
                    for (const selectMenuFolder of componentFolder) {
                        const selectMenuFiles = fs
                            .readdirSync(`./src/components/${folder}/${selectMenuFolder}`)
                            .filter((file) => file.endsWith(`.js`));;

                        for (const file of selectMenuFiles) {
                            const selectMenu = require(`../../components/${folder}/${selectMenuFolder}/${file}`)
                            selectMenus.get(selectMenu.data.name, selectMenu)
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