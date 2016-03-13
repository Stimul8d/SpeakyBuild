var config = require('./config');
var shell = require('python-shell');
var chalk = require('chalk');
require('shelljs/global');

var run = function (fileName, chalk) {
    if (config.voldermort) {
        console.log(chalk('not running ' + fileName));
        return;
    }
    shell.run('python ./stop.py &', function (err) {
        shell.run(fileName, function (err) {
            if (err) {
                console.log(chalk.red(err));
            }
        })
    });
}

module.exports = {
    error: function () {
        //exec('python ./scenes/random_blinky.py &');
        run('./scenes/rainbow_blinky.py', chalk.red);
    },
    inProgress: function () {
        run('./scenes/cross.py', chalk.yellow);
    },
    pass: function () {
        run('./scenes/matrix.py', chalk.green);
    }
}

