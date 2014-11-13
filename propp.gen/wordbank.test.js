var defaultbank = {};

// the specific location, like "home" or "office"
defaultbank.residence = ['grass hut', 'small house', 'barn', 'hovel', 'stately manor', 'decayed mansion', 'shack', 'shed', 'house'];

// the vicinity of the home
defaultbank.location = ['Hobbiton', 'New Haven', 'East Lansing', 'Madchester', 'Oblivion', 'a valley', 'a small village', 'a lonely intersection'];

// this should more be country. 'Nation' is short-hand.
defaultbank.nation = ['the Monastic State of the Teutonic Knights', 'Prussia', 'East Germany', 'Middle Earth', 'Orange County', 'Northern California', 'Talexico'];

// TODO: things must also have properties
// this is a proposal...
// var thing = {
//     item: 'egg', // name could be "Egg of Death" or "Death Egg" or "Primordial Magic Death Egg of the Borderlands" or something telse
//     //
//     name: 'Magical Egg of the Wong Foo the Elder',
//     description: ['shiny', 'round', 'egg-shaped', 'magical', 'filigreed', 'expensive'],
//     weapon: true, // or false
//     magic: true, // or false
//     // special powers? how would THAT work ????
//     origin: {
//         // if a person gave the object, or it was found ?
//         person: null,
//         place: null
//     }
// };

defaultbank.magicalitem = ['Singing Telegram', 'Singing Sword', 'Magic Accordion', 'pair of Air Jordans', 'Mad Skillz', '#SWAG'];

// some can be premade; goal is to have a generator make things "like" this...
defaultbank.magicalitems = [
    {
        item: 'Singing Telegram',
        name: 'Singing Telegram of the Unione Occidentem',
        adjectives: ['papery', 'flat', 'sonorous', 'melodious', 'powerful', 'esoteric'],
        weapon: true,
        magic: true
    },
    {
        item: 'Singing Sword',
        name: 'Bing\s Singing Sword',
        adjectives: ['metallic', 'sharp', 'pointy', 'musical', 'melodious', 'powerful'],
        weapon: true,
        magic: true
    },
    {
        item: 'Magic Accordion',
        name: 'Benedetto\'s Magic Accordion',
        adjectives: ['clackity', 'reedy', 'angular', 'musical', 'melodious', 'powerful', 'esoteric', 'polkariffic'],
        weapon: true,
        magic: true
    }
    // TODO: 'pair of Air Jordans', 'Mad Skillz', '#SWAG'
];

defaultbank.task = ['walk the dog', 'retrieve the Crown Jewels', 'find a hammer', 'cut down the tallest tree in the forest with a herring'];

defaultbank.punish = ['brought to justice', 'hung, drawn, and quartered', 'given a tongue-lashing'];

defaultbank.ascension = ['is made king', 'becomes a god', 'becomes filled with knowledge'];

// TODO: mark the verbs, so they can be conjugated
// well need these in the infinitive
// nlp.verb(vb).conjugate() :=
// { present: 'dates',
//   gerund: 'dating',
//   past: 'dated',
//   infinitive: 'date',
//   doer: 'dater' }
// uh, the passive?
// defaultbank.marries = ['marry', 'is given keys to the city', 'has parking tickets forgiven', 'date for a few years, but decide to remain single' ];
defaultbank.marries = ['marries', 'is given keys to the city', 'has parking tickets forgiven', 'dates for a few years, but decides to remain single' ];

defaultbank.adjectives = adjectives;
defaultbank.interjections = interjections;


