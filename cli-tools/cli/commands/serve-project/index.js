const path = require('path');
const {loadConfig} = require('../../lib/webpack-config');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const WebpackBar = require('webpackbar');
const chalk = require('chalk');
const addEntries = require('webpack-dev-server/lib/utils/addEntries');
const createDomain = require('webpack-dev-server/lib/utils/createDomain');
const createLogger = require('webpack-dev-server/lib/utils/createLogger');

const {
  colors,
  status,
  version,
  bonjour,
  defaultTo
} = require('webpack-dev-server/bin/utils');


/**
 *
 *
 * @author Arian Khosravi <arian.khosravi@aofl.com>
 */
class ServeProject {
  /**
   * Creates an instance of ServeProject.
   *
   * @param {String} config
   * @param {String} port
   * @param {String} host
   * @param {Boolean} stats
   * @param {Boolean} profile
   * @param {Boolean} debug
   */
  constructor(config = '.aofl.js', port, host, stats = false,
  profile = false, debug = false) {
    this.configPath = path.resolve(config);
    this.port = port;
    this.host = host;
    this.stats = stats;
    this.profile = profile;
    this.debug = debug;

    const reporters = ['fancy'];

    this.profile && reporters.push('profile');
    this.stats && reporters.push('stats');

    this.config = loadConfig(this.configPath);
    this.options = this.config.webpack.devServer;

    this.config.webpack.plugins.push(new WebpackBar({
      name: this.config.name,
      profile: true,
      color: '#1e90ff',
      reporters
    }));
  }
  /**
   *
   */
  init() {
    const log = createLogger(this.options);
    const port = this.port || this.options.port;
    const host = this.host || this.options.host;
    const suffix = (this.options.inline !== false || this.options.lazy === true ? '/' : '/webpack-dev-server/');

    addEntries(this.config.webpack, this.options);

    const compiler = webpack(this.config.webpack);
    const server = new WebpackDevServer(compiler, this.options);

    server.listen(port, host, (err) => {
      if (err && this.debug) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
        return;
      }

      const uri = createDomain(this.options, server.listeningApp) + suffix;

      status(uri, this.options, log);
    });
  }
}

module.exports = ServeProject;