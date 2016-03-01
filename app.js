var voice = require("say");
var request = require("request");
var config = require("./config");

var sendRequest = function() {
	request(config.pathToJenkins, function(error, res, body) {
			if (!error && res.statusCode == 200) {
				var result = JSON.parse(body);

				var text = result.fullDisplayName + " is " + ((result.building) ? "" : "not ") + "building";

				console.log(text);

				voice.speak(text);
			}
		})
	};

setInterval(function() {
	console.log('Sending Request');
	sendRequest();
}, 5000);