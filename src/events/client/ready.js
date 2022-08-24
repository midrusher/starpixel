module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`[${Date.now()}] Бот запущен! ${client.user.tag} был запущен`)
    }
}