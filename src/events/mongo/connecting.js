const chalk = require(`chalk`);

module.exports = {
    name: `connecting`,
    async execute() {
        console.log(chalk.cyan(`[Статус базы данных] Идёт подключение...`))
    }
}