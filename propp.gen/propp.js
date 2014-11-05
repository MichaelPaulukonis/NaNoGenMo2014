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
    num = Math.floor(Math.random() * limit);
    return num;
}


// TODO: you know, this should probably be part of the templates
// and not even in here
var world = function(settings) {

    var pick = function(arr) {
        return arr[Math.floor(Math.random()*arr.length)];
    };

    var pickRemove = function(arr) {
        var index = Math.floor(Math.random()*arr.length);
        return arr.splice(index,1)[0];
    };

    var pickRandomProperty = function(obj) {
        var result;
        var count = 0;
        for (var prop in obj)
            if (Math.random() < 1/++count)
                result = prop;
        return result;
    };

    var randomProperty = function (obj) {
        var keys = Object.keys(obj);
        return obj[keys[ keys.length * Math.random() << 0]];
    };

    var bank = {
        character: {},
        location: []
    } ;

    bank.character = {
        male: ['Jaffar', 'Tyrion Lannister', 'PeeWee Herman', 'Santa Claus', 'Jolly Green Giant', 'Stay-Puft Marshmallow Man'],
        female:  ['Brienne of Tarth', 'Joan of Arc', 'Holly Shiftwell'],
        neuter: ['Easter Bunny', 'TIAMAT', 'Spirit of 1776']
    };

    var cache = {};

    // the values here are purely for testing
    // and do not represent "final" objects
    // characters should be more.. object-y
    // have gender, relations (siblings, parents, etc.)

    var character = function(gender) {
	// TODO: what happens when we've used up everything in the bank?
	// SOLUTION: don't worry about it: make the bank bigger than any of our templates
	// for now...
        return pickRemove(bank.character[gender]);
    };

    var location = function() {
        var bank = ['Hobbiton', 'New Haven', 'East Lansing', 'Not In Kansas'];
        return pickRemove(bank);
    };

    var hero = function() {
        return (character(settings.gender));
    };

    var home = function() {
        return location();
    };

    var villain = function() {
        var gdr = randomProperty(gender);
        return character(gdr);
        var bank = ['Jaffar', 'Tyrion Lannister', 'Brienne of Tarth', 'PeeWee Herman'];
        return pick(bank);
    };

    // does not have to be a family-unit of blood-related people.
    var family = function() {
	var rels = [ character(randomProperty(gender)), character(randomProperty(gender)) ];
        return rels;
    };

    var victim = function() {
	// TODO: should allow the chance for victim to be the hero.
	// TODO: should allow the victom to be somebody else entirely (townspeople, etc.)
	// so.. this becomes COMPLICATED
    };

    var falsehero = function() {
        return character(randomProperty(gender));
    };

    var magicalitem = function() {
        var bank = ['Singing Telegram', 'Singing Sword', 'Magic Accordion', 'Air Jordans', 'Mad Skillz', '#SWAG'];
        return pickRemove(bank);
    };

    var task = function() {
        var bank = ['walk the dog', 'retrieve the Crown Jewels', 'find a hammer', 'cut down the tallest tree in the forest with a herring'];
        return pick(bank);
    };

    var punished = function() {
        var bank = ['brought to justice', 'hung, drawn, and quartered', 'given a tongue-lashing'];
        return pick(bank);
    };

    var init = function() {
        cache.falsehero = falsehero();
        cache.hero = hero();
        cache.home = home();
        cache.magicalitem = magicalitem();
        cache.punished = punished();
        cache.task = task();
        cache.villain = villain();
        cache.family = family();
	cache.victim = pick(cache.family);
    }();

    return {
        init: init,
        falsehere: function() { return cache.falsehero; },
        family: function() { return cache.family; },
        hero: function() { return cache.hero;},
        home: function() { return cache.home;},
        villain: function() { return cache.villain;},
        punished: function() { return cache.punished; },
        magicalitem: function() { return cache.magicalitem; },
        task: function() { return cache.task;},
	victim: function() { return cache.victim; }
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
    var helper = world(fairyTaleGen.settings);

    for (var index in proppFunctions) {
        var s = sentence(index, helper);
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
