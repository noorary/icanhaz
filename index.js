const Telegraf = require('telegraf');
require('dotenv').config();
console.log(process.env.TOKEN);

const icanhazbot = new Telegraf(process.env.TOKEN);

icanhazbot.start((ctx) => ctx.reply('Welcome to ICanHazBot!'));

var cats = ['Luke', 'Leia', 'Mökö', 'Manteli'];
var tasks = [];

icanhazbot.command('showcats', (ctx) => printCats(ctx));
icanhazbot.command('showtasks', (ctx) => printTasks(ctx));

function printCats(ctx) {
    if (cats.length == 0) {
        ctx.reply('no catz :c');
    } else {
        var tempStr = '';
        for (var i = 0; i < cats.length - 1; i++) {
            tempStr = tempStr.concat(cats[i] + '\n');
        }
        tempStr = tempStr.concat(cats[cats.length - 1]);
        ctx.reply(tempStr);
    }
}

function printTasks(ctx) {
    if (tasks.length == 0) {
        ctx.reply('can i haz nothing :3');
    } else {
        var tempStr = '';
        for (var i = 0; i < printTasks.length - 1; i++) {
            tempStr = tempStr.concat(tasks[i] + '\n');
        }
        tempStr = tempStr.concat(tasks[tasks.length - 1]);
        ctx.reply(tempStr);
    }
}

icanhazbot.command('hello', (ctx) => ctx.reply('Hello'));

icanhazbot.launch();
