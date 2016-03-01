var voice = require('say');
var request = require('request');
var async = require('async')
var fs = require('fs');
var config = require('./config');

var speakOnce = function(text) {

	if (speakOnce.lastSpeech && speakOnce.lastSpeech === text) return;
	speakOnce.lastSpeech = text;

	console.log(text);
	voice.speak(text, 'Daniel', 0.85);

}

var sendRequest = function() {

	request(config.pathToJenkins, function(error, res, body) {
		if (!error && res.statusCode == 200) {
			var thisResult = JSON.parse(body);

			var buildInProgress = thisResult.duration == 0;

			if (buildInProgress) {
				speakOnce(thisResult.fullDisplayName + ' is in progress.');
				return;
			}

			var data = fs.readFileSync(config.latestBuildFile);
			var noLastBuildFile = data.length === 0

			fs.writeFileSync(config.latestBuildFile, body);

			if (noLastBuildFile) {
				var data = fs.readFileSync(config.latestBuildFile);;
			}

			var lastResult = JSON.parse(data);

			var noNewBuilds = thisResult.number <= lastResult.number;

			if (noNewBuilds) {
				console.log('No new builds');
				return;
			}

			var text = thisResult.fullDisplayName + ' is ' + ((thisResult.building) ? '' : 'not ') + 'building';

			speakOnce(text);
		};
	})
}

setInterval(function() {
	console.log('Sending Request');
	sendRequest();
}, 5000);