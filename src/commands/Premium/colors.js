const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('../../events/client/start_bot/ready');
const { Temp } = require(`../../schemas/temp_items`)
const chalk = require(`chalk`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`colors`)
        .setDescription(`Выбрать цвет вашего ника`)
        .setDMPermission(false)
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
        const choices = ['Чёрный', 'Лазурный', 'Пурпурный', 'Сиреневый', 'Ализариновый', 'Фламинговый', 'Изумрудный', 'Яблочный', 'Салатовый', 'Песочный', 'Летний', 'Хэллоуинский', 'Новогодний', 'Пасхальный'];
        const filtered = choices.filter(choice => choice.toLowerCase().includes(focusedValue.toLowerCase()));
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
        const r11 = `1030760792359960607`; //Летний
        const r12 = `1030760791722434620`; //Хэллоуинский
        const r13 = `1030760793991565422`; //Новогодний
        const r14 = `1030760793672785991`; //Пасхальный

        switch (interaction.options.getSubcommand()) {
            case `set`: {
                const { Guild } = require(`../../schemas/guilddata`)
                const pluginData = await Guild.findOne({ id: interaction.guild.id })
                if (pluginData.plugins.premium === false) return interaction.reply({ content: `Данный плагин отключён! Попробуйте позже!`, ephemeral: true })

                switch (interaction.options.getString(`цвет`)) {
                    case `Чёрный`: {
                        if (!member.roles.cache.has(`850336260265476096`)) return interaction.reply({
                            content: `У вас нет подписки VIP, чтобы использовать данную команду!`,
                            ephemeral: true
                        })
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
                        await roles.remove([r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14]).catch(console.error)
                        await roles.add(role).catch(console.error)
                    }

                        break;
                    case `Лазурный`: {
                        if (!member.roles.cache.has(`850336260265476096`)) return interaction.reply({
                            content: `У вас нет подписки VIP, чтобы использовать данную команду!`,
                            ephemeral: true
                        })
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
                        await roles.remove([r1, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14]).catch(console.error)
                        await roles.add(role).catch(console.error)
                    }

                        break;
                    case `Пурпурный`: {
                        if (!member.roles.cache.has(`850336260265476096`)) return interaction.reply({
                            content: `У вас нет подписки VIP, чтобы использовать данную команду!`,
                            ephemeral: true
                        })
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
                        await roles.remove([r2, r1, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14]).catch(console.error)
                        await roles.add(role).catch(console.error)
                    }

                        break;
                    case `Сиреневый`: {
                        if (!member.roles.cache.has(`850336260265476096`)) return interaction.reply({
                            content: `У вас нет подписки VIP, чтобы использовать данную команду!`,
                            ephemeral: true
                        })
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
                        await roles.remove([r2, r3, r1, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14]).catch(console.error)
                        await roles.add(role).catch(console.error)
                    }

                        break;
                    case `Фламинговый`: {
                        if (!member.roles.cache.has(`850336260265476096`)) return interaction.reply({
                            content: `У вас нет подписки VIP, чтобы использовать данную команду!`,
                            ephemeral: true
                        })
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
                        await roles.remove([r2, r3, r4, r1, r6, r7, r8, r9, r10, r11, r12, r13, r14]).catch(console.error)
                        await roles.add(role).catch(console.error)
                    }

                        break;
                    case `Изумрудный`: {
                        if (!member.roles.cache.has(`850336260265476096`)) return interaction.reply({
                            content: `У вас нет подписки VIP, чтобы использовать данную команду!`,
                            ephemeral: true
                        })
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
                        await roles.remove([r2, r3, r4, r5, r1, r7, r8, r9, r10, r11, r12, r13, r14]).catch(console.error)
                        await roles.add(role).catch(console.error)
                    }

                        break;
                    case `Яблочный`: {
                        if (!member.roles.cache.has(`850336260265476096`)) return interaction.reply({
                            content: `У вас нет подписки VIP, чтобы использовать данную команду!`,
                            ephemeral: true
                        })
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
                        await roles.remove([r2, r3, r4, r5, r6, r1, r8, r9, r10, r11, r12, r13, r14]).catch(console.error)
                        await roles.add(role).catch(console.error)
                    }

                        break;
                    case `Салатовый`: {
                        if (!member.roles.cache.has(`850336260265476096`)) return interaction.reply({
                            content: `У вас нет подписки VIP, чтобы использовать данную команду!`,
                            ephemeral: true
                        })
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
                        await roles.remove([r2, r3, r4, r5, r6, r7, r1, r9, r10, r11, r12, r13, r14]).catch(console.error)
                        await roles.add(role).catch(console.error)
                    }

                        break;
                    case `Песочный`: {
                        if (!member.roles.cache.has(`850336260265476096`)) return interaction.reply({
                            content: `У вас нет подписки VIP, чтобы использовать данную команду!`,
                            ephemeral: true
                        })
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
                        await roles.remove([r2, r3, r4, r5, r6, r7, r8, r1, r10, r11, r12, r13, r14]).catch(console.error)
                        await roles.add(role).catch(console.error)
                    }

                        break;

                    case `Ализариновый`: {
                        if (!member.roles.cache.has(`850336260265476096`)) return interaction.reply({
                            content: `У вас нет подписки VIP, чтобы использовать данную команду!`,
                            ephemeral: true
                        })
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
                        await roles.remove([r2, r3, r4, r5, r6, r7, r8, r1, r9, r11, r12, r13, r14]).catch(console.error)
                        await roles.add(role).catch(console.error)
                    }
                        break;
                    case `Летний`: {
                        if (!member.roles.cache.has(`1030757074839277608`)) return interaction.reply({
                            content: `У вас нет сезонной роли, чтобы использовать данную команду!`,
                            ephemeral: true
                        })
                        const role = await interaction.guild.roles
                            .fetch(r11) //ID цвета
                            .catch(console.error);
                        if (roles.cache.has(r11)) return interaction.reply({
                            content: `У вас уже есть ${interaction.options.getString(`цвет`)} цвет!`,
                            ephemeral: true
                        });
                        interaction.reply({
                            content: `Вы выбрали ${interaction.options.getString(`цвет`)} цвет!`,
                            ephemeral: true
                        })
                        await roles.remove([r2, r3, r4, r5, r6, r7, r8, r1, r9, r10, r12, r13, r14]).catch(console.error)
                        await roles.add(role).catch(console.error)
                    }
                        break;
                    case `Хэллоуинский`: {
                        if (!member.roles.cache.has(`1030757644320915556`)) return interaction.reply({
                            content: `У вас нет сезонной роли, чтобы использовать данную команду!`,
                            ephemeral: true
                        })
                        const role = await interaction.guild.roles
                            .fetch(r12) //ID цвета
                            .catch(console.error);
                        if (roles.cache.has(r12)) return interaction.reply({
                            content: `У вас уже есть ${interaction.options.getString(`цвет`)} цвет!`,
                            ephemeral: true
                        });
                        interaction.reply({
                            content: `Вы выбрали ${interaction.options.getString(`цвет`)} цвет!`,
                            ephemeral: true
                        })
                        await roles.remove([r2, r3, r4, r5, r6, r7, r8, r1, r9, r11, r10, r13, r14]).catch(console.error)
                        await roles.add(role).catch(console.error)
                    }
                        break;
                    case `Новогодний`: {
                        if (!member.roles.cache.has(`1030757867373998190`)) return interaction.reply({
                            content: `У вас нет сезонной роли, чтобы использовать данную команду!`,
                            ephemeral: true
                        })
                        const role = await interaction.guild.roles
                            .fetch(r13) //ID цвета
                            .catch(console.error);
                        if (roles.cache.has(r13)) return interaction.reply({
                            content: `У вас уже есть ${interaction.options.getString(`цвет`)} цвет!`,
                            ephemeral: true
                        });
                        interaction.reply({
                            content: `Вы выбрали ${interaction.options.getString(`цвет`)} цвет!`,
                            ephemeral: true
                        })
                        await roles.remove([r2, r3, r4, r5, r6, r7, r8, r1, r9, r11, r12, r10, r14]).catch(console.error)
                        await roles.add(role).catch(console.error)
                    }
                        break;
                    case `Пасхальный`: {
                        if (!member.roles.cache.has(`1030757633231167538`)) return interaction.reply({
                            content: `У вас нет сезонной роли, чтобы использовать данную команду!`,
                            ephemeral: true
                        })
                        const role = await interaction.guild.roles
                            .fetch(r14) //ID цвета
                            .catch(console.error);
                        if (roles.cache.has(r14)) return interaction.reply({
                            content: `У вас уже есть ${interaction.options.getString(`цвет`)} цвет!`,
                            ephemeral: true
                        });
                        interaction.reply({
                            content: `Вы выбрали ${interaction.options.getString(`цвет`)} цвет!`,
                            ephemeral: true
                        })
                        await roles.remove([r2, r3, r4, r5, r6, r7, r8, r1, r9, r11, r12, r13, r10]).catch(console.error)
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