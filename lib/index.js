'use strict';

var spawn = require('child-process-promise').spawn;
var packages = require('nachos-packages');
var Q = require('q');
var path = require('path');
var debug = require('debug')('nachosOpen');

/**
 * Open nachos package
 *
 * @param {String} name Name of packages to open
 * @param {Array<String>} [args] Arguments to pass
 */
var open = function (name, args) {
  if (!name) {
    return Q.reject(new TypeError('package name must be specified'));
  }

  if (typeof name !== 'string') {
    return Q.reject(new TypeError('package name must be a string'));
  }

  args = args || [];
  debug('looking for %s package', name);

  return packages.getPackage(name)
    .then(function (pkg) {
      if (pkg.type !== 'burrito' && pkg.type !== 'taco') {
        debug('%s package type is %s', name, pkg.type);

        return Q.reject('package must be taco or burrito');
      }

      if (pkg.type === 'burrito') {
        debug('adding %s to args and asking burrito-taco with new args %s', name, args);
        args.unshift(name);

        return open('burrito', args);
      }

      if (pkg.config && !pkg.config.main) {
        return Q.reject('%s taco must have main path in nachos.json', name);
      }

      var pkgPath = path.join(pkg.path, pkg.config.main);

      debug('open package %s from %s with args $s', name, pkgPath, args);

      return spawn(pkgPath, args, {cwd: pkg.path});
    });
};

module.exports = open;