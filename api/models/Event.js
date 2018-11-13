/**
 * Event.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    name: {
      type: "string"
    },

    short_desc: {
      type: "string"
    },

    full_desc: {
      type: "string"
    },

    img_url: {
      type: "string"
    },

    organizer: {
      type: "string"
    },

    time: {
      type: "string"
    },

    date: {
      columnType: "datetime",
      type: "ref"

    },

    venue: {
      type: "string"
    },

    quota: {
      type: "number"
    },

    highlighted: {
      type: "string"
    },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    hasAttending: {
      collection: 'User',
      via: 'isRegistered'
    },

  },

  getInvalidIdMsg: function (opts) {

    if (typeof opts.id === "undefined" || isNaN(parseInt(opts.id)))
      return "Event id not specified or with incorrect type.";

    return null;        // falsy

},

};
