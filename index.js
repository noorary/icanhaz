const Telegraf = require('telegraf')
require('dotenv').config()
console.log(process.env.TOKEN)

const icanhazbot = new Telegraf(process.env.TOKEN)