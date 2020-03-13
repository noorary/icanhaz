const Telegraf = require('telegraf');
const Composer = require('telegraf/composer');
const session = require('telegraf/session');
const Stage = require('telegraf/stage');
const Markup = require('telegraf/markup');
const WizardScene = require('telegraf/scenes/wizard');
require('dotenv').config();
console.log(process.env.TOKEN);

const icanhazbot = new Telegraf(process.env.TOKEN);

icanhazbot.start((ctx) => ctx.reply('Welcome to ICanHazBot!'));

var cats = [];
var tasks = [];

const NO_CATS = 'no catz :c';
const NO_TASKS = 'can i haz nothing :3';

icanhazbot.command('cats', (ctx) => printList(ctx, cats, NO_CATS));
icanhazbot.command('tasks', (ctx) => printList(ctx, tasks, NO_TASKS));

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
// stepHandler.use((ctx) => ctx.replyWithsMarkdown('Press `Next` button or type /next'))

const helloworld = new WizardScene(
    'helloworld',

    (ctx) => {
        ctx.reply('hello :3');
        return ctx.scene.leave();
    }
);

const cat = new WizardScene(
    'catadder',

    (ctx) => {
        ctx.reply('Plz gibe cat name');
        return ctx.wizard.next();
    },

    (ctx) => {
        newcat = ctx.message.text;

        ctx.reply(`You added cat ${newcat}`);
        cats.push(newcat);

        return ctx.scene.leave();
    }
);

const task = new WizardScene(
    'taskadder',

    (ctx) => {
        ctx.reply('Plz gibe task');
        return ctx.wizard.next();
    },

    (ctx) => {
        newtask = ctx.message.text;

        ctx.reply(`You added cat ${newtask}`);

        // todo: add task

        return ctx.scene.leave();
    }
);

const stage = new Stage([helloworld, cat, task], { default: 'helloworld' });
icanhazbot.use(session());
icanhazbot.use(stage.middleware());

icanhazbot.launch();

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
