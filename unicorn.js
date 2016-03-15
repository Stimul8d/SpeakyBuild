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
                console.log(chalk(err));
            }
        })
    });
}

module.exports = {
    initialize: function(){
        run('./scenes/simple.py');
    },
    error: function () {
        run('./scenes/rainbow_blinky.py ../latestBuild.json', chalk.red);
    },
    inProgress: function () {
        run('./scenes/cross.py ../latestBuild.json', chalk.yellow);
    },
    pass: function () {
        run('./scenes/matrix.py ../latestBuild.json', chalk.green);
    }
}

