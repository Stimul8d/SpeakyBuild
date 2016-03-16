var chalk = require('chalk');
var voice = require('say');
var config = require('./config');
var unicorn = require('./unicorn');
var snapshots = require('./buildSnapshots');

require('shelljs/global');

var speak = function (text, chalk) {
    console.log(chalk(text));
    if (config.silent) {
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
        speak(text, chalk.green);  
        unicorn.initialize();
    },
    nothing: function(){
        snapshots.writeResults('nothing');
    },
    inProgress: function (text) {
        speak(text, chalk.yellow);
        snapshots.writeResults('inprog');
    },
    buildFailure: function (text) {
        speak(text, chalk.red);
        snapshots.writeResults('good');
    },
    goodBuild: function (text) {
        speak(text, chalk.green);
        snapshots.writeResults('bad');
    },
}