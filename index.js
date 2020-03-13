const Telegraf = require('telegraf')
require('dotenv').config()
console.log(process.env.TOKEN)

const icanhazbot = new Telegraf(process.env.TOKEN)

icanhazbot.start(ctx => ctx.reply("Welcome to ICanHazBot!"))

icanhazbot.command('hello', ctx => ctx.reply('Hello'));

icanhazbot.launch()