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

    if (typeof req.body === "undefined")
        return res.badRequest("Form-data not received.");
    req.body.date = new Date(req.body.date);
    await Event.create(req.body);
    return res.send(200, "Event created!")
},

index: async function (req, res) {
    var events = await Event.find({highlighted: 'Highlighted'}).limit(4);
    return res.view('event/index', { 'events': events });
},

highlighted: async function (req, res) {
    var events = await Event.find({highlighted: 'Highlighted'}).limit(4);
    return res.status(200).json(events);
},

admin: async function (req, res) {
    var events = await Event.find();
    var registered = await User.findOne(req.session.idNum).populate('isRegistered');

    return res.view('event/admin', { 'events': events, 'registered': registered.isRegistered  });

},

delete: async function (req, res) {
    if (req.method == "DELETE") {
        const id = parseInt(req.params.id) || -1;
        var models = await Event.destroy(id).fetch();
        if (models.length > 0) {
            return res.send("Event Deleted.");
        }
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

    var regStatus

    if (req.session.idNum) {
    var reg = await User.findOne(req.session.idNum).populate("isRegistered", {
        where: {
            id: req.params.id
        }
    })

    regStatus = reg.isRegistered.length == 0 ? false : true
}

    else regStatus = false;
    if (req.wantsJSON) return res.status(200).json(model);
    return res.view('event/view', { 'event': model, 'registered': regStatus });

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
        if (req.body.date) req.body.date = new Date(req.body.date);
        var models = await Event.update(id).set(req.body).fetch();
        if (models.length > 0)
            return res.send(200, "Update successful")
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
    
    const numOfItemsPerPage = (req.wantsJSON) ? 500 : 2;
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
    if (req.wantsJSON) {
        return res.status(200).json(events);
    }

    return res.view('event/search', { 'events': events, 'count': numOfPage, 'pageLess': pageLess });
},

populate: async function (req, res) {

    if (!['hasAttending'].includes(req.params.association)) return res.notFound();

    const message = sails.getInvalidIdMsg(req.params);

    if (message) return res.badRequest(message);

    var model = await Event.findOne(req.params.id).populate(req.params.association);

    if (!model) return res.notFound();

    return res.view('event/attendees', { 'attendees': model.hasAttending });

},

};
