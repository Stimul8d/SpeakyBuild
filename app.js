var voice = require('say');
var request = require('request');
var async = require('async')
var fs = require('fs');
var config = require('./config');
var unicorn = require('./unicorn');

var speakOnce = function (text) {

    if (speakOnce.lastSpeech && speakOnce.lastSpeech === text) return;
    speakOnce.lastSpeech = text;

    console.log(text);
    if(config.silent){
        return;
    }
    voice.speak(text, 'Ralph', 1);

}

var sendRequest = function () {
    
    if (config.debug) {
        request = function (url, callback) {
            if (fs.existsSync(config.latestBuildFile)) {
                fs.unlinkSync(config.latestBuildFile);
            }
            callback(null, { statusCode: 200 }, config.debugInfo.response());
        }
    }

    request(config.pathToJenkins, function (error, res, body) {
        if (!error && res.statusCode == 200) {
            var thisResult = JSON.parse(body);

            var buildInProgress = thisResult.duration == 0;

            if (buildInProgress) {
                speakOnce(thisResult.fullDisplayName + ' is in progress.');
                return;
            }

            var data = { length: 0 };

            if (fs.existsSync(config.latestBuildFile)) {
                data = fs.readFileSync(config.latestBuildFile);
            }
            var noLastBuildFile = data.length === 0

            console.log('writing latest build');

            fs.writeFileSync(config.latestBuildFile, body);

            if (noLastBuildFile) {
                data = fs.readFileSync(config.latestBuildFile);;
            }

            var lastResult = JSON.parse(data);

            var noNewBuilds = thisResult.number <= lastResult.number;
            if (config.debug) { noNewBuilds = false; }
            if (noNewBuilds) {
                console.log('No new builds');
                return;
            }
            
            unicorn.pass();
            
            var text = thisResult.fullDisplayName + ' is ' + ((thisResult.building) ? '' : 'not ') + 'building';

            speakOnce(text);
        };
    })
}

setInterval(function () {
    console.log('Sending Request');
    sendRequest();
}, 5000);