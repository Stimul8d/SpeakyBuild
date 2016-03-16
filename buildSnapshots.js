var fs = require('fs');
var config = require('./config');

module.exports = {
    writeResults: function(results){
      fs.writeFileSync(config.latestBuildResultSnapshot, results);  
    },
    getSnapshot: function (body) {
        //get the latestBuildSnapshot
        var data = { length: 0 };
        var snapshotExists = false;
        if (fs.existsSync(config.latestBuildSnapshot)) {
            data = fs.readFileSync(config.latestBuildSnapshot);
            snapshotExists = data.length > 0;
        }
        
        //write the snapshot
        fs.writeFileSync(config.latestBuildSnapshot, body);
        
        //if there wasn't a snapshot read the newest one
        if (!snapshotExists) {
            data = fs.readFileSync(config.latestBuildFile);;
        }
        return JSON.parse(data);
    }
}