'use strict';

var program = require('commander');
var pkg = require('../package.json');
var nachosOpen = require('./');

program
  .version(pkg.version)
  .description('A cli tool to open nachos packages')
  .arguments('<name> [args...]')
  .action(function (name, args) {
    nachosOpen(name, args)
      .catch(function (err) {
        console.log(err);
      });
  });

/**
 * Handle cli arguments
 *
 * @param {string[]} argv - string array of the arguments
 */
module.exports = function (argv) {
  program
    .parse(argv);

  if (argv.length <= 2) {
    program.help();
  }
};