var randomstring = require('randomstring');

module.exports._AUTHOR = "LazyShpee";
module.exports._NAME = "Test/Template";
module.exports._NAMESPACE = "lazytest";

module.exports.init = () => {
    return true;
}

module.exports.on = {}
module.exports.on.message = (vars) => {
    if (!vars.message.author.bot && vars.message.content.match(new RegExp(vars.prefix + 'test')))
	vars.message.channel.sendMessage("Test command: " + randomstring.generate());
}
