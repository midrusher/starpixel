const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder, WebhookClient } = require('discord.js');
const { createWriteStream } = require(`node:fs`)
const prism = require(`prism-media`);
const { pipeline } = require(`node:stream`);
const ffmpeg = require(`ffmpeg`)
const sleep = require(`util`).promisify(setTimeout);
const fs = require(`fs`)
const { joinVoiceChannel, entersState, VoiceConnectionStatus, EndBehaviorType } = require('@discordjs/voice');
const { execute } = require('../../../src/events/client/start_bot/ready');
const fetch = require(`node-fetch`);
const api = process.env.hypixel_apikey;
const { User } = require(`../../../src/schemas/userdata`)
const { Guild } = require(`../../../src/schemas/guilddata`)
const { loadImage, createCanvas } = require(`@napi-rs/canvas`)
const chalk = require(`chalk`);
const prettyMilliseconds = require(`pretty-ms`); //ДОБАВИТЬ В ДРУГИЕ

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`record`)
        .setDescription(`Начать запись разговора`),

    async execute(interaction, client) {
        const voiceChannel = interaction.member.voice.channel
        /* Check if the bot is in voice channel */
        let connection = client.voiceManager.get(interaction.channel.guild.id)

        /* If the bot is not in voice channel */
        if (!connection) {
            /* if user is not in any voice channel then return the error message */
            if(!voiceChannel) return interaction.reply({
                content: "You must be in a voice channel to use this command!",
                ephemeral: true
            
            })

            /* Join voice channel*/
            connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                selfDeaf: false,
                selfMute: true,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            });

            /* Add voice state to collection */
            client.voiceManager.set(interaction.channel.guild.id, connection);
            await entersState(connection, VoiceConnectionStatus.Ready, 20e3);
            const receiver = connection.receiver;

            /* When user speaks in vc*/
            receiver.speaking.on('start', (userId) => {
                if(userId !== interaction.user.id) return;
                /* create live stream to save audio */
                createListeningStream(receiver, userId, client.users.cache.get(userId));
            });

            /* Return success message */
            return interaction.channel.send(`🎙️ I am now recording ${voiceChannel.name}`);
        
            /* If the bot is in voice channel */
        } else if (connection) {
            /* Send waiting message */
            const msg = await interaction.channel.send("Please wait while I am preparing your recording...")
            /* wait for 5 seconds */
            await sleep(5000)

            /* disconnect the bot from voice channel */
            connection.destroy();

            /* Remove voice state from collection */
            client.voiceManager.delete(interaction.channel.guild.id)
            const filename = `./src/recordings/${interaction.user.id}`;

            /* Create ffmpeg command to convert pcm to mp3 */
            const process = new ffmpeg(`${filename}.pcm`);
            process.then(function (audio) {
                audio.fnExtractSoundToMP3(`${filename}.mp3`, async function (error, file) {
                    if (error) return console.log(error)
                    await msg.edit({
                        content: `🔉 Here is your recording!`,
                        files: [new AttachmentBuilder(`./src/recordings/${interaction.user.id}.mp3`, 'recording.mp3')]
                    });

                    //delete both files
                    fs.unlinkSync(`${filename}.pcm`)
                    fs.unlinkSync(`${filename}.mp3`)
                });
            }, function (err) {
                /* handle error by sending error message to discord */
                return msg.edit(`❌ An error occurred while processing your recording: ${err.message}`);
            });

        }
    }
};

function createListeningStream(receiver, userId, user) {
    const opusStream = receiver.subscribe(userId, {
        end: {
            behavior: EndBehaviorType.AfterSilence,
            duration: 100,
        },
    });

    const oggStream = new prism.opus.OggLogicalBitstream({
        opusHead: new prism.opus.OpusHead({
            channelCount: 2,
            sampleRate: 48000,
        }),
        pageSizeControl: {
            maxPackets: 10,
        },
    });
    const filename = `./src/recordings/${user.id}.pcm`;

    const out = createWriteStream(filename, { flags: 'a' });
    console.log(`👂 Started recording ${filename}`);

    pipeline(opusStream, oggStream, out, (err) => {
        if (err) {
            console.warn(`❌ Error recording file ${filename} - ${err.message}`);
        } else {
            
        }
    });
}