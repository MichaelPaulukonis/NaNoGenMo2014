var nTemplates = function(propp) {

    var blankLine = '';

    // TODO: VERB TENSE STANDARDIZATION - s/b past in all places. OR .... ???
    // TODO: verb tense DOES NOT WORK here
    // this is the... what tense? past would work.
    // if ALL verb ar infinitive and appear as {{verb}}, then we do a global pull, conjugate, replace prior to template parsing. or after. whatever.


    // 0: Initial situation
    // TODO: multiple sentences within a template may not be punctuated correctly.
    // hrm. maybe they should each appear as a sub-component, so they can be processed externally?
    // for example, if sentence begins with <%= list(acquainainces()) %> and the first is 'the Easter Bunny' it will not be auto-capitalised
    // since that only works on the first letter of the template-output (erroneously called 'sentence' in the code).
    // TODO: what about "lives alone." how would THAT be figured out???
    // aaaand: Milan are known to Natalie.
    propp['func0'].exec = function(world) {

        // do we need an "introduction" flag?
        // if the intro is skipped, how do we get this info across?
        // ALT: if we start in-media-res, and come BACK to this, skip the "a long time ago" nonsense.
        // or, if we are doing it a SECOND time (re: brothers killed by dragon; new baby born, story starts again)

        // something like this
        var intros = ['A long time ago,', 'Some years before you were born,', 'In the time when your parents\' parents were but small babies,', 'Once upon a time,'];

        // In a certain village there lived a husband and wife - lived happily, lovingly, peaceably. All their neighbors envied them; the sight of them gave pleasure to honest folks.

        // TODO: hero could use nickname OR adj + adj and name. Or something.

        var near = world.select("in", "near", "close to", "not far from", "just on the verge of", "within a days walk of");
        var nationType = world.select("country", "province", "kingdom", "nation", "city-state") ;

        var templates = [
            '<%= hero.nickname %> lived in a <%= hero.home.residence %> {{NEAR}} <%= hero.home.location %> in the {{NT}} <%= hero.home.nation %>. ',
            'in the distant {{NT}} of <%= hero.home.nation %>, <%= hero.nickname %> lived in a <%= hero.home.residence %> {{NEAR}} <%= hero.home.location %>. ',
            '{{NEAR}} <%= hero.home.location %> in the {{NT}} <%= hero.home.nation %>, there was a <%= hero.home.residence %> where <%= hero.nickname %> lived. '
        ];

        var t = [];
        var intro = (world.coinflip() ? world.pick(intros) + ' ' : '');
        t.push(intro + world.pick(templates).replace('{{NT}}', nationType).replace('{{NEAR}}', near));
        // TODO: list regular name or nickname at random
        t.push(blankLine, '<%= hero.name %> lived with <%= list(hero.family, "nickname") %>.');
        t.push(blankLine, '<%= list(hero.acquaintances, "nickname") %> were <%= select("friends of", "known to") %> <%= hero.name %>.');

        return t.join('\n');

    };

    // Proppian-function templates
    // Absentation: Someone goes missing
    // this could be the hero leaving home
    // so we\'d have to have more logic to cover this
    // TODO: also need to define the action, so it can be dealt with in Resolution (func20) and elsewhere...
    // people have a location; if the location is xs"unknown" we can process this elsewhere...
    propp['func1'].exec = function(world, subFunc) {

        // TODO: some way to track missing, and set this up
        // TODO: track the death
        var t = [];
        var templates = [
            '<%= victim.name %> went missing.',
            '<%= victim.name %> unexpectedly died, leaving <%= hero.name %> devastated.',
            'Sooner or later, <%= victim.name %> died. It happens to everyone eventually. It happened to <%= pronoun(victim) %> sooner.'
        ];

        t.push(world.pick(templates));

        t.push(blankLine, world.converse(world.hero).replace('!', '?'));

        return t.join('\n');

    };
    // Interdiction: hero is warned
    // propp['func2'].templates.push('<%= hero.name %> is warned.');
    // TODO: introduction of personage from interdiction
    // TODO: rework the d**n interdiction template-function
    // this is now just a proof-of-concept of executing larger functions to deal with templates
    propp['func2'].exec = function(world) {

        var loc;
        var person;
        var action;

        // here for reference...
        // var prohibitType = {
        //     movement: 'movement',
        //     action: 'action',
        //     speak: 'speakwith'
        // };

        var ptype = randomProperty(interdictionType);
        var advisor = world.advisor;
        var hero = world.hero;

        // hey. shouldn't the advisor be... NOT a property?
        var interdiction = {
            type: ptype,
            location: '',
            action: '',
            person: '',
            advisor: advisor
        };

        var text = [];

        text.push('<%= hero.name %> met <%= advisor.nickname %>.');
        text.push(blankLine);

        text.push(world.converse(advisor, hero), blankLine);

        hero.interdiction = interdiction;

        switch (ptype) {
        case interdictionType.movement:
            interdiction.place = world.location();
            text.push('<%= advisor.name %> warned <%= hero.name %> to avoid <%= hero.interdiction.place.location %>.');

            break;

        case interdictionType.action:

            interdiction.action = 'take the Lord\'s name in vain AGAIN';
            text.push('<%= advisor.name %> told <%= hero.name %> to not <%= hero.interdiction.action %>.');

            break;

        case interdictionType.speak:

            // TODO: action should have a target
            // that way, we can "travel" to target....
            interdiction.action = 'talk to ' + world.villain.nickname;
            text.push('<%= hero.interdiction.advisor.name %> warns <%= hero.name %> to not <%= hero.interdiction.action %>.');

            break;
        }

        // TODO: make the magicalhelper here. I guess
        text.push(interdiction.advisor.name + ' introduced ' + world.magicalhelper.name + ' to ' + hero.name);
        text.push(blankLine);
        text.push(world.converse(hero, world.magicalhelper));

        return text.join('\n');

    };

    // Violation of Interdiction
    propp['func3'].exec = function(world) {

        var text = [];
        var interdiction = world.hero.interdiction;

        switch (interdiction.type) {
        case interdictionType.movement:

            text.push('Despite the warning, <%= hero.name %> went to <%= hero.interdiction.place.location %>.');
            text.push('<%= villain.name %>, a rather <%= list(villain.description) %> person, appeared.');

            break;

        case interdictionType.action:

            text.push('Shockingly, <%= hero.name %> proceeded to <%= hero.interdiction.action %>.');
            text.push('<%= villain.name %>, a rather <%= list(villain.description) %> person, appeared in front of <%= hero.name %>.');
            break;

        case interdictionType.speak:

            var t = 'As soon as <%= hero.interdiction.advisor.name %> was gone, <%= hero.name %> '
                + 'ran off to find <%= villain.name %> and had an interesting conversation.';
            text.push(t);
            break;
        }

        text.push(blankLine);
        text.push(world.converse(world.villain, world.hero));

        // find a way to integrate this
        //     propp['func3'].templates.push('<%= violation() %> <%= list(villain.family) %> are in league with <%= villain.name %>.');


        return text.join('\n');


    };
    // Reconnaissance: Villain seeks something
    propp['func4'].templates.push('<%= villain.name %> paid a visit to <%= hero.home.location %>.');
    propp['func4'].templates.push('<%= hero.home.location %> played host to <%= villain.name %>.');

    // Delivery: The villain gains information
    propp['func5'].templates.push('<%= villain.name %> gained information.');
    propp['func5'].templates.push('After a chat with <%= pick(hero.family).name %>, <%= villain.name %> learned some interesting news.');
    propp['func5'].templates.push('While skulking about <%= hero.home.residence %>, <%= villain.name %> overheard some gossip about <%= hero.name %>.');

    // Trickery: Villain attempts to deceive victim.
    propp['func6'].templates.push('<%= villain.name %> attempted to deceive victim.');

    // Complicity: Unwitting helping of the enemy
    propp['func7'].templates.push('<%= hero.name %> unwittingly helped <%= villain.name %>.');

    // 2nd Sphere: The Body of the story
    // 8A - Villainy: The need is identified (Villainy)
    // function 8 (and/or 8a) is always present in tale
    // antagonist(s) causes harm or injury to victim(s)/member of protagonist's family = villainy - A
    propp['func8'].exec = function(world, subFunc) {

        // this needs to be picked AHEAD OF TIME
        // since some of these require other creations earlier
        // like 7b 'bride is forgotten'
        // the bride should have been introduced earlier....

        // if not picked ahead of time, pick a sub-function at random
        subFunc = subFunc || randomProperty(func8);
        var template = '';

        subFunc = 'causes sudden disappearance'; // for testing
        subFunc = 'commits murder';

        switch(subFunc) {
        case 'kidnapping of person':
            template = '<%= villain.name %> kidnapped <%= pick(select(hero.family, hero.acquaintances)).name %>.';
            break;

        case 'seizure of magical agent or helper':
            template = '<%= villain.name %> <%= select("forcibly seized", "kidnapped", "made off with") %> <%= magicalhelper.name %>.';
            break;

        case 'forcible seizure of magical helper':
            template = '<%= villain.name %> <%= select("forcibly seized", "kidnapped", "makde off with") %> <%= magicalhelper.name %>.';
            break;

        case 'pillaging or ruining of crops':
            template = 'The harvest was destroyed by <%= villain.name %>. All in <%= hero.nation %> began to feel the pangs of hunger.';
            break;

        case 'theft of daylight':
            template = 'Suddenly, it became as night. <%= villain.name %> had stolen the daylight!';
            break;

        case 'plundering in other forms':
            template = '<%= villain.name %> engaged in plundering in ... other forms.';
            break;

        case 'bodily injury, maiming, mutilation':
            template = '<%= villain.name %> caused bodily injury, maiming, mutilation. Oh!';
            break;

        case 'causes sudden disappearance':
            // TODO: thing or person
            // people have a location; if the location is "unknown" we can process this elsewhere...
            template = '<%= villain.name %> caused a sudden disappearance.';
            if (world.coinflip()) { template += ' ' + world.converse(world.villain); }
            break;

        case 'bride is forgotten':
            // doesn't this have to be known AHEAD of time, so there is a bride function prepped earlier???
            template = '<%= hero.name %>\'s bride was forgotten after <%= villain.name %> cast a spell.';
            break;

        case 'demand for delivery or enticement, abduction':
            template = '<%= villain.name %> made a demand for delivery or enticement, abduction. Something like that.';
            break;

        case 'expulsion':
            template = '<%= hero.name %> was driven from <%= possessive(hero.gender) %> <%= hero.home.residence %>.';
            break;

        case 'casting into body of water':
            // TODO: hero has to get out of the water.
            // I guess that's part of the template?
            var water = world.select("a small stream", "a local lake", "the murky pond", "the well");
            world.hero.location = water;
            template = '<%= villain.name %> threw <%= hero.name %> into <%= hero.location %>.';
            break;

        case 'casting of a spell, transformation':
            template = 'There was a casting of a spell, a transformation. The effects were simply amazing. Words could not do them justice.';
            break;

        case 'false substitution':
            // TODO: posession needs to be tracked
            // so item now "belongs" to villain (or hench-person)
            template = 'A false substitution was perpretrated by <%= villain.name %>.';
            break;

        case 'issues order to kill [requires proof]':
            template = '<%= villain.name %> issued an order to kill. It requires proof. THIS WAS CRUEL.';
            break;

        case 'commits murder':

            var murdervictim = pick(world.hero.family.concat(world.hero.acquaintances));
            murdervictim.health = healthLevel.dead;
            // TODO: need to store this somewhere....
            // the _person_ is marked as dead, but we need to "remember" that a murder was perpetrated...
            template = '<%= villain.name %> killed ' + murdervictim.name + '.';
            template += '\n\n<%= converse(villain) %>';
            break;

        case 'imprisonment, detention':
            template = 'Imprisonment, detention of <%= hero.name %>.';
            break;

        case 'threat of forced matrimony':
            template = '<%= villain.name %> threatened to marry <%= pick(hero.family).name %>.';
            break;

        case 'threat of forced matrimony between relatives':
            template = '<%= villain.name %> <%= select("insinuated", "suggested", "mused") %> that <%= list(hero.family) %> could be forced into a marriage of convenience.';
            break;

        case 'threat of cannibalism':
            template = 'There was a threat of cannibalism.';
            break;

        case 'threat of cannibalism among relatives':
            template = 'Thanks to the ravages <%= villain.name %>\'s predations had left on the land, there was the threat of cannibalism among the relatives of <%= hero.name %>\'s family. <%= list(hero.family) %> eyed each other hungrily.';
            break;

        case 'tormenting at night (visitaion, vampirism)':
            template = '<%= hero.name %> was tormented at night by <%= pick(villain.family).name %>.';
            break;

        case 'declaration of war':
            template = '<%= villain.name %> declared war on <%= hero.name %>.';
            break;

        };

        return template;

    };


    //  8a - Lack: The need is identified (Lack)
    // function 8a: one member of family lacks/desires something = lack - a
    // TODO: push this into an exec function
    // pick one of the following, and store the object
    // or.... figure out a better way to accomplish this...
    propp['func8a'].exec = function(world, subFunc) {

        var lacks = ['needed a bride, friend, or an individual.',
                     'needed a helper or magical agent.',
                     'needed a wondrous object(s).',
                     'needed a egg of death or love.',
                     'needed a money or means of existence.',
                     'had lacks in other forms'
                    ];

        // if this function isn't executed
        // the lack does not exist for the NEXT function to call it
        // DANG DANG DANG DANG
        var lack = pick(lacks);
        var person = pick(world.hero.family);
        world.cache.lack = {
            lack: lack,
            person: person
        };

        // TODO: this should not be hero, it should be someone else
        return person.name + ' '+ lack;

    };

    // Mediation: hero discovers the lack
    propp['func9'].exec = function(world) {
        // TODO: if lack has not previously been created, this is an issue
        // aaaaand, 8a is not required for 9. WTF?
        return '<%= hero.name %> discovered that ' + world.cache.lack.person.name + ' ' + world.cache.lack.lack;
    };

    // Counteraction: hero chooses positive action
    // TODO: positiveaction()
    propp['func10'].templates.push('<%= hero.name %> chose positive action (just like in all those self-help books).');

    // Departure: hero leave on mission
    // TODO: journey() function
    propp['func11'].templates.push('<%= hero.name %> left <%= hero.location %> to <%= task %>.');

    // 3rd Sphere: The Donor Sequence
    // Testing: hero is challenged to prove heroic qualities
    propp['func12'].templates.push('<%= hero.name %> was challenged to prove heroic qualities.');

    // Reaction: hero responds to test
    propp['func13'].templates.push('<%= hero.name %> responded to this test.');

    //  Acquisition: hero gains magical item
    propp['func14'].exec = function(world, item) {

        item = item || world.magicalitem;
        world.hero.possessions.push(item);

        // TODO: make this into conversation with a goal?
        var t = '<%= advisor.name %> gave <%= hero.name %> ' + item + '.';

        return t;

    };

    // Guidance: hero reaches destination
    // TODO: destination is related to task
    propp['func15'].templates.push('<%= hero.name %> reached destination.');

    // Struggle: hero and villain do battle
    // TODO: battle() function
    propp['func16'].templates.push('<%= hero.name %> and <%= villain.name %> engaged in battle.');

    // Branding: hero is branded
    propp['func17'].templates.push('<%= hero.name %> was changed by the encounter.');
    propp['func17'].templates.push('<%= hero.name %> was scarred internally.');
    propp['func17'].templates.push('This day would never be forgotten by <%= hero.name %>.');
    propp['func17'].templates.push('<%= hero.name %> received a stylish scarf as a souvenir of the encounter!');
    propp['func17'].templates.push('<%= villain.name %>\'s head popped off, and was scavenged by <%= hero.name %>.');

    // Victory: Villain is defeated
    propp['func18'].templates.push('Through deft use of the <%= magicalitem %>, <%= villain.name %> was defeated.');
    propp['func18'].templates.push('<%= hero.name %> <%= select("deployed", "used", "manipulated") %> the <%= magicalitem %> to <%= select("defeat", "trounce", "vanquish", "annoy") %> <%= villain.name %>.');

    // Resolution: Initial misfortune or lack is resolved
    propp['func19'].templates.push('Initial misfortune or lack was resolved.');

    // 4th Sphere: The hero\'s return
    // In the final (and often optional) phase of the storyline, the hero returns home, hopefully uneventfully and to a hero\'s welcome, although this may not always be the case.

    // Return: hero sets out for home
    // TODO: how could I write something like hero.home.residence.possess and get "her home" or "his shed" ?
    propp['func20'].templates.push('<%= hero.name %> set out for <%= hero.home.residence %> in <%= hero.home.location %>.');

    // Pursuit: hero is chased
    // TODO: character/thing that chases
    // TODO: chase() function
    propp['func21'].templates.push('<%= hero.name %> was chased.');

    // Rescue: pursuit ends
    // TODO: template to end the above
    propp['func22'].templates.push('the pursuit ended.');

    // Arrival: hero arrives unrecognized
    propp['func23'].templates.push('<%= hero.name %> arrived in <%= hero.home.location %> but was unrecognized.');

    // Claim: False hero makes unfounded claims
    propp['func24'].templates.push('<%= falsehero.name %> made unfounded claims.');

    // Task: Difficult task proposed to the <%= hero.name %>
    propp['func25'].templates.push('<%= advisor.name %> charged <%= hero.name %> to <%= task %>.');

    // Solution: Task is resolved
    propp['func26'].templates.push('<%= task %> was completed.');
    propp['func26'].templates.push('<%= task %> was completed by <%= hero.name %>.');
    propp['func26'].templates.push('<%= hero.name %> finishes off <%= task %>.');

    // Recognition: hero is recognised
    propp['func27'].templates.push('<%= hero.name %> was recognized.');

    // Exposure: False hero is exposed
    propp['func28'].templates.push('<%= falsehero.name %> was exposed.');

    // Transfiguration: hero is given a new appearance
    // TODO: character description, associated adjectives ???
    propp['func29'].templates.push('<%= hero.name %> was given a new appearance.');

    // Punishment: Villain is punished
    propp['func30'].exec = function(world) {

        var templates = ['<%= villain.nickname %> was <%= punished %> by <%= hero.nickname %>.'
                        ];

        var t = [ pick(templates)];

        if (world.coinflip()) {
            t.push('God evidently did it to punish <%= villain.name %> for <%= possessive(villain) %> great greediness.');
        };

        return t.join(' ');

    };

    // Wedding: hero marries and ascends the throne
    propp['func31'].exec = function(world, subFunc) {

        // marriage/ascension are arrays in the wordbank
        var templates = [
            '<%= hero.name %> <%= select(marriage, ascension) %>. It was a good life.',
            '<%= hero.name %> <%= marriage %> and <%= ascension %>.',
            '<%= hero.name %> {{settles}} down and <%= select(marriage, ascension) %>.',
            'Everything worked out for <%= hero.name %>, who <%= select(marriage, ascension) %>.',
            // TODO: verb tense DOES NOT WORK here
            // this is the... what tense? past would work.
            // if ALL verb ar infinitive and appear as {{verb}}, then we do a global pull, conjugate, replace prior to template parsing. or after. whatever.
            '<%= select(marriage, ascension) %>, <%= hero.name %> retired to ' + world.select("a life of farming", "write <%= possessive(hero) %> memoirs", "live in peace", "pine for days of adventure")  + '.'
        ];

// yeah, so THIS doesn't work. DANG
// had parking tickets forgiven, Morgan retired to pine for days of adventure.

// this version needs to be in the infinitive....
// Dated for a few years, but decided to remain single, Kaitlyn retired to write her memoirs.

        var dead = [];
        var living = [];
        var people = world.hero.family.concat(world.hero.acquaintances);
        for (var i = 0; i < people.length; i++) {
            var dora = (people[i].health == healthLevel.dead ? dead : living);
            dora.push(people[i]);
            // if (people[i].health == healthLevel.dead) {dead.push(people[i]); }
        }

        var t = pick(templates);

        // this a proof-of-concept
        if (dead.length > 0) {
            var sent = 'Years {{pass}}, but <%= hero.name %> still {{mourns}} the stinging loss of ' + world.list(dead) + '.';
            t += ' ' + sent;
        };

        // if single, can't be they
        // TODO: earlier bride business....
        // 'And from that time forward they knew neither sorrow nor separation, but they all lived together long and happily.'


        // where would THIS go ????
        // 'All of this took place long before you were born, so it's not surprising if you don't remember it. But it happened, and people speak of it still.'
        // 'This may sound fantastic, but it all happened exactly as I have told you.'

        // this could get convoluted (Which is good!) "and I tell you this story as you can tell your children"
        // 'and I tell you this story as I told your mother  [or father] and her mother before her' [or father as the case may be].
        if (living.length > 0) {
            var narr = world.pick(world.hero.acquaintances).name;
            t += '\n\nThis may sound fantastic, but in all the world there is nothing stranger than the truth, and it all happened exactly as I have told you, for I was there, as sure as my name is ' + narr + '.';
        }

        return t;

    };

    return propp;

};



// var module = module || {};
// module.exports = nTemplates;
