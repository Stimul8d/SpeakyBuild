var config = require('./config');
var shell = require('python-shell');
var chalk = require('chalk');

require('shelljs/global');

var options = {
    args: [config.latestBuildSnapshot]
}

var run = function (fileName, chalk) {
    if (config.voldermort) {
        console.log('not running ' + fileName);
        return;
    }

    shell.run(fileName, options, function (err) {
        if (err) {
            console.log(err);
        }
    })

}

module.exports = {
    initialize: function () {
        run('./scenes/simple.py');
    },
    error: function () {
        //exec('python ./scenes/rainbow_blinky.py')
        run('./scenes/rainbow_blinky.py', chalk.red);
    },
    inProgress: function () {
        run('./scenes/cross.py ../latestBuild.json', chalk.yellow);
    },
    pass: function () {
        run('./scenes/matrix.py ../latestBuild.json', chalk.green);
    }
}

