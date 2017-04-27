var flip = require('flip-text');
var colors = require('colors');
var aesthetics = require('aesthetics');
var shuffle = require('shuffle-words');

module.exports._AUTHOR = "LazyShpee";
module.exports._NAME = "Fun Text";
module.exports._NAMESPACE = "lazyfuntext";
module.exports._DESC = "Fun and useless text formatter.";

var cmd = ['aesthetics', 'flip', 'trap', 'say', 'clinton', 'rng'];
module.exports._USAGE = '${p}(' + cmd.join('|') + ') <text>';

module.exports.on = {}
module.exports.on.message = (vars) => {
    var cmdRegExp = new RegExp ('^' + vars.prefix + '(' + cmd.join('|') + ') *(.*)$');
    if (!vars.message.author.bot &&
	vars.message.content.match(cmdRegExp)) {
	var argv = cmdRegExp.exec(vars.message.content);
	if (!argv[2] || argv[2].length === 0) {
	    vars.message.channel.fetchMessages({limit: 2}).then(msgs => {
		console.log(argv[2]);
		argv[2] = msgs.last().content;
		__(argv, vars);
	    });
	} else {
	    __(argv, vars);
	}
    }
}

function __(argv, vars) {
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
    case cmd[4]:
	var pos = ['`[REDACTED]`', '`[CENSORED]`']
	res = argv[2]
	    .replace(/\[[^\]]+\]/g, function __repl(m) { return pos[Math.floor(Math.random()*pos.length)] })
	    .replace(/\{[^\}]+\}/g, function __repl(m) { return '█'.repeat(m.length - 2) })
	break;
    case cmd[5]:
	res = shuffle(argv[2]);
	break;
    default:
	res = "Unknown type."
	break;
    }
    vars.message.channel.sendMessage(res);
    vars.message.delete().catch(()=>{});
}
