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

// ------------- SCENES -------------

const defaultscene = new WizardScene(
    'defaultscene',

    (ctx) => {
        ctx.reply('hello :3');
        // TODO: add commands
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
        var newtask = { name: ctx.message.text, done: false };

        tasks.push(newtask);

        ctx.reply(`You added task ${newtask.name}`);

        return ctx.scene.leave();
    }
);

const doned = new WizardScene(
    'doned',

    (ctx) => {
        ctx.reply('Plz gibe task u have doned');
        return ctx.wizard.next();
    },

    (ctx) => {
        var name = ctx.message.text
        markDoned(name)

        return ctx.scene.leave();

    }
)

// ------------- SETUP -------------

const stage = new Stage([defaultscene, cat, task, doned]);
icanhazbot.use(session());
icanhazbot.use(stage.middleware());

// ------------- COMMANDS -------------

icanhazbot.command('cats', (ctx) => printList(ctx, cats, catPrinter, NO_CATS));
icanhazbot.command('tasks', (ctx) =>
    printList(ctx, tasks, taskPrinter, NO_TASKS)
);

icanhazbot.command('cat', (ctx) => {
    ctx.scene.enter('catadder');
});

icanhazbot.command('task', (ctx) => {
    ctx.scene.enter('taskadder');
});

icanhazbot.command('done', (ctx) => {
    ctx.scene.enter('doned')
})

icanhazbot.command('clear', (ctx) => clearDoned())

icanhazbot.command('hello', (ctx) => ctx.reply('Hello'));

// ------------- LAUNCH -------------

icanhazbot.launch();

// ------------- UTILS -------------

/*
 * Print all items in list. If list is empty, show msg.
 */
function printList(ctx, mylist, formatter, nomsg) {
    if (mylist.length == 0) {
        ctx.reply(nomsg);
    } else {
        var tempStr = '';
        for (var i = 0; i < mylist.length - 1; i++) {
            tempStr = tempStr.concat(formatter(mylist[i]) + '\n');
        }
        tempStr = tempStr.concat(formatter(mylist[mylist.length - 1]));
        ctx.reply(tempStr);
    }
}

function markDoned(name, done) {
    for (var i in tasks) {
        if ((tasks[i].name = name)) {
            tasks[i].done = true;
            break;
        }
    }
}

function clearDoned() {
    for(var i in tasks) {
        tasks[i].done = false
    }
}

function taskPrinter(task) {
    const doned = task.done ? ':3' : ':<';
    return task.name + ', doned? ' + doned;
}

function catPrinter(cat) {
    return cat;
}