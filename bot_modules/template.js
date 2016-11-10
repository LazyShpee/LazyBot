module.exports._NAMESPACE = "lazytemplate"; // !!! REQUIRED
module.exports._AUTHOR = "LazyShpee";
module.exports._NAME = "Template";
module.exports._DESC = "Description";
module.exports._USAGE = "Usage";

var cmd = 'template';

module.exports.init = () => {
    console.log("Template initialized.");
}

module.exports.on = {}
module.exports.on.message = (vars) => {
    if (!vars.message.author.bot && // Message author isn't a bot
	vars.message.content.match(new RegExp('^' + vars.prefix + cmd))) // Command starts with §template
	vars.message.channel.sendMessage('Template on message');
}
