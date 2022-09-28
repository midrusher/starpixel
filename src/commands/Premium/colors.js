const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('../../events/client/start_bot/ready');
const { Temp } = require(`../../schemas/temp_items`)
const chalk = require(`chalk`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`colors`)
        .setDescription(`Выбрать цвет вашего ника`)
        .addSubcommand(subcommand => subcommand
            .setName(`set`)
            .setDescription(`Установить цвет`)
            .addStringOption(option => option
                .setName(`цвет`)
                .setDescription(`Выберите цвет, который хотите поставить`)
                .setAutocomplete(true)
                .setRequired(true))
        )
        .addSubcommand(subcommand => subcommand
            .setName(`reset`)
            .setDescription(`Сбросить текущий цвет`)
        ),

    async autoComplete(interaction, client) {

        const focusedValue = interaction.options.getFocused();
        const choices = ['Чёрный', 'Лазурный', 'Пурпурный', 'Сиреневый', 'Ализариновый', 'Фламинговый', 'Изумрудный', 'Яблочный', 'Салатовый', 'Песочный'];
        const filtered = choices.filter(choice => choice.startsWith(focusedValue));
        await interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice })),
        );

    },

    async execute(interaction, client) {

        const { roles } = interaction.member //Участник команды
        const member = interaction.member
        const r1 = `595893144055316490`; //Чёрный
        const r2 = `595892599693246474`; //Лазурный
        const r3 = `595892677451710468`; //Пурпурный
        const r4 = `595892238370996235`; //Сиреневый
        const r5 = `589770984391966760`; //Фламинговый
        const r6 = `595893568485326862`; //Изумрудный 
        const r7 = `630395361508458516`; //Яблочный
        const r8 = `595892930204401665`; //Салатовый
        const r9 = `595889341058777088`; //Песочный
        const r10 = `1024741633947873401`; //Ализариновый

        switch (interaction.options.getSubcommand()) {
            case `set`: {
                const { Guild } = require(`../../schemas/guilddata`)
                const pluginData = await Guild.findOne({ id: interaction.guild.id })
                if (pluginData.plugins.premium === false) return interaction.reply({ content: `Данный плагин отключён! Попробуйте позже!`, ephemeral: true })
                if (!member.roles.cache.has(`850336260265476096`)) return interaction.reply({
                    content: `У вас нет подписки VIP, чтобы использовать данную команду!`,
                    ephemeral: true
                })
                switch (interaction.options.getString(`цвет`)) {
                    case `Чёрный`: {
                        const role = await interaction.guild.roles
                            .fetch(r1) //ID цвета
                            .catch(console.error);
                        if (roles.cache.has(r1)) return interaction.reply({
                            content: `У вас уже есть ${interaction.options.getString(`цвет`)} цвет!`,
                            ephemeral: true
                        });
                        interaction.reply({
                            content: `Вы выбрали ${interaction.options.getString(`цвет`)} цвет!`,
                            ephemeral: true
                        })
                        await roles.remove([r2, r3, r4, r5, r6, r7, r8, r9, r10]).catch(console.error)
                        await roles.add(role).catch(console.error)
                    }

                        break;
                    case `Лазурный`: {
                        const role = await interaction.guild.roles
                            .fetch(r2) //ID цвета
                            .catch(console.error);
                        if (roles.cache.has(r2)) return interaction.reply({
                            content: `У вас уже есть ${interaction.options.getString(`цвет`)} цвет!`,
                            ephemeral: true
                        });
                        interaction.reply({
                            content: `Вы выбрали ${interaction.options.getString(`цвет`)} цвет!`,
                            ephemeral: true
                        })
                        await roles.remove([r1, r3, r4, r5, r6, r7, r8, r9, r10]).catch(console.error)
                        await roles.add(role).catch(console.error)
                    }

                        break;
                    case `Пурпурный`: {
                        const role = await interaction.guild.roles
                            .fetch(r3) //ID цвета
                            .catch(console.error);
                        if (roles.cache.has(r3)) return interaction.reply({
                            content: `У вас уже есть ${interaction.options.getString(`цвет`)} цвет!`,
                            ephemeral: true
                        });
                        interaction.reply({
                            content: `Вы выбрали ${interaction.options.getString(`цвет`)} цвет!`,
                            ephemeral: true
                        })
                        await roles.remove([r2, r1, r4, r5, r6, r7, r8, r9, r10]).catch(console.error)
                        await roles.add(role).catch(console.error)
                    }

                        break;
                    case `Сиреневый`: {
                        const role = await interaction.guild.roles
                            .fetch(r4) //ID цвета
                            .catch(console.error);
                        if (roles.cache.has(r4)) return interaction.reply({
                            content: `У вас уже есть ${interaction.options.getString(`цвет`)} цвет!`,
                            ephemeral: true
                        });
                        interaction.reply({
                            content: `Вы выбрали ${interaction.options.getString(`цвет`)} цвет!`,
                            ephemeral: true
                        })
                        await roles.remove([r2, r3, r1, r5, r6, r7, r8, r9, r10]).catch(console.error)
                        await roles.add(role).catch(console.error)
                    }

                        break;
                    case `Фламинговый`: {
                        const role = await interaction.guild.roles
                            .fetch(r5) //ID цвета
                            .catch(console.error);
                        if (roles.cache.has(r5)) return interaction.reply({
                            content: `У вас уже есть ${interaction.options.getString(`цвет`)} цвет!`,
                            ephemeral: true
                        });
                        interaction.reply({
                            content: `Вы выбрали ${interaction.options.getString(`цвет`)} цвет!`,
                            ephemeral: true
                        })
                        await roles.remove([r2, r3, r4, r1, r6, r7, r8, r9, r10]).catch(console.error)
                        await roles.add(role).catch(console.error)
                    }

                        break;
                    case `Изумрудный`: {
                        const role = await interaction.guild.roles
                            .fetch(r6) //ID цвета
                            .catch(console.error);
                        if (roles.cache.has(r6)) return interaction.reply({
                            content: `У вас уже есть ${interaction.options.getString(`цвет`)} цвет!`,
                            ephemeral: true
                        });
                        interaction.reply({
                            content: `Вы выбрали ${interaction.options.getString(`цвет`)} цвет!`,
                            ephemeral: true
                        })
                        await roles.remove([r2, r3, r4, r5, r1, r7, r8, r9, r10]).catch(console.error)
                        await roles.add(role).catch(console.error)
                    }

                        break;
                    case `Яблочный`: {
                        const role = await interaction.guild.roles
                            .fetch(r7) //ID цвета
                            .catch(console.error);
                        if (roles.cache.has(r7)) return interaction.reply({
                            content: `У вас уже есть ${interaction.options.getString(`цвет`)} цвет!`,
                            ephemeral: true
                        });
                        interaction.reply({
                            content: `Вы выбрали ${interaction.options.getString(`цвет`)} цвет!`,
                            ephemeral: true
                        })
                        await roles.remove([r2, r3, r4, r5, r6, r1, r8, r9, r10]).catch(console.error)
                        await roles.add(role).catch(console.error)
                    }

                        break;
                    case `Салатовый`: {
                        const role = await interaction.guild.roles
                            .fetch(r8) //ID цвета
                            .catch(console.error);
                        if (roles.cache.has(r8)) return interaction.reply({
                            content: `У вас уже есть ${interaction.options.getString(`цвет`)} цвет!`,
                            ephemeral: true
                        });
                        interaction.reply({
                            content: `Вы выбрали ${interaction.options.getString(`цвет`)} цвет!`,
                            ephemeral: true
                        })
                        await roles.remove([r2, r3, r4, r5, r6, r7, r1, r9, r10]).catch(console.error)
                        await roles.add(role).catch(console.error)
                    }

                        break;
                    case `Песочный`: {
                        const role = await interaction.guild.roles
                            .fetch(r9) //ID цвета
                            .catch(console.error);
                        if (roles.cache.has(r9)) return interaction.reply({
                            content: `У вас уже есть ${interaction.options.getString(`цвет`)} цвет!`,
                            ephemeral: true
                        });
                        interaction.reply({
                            content: `Вы выбрали ${interaction.options.getString(`цвет`)} цвет!`,
                            ephemeral: true
                        })
                        await roles.remove([r2, r3, r4, r5, r6, r7, r8, r1, r10]).catch(console.error)
                        await roles.add(role).catch(console.error)
                    }

                        break;

                    case `Ализариновый`: {
                        const role = await interaction.guild.roles
                            .fetch(r10) //ID цвета
                            .catch(console.error);
                        if (roles.cache.has(r10)) return interaction.reply({
                            content: `У вас уже есть ${interaction.options.getString(`цвет`)} цвет!`,
                            ephemeral: true
                        });
                        interaction.reply({
                            content: `Вы выбрали ${interaction.options.getString(`цвет`)} цвет!`,
                            ephemeral: true
                        })
                        await roles.remove([r2, r3, r4, r5, r6, r7, r8, r1, r9]).catch(console.error)
                        await roles.add(role).catch(console.error)
                    }
                        break;

                    default: {
                        await interaction.reply({
                            content: `Данной опции не существует! Выберите одну из предложенных!`,
                            ephemeral: true
                        })
                    }
                        break;
                }
            }

                break;

            case `reset`: {
                const tempData = await Temp.findOne({ userid: interaction.user.id, guildid: interaction.guild.id, color: true })
                if (tempData) {
                    tempData.delete()
                }
                await interaction.reply({
                    content: `Вы убрали свой цвет!`,
                    ephemeral: true
                })
                await roles.remove([r2, r3, r4, r5, r6, r7, r8, r1, r9]).catch(console.error)
            }
            default: {
                await interaction.reply({
                    content: `Данной опции не существует! Выберите одну из предложенных!`,
                    ephemeral: true
                })
            }
                break;
        }
        console.log(chalk.green(`[Использована команда]`) + chalk.gray(`: ${interaction.user.tag} использовал команду /colors ${interaction.options.getSubcommand()}`))

    }

};