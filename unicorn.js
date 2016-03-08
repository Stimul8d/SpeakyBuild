var config = require('./config');
var shell = require('python-shell');

var run = function (fileName) {
    if(config.voldermort){
        console.log('not running ' + fileName);
        return;
    }
    shell.run('demo.py', function (err) {
        if (err) {
            console.log(err);
        }
    })
}

module.exports = {
    error: function () {
        run('random_blinky.py');
    },
    inProgress: function(){
        run('demo.py');
    },
    pass: function () {
        run('matrix.py');
    }
}

