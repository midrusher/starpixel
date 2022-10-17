const { REST } = require('@discordjs/rest');
const { Routes } = require(`discord-api-types/v10`);
const fs = require('fs');
const chalk = require(`chalk`)
const cron = require(`node-cron`)

module.exports = (client) => {
    client.repeatFunctions = async () => {
        
        console.log(`enabled`)
        setInterval(async () => {
            //Items
            client.ActExp(); //Опыт активности подсчет

        }, 30000);

        setInterval(async () => {
            //Items
            client.temp_roles(); //Уборка временных ролей

        }, 60000);

        setInterval(async () => {
            //Items
            client.rank_update(); //Обновление рангов

            //Profiles
            client.AutoElements(); //Автовыдача стихий
            client.AutoStars(); //Автовыдача звезд
            client.UpdateNicknames(); //Обновление никнеймов в базе данных
            client.haspremium(); //Проверка на наличие подписки
            client.removeNonPremiumColors(); //Уборка цветов у участников без VIP
            client.updatenicks(); //Изменение никнеймов Discord

            //Seasonal
            client.halloweenRewards(); //Выдача хэллоуинских наград (Если сезон активен)

            //Storages
            client.birthdayChannel(); //Обновление канала с днями рождения
            client.statsChannel(); //Обновление каналов со статистикой
            client.update_members(); //Обновление каналов с участниками

        }, 600000);

        client.emojiUpdate(); //Запланированное обновление эмоджи
        client.top_3_gexp(); //Запланированный подсчёт топ-3 по GEXP
        client.halloweenEnd(); //Запланированное начало Хэллоуина
        client.halloweenStart(); //Запланированный конец Хэллоуина
        client.wish_birthday(); //Запланированное поздравление с днем рождения
    };
};