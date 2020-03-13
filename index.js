const Telegraf = require('telegraf');
const Composer = require('telegraf/composer')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Markup = require('telegraf/markup')
const WizardScene = require('telegraf/scenes/wizard')
require('dotenv').config();
console.log(process.env.TOKEN);

const icanhazbot = new Telegraf(process.env.TOKEN);

icanhazbot.start((ctx) => ctx.reply('Welcome to ICanHazBot!'));

var cats = [];
var tasks = [];

icanhazbot.command('showcats', (ctx) => printList(ctx, cats, 'no catz :c'));
icanhazbot.command('showtasks', (ctx) =>
    printList(ctx, tasks, 'can i haz nothing :3')
);

/*
 * Print all items in list. If list is empty, show msg.
 */
function printList(ctx, mylist, nomsg) {
    if (mylist.length == 0) {
        ctx.reply(nomsg);
    } else {
        var tempStr = '';
        for (var i = 0; i < mylist.length - 1; i++) {
            tempStr = tempStr.concat(mylist[i] + '\n');
        }
        tempStr = tempStr.concat(mylist[mylist.length - 1]);
        ctx.reply(tempStr);
    }
}

icanhazbot.command('hello', (ctx) => ctx.reply('Hello'));

// const stepHandler = new Composer()
// stepHandler.action('next', (ctx) => {
//   ctx.reply('Step 2. Via inline button')
//   return ctx.wizard.next()
// })
// stepHandler.command('next', (ctx) => {
//   ctx.reply('Step 2. Via command')
//   return ctx.wizard.next()
// })
// stepHandler.use((ctx) => ctx.replyWithMarkdown('Press `Next` button or type /next'))


const catadd = new WizardScene(

    'Cat-adder',

    ctx => {
        ctx.reply("Please type cat name")
        return ctx.wizard.next()
    },

    ctx => {

        newcat = ctx.message.text

        ctx.reply(
            `You added cat ${newcat}`
        )
        cats.push(newcat)

        return ctx.scene.leave()

        
    }


)

const stage = new Stage([catadd], { default: 'Cat-adder' })
icanhazbot.use(session())
icanhazbot.use(stage.middleware())

icanhazbot.launch();
