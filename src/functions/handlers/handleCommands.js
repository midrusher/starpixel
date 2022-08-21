const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync('./src/commands');
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith('.js'));

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        client.commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
      }
    }

    const clientId = '883421063369859122';
    const guildId = '320193302844669959';
    const rest = new REST({ version: '9' }).setToken(process.env.token);
    try {
      console.log('Обновление команд приложения.');

      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: client.commandArray,
      });
      console.log('Команды обновлены.');
    } catch (error) {
      console.error(error);
    }
  };
};