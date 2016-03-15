var config = require('./config');
var shell = require('python-shell');
var chalk = require('chalk');

require('shelljs/global');

var run = function (fileName, chalk) {
    if (config.voldermort) {
        console.log('not running ' + fileName);
        return;
    }

    shell.run(fileName, function (err) {
        if (err) {
            console.log(err);
        }
    })
}

module.exports = {
    initialize: function () {
        run('./scenes/scene_manager.py');
    },
}

