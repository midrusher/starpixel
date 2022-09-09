const chalk = require(`chalk`);

module.exports = {
    name: `connected`,
    execute() {
        console.log(chalk.green(`[Статус базы данных] Подключено`))
    }
}