const chalk = require(`chalk`);
const linksInfo = require(`../../../discord structure/links.json`)

module.exports = {
    name: `connected`,
    execute() {
        console.log(chalk.green(`[Статус базы данных] Подключено`))
    }
}