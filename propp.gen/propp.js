// based on code found @ https://web.archive.org/web/20061112014356/http://www.brown.edu/Courses/FR0133/Fairytale_Generator/gen.html
//
//  PROPPIAN FAIRY TALE GENERATOR v1.0
//
//  Generator script: Nicole Wee
//  Fairy tale content: Laura Tan & Celeste Lim
//  Authored: April, 2001 for
//            FR133: Fairy Tales and Culture
//            Prof. Lewis Seifert
//            Brown University
//
//  for more information contact: fgen@brown.edu
//  https://web.archive.org/web/20061112014356/http://www.brown.edu/Courses/FR0133/Fairytale_Generator
//

"use strict";

// http://blog.elliotjameschong.com/2012/10/10/underscore-js-deepclone-and-deepextend-mix-ins/
_.mixin({ deepClone: function (p_object) { return JSON.parse(JSON.stringify(p_object)); } });

var fairyTaleGen = {};

var gender = {
    female: 'female',
    male: 'male',
    neuter: 'neuter'
};


var settings = {

    herogender: null,
    villaingender: null,
    peoplegender: null,
    functions: {}

};

// should this be reduced back down to a 0..31 array?
var proppFunctions = {
    "func0": { active: true, templates: [] },
    "func1": { active: false, templates: [] },
    "func2": { active: false, templates: [] },
    "func3": { active: false, templates: [] },
    "func4": { active: false, templates: [] },
    "func5": { active: false, templates: [] },
    "func6": { active: false, templates: [] },
    "func7": { active: false, templates: [] },
    "func8": { active: false, templates: [] },
    "func9": { active: false, templates: [] },
    "func10": { active: false, templates: [] },
    "func11": { active: false, templates: [] },
    "func12": { active: false, templates: [] },
    "func13": { active: false, templates: [] },
    "func14": { active: false, templates: [] },
    "func15": { active: false, templates: [] },
    "func16": { active: false, templates: [] },
    "func17": { active: false, templates: [] },
    "func18": { active: false, templates: [] },
    "func19": { active: false, templates: [] },
    "func20": { active: false, templates: [] },
    "func21": { active: false, templates: [] },
    "func22": { active: false, templates: [] },
    "func23": { active: false, templates: [] },
    "func24": { active: false, templates: [] },
    "func25": { active: false, templates: [] },
    "func26": { active: false, templates: [] },
    "func27": { active: false, templates: [] },
    "func28": { active: false, templates: [] },
    "func29": { active: false, templates: [] },
    "func30": { active: false, templates: [] },
    "func31": { active: false, templates: [] },
    "func32": { active: false, templates: [] }
};


// generates a random number
var random = function(limit){
    var num = Math.floor(Math.random() * limit);
    return num;
};

var randomProperty = function (obj) {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
};


var pick = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};

var pickRemove = function(arr) {
    var index = Math.floor(Math.random() * arr.length);
    return arr.splice(index,1)[0];
};

// return true or false
// 50-50 chance (unless override)
var coinflip = function(chance) {
    if (!chance) { chance = 0.5; }
    return (Math.random() < chance);
};



