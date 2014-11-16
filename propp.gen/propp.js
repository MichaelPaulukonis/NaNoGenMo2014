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

var _ = _ || require('underscore');
// var nlp = nlp || require('nlp_compromise');

// http://blog.elliotjameschong.com/2012/10/10/underscore-js-deepclone-and-deepextend-mix-ins/
// in case it is not clear, deepClone clones everything that can JSON-ified
// that means properties NOT FUNCTIONS
_.mixin({ deepClone: function (o) { return JSON.parse(JSON.stringify(o)); } });

// TODO: THESE are the things that go into something called 'world'
var aspect = {
    good: 'good',
    bad: 'bad'
};

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

// for interdiction (using two words for this...)
var interdictionType = {
    movement: 'movement',
    action: 'action',
    speak: 'speakwith'
};

// sub-functions
var func8 = {
    '1'   : 'kidnapping of person',
    '2'   : 'seizure of magical agent or helper',
    '2b'  : 'forcible seizure of magical helper',
    '3'   : 'pillaging or ruining of crops',
    '4'   : 'theft of daylight',
    '5'   : 'plundering in other forms',
    '6'   : 'bodily injury, maiming, mutilation',
    '7'   : 'causes sudden disappearance',
    '7b'  : 'bride is forgotten',
    '8'   : 'demand for delivery or enticement, abduction',
    '9'   : 'expulsion',
    '10'  : 'casting into body of water',
    '11'  : 'casting of a spell, transformation',
    '12'  : 'false substitution',
    '13'  : 'issues order to kill [requires proof]',
    '14'  : 'commits murder',
    '15'  : 'imprisonment, detention',
    '16'  : 'threat of forced matrimony',
    '16b' : 'threat of forced matrimony between relatives',
    '17'  : 'threat of cannibalism',
    '17b' : 'threat of cannibalism among relatives',
    '18'  : 'tormenting at night (visitaion, vampirism)',
    '19'  : 'declaration of war'
};

// TODO: this needs to be accessible somewhere else...
// should this be reduced back down to a 0..31 array?

var resetProppFunctions = function() {

    var propp = {

        "func0": { active: false, templates: [] },
        "func1": { active: false, templates: [] },
        "func2": { active: false, templates: [] },
        "func3": { active: false, templates: [] },
        "func4": { active: false, templates: [] },
        "func5": { active: false, templates: [] },
        "func6": { active: false, templates: [] },
        "func7": { active: false, templates: [] },
        "func8": { active: false, templates: [] },
        "func8a": { active: false, templates: [] },
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
        "func31": { active: false, templates: [] }
    };

    return propp;
};


