/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */
const organizers = ["CS Students Association", "Arts Students Association", "AIESEC", "Film Studies Students Association"];
const venues = ["FSC", "AAB", "CVA", "OEM"];

module.exports.routes = {

  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': 'EventController.index',

  'GET /user/registered': 'UserController.registered',

  'GET /event/view/:id': 'EventController.view',

  'GET /event/create': {
    controller: 'EventController',
    action: 'create',
    locals: {
      organizers: organizers,
      venues: venues
    } },

  'GET /event/update/:id': {
    controller: 'EventController',
    action: 'update',
    locals: {
      organizers: organizers,
      venues: venues
    } },

    '/event/search': {
      controller: 'EventController',
      action: 'search',
      locals: {
        organizers: organizers,
        venues: venues
      } },

  'POST /event/update/:id': 'EventController.update',

  'DELETE /event/:id': 'EventController.delete',

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝

  '/event/populate': { view: '404' },
'/user/populate': { view: '404' },
'/user/register': { view: '404' },
'/user/dereg': { view: '404' },

'/event/:id/:association': 'EventController.populate',
'/user/:id/:association': 'UserController.populate',
'/user/:id/:association/register/:fk': 'UserController.register',
'/user/:id/:association/dereg/:fk': 'UserController.dereg',


  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
