const Telegraf = require('telegraf')
require('dotenv').config()
console.log(process.env.TOKEN)

const laudebot = new Telegraf(process.env.TOKEN)

laudebot.start(ctx => ctx.reply('At your service'))

laudebot.on('text', ctx => {
  if (ctx.message.text === 'Hello') {
    ctx.reply('World')
  } else {
    ctx.reply('Happy hacking!')
  }
})

laudebot.launch()