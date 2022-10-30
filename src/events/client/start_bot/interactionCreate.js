const { InteractionType } = require(`discord.js`)
const { ClientSettings } = require(`../../../schemas/client`)
const linksInfo = require(`../../../discord structure/links.json`)

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        const clientData = await ClientSettings.findOne({ clientid: client.user.id }) || new ClientSettings({ clientid: client.user.id })
        clientData.save()
        if (clientData.testmode == true && interaction.user.id !== `491343958660874242`) return interaction.reply({
            content: `Бот находится на техническом обслуживании! Попробуйте позже!`,
            ephemeral: true
        })
        if (interaction.isChatInputCommand()) {
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);
            if (!command) return

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error)
                await interaction.reply({
                    content: `Что-то пошло не так при выполнении данной команды!`,
                    ephemeral: true
                })
            }
        } else if (interaction.isButton()) {
            const { buttons } = client;
            const { customId } = interaction;
            const button = buttons.get(customId);
            if (!button) return new Error(`Нет кода для этой кнопочки :'(`);

            try {
                await button.execute(interaction, client)
            } catch (err) {
                console.error(err)
            }
        } else if (interaction.type == InteractionType.ModalSubmit) {
            const { modals } = client;
            const { customId } = interaction;
            const modal = modals.get(customId)
            if (!modal) return new Error(`Нет кода для этой модели :'(`);
            try {
                await modal.execute(interaction, client)
            } catch (error) {
                console.error(error)
            }
        } else if (interaction.isSelectMenu()) {
            const { selectMenus } = client;
            const { customId } = interaction;
            const menu = selectMenus.get(customId);
            if (!menu) return new Error(`Нет кода для этого меню :'(`);

            try {
                await menu.execute(interaction, client)
            } catch (err) {
                console.error(err)
            }
        } else if (interaction.isContextMenuCommand()) {
            const { commands } = client;
            const { commandName } = interaction;
            const contextCommand = commands.get(commandName);
            if (!contextCommand) return
            try {
                await contextCommand.execute(interaction, client)
            } catch (error) {
                console.log(error)
            }
        } else if (interaction.type == InteractionType.ApplicationCommandAutocomplete) {
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);
            if (!command) return

            try {
                await command.autoComplete(interaction, client)
            } catch (error) {
                console.log(error)
            }
        }
    }
}