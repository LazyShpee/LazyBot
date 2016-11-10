
var cmd = 'snd'
var glob = require('glob');
function random (low, high) { return Math.floor(Math.random() * (high - low) + low); }

module.exports._NAME = "Soundbox";
module.exports._AUTHOR = "LazyShpee";
module.exports._NAMESPACE = "lazysoundbox";
module.exports._USAGE = '${p}' + cmd + ' [keyword]+';
module.exports._DESC = 'Plays a sound on the channel of the user issuing the command.';
module.exports._HELP = undefined;

module.exports.on = {}

module.exports.on.message = (vars) => {
    var cmdRegExp = new RegExp('^' + vars.prefix + cmd);
    if (!vars.message.author.bot &&
	vars.message.content.match(cmdRegExp)) {
	var argv = vars.message.content.match(/[^ "]+|"(?:\\"|[^"])+"/g);
	for (var i = 0; i < argv.length; i++)
	    argv[i] = argv[i].replace(/^"/,'').replace(/"$/,'');
	var ret = '';

	if (argv.length >= 2) {
	    var file;
	    var files = glob.sync('assets/sounds/**/*.@(mp3|ogg|wav)');

	    var loops = true;
	    while (loops) {
		loops = false;
		for (var i = 0; i < files.length; i++) {
		    for (var ii = 1; ii < argv.length; ii++) {
			if (!files[i].match(argv[ii])) {
			    files.splice(i, 1);
			    loops = true;
			    break;
			}
		    }
		    if (loops)
			break;
		}
	    }

	    if (files.length > 0)
		file = files[random(0, files.length - 1)];
	    if (file) {
		var chans = vars.message.guild.channels.array();
		var vchan;
		for (var ci in chans) {
		    var chan = chans[ci];
		    if (chan.type !== 'voice')
			continue;
		    var members = chan.members;
		    if (members.exists('id', vars.message.author.id)) {
			vchan = chan;
			break;
		    }	
		}
		if (vchan) {
		    vchan.join().then(connection => {
			vars.message.channel.sendMessage('Playing `' + file.replace(/.*assets\/sounds\//, '').replace(/\.(mp3|ogg|wav)$/, '') + '`');
			connection.playFile(file);
		    });
		}
	    } else {
		ret = 'Unknown sound.';
	    }
	} else {
	    ret = 'No sound specified.';
	}
	
	if (ret !== '')
	    vars.message.channel.sendMessage(ret);
	vars.message.delete().catch(()=>{});
    }
}
