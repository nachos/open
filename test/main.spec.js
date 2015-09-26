'use strict';

var chai = require('chai');
var expect = chai.expect;
var mockery = require('mockery');
var sinon = require('sinon');
var Q = require('q');

chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

describe('nachos-open', function () {
  describe('exports', function () {
    var nachosOpen = require('../lib');

    it('should expose a function', function () {
      expect(nachosOpen).to.be.a('function');
    });
  });

  describe('without parameters', function () {
    var nachosOpen = require('../lib');

    it('should eventually be rejected with TypeError', function () {
      return expect(nachosOpen()).to.eventually.be.rejectedWith(TypeError, 'package name must be specified');
    });
  });

  describe('with invalid parameters', function () {
    var nachosOpen = require('../lib');

    it('should reject name as function', function () {
      return expect(nachosOpen(function () {})).to.eventually.be.rejectedWith(TypeError, 'package name must be a string');
    });

    it('should reject name as object', function () {
      return expect(nachosOpen({})).to.eventually.be.rejectedWith(TypeError, 'package name must be a string');
    });

    it('should reject name as number', function () {
      return expect(nachosOpen(5)).to.eventually.be.rejectedWith(TypeError, 'package name must be a string');
    });

    it('should reject name as boolean', function () {
      return expect(nachosOpen(true)).to.eventually.be.rejectedWith(TypeError, 'package name must be a string');
    });
  });

  describe('with valid parameters', function () {
    describe('open dip type', function () {
      var nachosOpen;

      beforeEach(function () {
        var packagesMock = {
          getPackage: sinon.stub().returns(Q.resolve({type: 'dip'}))
        };

        mockery.registerMock('nachos-packages', packagesMock);
        mockery.enable({
          useCleanCache: true,
          warnOnReplace: false,
          warnOnUnregistered: false
        });

        nachosOpen = require('../lib');
      });

      afterEach(function () {
        mockery.deregisterMock('nachos-packages');
        mockery.disable();
      });

      it('should eventually be rejected', function () {
        return expect(nachosOpen('test')).to.eventually.be.rejectedWith('package must be taco or burrito');
      });
    });

    describe('open taco type', function () {
      var nachosOpen;
      var spawnMock;

      describe('with no main path', function () {
        beforeEach(function () {
          var packagesMock = {
            getPackage: sinon.stub().returns(Q.resolve({
              type: 'taco',
              path: '',
              config: {}
            }))
          };

          mockery.registerMock('nachos-packages', packagesMock);
          mockery.enable({
            useCleanCache: true,
            warnOnReplace: false,
            warnOnUnregistered: false
          });

          nachosOpen = require('../lib');
        });

        afterEach(function () {
          mockery.deregisterMock('nachos-packages');
          mockery.disable();
        });

        it('should be rejected', function () {
          return expect(nachosOpen('test')).to.eventually.be.rejectedWith('taco must have main path in nachos.json');
        });
      });

      describe('with main path', function () {
        beforeEach(function () {
          var packagesMock = {
            getPackage: sinon.stub().returns(Q.resolve({
              type: 'taco',
              path: '',
              config: {
                main: 'test'
              }
            }))
          };

          spawnMock = sinon.stub();

          var childProcessPromiseMock = {
            spawn: spawnMock
          };

          mockery.registerMock('nachos-packages', packagesMock);
          mockery.registerMock('child-process-promise', childProcessPromiseMock);
          mockery.enable({
            useCleanCache: true,
            warnOnReplace: false,
            warnOnUnregistered: false
          });

          nachosOpen = require('../lib');
        });

        afterEach(function () {
          mockery.deregisterMock('nachos-packages');
          mockery.deregisterMock('child-process-promise');
          mockery.disable();
        });

        it('should have called spawn', function () {
          return nachosOpen('test')
            .then(function () {
              return expect(spawnMock).to.have.been.calledWith('test', [], {cwd: ''});
            });
        });
      });
    });

    describe('open burrito type', function () {
      var nachosOpen;
      var spawnMock;

      beforeEach(function () {
        var getPackageMock = sinon.stub();

        getPackageMock.onCall(0).returns(Q.resolve({type: 'burrito'}));
        getPackageMock.onCall(1).returns(Q.resolve({
          type: 'taco',
          path: '',
          config: {
            main: 'test'
          }
        }));

        var packagesMock = {
          getPackage: getPackageMock
        };

        spawnMock = sinon.stub();

        var childProcessPromiseMock = {
          spawn: spawnMock
        };

        mockery.registerMock('nachos-packages', packagesMock);
        mockery.registerMock('child-process-promise', childProcessPromiseMock);
        mockery.enable({
          useCleanCache: true,
          warnOnReplace: false,
          warnOnUnregistered: false
        });

        nachosOpen = require('../lib');
      });

      afterEach(function () {
        mockery.deregisterMock('nachos-packages');
        mockery.deregisterMock('child-process-promise');
        mockery.disable();
      });

      it('should have asked burrito taco and call spawn', function () {
        return nachosOpen('test')
          .then(function () {
            return expect(spawnMock).to.have.been.calledWith('test', ['test'], {cwd: ''});
          });
      });
    });
  });
});