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

var fairyTaleGen = {};

var gender = {
    female: 'female',
    male: 'male',
    neuter: 'neuter'
};


var settings = {

    gender: gender.female,
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

settings.functions = proppFunctions;
fairyTaleGen.settings = settings;

//TEST CODE (non-functional)
//sets villian to female witch, checks absention
//function preset(){
//      window.document.myform.villain.value = "witch";
//      window.document.myform.func1.checked = true;
//      window.document.myform.villainGender[1].checked = true;
//}


// generates a random number
function random(limit){
    var num = Math.floor(Math.random() * limit);
    return num;
}


// TODO: you know, this should probably be part of the templates
// and not even in here
var world = function(settings, wordbank) {

    var pick = function(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    };

    var pickRemove = function(arr) {
        var index = Math.floor(Math.random() * arr.length);
        return arr.splice(index,1)[0];
    };

    var randomProperty = function (obj) {
        var keys = Object.keys(obj);
        return obj[keys[ keys.length * Math.random() << 0]];
    };

    // return true or false
    // 50-50 chance (unless override)
    var coinflip = function(chance) {
        if (!chance) { chance = 0.5; }
        return (Math.random() < chance);
    };

    var bank = {};

    // the values here are purely for testing
    // and do not represent "final" objects
    // characters should be more.. object-y
    // have gender, relations (siblings, parents, etc.)

    bank.character = {
        male: ['Jaffar', 'Tyrion Lannister', 'PeeWee Herman', 'Santa Claus', 'Jolly Green Giant', 'Stay-Puft Marshmallow Man', 'Jacob', 'Michael', 'Joshua', 'Matthew', 'Daniel', 'Christopher', 'Andrew', 'Ethan', 'Joseph', 'William', 'Anthony', 'David', 'Alexander', 'Nicholas', 'Ryan', 'Tyler', 'James', 'John', 'Jonathan', 'Noah', 'Brandon', 'Christian', 'Dylan', 'Samuel', 'Benjamin', 'Nathan'],
        female: ['Brienne of Tarth', 'Joan of Arc', 'Holly Shiftwell', 'Lauren', 'Chloe', 'Natalie', 'Kayla', 'Jessica', 'Anna', 'Victoria', 'Mia', 'Hailey', 'Sydney', 'Jasmine', 'Julia', 'Morgan', 'Destiny', 'Rachel', 'Ella', 'Kaitlyn', 'Megan', 'Katherine', 'Savannah', 'Jennifer', 'Alexandra', 'Allison', 'Haley', 'Maria', 'Kaylee', 'Lily', 'Makayla'],
        neuter: ['Easter Bunny', 'TIAMAT', 'Spirit of 1776', 'Pat', 'Chris', 'Leslie', 'DEATH']
    };

    bank.location = ['Hobbiton', 'New Haven', 'East Lansing', 'Madchester', 'Oblivion', 'a valley', 'small village', 'grass hut'];

    bank.magicalitem = ['Singing Telegram', 'Singing Sword', 'Magic Accordion', 'Air Jordans', 'Mad Skillz', '#SWAG'];

    bank.task = ['walk the dog', 'retrieve the Crown Jewels', 'find a hammer', 'cut down the tallest tree in the forest with a herring'];

    bank.punish = ['brought to justice', 'hung, drawn, and quartered', 'given a tongue-lashing'];

    bank.ascension = ['is made king', 'becomes a god', 'becomes filled with knowledge'];
    bank.marries = ['marries', 'is given keys to the city', 'has parking tickets forgiven', 'dates for a few years, but decides to remain single' ];

    var prohibitType = {
        movement: 'movement',
        action: 'action',
        speak: 'speakwith'
    };

    var cache = {};

    var character = function(gndr) {
        // TODO: what happens when we've used up everything in the bank?
        // SOLUTION: don't worry about it: make the bank bigger than any of our templates
        // for now...
	gndr = gndr || randomProperty(gender);
        return pickRemove(bank.character[gndr]);
    };

    var location = function() {
        return pickRemove(bank.location);
    };

    var hero = function() {
        return (character(settings.gender));
    };

    var home = function() {
        return location();
    };

    var interdiction = function() {
        var loc;
        var advisor = character();
        var person;
        var action;

        var ptype = randomProperty(prohibitType);
        var prohibit = {
            advisor: advisor,
            type: ptype,
            location: '',
            text: '',
            action: '',
            person: ''
        };

        switch (ptype) {
        case prohibitType.movement:
            loc = location();

            prohibit.location = loc;
            prohibit.text = advisor + ' warns ' + cache.hero + ' to avoid ' + prohibit.location;

            break;

        case prohibitType.action:

            prohibit.action = 'take the Lord\'s name in vain';
            prohibit.text = advisor + ' tells ' + cache.hero + ' to not ' + prohibit.action;

            break;

        case prohibitType.speak:

            prohibit.action = 'talk to ' + cache.villain;
            prohibit.text = advisor + ' warns ' + cache.hero + ' to not ' + prohibit.action;

            break;
        }

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


    var villain = function() {
        var gdr = randomProperty(gender);
        return character(gdr);
    };

    // does not have to be a family-unit of blood-related people.
    var family = function() {
        var members = random(12) + 1; // must always have at least one?
        // or... lives alone???
        // that would take some other sort of coding.
        // and change to the template
        // and make sure that the victim would be the hero, or some random person....
        var rels = [];
        for (var i = 0; i < members; i++) {
            rels.push(character(randomProperty(gender)));
        }
        return rels;
    };

    var falsehero = function() {
        return character(randomProperty(gender));
    };

    var magicalitem = function() {
        return pickRemove(bank.magicalitem);
    };

    var punished = function() {
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

    var init = function() {
        if (wordbank) { bank = wordbank; }
        cache.falsehero = falsehero();
        cache.hero = hero();
        cache.home = home();
        cache.magicalitem = magicalitem();
        cache.punished = punished();
        cache.task = pick(bank.task);
        cache.villain = villain();
        cache.family = family();
        cache.victim = pick(cache.family);
        cache.ascension = pick(bank.ascension);
        cache.marries = pick(bank.marries);
        cache.interdiction = interdiction();
	cache.violation = violation(cache.interdiction);
    }();

    return {
        init: init,
        falsehero: function() { return cache.falsehero; },
        family: function() { return cache.family; },
        hero: function() { return cache.hero;},
        home: function() { return cache.home;},
        interdiction: function() { return cache.interdiction; },
	violation: function() { return cache.violation; },
        villain: function() { return cache.villain;},
        punished: function() { return cache.punished; },
        magicalitem: function() { return cache.magicalitem; },
        task: function() { return cache.task;},
        victim: function() { return cache.victim; },
        ascension: function() { return cache.ascension; },
        marriage: function() { return cache.marries; },
        pick: pick,
        or: or,
        list: list
    };

};

var sentence = function(index, helper) {

    var f;
    var func = proppFunctions[index];
    if (func.active) {
        f = func.templates[random(func.templates.length)];
        var t = _.template(f);
        f = t(helper);
    }

    return f;

};


// generate the fairy tale
function generate(){

    // proppFunctions = defaultTemplates(proppFunctions);
    proppFunctions = nTemplates(proppFunctions);

    getFunctionsFromGui();

    var tale = [];

    fairyTaleGen.helper = world(fairyTaleGen.settings);

    for (var index in proppFunctions) {
        var s = sentence(index, fairyTaleGen.helper);
        if (s) {
            tale.push(s);
        }
    }

    return tale.join('\n\n');

}



fairyTaleGen.cinderella = cinderella;
fairyTaleGen.hansel = hansel;
fairyTaleGen.swhite = swhite;
fairyTaleGen.lrrh = lrrh;
fairyTaleGen.juniper = juniper;
fairyTaleGen.random = random;
fairyTaleGen.sentence = sentence;
fairyTaleGen.generate = generate; // TODO: includes a GUI call. o noes!
