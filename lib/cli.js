'use strict';

var program = require('commander');
var pkg = require('../package.json');
var nachosOpen = require('./');

program
  .version(pkg.version)
  .description('A cli tool to open nachos packages')
  .usage('[command]');

/**
 * Handle cli arguments
 *
 * @param {string[]} argv - string array of the arguments
 */
module.exports = function (argv) {
  program
    .parse(argv);

  argv.splice(0, 2);

  var name = argv[0];

  argv.splice(0, 1);

  if (!name) {
    return console.log('first parameter \'name\' must be defined');
  }

  nachosOpen(name, argv)
    .catch(function (err) {
      console.log(err);
    });
};