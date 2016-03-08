var chalk = require('chalk');
var voice = require('say');
var config = require('./config');
var unicorn = require('./unicorn');

var speakOnce = function (text, chalk) {

    if (speakOnce.lastSpeech
        && speakOnce.lastSpeech === text) return;

    speakOnce.lastSpeech = text;

    console.log(chalk(text));
    if (config.silent) {
        return;
    }
    voice.speak(text, 'Ralph', 1);
}

module.exports = {
    InProgress: function (text) {
        speakOnce(text, chalk.yellow);
        unicorn.inProgress();
    },
    BuildFailure: function (text) {
        speakOnce(text, chalk.red);
        unicorn.error();
    },
    GoodBuild: function (text) {
        speakOnce(text, chalk.green);
        unicorn.pass();
    }
}