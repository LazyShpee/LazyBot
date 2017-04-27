module.exports._NAMESPACE = "lazytemplate"; // !!! REQUIRED
module.exports._AUTHOR = "LazyShpee";
module.exports._NAME = "Template";
module.exports._DESC = "Description";
module.exports._USAGE = "image <list|category>";

function getRandomLine(filename){
    try {
	var lines = fs.readFileSync(filename, 'utf-8');
	lines = lines.split('\n');
	var line = lines[Math.floor(Math.random()*lines.length)];
	return line;
    } catch (e) {
	console.log("Error on " + filename + ":" + e);
	return null;
    }
}

var cmd = 'image';

module.exports.init = () => {
    console.log("Template initialized.");
}

module.exports.on = {}
module.exports.on.message = (vars) => {
    if (!vars.message.author.bot && // Message author isn't a bot
	vars.message.content.match(new RegExp('^' + vars.prefix + cmd))) // Command starts with §template
    {
	var argv = cmdRegExp.exec(vars.message.content);
	if (argv.length == 2) {
	    switch (argv[1]) {
	    case "list":
		;
		break;
	    }
	}
    }
}
