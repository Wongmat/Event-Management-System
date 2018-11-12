/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    login: async function (req, res) {

        if (req.method == "GET") return res.view('user/login');
    
        if (!req.body.username) return res.badRequest();
        if (!req.body.password) return res.badRequest();          
    
        var user = await User.findOne({ username: req.body.username })
        if (!user) {
            res.status(401);
            return res.send("User not found");
        }
        
        const match = sails.bcrypt.compare(req.body.password, user.password)
        if (!match) {
            res.status(401);
            return res.send("Wrong Password");
        }
    
        req.session.regenerate(function (err) {
    
            if (err) return res.serverError(err);
    
            req.session.status = user.status;
            req.session.name = user.username;
            req.session.idNum = user.id;
    
            sails.log("Session: " + JSON.stringify(req.session) );
            
            // return res.json(req.session);
            
            return res.redirect('/');
    
        });
    
    },

    logout: async function (req, res) {

        req.session.destroy(function (err) {
        
            if (err) return res.serverError(err);
            
            return res.redirect('/');
            
        });
    },

    populate: async function (req, res) {

        if (!['isRegistered'].includes(req.params.association)) return res.notFound();
    
        const message = sails.getInvalidIdMsg(req.params);
    
        if (message) return res.badRequest(message);
    
        var model = await User.findOne(req.params.id).populate(req.params.association);
    
        if (!model) return res.notFound();
    
        return res.json(model);
    
    },

    register: async function (req, res) {

        if (!['isRegistered'].includes(req.params.association)) return res.notFound();
    
        const message = sails.getInvalidIdMsg(req.params);
    
        if (message) return res.badRequest(message);
    
        if (!await User.findOne(req.params.id)) return res.notFound();
    
        if (req.params.association == "isRegistered") {
            if (!await Event.findOne(req.params.fk)) return res.notFound();
        }
    
        await User.addToCollection(req.params.id, req.params.association).members(req.params.fk);
    
        return res.ok('Operation completed.');
    
    },

    dereg: async function (req, res) {

        if (!['isRegistered'].includes(req.params.association)) return res.notFound();
    
        const message = sails.getInvalidIdMsg(req.params);
    
        if (message) return res.badRequest(message);
    
        if (!await User.findOne(req.params.id)) return res.notFound();
    
        if (req.params.association == "isRegistered") {
            if (!await Event.findOne(req.params.fk)) return res.notFound();
        }
    
        await User.removeFromCollection(req.params.id, req.params.association).members(req.params.fk);
    
        return res.ok('Operation completed.');
    
    },

    registered: async function (req, res) {
        var model = await User.findOne(req.session.idNum).populate("isRegistered");
        
        return res.view('user/registered', { 'events': model.isRegistered });
    },

};

