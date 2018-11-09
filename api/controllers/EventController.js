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
    req.body.Event.date = new Date(req.body.Event.date);
    await Event.create(req.body.Event);

    return res.redirect(200, './create')
},

index: async function (req, res) {

    var events = await Event.find({highlighted: 'Highlighted'}).limit(4);
    const nutcracker = await Event.findOne({name: "The Nutcracker"})
const bruce = await Event.findOne({name: "Bruce Lee: Kung Fu . Art . Life"})

console.log(nutcracker.id);
console.log(bruce.id);
    return res.view('event/index', { 'events': events });
},

admin: async function (req, res) {
    var events = await Event.find();
    return res.view('event/admin', { 'events': events });

},

delete: async function (req, res) {

    if (req.method == "POST") {
        const id = parseInt(req.params.id) || -1;

        var models = await Event.destroy(id).fetch();

        if (models.length > 0)
            return res.send("Event Deleted.");
        else
            return res.send("Event not found.");

    } else {
        return res.send("Request Forbidden");
    }
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
            return res.redirect(200, '/event/admin')
        else
            return res.send("Event not found!");

    }
},

search: async function (req, res) {
    const qPage = Math.max(req.query.page - 1, 0) || 0;
    let startDate = (req.query.start_date == '') ? new Date("01-01-1900") : new Date(req.query.start_date);
    let endDate = (req.query.end_date == '') ? new Date("12-31-3000") : new Date(req.query.end_date);
    const terms = (Object.keys(req.query).length < 2) ? {} : {
        name: { contains: req.query.name },
        organizer: req.query.organizer || {'!=': req.query.organizer },
        date: {'>=': startDate, '<=': endDate},
        venue: req.query.venue || {'!=': req.query.venue}
    }
    const numOfItemsPerPage = 2;
        var events = await Event.find({
            where: terms,
            sort: 'name',
            limit: numOfItemsPerPage, 
            skip: numOfItemsPerPage * qPage
        });
        var numOfPage = Math.ceil(await Event.count({ where: terms})/ numOfItemsPerPage);
        let pageLess = (req.url.endsWith("search")) 
        ? req.url + "?" : (req.url.match(/page.*$/)) 
        ? req.url.replace(/page.*$/, "") : req.url + "&";
    return res.view('event/search', { 'events': events, 'count': numOfPage, 'pageLess': pageLess });
},

populate: async function (req, res) {

    if (!['hasAttending'].includes(req.params.association)) return res.notFound();

    const message = sails.getInvalidIdMsg(req.params);

    if (message) return res.badRequest(message);

    var model = await Event.findOne(req.params.id).populate(req.params.association);

    if (!model) return res.notFound();

    return res.json(model);

},

};
