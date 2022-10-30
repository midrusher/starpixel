const chalk = require(`chalk`);
const linksInfo = require(`../../../discord structure/links.json`)

module.exports = {
    name: `err`,
    execute(err) {
        console.log(chalk.red(`[Статус базы данных] Произошла ошибка
${err}`))
    }
}