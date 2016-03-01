var voice = require('say');
var request = require('request');
var fs = require('fs')
var config = require('./config');

var sendRequest = function() {
	request(config.pathToJenkins, function(error, res, body) {
		if (!error && res.statusCode == 200) {
			var thisResult = JSON.parse(body);

			fs.readFile(config.latestBuildFile, function(err, data) {
				
				var lastResult = JSON.parse(data);
				
				fs.writeFile(config.latestBuildFile, body, function(err) {
					if (err) {
						console.log(err);
						return;
					}
				});

				if (err) {
					console.log(err);
					return;
				}

				if (thisResult.number <= lastResult.number) {
					console.log('No new builds');
					return;
				}

				var text = thisResult.fullDisplayName + ' is ' + ((thisResult.building) ? '' : 'not ') + 'building';

				console.log(text);

				voice.speak(text);
			});
		}
	})
};

setInterval(function() {
	console.log('Sending Request');
	sendRequest();
}, 5000);