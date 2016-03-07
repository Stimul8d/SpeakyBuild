var config = require('./config');

module.exports = {
    run: function (cmd, args, callBack) {
        var spawn = require('child_process').spawn;
        var child = spawn(cmd, args);
        var resp = "";

        child.stdout.on('data', function (buffer) { resp += buffer.toString() });
        child.stdout.on('end', function () { callBack(resp) });
    },
    error: function(){
        this.run('sudo python', ['~/Pimoroni/unicornhat/rainbow.py'], function (r) { });
    },
    pass: function () {
        if (config.debug) {
            this.run('echo', ['happy unicorn'],
                function (r) {
                    console.log(r);
                })
            return;
        }
        this.run('sudo python', ['~/Pimoroni/unicornhat/rainbow.py'], function (r) { });
    }
}

