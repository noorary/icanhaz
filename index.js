const Telegraf = require('telegraf');
const Composer = require('telegraf/composer');
const session = require('telegraf/session');
const Stage = require('telegraf/stage');
const Markup = require('telegraf/markup');
const WizardScene = require('telegraf/scenes/wizard');
const SceneContext = require('telegraf/scenes/context');
require('dotenv').config();
console.log(process.env.BOT_TOKEN);

const icanhazbot = new Telegraf(process.env.BOT_TOKEN);


icanhazbot.start((ctx) => {
    ctx.reply('welcome to ICanHazBot')
})

var cats = [];
var tasks = [];
var commands = [
    { name: '/addcat [cat name]', desc: 'add new cat' },
    { name: '/cats', desc: 'list cats' },
    { name: '/addtask [task name]', desc: 'add new task' },
    { name: '/tasks', desc: 'list tasks' },
    { name: '/done', desc: 'set task doned' },
    { name: '/clear', desc: 'mark all tasks not doned' },
];

const NO_CATS = 'no catz :c';
const NO_TASKS = 'can i haz nothing :3';

// ------------- COMMANDS -------------

icanhazbot.help((ctx) => {
    printList(ctx, commands, commandPrinter, ' ')
})

icanhazbot.command('addcat', (ctx)=> {
    msg = ctx.message.text
    msgArray = msg.split(' ')
    newcat = msgArray[1]
    cats.push(newcat)

    ctx.reply(`You added cat ${newcat}`)

})

icanhazbot.command('cats', (ctx)=> {
    printList(ctx, cats, catPrinter, NO_CATS)
})

icanhazbot.command('addtask', (ctx)=> {
    msg = ctx.message.text
    msgArray = msg.split(' ')
    msgArray.shift()

    taskname = msgArray.join(' ')
    newtask = { name: taskname, done: false}
    tasks.push(newtask)

    ctx.reply(`You added task ${newtask.name}`)

})

icanhazbot.command('tasks', (ctx) => {
    printList(ctx, tasks, taskPrinter, NO_TASKS)
})

icanhazbot.command('clear', (ctx) => {
    clearDoned()
    ctx.reply('all tasks are undoned again')
})

// ------------- LAUNCH -------------

icanhazbot.launch()

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

function catPrinter(cat) {
    return cat;
}

function taskPrinter(task) {
    const doned = task.done ? ':3' : ':<';
    return task.name + ', doned? ' + doned;
}

function commandPrinter(command) {
    return command.name + ' - ' + command.desc
}

function clearDoned() {
    for (var i in tasks) {
        tasks[i].done = false;
    }
}