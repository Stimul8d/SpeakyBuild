var chalk = require('chalk');
var voice = require('say');
var config = require('./config');
var unicorn = require('./unicorn');
var snapshots = require('./buildSnapshots');

require('shelljs/global');

var lastText = '';

var speakOnce = function (text, chalk) {
    console.log(chalk(text));
    if (config.silent || lastText === text) {
        return;
    }
    if(config.useFestival)
    {
        exec('echo "' + '" | festival --tts');
    }
    voice.speak(text, 'Ralph', 1);
}

module.exports = {
    initialize: function(text){
        speakOnce(text, chalk.green);  
        unicorn.initialize();
    },
    nothing: function(){
        snapshots.writeResults('nothing');
    },
    inProgress: function (text) {
        speakOnce(text, chalk.yellow);
        snapshots.writeResults('inprog');
    },
    buildFailure: function (text) {
        speakOnce(text, chalk.red);
        snapshots.writeResults('bad');
    },
    goodBuild: function (text) {
        speakOnce(text, chalk.green);
        snapshots.writeResults('good');
    },
}