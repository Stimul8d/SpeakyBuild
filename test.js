var chalk = require('chalk');
var speak = require('./announce');
var unicorn = require('./unicorn');
var PythonShell = require('./python-shell');
require('shelljs/global');

//exec('echo "hey there"');
//speak.GoodBuild('hi there');
//console.log(chalk.red('hi there'));
//unicorn.pass('hi there');
var shell = new PythonShell('./scenes/test.py', { mode: 'text ' })

shell.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement) 
    console.log(message);
});