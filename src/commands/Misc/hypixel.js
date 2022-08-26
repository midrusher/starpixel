const Hypixel = require('hypixel-api-reborn');
const hypixel = new Hypixel.Client(process.env.hypixel_apikey)
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { execute } = require('../../events/client/ready');
const subcommand = require('../../../Архив/Больше не используется/subcommand');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`hypixel`)
        .setDescription(`Команды hypixel`)
        .addSubcommandGroup(group => group
            .setName(`player`)
            .setDescription(`Основная информация об игроках`)
            .addSubcommand(subcommand => subcommand
                .setName(`general`)
                .setDescription(`Основная статистика игрока`)
                .addStringOption(option => option
                    .setName(`никнейм`)
                    .setDescription(`Посмотреть основную статистику выбранного игрока.`)
                    .setRequired(true)
                    )
                )
            ),
    async execute(interaction, client) {
        switch (interaction.options.getSubcommandGroup()) {
            case `player`:{
                switch (interaction.options.getSubcommand()) {
                    case `general`: {
                        const ign = interaction.options.getString(`никнейм`)
                        hypixel.getPlayer(ign).then(player => {
                            const embed = new EmbedBuilder()
                            .setAuthor({
                                name: `Основная статистика игрока ${ign}:`
                            })
                            .setColor(process.env.bot_color)
                            .setDescription(
`**Никнейм**: ${player.nickname}
**Ранг**: ${player.rank}
**Уровень Hypixel**: ${player.level}
**Очков достижений**: ${player.achievementPoints}
**Первый вход**: <t:${Math.round(player.firstLoginTimestamp / 1000)}:f>`)

interaction.reply({
    embeds: [embed]
})
                        })
                    };
                        
                        break;
                
                    default:
                        break;
                }

            };

        
                
                break;
        
            default:
                break;
        }
        
    }
};