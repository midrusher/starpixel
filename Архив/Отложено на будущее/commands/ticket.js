const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`account_ticket`)
                    .setLabel(`Изменение аккаунта`)
                    .setEmoji(`🔰`)
                    .setStyle(ButtonStyle.Primary)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`report_ticket`)
                    .setLabel(`Отправить жалобу`)
                    .setEmoji(`🚫`)
                    .setStyle(ButtonStyle.Primary)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`kick_ticket`)
                    .setLabel(`Оспорить исключение`)
                    .setEmoji(`⚖`)
                    .setStyle(ButtonStyle.Primary)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`misc_ticket`)
                    .setLabel(`Прочий вопрос`)
                    .setEmoji(`❓`)
                    .setStyle(ButtonStyle.Primary)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`shop_ticket`)
                    .setLabel(`Скоро...`)
                    .setEmoji(`💰`)
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true)
            )

        const msgEmbed = new EmbedBuilder()
            .setTitle(`Поддержка гильдии Starpixel`)
            .setThumbnail(interaction.guild.iconURL())
            .setColor(linksInfo.bot_color)
            .setDescription(`Если вы хотите открыть канал с поддержкой, вы можете нажать на любую из предложенных ниже кнопочек. **Помните, что вы не можете открыть более 1 канала**!
        
Вы можете открыть обращение по следующим причинам: 
• Хотите изменить аккаунт Discord или Minecraft (только для участников гильдии)
• Хотите пожаловаться на пользователя по причинам, не зависищам от сообщений в чате.
            \**Чтобы пожаловаться на сообщение в чате, нажмите правой кнопкой по сообщение -> Приложения -> Пожаловаться*
• Оспорить ваше исключение из гильдии (только в случае, если вы были исключены)
• Задать вопрос, который вы не можете задать в чате или <#${process.env.ask_channel}> по определённым причинам`)

                await interaction.channel.send({
                    embeds: [msgEmbed],
                    components: [row]
                })