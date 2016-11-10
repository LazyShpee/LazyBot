var cmd = 'modules';

module.exports._AUTHOR = "LazyShpee";
module.exports._NAME = "Module manager";
module.exports._NAMESPACE = "lazymodules";
module.exports._DESCRIPTION = 'Simple module management.';

module.exports.on = {}
module.exports.on.message = (vars) => {
    function processVars(str) {
	return str.split('${p}').join(vars.prefix);
    }
    
    var cmdRegExp = new RegExp('^' + vars.prefix + cmd);
    if (!vars.message.author.bot &&
	vars.message.content.match(cmdRegExp)) {
	var argv = vars.message.content.match(/[^" ]+|"(?:\\"|[^"])+"/g);
	var ret = '';
	if (argv.length === 1) {
	    var res = [];
	    for (var mi in vars.modules) {
		var mod = vars.modules[mi];
		if (mod.enabled)
		    res.push(mod._NAME ? mod._NAME + ' (' + mod._NAMESPACE + ')': mod._NAMESPACE);

	    }
	    if (res.length > 0)
		ret = 'Enabled modules: `' + res.join('`, `') + '`';
	} else {
	    var mod = vars.modules[argv[1]];
	    if (typeof mod === 'undefined')
		ret = 'Unknown module: `' + argv[1] +'`';
	    else {
		var a = mod._NAME ? mod._NAME + ' (' + mod._NAMESPACE + ')': mod._NAMESPACE + ' : ';
		if (mod._DESC)
		    a += '\n  Description: ' + processVars(mod._DESC);
		if (mod._USAGE)
		    a += '\n  Usage: ' + processVars(mod._USAGE);
		if (mod._HELP)
		    a += '\n  Help: ' + processVars(mod._HELP);
		vars.message.channel.sendCode('', a);
	    }
	}
	if (ret !== '')
	    vars.message.channel.sendMessage(ret);
	vars.message.delete().catch(()=>{});
    }
}
