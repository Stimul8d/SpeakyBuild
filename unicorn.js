module.exports = {
    run: function (cmd, args, callBack) {
        var spawn = require('child_process').spawn;
        var child = spawn(cmd, args);
        var resp = "";

        child.stdout.on('data', function (buffer) { resp += buffer.toString() });
        child.stdout.on('end', function () { callBack(resp) });
    },
    pass: function () {
        this.run('sudo python', ['~/Pimoroni/unicornhat/rainbow.py'], function (r) { })
    }
}

