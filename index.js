const Telegraf = require('telegraf')
require('dotenv').config()
console.log(process.env.TOKEN)

const icanhazbot = new Telegraf(process.env.TOKEN)

icanhazbot.start(ctx => ctx.reply("Welcome to ICanHazBot!"))

var cats = ["Luke", "Leia", "Mökö", "Manteli"]

icanhazbot.command('showcats', ctx => ctx.reply(cats[0]))

icanhazbot.command('hello', ctx => ctx.reply('Hello'));

icanhazbot.launch()