const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder, WebhookClient } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const { execute } = require('../../events/client/start_bot/ready');
const fetch = require(`node-fetch`);
const api = process.env.hypixel_apikey;
const { User } = require(`../../schemas/userdata`)
const { Guild } = require(`../../schemas/guilddata`)
const { loadImage, createCanvas } = require(`@napi-rs/canvas`)
const chalk = require(`chalk`);
const prettyMilliseconds = require(`pretty-ms`); //ДОБАВИТЬ В ДРУГИЕ

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`test`)
        .setDescription(`test`),

    async execute(interaction, client) {
        let level = 0
        let xpneeded = 0
        let responseA = await fetch(`https://api.hypixel.net/guild?key=${api}&id=5c1902fc77ce84cd430f3959`)
        if (responseA.ok) {
            let json = await responseA.json()
            let hpguild = json.guild

            //Assign a level value based on guild.exp value
            if (hpguild.exp < 100000) level = 0
            else if (hpguild.exp < 250000) level = 1
            else if (hpguild.exp < 500000) level = 2
            else if (hpguild.exp < 1000000) level = 3
            else if (hpguild.exp < 1750000) level = 4
            else if (hpguild.exp < 2750000) level = 5
            else if (hpguild.exp < 4000000) level = 6
            else if (hpguild.exp < 5500000) level = 7
            else if (hpguild.exp < 7500000) level = 8
            else if (hpguild.exp >= 7500000 && hpguild.exp < 20000000) level = Math.floor((hpguild.exp - 7500000) / 2500000) + 9
            else if (hpguild.exp >= 20000000) level = Math.floor((hpguild.exp - 20000000) / 3000000) + 14

            if (hpguild.exp < 100000) xpneeded = 100000 - hpguild.exp
            else if (hpguild.exp < 250000) xpneeded = 250000 - hpguild.exp
            else if (hpguild.exp < 500000) xpneeded = 500000 - hpguild.exp
            else if (hpguild.exp < 1000000) xpneeded = 1000000 - hpguild.exp
            else if (hpguild.exp < 1750000) xpneeded = 1750000 - hpguild.exp
            else if (hpguild.exp < 2750000) xpneeded = 2750000 - hpguild.exp
            else if (hpguild.exp < 4000000) xpneeded = 4000000 - hpguild.exp
            else if (hpguild.exp < 5500000) xpneeded = 5500000 - hpguild.exp
            else if (hpguild.exp < 7500000) xpneeded = 7500000 - hpguild.exp
            else if (hpguild.exp >= 7500000 && hpguild.exp < 20000000) xpneeded = 20000000 - hpguild.exp
            else if (hpguild.exp >= 20000000) xpneeded = ((Math.floor((hpguild.exp - 20000000) / 3000000) + 1) * 3000000) - (hpguild.exp - 20000000)


        const percent = 100 - (Math.round((xpneeded / 3000000) * 100))
        console.log(level)
        console.log(percent)
        console.log(xpneeded)
    }}
};