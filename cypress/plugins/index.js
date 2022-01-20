/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const path = require('path')
const fs = require('fs-extra')// promisified fs module

function getConfigurationByFile(file) { // for running with custom env settings
  const pathToConfigFile = path.resolve('cypress', 'config', `${file}.json`) // e.g. cypress/config/staging.json
  if (!fs.existsSync(pathToConfigFile)) {
    console.log('No custom config file found.')
    return {};
  }

  return fs.readJson(pathToConfigFile)
}

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // on('before:browser:launch', (browser, launchOptions) => {
  //   if ((browser.name === 'chrome' || browser.name === 'edge') && browser.isHeadless) {
  //     launchOptions.args.push('--disable-gpu');
  //     return launchOptions
  //   }
  // });

  const file = config.env.configFile
  return getConfigurationByFile(file)
}

//// before cypress 5 
// module.exports = (on, config) => {
  // require('cypress-plugin-retries/lib/plugin')(on)
// }