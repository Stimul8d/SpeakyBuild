var config = require('./config');
var PythonShell = require('python-shell');
var chalk = require('chalk');

require('shelljs/global');

var run = function (fileName, chalk) {
    if (config.voldermort) {
        console.log('not running ' + fileName);
        return;
    }

    var shell = new PythonShell(fileName, { mode: 'text ' })

    shell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement) 
        console.log(message);
    });
}

module.exports = {
    initialize: function () {
        run('./scenes/scene_manager.py');
    },
}

