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

var proppianStoryGen = {};

var gender = {
    female: 'female',
    male: 'male',
    neuter: 'neuter'
};

var healthLevel = {
    alive: 'alive',
    sickly: 'sickly',
    dead: 'dead'
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


    var bank = _.deepClone(wordbank);
    if (wordbank && wordbank.itemGenerator) {
        bank.itemGenerator = wordbank.itemGenerator;

        for (var i = 0; i < 10; i++) {
            bank.magicalitem.push(bank.itemGenerator());
        }
    }

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

    var createCharacter = function(gndr) {
        // TODO: what happens when we've used up everything in the bank?
        // SOLUTION: don't worry about it: make the bank bigger than any of our templates
        // for now...
        gndr = gndr || randomProperty(gender);

        return { name: pickRemove(bank.names[gndr]),
                 gender: gndr,
                 posessions: [],
                 health: healthLevel.alive
               };
    };

    var createCharacters = function(gndr) {
        var members = random(12) + 1; // must always have at least one?
        // or... lives alone???
        // that would take some other sort of coding.
        // and change to the template
        // and make sure that the victim would be the hero, or some random person....
        var acqs = [];
        for (var i = 0; i < members; i++) {
            var g = (!gndr || gndr == 'random' ? randomProperty(gender) : gndr);
            acqs.push(createCharacter(g));
        }
        return acqs;
    };

    // TODO: use these three things and create an "object"
    // need a home
    // defaultbank.home
    // // the vicinity of the home
    // defaultbank.location
    // // this should more be country. 'Nation' is short-hand.
    // defaultbank.nation
    var location = function() {
        // return pickRemove(bank.home);
        return {
            residence: pickRemove(bank.residence),
            location: pickRemove(bank.location),
            nation: pickRemove(bank.nation)
        };
    };

    // hero or villain
    var createHero = function(g) {
        // oooooh, we just want to ADD properties to the character
        // so we d on't repeat the name, gender, posessions, etc....
        var c = createCharacter(g);
        c.family = createCharacters(settings.peoplegender);
        c.acquaintances = createCharacters(settings.peoplegender);
        c.home = location();

        return c;

        return {
            name: c.name,
            gender: c.gender,
            family: family
            , acquaintances: acquaintances
            , home: location()
            , posessions: []
        };
    };

    var createHome = function() {
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

            prohibit.place = loc;
            prohibit.text = cache.advisor.name + ' warns ' + cache.hero.name + ' to avoid ' + prohibit.place.location;

            break;

        case prohibitType.action:

            prohibit.action = 'take the Lord\'s name in vain';
            prohibit.text = cache.advisor.name + ' tells ' + cache.hero.name + ' to not ' + prohibit.action;

            break;

        case prohibitType.speak:

            prohibit.action = 'talk to ' + cache.villain.name;
            prohibit.text = prohibit.advisor.name + ' warns ' + cache.hero.name + ' to not ' + prohibit.action;

            break;
        }

        prohibit.text += '. ' + prohibit.advisor.name + ' introduces ' + cache.magicalhelper.name + ' to ' + cache.hero.name;

        return  prohibit;

    };

    // prohibit is the output of interdiction
    // just to use more words for the same thing...
    var violation = function(prohibit) {

        var text;

        switch (prohibit.type) {
        case prohibitType.movement:

            text = 'Despite the warning, ' + cache.hero.name + ' goes to ' + prohibit.place.location + '.';
            text += ' ' + cache.villain.name + ' appears.';

            break;

        case prohibitType.action:

            text = 'Shockingly, ' + cache.hero.name + ' proceeds to ' + prohibit.action + '.';
            text += ' ' + cache.villain.name + ' appears.';

            break;

        case prohibitType.speak:

            text = 'As soon as ' +  prohibit.advisor.name + ' is gone, ' + cache.hero.name
                + ' runs off to find ' + cache.villain.name + ' and has an interesting conversation.';
            break;
        }

        return text;

    };

    var createFalsehero = function() {
        var g = randomProperty(gender);
        var c = createCharacter(g);
        return c;
    };

    var createMagicalitem = function() {
        return pickRemove(bank.magicalitem);
    };


    var createMagicalHelper = function() {
        var person = createCharacter();
        person.name = capitalize(pick(bank.itembank.adjectives)) + ' ' + person.name;
        return person;
    };

    var createPunished = function() {
        return pick(bank.punish);
    };

    var getName = function(person) {
        var elem = (typeof person == 'string' ? person : person.name);
        return elem;
    };

    var list = function(arr) {
        var lst = '';
        if (arr.length > 0) {
            if (arr.length == 1) {
                lst = getName(arr[0]);
            }
            else if (arr.length == 2) {
                lst = getName(arr[0]) + ' and ' + getName(arr[1]);
            } else {
                for (var i = 0; i < arr.length - 1; i++) {
                    lst += getName(arr[i]) + ', ';
                }
                lst += 'and ' + getName(arr[arr.length - 1]);
            }
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
        if (!bank) return;
        try {

            if (!settings.herogender || settings.herogender == 'random') { settings.herogender = randomProperty(gender); }
            if (!settings.villaingender || settings.villaingender == 'random') { settings.villaingender = randomProperty(gender); }
            if (!settings.peoplegender || settings.peoplegender == 'random') { settings.peoplegender = randomProperty(gender); }

            cache.hero = createHero(settings.herogender);
            cache.advisor = createCharacter();
            cache.magicalitem = createMagicalitem();
            cache.magicalhelper = createMagicalHelper();
            cache.punished = createPunished();
            cache.task = pick(bank.task);
            cache.villain = createHero(settings.villaingender);
            cache.victim = pick(cache.hero.family);
            cache.ascension = pick(bank.ascension);
            cache.marries = pick(bank.marries);
            cache.interdiction = interdiction();
            cache.violation = violation(cache.interdiction);
            cache.falsehero = pick(cache.villain.family);

        } catch(ex) {
            // the last 3 items are non-standard.....
            var msg = ex.name + ' : ' + ex.message;
            if (ex.lineNumber && ex.columnNumber && ex.stack) {
                msg += ' line: ' + ex.lineNumber + ' col: ' + ex.columnNumber + '\n'
                    + ex.stack;
            }
            console.log(msg);
        }
    }(settings);

    return {
        init: init,
        advisor: function() { return cache.advisor; },
        falsehero: function() { return cache.falsehero; },
        // TODO: if there are NO family or acquantainces, how is this handled??
        // family: function() { return cache.family; },
        // acquantainces: function() { return cache.acquantainces; },
        hero: function() { return cache.hero;},
        interdiction: function() { return cache.interdiction; },
        violation: function() { return cache.violation; },
        villain: function() { return cache.villain;},
        punished: function() { return cache.punished; },
        magicalitem: function() { return cache.magicalitem; },
        magicalhelper: function() { return cache.magicalhelper; },
        task: function() { return cache.task;},
        victim: function() { return cache.victim; },
        ascension: function() { return cache.ascension; },
        marriage: function() { return cache.marries; },
        cache: cache, // hunh. exposing this?????
        pick: pick,
        or: or,
        list: list,
        select: select,
        dump: dump,
        prohibitType: prohibitType
    };

};

