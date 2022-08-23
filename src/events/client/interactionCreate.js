const { InteractionType } = require(`discord.js`)

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
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
        }
    }
}