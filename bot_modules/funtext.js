var flip = require('flip-text');
var colors = require('colors');
var aesthetics = require('aesthetics');

module.exports._AUTHOR = "LazyShpee";
module.exports._NAME = "Fun Text";
module.exports._NAMESPACE = "lazyfuntext";
module.exports._DESC = "Fun and useless text formatter.";

var cmd = ['aesthetics', 'flip', 'trap', 'say'];
module.exports._USAGE = '${p}(' + cmd.join('|') + ') <text>';

module.exports.on = {}
module.exports.on.message = (vars) => {
    var cmdRegExp = new RegExp ('^' + vars.prefix + '(' + cmd.join('|') + ') +(.+)$');
    if (!vars.message.author.bot &&
	vars.message.content.match(cmdRegExp)) {
	var argv = cmdRegExp.exec(vars.message.content);
	var res;
	switch (argv[1]) {
	case cmd[0]:
	    res = aesthetics(argv[2]);
	    break;
	case cmd[1]:
	    res = flip(argv[2]);		
	    break;
	case cmd[2]:
	    res = argv[2].trap;
	    break;
	case cmd[3]:
	    res = argv[2];
	    break;
	default:
	    res = "Unknown type."
	    break;
	}
	vars.message.channel.sendMessage(res);
	vars.message.delete().catch(()=>{});
    }
}
