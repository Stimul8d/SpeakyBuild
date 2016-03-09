var chalk = require('chalk');
var voice = require('say');
var config = require('./config');
var unicorn = require('./unicorn');

var speak = function (text, chalk) {
    console.log(chalk(text));
    if (config.silent) {
        return;
    }
    voice.speak(text, 'Ralph', 1);
}

module.exports = {
    InProgress: function (text) {
        speak(text, chalk.yellow);
        unicorn.inProgress();
    },
    BuildFailure: function (text) {
        speak(text, chalk.red);
        unicorn.error();
    },
    GoodBuild: function (text) {
        speak(text, chalk.green);
        unicorn.pass();
    }
}