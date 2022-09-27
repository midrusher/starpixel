

module.exports = {
    data: {
        name: `testselectMenu`
    },
    async execute(interaction, client) {
        await interaction.reply({
            content: `${interaction.member}, test - ${interaction.values[0]}`
        });
        await console.log(`${interaction.member.displayName} выбрал ${interaction.values[0]}`);
    }
}