var capitalize = function(str) {
    return str.slice(0,1).toUpperCase() + str.slice(1);
};

// populate template
// which may contain multiple sentences.
var sentence = function(index, helper) {

    var f = '';
    var func = proppFunctions[index];
    if (func && func.active) {
        if (func.exec) {
            f = func.exec(helper);
        } else {
            f = func.templates[random(func.templates.length)];
        }
        var t = _.template(f);
        f = t(helper);
        f = capitalize(f);
    }

    return f;

};


// generate the fairy tale
function generate(settings, theme){

    try {
        proppianStoryGen.settings = settings;
        proppianStoryGen.proppFunctions = proppFunctions;

        proppFunctions = theme.templates(proppFunctions);

        var tale = [];

        proppianStoryGen.helper = world(proppianStoryGen.settings, theme.bank);

        // this doesn't handle recursive stories (this is the one I'm particularly interested in)
        // multiple tasks
        // or going back to a previous point in the chain
        // :-(
        for (var index in proppFunctions) {
            var s = sentence(index, proppianStoryGen.helper);
            if (s) {
                tale.push(s);
            }
        }

        return tale.join('\n\n');
    } catch(ex) {
        // the last 3 items are non-standard.....
        var msg = ex.name + ' : ' + ex.message;
        if (ex.lineNumber && ex.columnNumber && ex.stack) {
            msg += ' line: ' + ex.lineNumber + ' col: ' + ex.columnNumber + '\n'
                + ex.stack;
        }
        console.log(msg);
        return msg;
    }
}



settings.functions = proppFunctions;

proppianStoryGen.settings = settings;
proppianStoryGen.random = random;
proppianStoryGen.sentence = sentence;
proppianStoryGen.generate = generate;


proppianStoryGen.cinderella = cinderella;
proppianStoryGen.hansel = hansel;
proppianStoryGen.swhite = swhite;
proppianStoryGen.lrrh = lrrh;
proppianStoryGen.juniper = juniper;
