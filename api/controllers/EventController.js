/**
 * EventController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async function (req, res) {

    if (req.method == "GET")
        return res.view('event/create');

    if (typeof req.body.Event === "undefined")
        return res.badRequest("Form-data not received.");
    if (!req.body.Event.highlighted) req.body.Event.highlighted = "Not highlighted";
    await Event.create(req.body.Event);

    return res.ok("Successfully created!");
},

index: async function (req, res) {

    var events = await Event.find({highlighted: 'Highlighted'});
    console.log(events);
    return res.view('event/index', { 'events': events });

},

admin: async function (req, res) {

    var events = await Event.find();
    return res.view('event/admin', { 'events': events });

},

view: async function (req, res) {

    var message = Event.getInvalidIdMsg(req.params);

    if (message) return res.badRequest(message);

    var model = await Event.findOne(req.params.id);

    if (!model) return res.notFound();

    return res.view('event/view', { 'event': model });

},

update: async function (req, res) {

    var id = parseInt(req.params.id) || -1;
    if (req.method == "GET") {

        var model = await Event.findOne(id);
        if (model != null) 
            return res.view('event/update', { 'event': model });
        
        else
            return res.send("No such event!");

    } else {
        var models = await Event.update(id).set({
            name: req.body.Event.name,
            short_desc: req.body.Event.short_desc,
            full_desc: req.body.Event.full_desc,
            img_url: req.body.Event.img_url,
            organizer: req.body.Event.organizer,
            time: req.body.Event.time,
            date: req.body.Event.date,
            venue: req.body.Event.venue,
            quota: req.body.Event.quota,
            highlighted: req.body.Event.highlighted || "Not highlighted",
        }).fetch();
        if (models.length > 0)
            return res.send("Record updated");
        else
            return res.send("Event not found!");

    }
},

};
