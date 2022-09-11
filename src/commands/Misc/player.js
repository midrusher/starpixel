const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const { execute } = require('../../events/client/start_bot/ready');
const fetch = require(`node-fetch`);
const api = process.env.hypixel_apikey;
const { User } = require(`../../schemas/userdata`)
const { Guild } = require(`../../schemas/guilddata`)
const {loadImage, createCanvas } = require(`@napi-rs/canvas`)
const chalk = require(`chalk`);
const prettyMilliseconds = require(`pretty-ms`); //ДОБАВИТЬ В ДРУГИЕ

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`test`)
        .setDescription(`test`),

    async execute(interaction, client) {
        const canvas = createCanvas(1000, 300),
            ctx = canvas.getContext('2d'),
            bg = await loadImage(`./src/assets/Cards/Join.png`),
            av = await loadImage(interaction.user.displayAvatarURL({ format: 'png', dynamic: false }))

        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(140, 140, 100, 0, 2 * Math.PI);
        ctx.lineWidth = 2;
        ctx.strokeStyle = `white`;
        ctx.stroke();
        ctx.closePath();

        ctx.font = "bold 44px Sans";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(`${interaction.user.tag}`, 650, 115, 1000);

        ctx.font = "bold 34px Sans";
        ctx.fillStyle = "#c9ff50";
        ctx.textAlign = "center";
        ctx.fillText(`Пользователь присоединился:`, 650, 65, 1000);
        ctx.fillText(`Он является #${interaction.guild.memberCount}-ым`, 650, 185, 1000);
        ctx.fillText(`участником сервера!`, 650, 225, 1000);

        ctx.beginPath();
        ctx.arc(140, 140, 100, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(av, 22, 22, 220, 220)




            const att = new AttachmentBuilder(canvas.toBuffer(), {name: `join.png`})
            await interaction.reply({
                files: [att]
            })
    }
};