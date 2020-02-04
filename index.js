const Telegraf = require('telegraf')
require('dotenv').config()
console.log(process.env.TOKEN)

const laudebot = new Telegraf(process.env.TOKEN)

// runs on command /destroy
laudebot.command('destroy', ctx => ctx.reply('commensing destruction of all human life'))

// runs on command /start and is equivalent to laudebot.command('start', ctx => ...)
laudebot.start(ctx => ctx.reply('At your service'))

// runs when audio is sent to the bot
laudebot.on('audio', ctx => ctx.reply('You sound like an angel!'))

// runs when a sticker or a photo is sent to the bot
laudebot.on(['sticker', 'photo'], ctx => {
  // use ctx.message to access information about the message
  const chatId = ctx.message.chat.id
  // this is equivalent to ctx.reply(...)
  return ctx.telegram.sendMessage(chatId, 'Have you lost weight?')
})

// runs when someone types 'wiener' to the bot
laudebot.hears('wiener', ctx => ctx.reply('snitchel'))

laudebot.launch()