const Telegraf = require('telegraf');
require('dotenv').config();
console.log(process.env.TOKEN);

const icanhazbot = new Telegraf(process.env.TOKEN);

icanhazbot.start((ctx) => ctx.reply('Welcome to ICanHazBot!'));

var cats = ['Luke', 'Leia', 'Mökö', 'Manteli'];
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

icanhazbot.launch();
