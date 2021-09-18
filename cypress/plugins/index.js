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

/**
 * @type {Cypress.PluginConfig}
 */
require('dotenv').config();
//_ eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  config.env.email = process.env.EMAIL
  config.env.password = process.env.PASSWORD
  config.env.name = process.env.NAME
  config.env.registeredPassword = process.env.REGISTERED_PASSWORD
  config.env.registeredName = process.env.REGISTERED_NAME
  config.env.newName = process.env.NEW_NAME
  config.env.newEmail = process.env.NEW_EMAIL
  config.env.newPassword = process.env.NEW_PASSWORD

  return config
}
