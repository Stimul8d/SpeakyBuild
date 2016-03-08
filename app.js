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
    if (config.silent) {
        return;
    }
    voice.speak(text, 'Ralph', 1);
}

var startInProgressBuild = function (text) {
    speakOnce(text);
    unicorn.inProgress();
}

var startBuildError = function (text) {
    speakOnce(text);
    unicorn.error();
}

var startGoodBuild = function (text) {
    speakOnce(text);
    unicorn.pass();
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

        if (error && res.statusCode != 200) {
            startBuildError('request error');
            return;
        }

        var thisResult = JSON.parse(body);

        var buildInProgress = thisResult.duration == 0;

        if (buildInProgress) {
            startInProgressBuild(thisResult.fullDisplayName 
                + ' is in progress.');
            return;
        }

        var data = { length: 0 };

        if (fs.existsSync(config.latestBuildFile)) {
            data = fs.readFileSync(config.latestBuildFile);
        }
        var noLastBuildFile = data.length === 0

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

        var text = thisResult.fullDisplayName + ' is '
            + ((thisResult.building) ? '' : 'not ') + 'building';

        if (thisResult.building) {
            startGoodBuild(text);
            return;
        }

        startBuildError(text);
        
    })};


setInterval(function () {
    console.log('Sending Request');
    sendRequest();
}, 5000);