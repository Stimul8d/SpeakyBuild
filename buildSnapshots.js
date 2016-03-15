var fs = require('fs');
var config = require('./config');
var snapshot;

module.exports = {
    clear: function()
    {
        fs.writeFileSync(config.latestBuildSnapshot, "Nothing Here");
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