// TODO: you know, this should probably be part of the templates
// and not even in here
var world = function(settings, wordbank) {


    var bank = {};

    if (wordbank) {
        bank = _.deepClone(bank);
    } else {

        // the values here are purely for testing
        // and do not represent "final" objects
        // characters should be more.. object-y
        // have gender, relations (siblings, parents, etc.)

        // bank.character = _.deepClone(names); // from names.js


        bank.location = ['Hobbiton', 'New Haven', 'East Lansing', 'Madchester', 'Oblivion', 'a valley', 'small village', 'grass hut'];

        bank.magicalitem = ['Singing Telegram', 'Singing Sword', 'Magic Accordion', 'Air Jordans', 'Mad Skillz', '#SWAG'];

        bank.task = ['walk the dog', 'retrieve the Crown Jewels', 'find a hammer', 'cut down the tallest tree in the forest with a herring'];

        bank.punish = ['brought to justice', 'hung, drawn, and quartered', 'given a tongue-lashing'];

        bank.ascension = ['is made king', 'becomes a god', 'becomes filled with knowledge'];
        bank.marries = ['marries', 'is given keys to the city', 'has parking tickets forgiven', 'dates for a few years, but decides to remain single' ];

    };

    var prohibitType = {
        movement: 'movement',
        action: 'action',
        speak: 'speakwith'
    };

    // we should have departure/death
    // parents/siblings
    // maybe make it simple: departure/death, familymember
    var absentationType = {
        departure: 'departure',
        death: 'death'
    };

    // elder := parents, grand-parents
    // family := siblings and all those people we list.
    var absentationPerson = {
        elder: 'elder',
	elders: 'elders',
	parent: 'parent',
	parents: 'parents',
	sibling: 'sibling',
	siblings: 'siblings',
        family: 'family'
    };

    var cache = {};

    var getCharacter = function(gndr) {
        // TODO: what happens when we've used up everything in the bank?
        // SOLUTION: don't worry about it: make the bank bigger than any of our templates
        // for now...
        gndr = gndr || randomProperty(gender);
        return pickRemove(bank.names[gndr]);
    };

    var getCharacters = function(gndr) {
        var members = random(12) + 1; // must always have at least one?
        // or... lives alone???
        // that would take some other sort of coding.
        // and change to the template
        // and make sure that the victim would be the hero, or some random person....
        var acqs = [];
        for (var i = 0; i < members; i++) {
            var g = (!gndr || gndr == 'random' ? randomProperty(gender) : gndr);
            acqs.push(getCharacter(g));
        }
        return acqs;
    };

    var location = function() {
        return pickRemove(bank.location);
    };

    var getHero = function(g) {
	var c = getCharacter(g);
        return c;
    };

    var getHome = function() {
        return location();
    };

    var absention = function() {
        // TODO: select a family member
        // select an absention type
	var aPerson = randomProperty(absentationPerson);
	var aType = randomProperty(absentationType);
    };

    var interdiction = function() {
        var loc;
        var person;
        var action;

        var ptype = randomProperty(prohibitType);
        var prohibit = {
            type: ptype,
            location: '',
            text: '',
            action: '',
            person: '',
            advisor: cache.advisor
        };

        switch (ptype) {
        case prohibitType.movement:
            loc = location();

            prohibit.location = loc;
            prohibit.text = cache.advisor + ' warns ' + cache.hero + ' to avoid ' + prohibit.location;

            break;

        case prohibitType.action:

            prohibit.action = 'take the Lord\'s name in vain';
            prohibit.text = cache.advisor + ' tells ' + cache.hero + ' to not ' + prohibit.action;

            break;

        case prohibitType.speak:

            prohibit.action = 'talk to ' + cache.villain;
            prohibit.text = prohibit.advisor + ' warns ' + cache.hero + ' to not ' + prohibit.action;

            break;
        }

	prohibit.text += '. ' + prohibit.advisor + ' introduces ' + cache.magicalhelper + ' to ' + cache.hero;

        return  prohibit;

    };

    // prohibit is the output of interdiction
    // just to use more words for the same thing...
    var violation = function(prohibit) {

        var text;

        switch (prohibit.type) {
        case prohibitType.movement:

            text = 'Despite the warning, ' + cache.hero + ' goes to ' + prohibit.location + '.';
            text += ' ' + cache.villain + ' appears.';

            break;

        case prohibitType.action:

            text = 'Shockingly, ' + cache.hero + ' proceeds to ' + prohibit.action + '.';
            text += ' ' + cache.villain + ' appears.';

            break;

        case prohibitType.speak:

            text = 'As soon as ' +  prohibit.advisor + ' is gone, ' + cache.hero
                + ' runs off to find ' + cache.villain + ' and has an interesting conversation.';
            break;
        }

        return text;

    };


    var getVillain = function(gdr) {
        return getCharacter(gdr);
    };


    var getFalsehero = function() {
	var g = randomProperty(gender);
	var c = getCharacter(g);
        return c;
    };

    var getMagicalitem = function() {
        return pickRemove(bank.magicalitem);
    };


    var getMagicalHelper = function() {
	return capitalize(pick(sciencefictionWordBank.adjectives)) + ' ' + getCharacter();
    };

    var getPunished = function() {
        return pick(bank.punish);
    };

    var list = function(arr) {
        var lst = '';
        if (arr.length > 0) {
            for (var i = 0; i < arr.length - 1; i++) {
		lst += arr[i] + ', ';
            }
            lst += 'and ' + arr[arr.length - 1];
        }
        return lst;
    };

    var or = function(f1, f2) {
        return (coinflip() ? f1() : f2() );
    };

    var select = function() {
        return pick(arguments);
    };

    var dump = function() {
        return JSON.stringify(cache, null, '\t');
    };

    var init = function() {
	try {

            if (wordbank) { bank = wordbank; }

	    // TODO: move this
	    // also, contingent upon "theme" or something....
	    for (var i = 0; i < 10; i++) {
		bank.magicalitem.push(sfItemGen());
	    }

	    if (!settings.herogender || settings.herogender == 'random') { settings.herogender = randomProperty(gender); }
	    if (!settings.villaingender || settings.villaingender == 'random') { settings.villaingender = randomProperty(gender); }
	    if (!settings.peoplegender || settings.peoplegender == 'random') { settings.peoplegender = randomProperty(gender); }

            cache.hero = getHero(settings.herogender);
            cache.advisor = getCharacter();
            cache.falsehero = getFalsehero();
            cache.home = getHome();
            cache.magicalitem = getMagicalitem();
	    cache.magicalhelper = getMagicalHelper();
            cache.punished = getPunished();
            cache.task = pick(bank.task);
            cache.villain = getVillain(settings.villaingender);
            cache.family = getCharacters(settings.peoplegender);
	    cache.acquantainces = getCharacters(settings.peoplegender);
	    cache.minions = getCharacters(settings.peoplegender);
            cache.victim = pick(cache.family);
            cache.ascension = pick(bank.ascension);
            cache.marries = pick(bank.marries);
            cache.interdiction = interdiction();
            cache.violation = violation(cache.interdiction);

	} catch(ex) {
	    var msg = 'EXCEPTION: ' + ex.message
	            + ' line: ' + ex.lineNumber + ' col: ' + ex.columnNumber + '\n'
	            + ex.stack;
	    console.log(msg);
	}
    }(settings);

    return {
        init: init,
        advisor: function() { return cache.advisor; },
        falsehero: function() { return cache.falsehero; },
	// TODO: if there are NO family or acquantainces, how is this handled??
        family: function() { return cache.family; },
        acquantainces: function() { return cache.acquantainces; },
        hero: function() { return cache.hero;},
        home: function() { return cache.home;},
        interdiction: function() { return cache.interdiction; },
	minions: function() { return cache.minions; },
        violation: function() { return cache.violation; },
        villain: function() { return cache.villain;},
        punished: function() { return cache.punished; },
        magicalitem: function() { return cache.magicalitem; },
        magicalhelper: function() { return cache.magicalhelper; },
        task: function() { return cache.task;},
        victim: function() { return cache.victim; },
        ascension: function() { return cache.ascension; },
        marriage: function() { return cache.marries; },
        pick: pick,
        or: or,
        list: list,
        select: select,
        dump: dump
    };

};