var storyGen = function() {


    var settings = {

        herogender: null,
        villaingender: null,
        peoplegender: null,
        functions: {}

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


    var capitalize = function(str) {
        return str.slice(0,1).toUpperCase() + str.slice(1);
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


    // this function creates things that are common to all template-worlds
    var god = function(settings, wordbank) {

        var bank = _.deepClone(wordbank);
        if (wordbank && wordbank.itemGenerator) {
            bank.itemGenerator = wordbank.itemGenerator;

            // TODO: this is not enough!
            // need to have these things as adjectives....
            for (var i = 0; i < 10; i++) {
                bank.magicalitem.push(bank.itemGenerator());
            }
        }

        var interdictionType = {
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

        // see also https://github.com/dariusk/corpora/blob/master/data/archetypes/character.json
        var createCharacter = function(gndr, aspct) {
            // TODO: what happens when we've used up everything in the bank?
            // SOLUTION: don't worry about it: make the bank bigger than any of our templates
            // for now...
            gndr = gndr || randomProperty(gender);
            aspct = aspct || randomProperty(aspect);
            var adjs = (aspct === aspect.good ? bank.adjectives.personal : bank.adjectives.negative);
            var descr = [pick(adjs), pick(adjs)];
            var name = pickRemove(bank.names[gndr]);

            // alt: two adjs in front, two-ads in back: "Big Bad Joan" or "Joan the Big and Bad"
            // WAY ALT: His Serene Highness Prince Robert Michael Nicolaus Georg Bassaraba von Brancovan von Badische, Marquis of Hermosilla, Count of Cabo St. Eugenio, Seventy-fourth Grand Master of the Knights of Malta,
            // another model is "Brienne of Tarth" - have some sort of origin location
            // we would NOT do this for "family", however.... so, some flag to pass in. :::sigh:::
            var nick = (coinflip() ? name + ' the ' + capitalize(pick(descr)) : capitalize(pick(descr)) + ' ' + name);

            return { name: name,
                     nickname: nick,
                     alignment: aspct,
                     gender: gndr,
                     possessions: [],
                     health: healthLevel.alive,
                     description: descr
                   };
        };

        var createCharacters = function(gndr, aspct, count) {
            var members = count || random(12) + 1;
            var acqs = [];
            for (var i = 0; i < members; i++) {
                var g = (!gndr || gndr === 'random' ? randomProperty(gender) : gndr);
                aspct = aspct || randomProperty(aspect);
                acqs.push(createCharacter(g, aspct));
            }
            return acqs;
        };

        var location = function() {
            // return pickRemove(bank.home);
            return {
                residence: pickRemove(bank.residence),
                location: pickRemove(bank.location),
                nation: pickRemove(bank.nation)
            };
        };

        // hero or villain
        var createHero = function(g, aspct, item) {
            // oooooh, we just want to ADD properties to the character
            // so we d on't repeat the name, gender, posessions, etc....
            var c = createCharacter(g, aspct);
            c.family = createCharacters(settings.peoplegender, aspct);
            c.acquaintances = createCharacters(settings.peoplegender, aspct);
            c.home = location();
            c.location = c.home.residence;
            c.introduced = false;
            if (item) { c.possessions.push(item); }

            return c;

        };

        // differs from here in that there are no acquaintances
        // and only creates minions if a number is passed in
        var createVillain = function(g, aspct, item, minionCount) {
            var c = createCharacter(g, aspct);
            if (minionCount) {
                c.family = createCharacters(settings.peoplegender, aspct, minionCount);
            }
            c.home = location();
            c.location = c.home.residence;
            c.introduced = false; // introduced in story
            if (item) { c.possessions.push(item); }

            return c;
        };

        var createHome = function() {
            return location();
        };

        var createFalsehero = function() {
            var g = randomProperty(gender);
            var c = createCharacter(g, aspect.bad);
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

        var getName = function(thing, property) {
            if (property && thing[property]) { return thing[property]; }
            var elem = (typeof thing === 'string' ? thing : thing.name);
            return elem;
        };

        var possessive = function(gndr) {
            // if character is passed in, reduce it to the target gender
            if (gndr && gndr.gender) { gndr = gndr.gender; }
            return (gndr === gender.male ? 'his' : (gndr === gender.female ? 'her' : 'its'));
        };

        // third-person
        var pronoun = function(gndr) {
            // if character is passed in, reduce it to the target gender
            if (gndr && gndr.gender) { gndr = gndr.gender; }
            return (gndr === gender.male ? 'him' : (gndr === gender.female ? 'her' : 'them'));
        };

        // calculate the speaking tone
        // VERY PRELIMINARY
        var tone = function(p1, p2) {
            // comparison of alignment or other characteristics
            // friendly - good <-> good | bad <-> bad
            // love - hero <->bride[groom]
            // dislike
            // hatred
            // mourning - person.alive -> person.dead
            // the latter suggests a post-mortem tone in the other direction. let's leave that for now?
            var t;
            if (p1 && p1.alignment && p2 && p2.alignment) {
                t = ((p1.alignment == p2.alignment) ? 'good' : 'bad');
            }
            return t;
        };

        // not really sure where this is going.
        // see if they are friendly? talk about the location? posessions?
        // pass in an intent?
        // adjectives are completely random. SO IT GOES.
        // TODO: get a better sense of "aspect"... forgot the correct term
        // the relationship of speaker to speaker
        // like, awe, fondness, sadness, dislike, hatred
        // if nobody to speak to, use an interjection, or a comment on the current location
        // if other person is dead, talk in memorium (how so, what to remember?)
        // if all is well, could talk about locale, descriptions, homes, posessions
        // would we want to _transfer_ a posession during conversation?
        // that could be interesting....
        // characters known to each other?
        // if not, they should introduce
        // one could know another
        // so, each char has a "knows" list of characters.
        // ugh. this will get recursive, and can't be serialized
        // should just be names, I suppose. more overhead, but serialization is kept. yes?
        // see also https://github.com/dariusk/corpora/blob/master/data/words/proverbs.json
        // dialogue
        var converse = function(p1, p2) {
            var c = [];

            // TODO: various greetings, fair and foul in the wordbank := greetings: { fair: [], foul: [] }

            // "Don't go bragging like that!" says a rich merchant
            // after somebody says something _about themselves_

            var t = tone(p1, p2);

            if (p1 && p2) {
                // TODO: gah, who knows!
                c.push('"{{GG}}, ' + p1.name + '" {{said}} ' + p2.name + '.');
                c.push('"{{GG}}, ' + p2.name + '" {{replied}} ' + p1.name + '.');
                c.push('"Well, you certainly are ' + p1.description[0] + '," {{remarked}} ' + p2.name + '.');
                c.push('"Yes, I am," {{conceded}} ' + p1.name + '. "But it\'s been said that I\'m also ' + p1.description[1] + '!"');

            } else if (p1 && !p2) {
                c.push('"' + capitalize(pick(bank.interjections)) + '!" {{said}} ' + p1.name + ' to nobody in particular.');
            }

            // not applicable to solo "conversations"
            // so far.
            if (t) {
                for (var i = 0; i < c.length; i++) {
                    c[i] = c[i].replace('{{GG}}', pick(bank.greetings[t]));
                }
            }
            return c.join('\n');
        };

        // battle between two people
        // each of which could have family and acquaintances join in
        // or does that need to be made explicit ???
        // if victor is not passed in, the result could be random!
        var battle = function(p1, p2, victor) {
            // TODO: who knows!

            // this really seems like something for the template, though. BLARG!


            // weapons!
            // the magical item that is passed from advisor to hero should be used
            // and the villain needs a weapon
            // aaaand, other things? Any other posession, I suppose? or just ones marked "weapon" ?
            // that could be interesting. Objects in the following form:
            // so, magical things fall into this category
            var thing = {
                item: 'egg', // name could be "Egg of Death" or "Death Egg" or "Primordial Magic Death Egg of the Borderlands" or something telse
                //
                name: 'Magical Egg of the Wong Foo the Elder',
                description: ['shiny', 'round', 'egg-shaped', 'magical', 'filigreed', 'expensive'],
                weapon: true, // or false
                magic: true, // or false
                // special powers? how would THAT work ????
                origin: {
                    // if a person gave the object, or it was found ?
                    person: null,
                    place: null
                }
            };

        };

        // list it out, using optional property for value
        // awkward construction....
        var list = function(arr, property) {
            var lst = '';
            if (arr.length > 0) {
                if (arr.length === 1) {
                    lst = getName(arr[0], property);
                }
                else if (arr.length === 2) {
                    lst = getName(arr[0], property) + ' and ' + getName(arr[1], property);
                } else {
                    for (var i = 0; i < arr.length - 1; i++) {
                        lst += getName(arr[i], property) + ', ';
                    }
                    lst += 'and ' + getName(arr[arr.length - 1], property);
                }
            }
            return lst;
        };

        var or = function(f1, f2) {
            return (coinflip() ? f1() : f2() );
        };

        // select one of any number of arguments
        var select = function() {
            return pick(arguments);
        };

        var dump = function(thing) {
            var target = (thing ? thing : cache);
            return JSON.stringify(target, null, '\t');
        };

        var init = function() {
            // I don't think this is an issue anymore....
            if (!bank) { return; }
            try {

                if (!settings.herogender || settings.herogender === 'random') { settings.herogender = randomProperty(gender); }
                if (!settings.villaingender || settings.villaingender === 'random') { settings.villaingender = randomProperty(gender); }
                if (!settings.peoplegender || settings.peoplegender === 'random') { settings.peoplegender = randomProperty(gender); }

                cache.hero = createHero(settings.herogender, aspect.good);
                // TODO: magical item starts as a posession of the advisor, no?
                // NO: it could just be... lying about.
                cache.advisor = createCharacter(null, aspect.good);
                cache.magicalitem = createMagicalitem();
                cache.magicalhelper = createMagicalHelper();
                cache.punished = createPunished();
                cache.task = pick(bank.task);
                cache.villain = createVillain(settings.villaingender, aspect.bad, createMagicalitem(), 2);
                cache.victim = pick(cache.hero.family);
                cache.ascension = pick(bank.ascension);
                cache.marries = pick(bank.marries);
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

        // god return
        return {
            init: init,
            advisor: cache.advisor,
            falsehero: cache.falsehero,
            hero: cache.hero,
            villain: cache.villain,
            magicalitem: cache.magicalitem, // this remains the same EACH LOOP
            // either we give a new magicalitem, or we skip the donation sequence
            magicalhelper: cache.magicalhelper,
            task: cache.task,
            victim: cache.victim,
            ascension: cache.ascension,
            marriage: cache.marries,
            converse: converse,
            tone: tone,
            cache: cache, // hunh. exposing this?????
            or: or,
            list: list,
            possessive: possessive,
            pronoun: pronoun,
            // ooop. what's the difference?!!!
            pick: pick,
            select: select,
            coinflip: coinflip, // currently a global. ugh!
            randomProperty: randomProperty,
            dump: dump,
            interdictionType: interdictionType,
            location: location,
            wordbank: bank,
            nlp: nlp,// this is also a global. But.... won't be in node
            createVillain: createVillain,
            createHero: createHero,
            punished: function() { return pick(bank.punish); }

        };

    };


    // populate template
    // which may contain multiple sentences.
    // hrm. how about just doing functions, now...
    var sentence = function(func, helper) {

        var f = '';
        var isFunc = (typeof func === 'function');
        if (func && func.active || func && isFunc) {
           if (isFunc) {
               f = func(helper);
           } else if (func.exec) {
                f = func.exec(helper);
            } else {
                f = func.templates[random(func.templates.length)];
            }
            var t = _.template(f);
            f = t(helper);

            // handle non-template transforms.
            var tag,
                re = /\{{.*?\}}/g,
                sentence = f;
            while((tag = re.exec(f)) !== null) {
                var verb = tag[0].replace(/\{|\}/g, '');
                // because I've set up module && module.exports
                // nlp thinks it's running in node.js....
                // can make a global switch.....
                var tense;
                if (this.settings.verbtense == 'past') {
                    tense = nlp.verb(verb).to_past();
                } else {
                    tense = nlp.verb(verb).to_present();
                }
                f = f.replace(tag[0], tense);
            }

            // exceptions
            f = f.replace('wered', 'were').replace('weres', 'are');

            f = capitalize(f);

        }

        return f;

    };


    var enforceRules = function(story) {

        if (story['func2'].active || story['func3'].active) {
            story['func2'].active = true;
            story['func3'].active = true;
        }

        // if returning, must depart
        // converse is not true
        if (story['func21'].active) {
            story['func11'].active = true;
        }

        return story;

    };

    // takes an array of function names
    // returns the index of villainy (if found)
    // or -1 (not found)
    var findVillainy = function(storyFuncs) {
        for (var i = 0; i < storyFuncs.length; i++) {
            if (storyFuncs[i] === 'func8') return i;
        }
        return -1;
    };

    // generate the fairy tale
    var generate = function(settings, theme){

        try {

            this.settings = settings;
            var story = theme.templates(settings.functions);
            var restartVillainy = this.findVillainy(settings.funcs);

            var tale = [];

            // the world is the things that have been created. no?
            // possibly not. since creation is called alla time again...
            this.world = god(storyGen.settings, theme.bank);
            for (var i = 0; i < settings.funcs.length; i++) {
                var s2 = this.sentence(story[settings.funcs[i]], storyGen.world);
                if (s2) { tale.push(s2); }
                if (settings.bossmode && this.world.villain.health == 'dead' && restartVillainy >= 0) {
                    if (this.world.coinflip()) {
                        // we run out of names, because new villains have both family and acquaintances
                        // AND USE THEM ALL UP
                        this.world.villain = this.world.createVillain();
                        i = restartVillainy - 1; // one less, since it will be incremented on loop
                    } else {
                        restartVillainy = -1;
                    }
                }
            }
            tale.push(this.sentence(story.outro, storyGen.world));

            // this doesn't handle recursive stories (this is the one I'm particularly interested in)
            // multiple tasks
            // or going back to a previous point in the chain
            // :-(
            // TODO: get a new iterator
            // it will be an array that is BUILT
            // aaaand, let's presume that it has been passed in as part of SETTINGS
            // for (var index in story) {
            //     // console.log(index);
            //     var s = this.sentence(story[index], storyGen.world);
            //     if (s) {
            //         tale.push(s);
            //     }
            // }

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
    };


    return {
        random: random,
        coinflip: coinflip,
        enforceRules: enforceRules,
        findVillainy: findVillainy,
        generate: generate,
        god: god,
        itemGenerator: itemGenerator,
        pick: pick,
        pickRemove: pickRemove,
        randomProperty: randomProperty,
        sentence: sentence
    };


}();


// wait: aren't these set elsewhere, as well?????
// storyGen.god = god;
storyGen.settings = settings;
// storyGen.enforceRules = enforceRules;
// storyGen.random = random;
// storyGen.sentence = sentence;



module = module || {};
module.exports = storyGen;
