/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function(done) {
  sails.bcrypt = require('bcrypt');
  const saltRounds = 10; 

  sails.getInvalidIdMsg = function (opts) {

    if (opts.id && isNaN(parseInt(opts.id))) {
        return "Primary key specfied is invalid (incorrect type).";
    }
  
    if (opts.fk && isNaN(parseInt(opts.fk))) {
        return "Foreign key specfied is invalid (incorrect type).";
    }
  
    return null;        // falsy
  
  }

  if (await Event.count() > 0) {
    return done();
}

await Event.createEach([
  {
    name: "Xpress Race Cup 2018 Hong Kong Round 3",
    short_desc: "We are hosting a race again alongside Xpress\nAnnouncing the 2018 Xpress Cup Series, where we head around Hong Kong to find who can be the fastest and most consistent throughout the year!",
    full_desc: "We are hosting a race again alongside Xpress\nAnnouncing the 2018 Xpress Cup Series, where we head around Hong Kong to find who can be the fastest and most consistent throughout the year! There will be four rounds and one lucky winner who has attended three of the four rounds will win a return air ticket to TITC by lucky draw!\nMore details coming soon!\nwww.rc-xpress.com",
    img_url: "https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-0/p280x280/40270019_1982314815122566_8184948089707036672_o.jpg?_nc_cat=110&oh=937f471f7fd7c7845f5d75978d6a1fb1&oe=5C48765B",
    organizer: "AIESEC",
    time: "7:00-8:00",
    date: new Date("10/25/2018"),
    venue: "AAB",
    quota: 100,
    highlighted: "Highlighted",
},

{
  name: "Bruce Lee: Kung Fu . Art . Life",
  short_desc: "In collaboration with the Bruce Lee Foundation in the United States, the Hong Kong Heritage Museum has organized an exhibition that looks at Bruce Lee as not only a film star and martial artist, but also cultural phenomenon. ",
  full_desc: "In collaboration with the Bruce Lee Foundation in the United States, the Hong Kong Heritage Museum has organized an exhibition that looks at Bruce Lee as not only a film star and martial artist, but also cultural phenomenon. The exhibition has more than 600 invaluable items of Bruce Lee memorabilia provided by local and overseas collectors and organizations. Visitors will be able to gain a greater insight into his achievements and contributions as well as his significance in popular culture. ",
  img_url: "http://www.discoverhongkong.com/common/images/events/64526/bruce-lee_big.jpg",
  organizer: "CS Students Association",
  time: "5:00-8:00",
  date: new Date("7/25/2018"),
  venue: "FSC",
  quota: 10,
  highlighted: "Highlighted",
},

{
  name: "Giselle",
  short_desc: "One of the greatest ballets ever created, Giselle is a passionate tale of love, betrayal and forgiveness. ",
  full_desc: "One of the greatest ballets ever created, Giselle is a passionate tale of love, betrayal and forgiveness. With coveted virtuoso roles and an iconic ‘white act’, this fresh new staging by Septime Webre and South African ballet artist Charla Genn is coached by ballet-world superstars Alessandra Ferri and Julio Bocca, after the Coralli/Perrot original. It features stunning sets and costumes by Peter Farmer and live accompaniment by the Hong Kong Sinfonietta. An array of international guest artists will dance alongside Hong Kong Ballet artists in the legendary lead roles. This is classical ballet at its most transcendent!",
  img_url: "http://www.discoverhongkong.com/common/images/events/75056/image1.jpg",
  organizer: "Arts Students Association",
  time: "8:00-9:00",
  date: new Date("1/2/2019"),
  venue: "OEM",
  quota: 80,
  highlighted: "Highlighted",
},

{
  name: "The Nutcracker",
  short_desc: "Catch an enchanted Christmas journey with little Clara, as snowflakes swirl, flowers waltz, and the heroic Nutcracker battles the villainous Rat King to reunite with his ballerina love. ",
  full_desc: "Catch an enchanted Christmas journey with little Clara, as snowflakes swirl, flowers waltz, and the heroic Nutcracker battles the villainous Rat King to reunite with his ballerina love. Tchaikovsky’s unforgettable score contains some of the most brilliant music written for ballet, and renowned Australian choreographer Terence Kohler brings the audience into a world of wonderment and joy in this perennial holiday celebration, with live music by the Hong Kong Sinfonietta.",
  img_url: "http://www.discoverhongkong.com/common/images/events/75058/image1.jpg",
  organizer: "Arts Students Association",
  time: "8:00-9:00",
  date: new Date("12/30/2018"),
  venue: "CVA",
  quota: 70,
  highlighted: "Not highlighted",
},

{
  name: "Come Across",
  short_desc: "Enjoy unstoppable dances created by two choreographers, Hong Kong’s Noel Pong and Korea’s Kim Jae-duk.",
  full_desc: "Enjoy unstoppable dances created by two choreographers, Hong Kong’s Noel Pong and Korea’s Kim Jae-duk. It’s a blend of culture, gender, nationality...a face-off between two choreographers from two different towns; a dance collage of strong personalities and characters. Award-winning dancer-choreographer Noel Pong explores the tangible and intangible of growing up through contemporary dance and drama. Kim, hailed as Korea’s ‘Choreographer of 2017’, displays his signature powerful movement and distinctive musicality inspired by traditional and modern Korean dance and music. It’s a night to remember for dance lovers.",
  img_url: "http://www.discoverhongkong.com/common/images/events/75053/image1.jpg",
  organizer: "Film Studies Students Association",
  time: "8:00-9:00",
  date: new Date("10/15/2018"),
  venue: "AAB",
  quota: 0,
  highlighted: "Highlighted",
},
]);

const hash = await sails.bcrypt.hash('123456', saltRounds);

await User.createEach([
  { "username": "siteAdmin", "status": "admin", "password": hash },
  { "username": "Joe", "status": "student", "password": hash },
  { "username": "Bob", "status": "student", "password": hash },
  { "username": "Steve", "status": "student", "password": hash },
  // etc.
]);

const nutcracker = await Event.findOne({name: "The Nutcracker"})
const bruceLee = await Event.findOne({name: "Bruce Lee: Kung Fu . Art . Life"})
const bob = await User.findOne({username: "Bob"})
const joe = await User.findOne({username: "Joe"})

await Event.addToCollection(nutcracker.id, 'hasAttending').members(bob.id);
await Event.addToCollection(bruceLee.id, 'hasAttending').members(joe.id);

  return done();

};
