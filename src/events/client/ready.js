const chalk = require(`chalk`);

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(chalk.blue(`[Бот Starpixel] Бот запущен! ${client.user.tag} был запущен`))
    }
}