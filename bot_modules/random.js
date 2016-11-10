var cmd = 'random';

module.exports._AUTHOR = "LazyShpee";
module.exports._NAME = "Randomizer";
module.exports._NAMESPACE = "lazyrandom";
module.exports._USAGE = '${p}' + cmd + ' [ min-max | [sentences]+ ]';
module.exports._DESCRIPTION = 'Rolls a dice or chooses between 2 or more sentences.'
module.exports._HELP = undefined;

function random (low, high) { return Math.floor(Math.random() * (high - low) + low); }

module.exports.on = {}
module.exports.on.message = (vars) => {
    var cmdRegExp = new RegExp('^' + vars.prefix + cmd);
    if (!vars.message.author.bot &&
	vars.message.content.match(cmdRegExp)) {
	var argv = vars.message.content.match(/[^ "]+|"(?:\\"|[^"])+"/g);
	for (var i = 0; i < argv.length; i++)
	    argv[i] = argv[i].replace(/^"/,'').replace(/"$/,'');
	var ret = '';

	if (argv.length === 1)
	    ret = 'Random 100 dice: `' + random(1,100) + '`';
	else {
	    if (argv.length >= 3) {
		ret = argv[random(1,argv.length)];
	    }
	    else if (argv[1].match(/^(\d+)\-(\d+)$/)) {
		var m = argv[1].match(/^(\d+)\-(\d+)$/)
		var a = parseInt(m[1]);
		var b = parseInt(m[2]);
		if (b < a) {var c = a; a = b; b = c}
		ret = 'Random ' + a + '-' + b + ' dice: `' + random(a,b) + '`';
	    }
	}

	if (ret !== '')
	    vars.message.channel.sendMessage(ret);
	vars.message.delete().catch(()=>{});
    }
}
