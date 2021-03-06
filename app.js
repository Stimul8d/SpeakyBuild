var request = require('request');
var config = require('./config');
var unicorn = require('./unicorn');
var chalk = require('chalk');
var announce = require('./announce')
var snapshots = require('./buildSnapshots');

require('shelljs/global');

announce.initialize('I will accept this burden with all that I am!');

var sendRequest = function () {

    var jenkins = config.debug
        ? config.debugPathToJenkins
        : config.pathToJenkins;

    console.log(chalk.blue('requesting ' + jenkins));

    request(jenkins, function (error, res, body) {
        
        //if there's an error, get out.
        if (error || res.statusCode != 200) {
            announce.requestError();
            return;
        }
        
        //or else get the data from jenkins
        var thisResult = JSON.parse(body);
        
        //and the last one
        var lastResult = snapshots.getSnapshot(body);
        
        //if there is no new build info, get out
        var newBuilds = thisResult.number > lastResult.number;
        console.log('last build:' + lastResult.number + '.this build:' + thisResult.number);
        var buildStatusChanged = !newBuilds
            && (thisResult.result != lastResult.result);
        console.log('last build:' + lastResult.result + '.this build:' + thisResult.result);
        var noNewBuildInfo = !newBuilds && !buildStatusChanged;
        if (config.debug) { noNewBuildInfo = false; }
        if (noNewBuildInfo) {
            announce.nothing();
            return;
        }
        
        //if theres a build in progress announce it and get out
        var buildInProgress = thisResult.duration == 0;
        if (buildInProgress) {
            announce.inProgress(thisResult.fullDisplayName
                + ' is in progress.');
            return;
        }

        if (thisResult.result === 'ABORTED') {
            return;
        }
        var isGoodBuild = thisResult.result === 'SUCCESS';

        var text = 'One shall stand. One shall Fall. '
            + thisResult.fullDisplayName + ' is '
            + (isGoodBuild ? '' : 'not ') + 'building';

        if (isGoodBuild) {
            announce.goodBuild(text);
            return;
        }
        else {
            announce.buildFailure(text);
        }

    })
};


setInterval(function () {
    sendRequest();
}, 10000);