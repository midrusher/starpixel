const { SlashCommandBuilder, Attachment, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { createCanvas, loadImage } = require(`@napi-rs/canvas`)
const { User } = require(`../../schemas/userdata`);


module.exports = {
    data: new SlashCommandBuilder()
        .setName(`rank`)
        .setDescription(`Показать опыт активности.`)
        .addUserOption(option => option
            .setName(`пользователь`)
            .setRequired(false)
            .setDescription(`Введите любого пользователя.`)
        ),
    async execute(interaction, client) {
        const user = interaction.options.getUser(`пользователь`) || interaction.member.user;

        if (user.bot) return interaction.reply({
            content: `${user} является ботом, а значит он не может получать опыт активности :'(`
        })
        const users = await User.find().then(users => {
            return users.filter(async user => await interaction.guild.members.fetch(user.userid))
        })
        const sorts = users.sort((a, b) => {
            return b.totalexp - a.totalexp
        })
        var i = 0
        while (sorts[i].userid !== user.id) {
            i++
        }
        let userData = sorts[i]
        let rank = i + 1
        const neededXP = 5 * (Math.pow(userData.level, 2)) + (50 * userData.level) + 100;

        if (userData.totalexp == 0) return interaction.reply({
            content: `У ${user} нет опыта активности.`,
            ephemeral: true
        });
        await interaction.deferReply({
            fetchReply: true
        })

        const canvas = createCanvas(1000, 300),
            ctx = canvas.getContext('2d'),
            bar_width = 600,
            bg = await loadImage(`./src/assets/Cards/Rank card.jpg`),
            av = await loadImage(user.displayAvatarURL({ format: 'png', dynamic: false }));

        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(120, 120, 90, 0, 2 * Math.PI);
        ctx.lineWidth = 2;
        ctx.strokeStyle = `white`;
        ctx.stroke();
        ctx.closePath();

        ctx.lineJoin = "round";
        ctx.lineWidth = 55;

        ctx.strokeRect(298, 199, bar_width, 2);

        ctx.strokeStyle = "black";
        ctx.strokeRect(300, 200, bar_width, 0)

        ctx.strokeStyle = '#f2e8c9';
        ctx.strokeRect(300, 200, bar_width * userData.exp / neededXP, 0)

        ctx.font = "bold 48px Sans";
        ctx.fillStyle = "#ffdd35";
        ctx.textAlign = "center";
        ctx.fillText(`#` + rank, 655, 45, 80);
        ctx.fillText(`${userData.level}`, 925, 45, 80);

        ctx.font = "bold 44px Sans";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(user.username, 160, 265, 200);

        ctx.fillStyle = "white";
        ctx.font = "bold 32px Serif"
        ctx.fillText(`Ранг`, 580, 45, 200);
        ctx.fillText(`Уровень`, 830, 45, 200);

        ctx.fillStyle = "#ff5759";
        ctx.font = "bold 34px Serif"
        ctx.fillText(`${userData.exp}/${neededXP} опыта`, 820, 150);

        ctx.fillStyle = "#3d158f";
        ctx.font = "bold 34px Serif"
        ctx.fillText(`${((userData.exp * 100) / neededXP).toFixed(0)}%/100%`, 350, 150)

        ctx.beginPath();
        ctx.arc(120, 120, 90, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(av, 10, 10, 220, 200)


        const att = new AttachmentBuilder(canvas.toBuffer(), {name: `rank.png`})
       /*  const embed = new EmbedBuilder()
            .setColor(process.env.bot_color)
            .setAuthor({
                name: `Опыт пользователя ${user.username}`
            })
            .setThumbnail(user.displayAvatarURL())
            .setTimestamp(Date.now())
            .setDescription(
                `**УРОВЕНЬ** - ${userData.level}
**Опыт** - ${userData.exp}/${neededXP}🌀
**Всего опыта** - ${userData.totalexp}`) */

        await interaction.editReply({
            files: [att]
        })
    }
};
