const fs = require('fs');
const jsonfile = require('jsonfile');
const glob = require('glob');
const colors = require('colors');
const randomstring = require('randomstring');
const Discord = require('discord.js');

/////////////////////////////////////////////

const configDir = './'

var botConfig = {}
var botModules = {}
var userConfig = {}

try {
    console.log('Reading bot config...'.bold.blue);
    botConfig = jsonfile.readFileSync(configDir + 'bot.json');
} catch(e) {
    console.log('Error while reading '.bold.red + 'bot.json'.bold.green + '.'.bold.red);
    console.log(e);
    process.exit(1);
}

if (!botConfig.prefix) botConfig.prefix = '§';

//////////////////////////////////////////////

var bot = new Discord.Client();
console.log('Logging in...'.bold.blue);
bot.login(botConfig.token);

bot.on('ready', () => {
    loadModules();
    console.log('Running LazyBot v'.bold.green + botConfig.version.bold.cyan);
    
});

//////////////////////////////////////////////
// Registers events with named parameters passed in `vars` (in order)

var events = {
    'message': ['message'],
    'messageUpdate': ['oldMessage', 'newMessage']
}

function makeEventListener(event) {
    return function () {
	var vars = {modules: botModules, bot: bot, prefix: botConfig.prefix, userConfig: userConfig}
	if (arguments.length >= events[event].length) {
	    for(var i = 0; i < events[event].length; i++) {
		vars[events[event][i]] = arguments[i];
	    }
	    execModules(event, vars);
	}
    }
}

for (var ei in events) {
    bot.on(ei, makeEventListener(ei));
}

//////////////////////////////////////////////

function type(obj) {
    if (typeof obj === 'object') {
	if (Array.isArray(obj))
	    return 'array';
	else if (obj instanceof RegExp)
	    return 'regexp';
	else
	    return 'object';
    }
    return typeof obj;
}

function execModules(event, vars) {
    for (var mi in botModules) {
	var mod = botModules[mi];
	if (mod.enabled && mod.on && mod.on[event])
	    try {
		mod.on[event](vars);
	    } catch (e) {
		console.log('Error while executing module '.bold.red + mi.bold.magenta + ' at event '.bold.red + event.bold.yellow);
		console.log(e);
	    }
	
    }
}

function loadModules() {
    var _modules = glob.sync(botConfig.modulesDirectory + '*.js');
    var modules = [];
    for (var mi in _modules)
	if (!_modules[mi].match(/template\.js$/))
	    modules.push(_modules[mi])
    console.log('Loading '.bold.blue + colors.bold.cyan(modules.length) + ' module(s)...'.bold.blue);
    for (var i = 0; i < modules.length; i++) {
	try {
	    var mod = require(modules[i]);
	    var name = (mod._NAME ? mod._NAME : mod._NAMESPACE);
	    var filename = modules[i].replace(/(.*\/)?(.+)\.js$/, '$2');
	    if (typeof mod._NAMESPACE === 'undefined') {
		console.log(' => Missing namespace in '.bold.red + modules[i].bold.magenta + '.'.bold.red);
		continue;
	    } else if (botModules[mod._NAMESPACE]) {
		console.log(' => Modules already registered namespace '.bold.red + mod._NAMESPACE.bold.magenta + ': '.bold.red + botModules[mod._NAMESPACE]._FILE.bold.yellow);
		continue;
	    }
	    try {
		if (mod.init) mod.init({bot: bot, userConfig: userConfig});
		if (type(mod.enabled) === 'undefined')
		    mod.enabled = true;
		mod._FILE = modules[i];
		botModules[mod._NAMESPACE] = mod;
		console.log(' => Module '.bold.green + name.bold.magenta + ' loaded.'.bold.green);
	    } catch(e) {
		console.log(' => Module '.bold.red + name.bold.magenta + ' not loaded, error occured.'.bold.red );
		console.log(e);
	    }
	} catch (e) {
	    console.log(' => Error in module '.bold.red + name.bold.magenta + ':'.bold.red);
	    console.log(e);
	}
    }
}
