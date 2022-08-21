module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Бот запущен! ${client.user.tag} был запущен`)
    }
}