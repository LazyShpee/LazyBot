var colors = require('colors');

module.exports._AUTHOR = "LazyShpee";
module.exports._NAME = "Logger";
module.exports._NAMESPACE = "lazylogger";
module.exports._DESC = 'Simple event logger';

module.exports.init = () => {
    return true;
}

module.exports.on = {}
module.exports.on.message = (vars) => {
    var message = vars.message;
    var content = message.content;
    var author = vars.message.author.username;
    if (vars.message.author.id === vars.bot.user.id)
	author = author.blue;
    else if (content.match(new RegExp('^' + vars.prefix)))
	content = content.yellow
    if (message.channel.type == 'dm')
	console.log('(Private)'.bold + ` ${author}: ${content}`);
    else
	console.log(`(${message.guild.name} / ${message.channel.name})`.bold + ` ${author}: ${content}`);
}