var capitalize = function(str) {
    return str.slice(0,1).toUpperCase() + str.slice(1);
};

// populate template
// which may contain multiple sentences.
var sentence = function(index, helper) {

    var f;
    var func = proppFunctions[index];
    if (func.active) {
        f = func.templates[random(func.templates.length)];
        var t = _.template(f);
        f = t(helper);
	f = capitalize(f);
    }

    return f;

};


// generate the fairy tale
function generate(settings){

    fairyTaleGen.settings = settings;
    fairyTaleGen.proppFunctions = proppFunctions;

    // proppFunctions = defaultTemplates(proppFunctions);
    proppFunctions = nTemplates(proppFunctions);

    var tale = [];

    fairyTaleGen.helper = world(fairyTaleGen.settings, defaultbank);

    for (var index in proppFunctions) {
	// TODO: we could retrieve the function HERE.....
        var s = sentence(index, fairyTaleGen.helper);
        if (s) {
            tale.push(s);
        }
    }

    return tale.join('\n\n');

}



settings.functions = proppFunctions;

fairyTaleGen.settings = settings;
fairyTaleGen.random = random;
fairyTaleGen.sentence = sentence;
fairyTaleGen.generate = generate;


fairyTaleGen.cinderella = cinderella;
fairyTaleGen.hansel = hansel;
fairyTaleGen.swhite = swhite;
fairyTaleGen.lrrh = lrrh;
fairyTaleGen.juniper = juniper;