defaultbank.names = {

    male: ['Baitogogo', 'Jaffar', 'Tyrion Lannister', 'PeeWee Herman', 'Santa Claus',
	   'Jolly Green Giant', 'Stay-Puft Marshmallow Man', 'Jacob',
	   'Michael', 'Joshua', 'Matthew', 'Daniel', 'Christopher',
	   'Andrew', 'Ethan', 'Joseph', 'William', 'Anthony', 'David',
	   'Alexander', 'Nicholas', 'Ryan', 'Tyler', 'James', 'John',
	   'Jonathan', 'Noah', 'Brandon', 'Christian', 'Dylan', 'Samuel',
	   'Benjamin', 'Nathan'],

    female: ['Brienne of Tarth', 'Joan of Arc', 'Holly Shiftwell',
	     'Lauren', 'Chloe', 'Natalie', 'Kayla', 'Jessica', 'Anna',
	     'Victoria', 'Mia', 'Hailey', 'Sydney', 'Jasmine', 'Julia',
	     'Morgan', 'Destiny', 'Rachel', 'Ella', 'Kaitlyn', 'Megan',
	     'Katherine', 'Savannah', 'Jennifer', 'Alexandra', 'Allison',
	     'Haley', 'Maria', 'Kaylee', 'Lily', 'Makayla'],

    // could also be "unisex"
    // see also http://en.wikipedia.org/wiki/Unisex_name
    neuter: [
	'the Easter Bunny',
	'TIAMAT',
	'the Spirit of 1776',
	'DEATH',
	'Pat',
	'Chris',
	'Leslie',
	'Alexis',
	'Amari',
	'Angel',
	'Ariel',
	'Armani',
	'Avery',
	'Blake',
	'Cameron',
	'Camryn',
	'Carter',
	'Casey',
	'Charlie',
	'Dakota',
	'Dallas',
	'Dylan',
	'Eden',
	'Elliot',
	'Elliott',
	'Emerson',
	'Emery',
	'Emory',
	'Finley',
	'Harley',
	'Harper',
	'Hayden',
	'Hunter',
	'Jamie',
	'Jayden',
	'Jaylin',
	'Jessie',
	'Jordan',
	'Jordyn',
	'Justice',
	'Kai',
	'Kamryn',
	'Kayden',
	'Kendall',
	'Lennon',
	'Logan',
	'London',
	'Lyric',
	'Marley',
	'Micah',
	'Milan',
	'Morgan',
	'Oakley',
	'Parker',
	'Payton',
	'Peyton',
	'Phoenix',
	'Quinn',
	'Reagan',
	'Reese',
	'Riley',
	'River',
	'Rory',
	'Rowan',
	'Ryan',
	'Rylan',
	'Rylee',
	'Sage',
	'Sawyer',
	'Sidney',
	'Skylar',
	'Skyler',
	'Sydney',
	'Tatum',
	'Taylor',
	'Teagan',
	'Zion'
    ]

};

// magical science items
// are there going to be categories?
// based on list from
// http://webcache.googleusercontent.com/search?q=cache:hHHDD1u3puMJ:www.ironwolfgames.com/2011/09/17/fun-with-science-fiction-buzzwords/&client=firefox-a&hl=en&gl=us&strip=1
defaultbank.itembank = {

    adjectives: [
	'auxiliary',
	'alternate',
	'automatic',
	'dynamic',
	'electron',
	'external',
	'finite',
	'humanoid',
	'infinite',
	'internal',
	'kinetic',
	'linear',
	'multi-phase',
	'neural',
	'organic',
	'phase',
	'pneumatic',
	'positron',
	'primary',
	'quantum',
	'static',
	'sub-light',
	'sub-space',
	'temporal'
	// ,'trans-'
    ],

    nouns: [
	'amplitude',
	'buffer',
	'conduit',
	'coordinates',
	'core',
	'data',
	'deflector',
	'drive',
	'emitter',
	'event horizon',
	'field',
	'fluctuation',
	'generator',
	'hull integrity',
	'matrix',
	'parameter',
	'particle',
	'plasma',
	'relay',
	'rift',
	'rupture',
	'shield',
	'singularity',
	'system',
	'theory'
    ]
};



// ugh. capitalize is defined in propp.js
// bank { adjective: [], verbs: [] }
var itemGenerator = function(bank) {

    var adjCount = random(4) + 1;
    var adjs = [];

    for (var i = 0; i < adjCount; i++) {
	adjs.push(capitalize(pick(bank.adjectives)));
    };

    var thing = capitalize(pick(bank.nouns));

    return adjs.join('-') + ' ' + thing;

};

defaultbank.itemGenerator = function() {

    return itemGenerator(defaultbank.itembank);

};