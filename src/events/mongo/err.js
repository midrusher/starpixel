const chalk = require(`chalk`);

module.exports = {
    name: `err`,
    execute(err) {
        console.log(chalk.red(`[Статус базы данных] Произошла ошибка
${err}`))
    }
}