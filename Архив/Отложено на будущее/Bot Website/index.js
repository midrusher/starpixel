const { REST } = require('@discordjs/rest');
const { Routes } = require(`discord-api-types/v10`);
const fs = require('fs');
const chalk = require(`chalk`);
const express = require(`express`)
const ToDoRoutes = require(`./routes/todos`)
const exphbs = require(`express-handlebars`)
const PORT = process.env.PORT || 3000

module.exports = (client) => {
    client.WebsiteMain = async () => {
        const app = express()
        const hbs = exphbs.create({
            defaultLayout: 'main',
            extname: 'hbs'
        })

        app.engine('hbs', hbs.engine)
        app.set('view engine', 'hbs')
        app.set('views', 'views')
        app.use(ToDoRoutes)

        app.listen(PORT, () => {
            console.log(`Сайт запущен`)
        })
    };
};