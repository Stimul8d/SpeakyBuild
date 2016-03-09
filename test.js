var chalk = require('chalk');
var speak = require('./announce');
var unicorn = require('./unicorn');
require('shelljs/global');

exec('echo "hey there"');
//speak.GoodBuild('hi there');
//console.log(chalk.red('hi there'));
//unicorn.pass('hi there');