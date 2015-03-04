(function() {
  var _, async, npm, packageJSON;

  async = require('async');

  _ = require('lodash-contrib');

  npm = require('npm');

  packageJSON = require('../../package.json');

  exports.update = {
    signature: 'update',
    description: 'update the resin cli',
    help: 'Use this command to update the Resin CLI\n\nThis command outputs information about the update process.\nUse `--quiet` to remove that output.\n\nExamples:\n\n	$ resin update',
    action: function(params, options, done) {
      return async.waterfall([
        function(callback) {
          options = {
            loglevel: 'silent',
            global: true
          };
          return npm.load(options, _.unary(callback));
        }, function(callback) {
          return npm.commands.update([packageJSON.name], callback);
        }, function(data, lite, callback) {
          var newVersion;
          if (_.isEmpty(data)) {
            return done(new Error('You are already running the latest version'));
          }
          newVersion = _.last(_.first(_.last(data)).split('@'));
          return console.info("Upgraded " + packageJSON.name + " to v" + newVersion + ".");
        }
      ], done);
    }
  };

}).call(this);
