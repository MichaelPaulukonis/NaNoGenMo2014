var nTemplates = function(propp) {


    // 0: Initial situation
    // TODO: multiple sentences within a template may not be punctuated correctly.
    // hrm. maybe they should each appear as a sub-component, so they can be processed externally?
    // for example, if sentence begins with <%= list(acquainainces()) %> and the first is 'the Easter Bunny' it will not be auto-capitalised
    // since that only works on the first letter of the template-output (erroneously called 'sentence' in the code).
    // TODO: what about "lives alone." how would THAT be figured out???
    // aaaand: Milan are known to Natalie.
    propp['func0'].exec = function(world) {
        var template = '<%= hero().name %> lives in a <%= hero().home.residence %> near <%= hero().home.location %> in <%= hero().home.nation %>. ';
        template += '<%= hero().name %> lives with <%= list(hero().family) %>. ';
        template += '<%= list(hero().acquaintances) %> are <%= select("friends of", "known to") %> <%= hero().name %>.';

        return template;

    };
    propp['func0'].templates.push('<%= hero().name %> lives in a <%= hero().home.residence %> near <%= hero().home.location %> in <%= hero().home.nation %>. <%= hero().name %> lives with <%= list(hero().family) %>. <%= list(hero().acquaintances) %> are <%= select("friends of", "known to") %> <%= hero().name %>.');

    // Proppian-function templates
    // Absentation: Someone goes missing
    // this could be the hero leaving home
    // so we\'d have to have more logic to cover this
    // TODO: also need to define the action, so it can be dealt with in Resolution (func20) and elsewhere...
    // people have a location; if the location is xs"unknown" we can process this elsewhere...
    propp['func1'].templates.push('<%= victim().name %> goes missing.');
    propp['func1'].templates.push('<%= victim().name %> unexpectedly dies, leaving <%= hero().name %> devastated.');
    propp['func1'].exec = function(world, subFunc) {

        // TODO: some way to track missing, and set this up
        // TODO: track the death

        var templates = [
            '<%= victim().name %> goes missing.',
            '<%= victim().name %> unexpectedly dies, leaving <%= hero().name %> devastated.'
        ];

        var t = pick(templates);

        return t;

    };
    // Interdiction: hero is warned
    // propp['func2'].templates.push('<%= hero().name %> is warned.');
    // TODO: introduction of personage from interdiction
    // TODO: rework the d**n interdiction template-function
    // this is now just a proof-of-concept of executing larger functions to deal with templates
    propp['func2'].exec = function(world) {
        // world is not actually used here (now)...
        // return '<%= interdiction().text %>.';

        // the reason you'd build the entire thing above HERE
        // is that THIS is the template
        // texts should be built here. otherwise... what's the point?
        // building here means text is 'unique' per template, not shared amongst all.

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
        var advisor = world.advisor();
        var hero = world.hero();

        // hey. shouldn't the advisor be... NOT a property?
        var interdiction = {
            type: ptype,
            location: '',
            action: '',
            person: '',
            advisor: advisor
        };

        var text = [];
        text.push(world.converse(advisor, hero));

        hero.interdiction = interdiction;

        switch (ptype) {
        case interdictionType.movement:
            interdiction.place = world.location();
            text.push('<%= advisor().name %> warns <%= hero().name %> to avoid <%= hero().interdiction.place.location %>.');

            break;

        case interdictionType.action:

            interdiction.action = 'take the Lord\'s name in vain AGAIN';
            text.push('<%= advisor().name %> tells <%= hero().name %> to not <%= hero().interdiction.action %>.');

            break;

        case interdictionType.speak:

            // TODO: action should have a target
            // that way, we can "travel" to target....
            interdiction.action = 'talk to ' + world.villain().name;
            text.push('<%= hero().interdiction.advisor.name %> warns <%= hero().name %> to not <%= hero().interdiction.action %>.');

            break;
        }

        // TODO: make the magicalhelper here. I guess
        text.push(interdiction.advisor.name + ' introduces ' + world.magicalhelper().name + ' to ' + hero.name);

        return text.join('\n');

    };

    // Violation of Interdiction
    propp['func3'].templates.push('<%= violation() %> <%= list(villain().family) %> are in league with <%= villain().name %>.');
    propp['func3'].exec = function(world) {

        var text;
        var interdiction = world.hero().interdiction;

        switch (interdiction.type) {
        case interdictionType.movement:

            text = 'Despite the warning, <%= hero().name %> goes to <%= hero().interdiction.place.location %>.';
            text += ' <%= villain().name %>, a rather <%= list(villain().description) %> person, appears.';

            break;

        case interdictionType.action:

            text = 'Shockingly, <%= hero().name %> proceeds to <%= hero().interdiction.action %>.';
            text += ' <%= villain().name %>, a rather <%= list(villain().description) %> person, appears.';

            break;

        case interdictionType.speak:

            text = 'As soon as <%= hero().interdiction.advisor.name %> is gone, <%= hero().name %> '
            + 'runs off to find <%= villain().name %> and has an interesting conversation.';
            break;
        }

        return text;


    };
    // Reconnaissance: Villain seeks something
    propp['func4'].templates.push('<%= villain().name %> pays a visit to <%= hero().home.location %>.');
    propp['func4'].templates.push('<%= hero().home.location %> plays host to <%= villain().name %>.');

    // Delivery: The villain gains information
    propp['func5'].templates.push('<%= villain().name %> gains information.');
    propp['func5'].templates.push('After a chat with <%= pick(hero().family).name %>, <%= villain().name %> learns some interesting news.');
    propp['func5'].templates.push('While skulking about <%= hero().home.residence %>, <%= villain().name %> overhears some gossip about <%= hero().name %>.');

    // Trickery: Villain attempts to deceive victim.
    propp['func6'].templates.push('<%= villain().name %> attempts to deceive victim.');

    // Complicity: Unwitting helping of the enemy
    propp['func7'].templates.push('<%= hero().name %> unwittingly helps <%= villain().name %>.');

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

        // subFunc = 'casting into body of water'; // for testing

        switch(subFunc) {
        case 'kidnapping of person':
            template = '<%= villain().name %> kidnaps <%= pick(select(hero().family, hero().acquaintances)).name %>.';
            break;

        case 'seizure of magical agent or helper':
            template = '<%= villain().name %> <%= select("forcibly seizes", "kidnaps", "makes off with") %> <%= magicalhelper().name %>.';
            break;

        case 'forcible seizure of magical helper':
            template = '<%= villain().name %> <%= select("forcibly seizes", "kidnaps", "makes off with") %> <%= magicalhelper().name %>.';
            break;

        case 'pillaging or ruining of crops':
            template = 'The harvest is destroyed by <%= villain().name %>. All begin to feel the pangs of hunger.';
            break;

        case 'theft of daylight':
            template = 'Suddenly, it becomes as night. <%= villain().name %> steals the daylight!';
            break;

        case 'plundering in other forms':
            template = '<%= villain().name %> engages in plundering in other forms.';
            break;

        case 'bodily injury, maiming, mutilation':
            template = '<%= villain().name %> causes bodily injury, maiming, mutilation.';
            break;

        case 'causes sudden disappearance':
            // TODO: thing or person
            // people have a location; if the location is "unknown" we can process this elsewhere...
            template = '<%= villain().name %> causes a sudden disappearance.';
            break;

        case 'bride is forgotten':
            // doesn't this have to be known AHEAD of time, so there is a bride function prepped earlier???
            template = '<%= hero().name %>\'s bride is forgotten after <%= villain().name %> casts a spell.';
            break;

        case 'demand for delivery or enticement, abduction':
            template = '<%= villain().name %> makes a demand for delivery or enticement, abduction.';
            break;

        case 'expulsion':
            template = '<%= hero().name %> is driven from <%= possessive(hero().gender) %> <%= hero().home.residence %>.';
            break;

        case 'casting into body of water':
            // TODO: hero has to get out of the water.
            // I guess that's part of the template?
            var water = world.select("a small stream", "a local lake", "the murky pond", "the well");
            world.hero().location = water;
            template = '<%= villain().name %> throws <%= hero().name %> into <%= hero().location %>.';
            break;

        case 'casting of a spell, transformation':
            template = 'There is a casting of a spell, a transformation. The effects are simply amazing. Words couldn\'t do them justice.';
            break;

        case 'false substitution':
            // TODO: posession needs to be tracked
            // so item now "belongs" to villain (or hench-person)
            template = 'A false substitution is perpretrated by <%= villain().name %>.';
            break;

        case 'issues order to kill [requires proof]':
            template = '<%= villain().name %> issues order to kill [requires proof].';
            break;

        case 'commits murder':

            var murdervictim = pick(world.hero().family.concat(world.hero().acquaintances));
            murdervictim.health = healthLevel.dead;
            // TODO: need to store this somewhere....
            // the _person_ is marked as dead, but we need to "remember" that a murder was perpetrated...
            template = '<%= villain().name %> kills ' + murdervictim.name + '.';
            break;

        case 'imprisonment, detention':
            template = 'imprisonment, detention of <%= hero().name %>.';
            break;

        case 'threat of forced matrimony':
            template = '<%= villain().name %> threatens to marry <%= pick(hero().family).name %>.';
            break;

        case 'threat of forced matrimony between relatives':
            template = '<%= villain().name %> <%= select("insinuates", "suggests", "muses") %> that <%= list(hero().family) %> could be forced into a marriage of convenience.';
            break;

        case 'threat of cannibalism':
            template = 'There is a threat of cannibalism.';
            break;

        case 'threat of cannibalism among relatives':
            template = 'Thanks to the ravages <%= villain().name %>\'s predations have left on the land, there is the threat of cannibalism among the relatives of <%= hero().name %>\'s family. <%= list(hero().family) %> eye each other hungrily.';
            break;

        case 'tormenting at night (visitaion, vampirism)':
            template = '<%= hero().name %> is tormented at night by <%= pick(villain().family).name %>.';
            break;

        case 'declaration of war':
            template = '<%= villain().name %> declares war on <%= hero().name %>.';
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

        var lacks = ['needs a bride, friend, or an individual.',
                     'needs a helper or magical agent.',
                     'needs a wondrous object(s).',
                     'needs a egg of death or love.',
                     'needs a money or means of existence.',
                     'has lacks in other forms'
                    ];

        // if this function isn't executed
        // the lack does not exist for the NEXT function to call it
        // DANG DANG DANG DANG
        var lack = pick(lacks);
        var person = pick(world.hero().family);
        world.cache.lack = {
            lack: lack,
            person: person
        };

        // TODO: this should not be hero, it should be someone else
        return person.name + ' '+ lack;

    };

    // Mediation: hero discovers the lack
    propp['func9'].templates.push('<%= hero().name %> discovers the lack.');
    propp['func9'].exec = function(world) {
        return '<%= hero().name %> discovers that ' + world.cache.lack.person.name + ' ' + world.cache.lack.lack;
    };

    // Counteraction: hero chooses positive action
    // TODO: positiveaction()
    propp['func10'].templates.push('<%= hero().name %> chooses positive action.');

    // Departure: hero leave on mission
    // TODO: journey() function
    propp['func11'].templates.push('<%= hero().name %> leaves <%= hero().home.residence %> to <%= task() %>.');

    // 3rd Sphere: The Donor Sequence
    // Testing: hero is challenged to prove heroic qualities
    propp['func12'].templates.push('<%= hero().name %> is challenged to prove heroic qualities.');

    // Reaction: hero responds to test
    propp['func13'].templates.push('<%= hero().name %> responds to test.');

    //  Acquisition: hero gains magical item
    propp['func14'].exec = function(world, item) {

        item = item || world.magicalitem();
        world.hero().possessions.push(item);

        var t = '<%= advisor().name %> gives <%= hero().name %> ' + item + '.';

        return t;

    };

    // Guidance: hero reaches destination
    // TODO: destination is related to task()
    propp['func15'].templates.push('<%= hero().name %> reaches destination.');

    // Struggle: hero and villain do battle
    // TODO: battle() function
    propp['func17'].templates.push('<%= hero().name %> and <%= villain().name %> do battle.');

    // Branding: hero is branded
    propp['func18'].templates.push('<%= hero().name %> is changed by the encounter.');
    propp['func18'].templates.push('<%= hero().name %> is scarred internally.');
    propp['func18'].templates.push('This day would never be forgotten by <%= hero().name %>.');
    propp['func18'].templates.push('<%= hero().name %> receives a stylish scarf as a souvenir of the encounter!');
    propp['func18'].templates.push('<%= villain().name %>\'s head pops off, and is scavenged by <%= hero().name %>.');

    // Victory: Villain is defeated
    propp['func19'].templates.push('Through deft use of <%= magicalitem() %>, <%= villain().name %> is defeated.');
    propp['func19'].templates.push('<%= hero().name %> <%= select("deploys", "uses", "manipulates") %> <%= magicalitem() %> to <%= select("defeat", "trounce", "vanquish", "annoy") %> <%= villain().name %>.');

    // Resolution: Initial misfortune or lack is resolved
    propp['func20'].templates.push('Initial misfortune or lack is resolved.');

    // 4th Sphere: The hero\'s return
    // In the final (and often optional) phase of the storyline, the hero returns home, hopefully uneventfully and to a hero\'s welcome, although this may not always be the case.

    // Return: hero sets out for home
    // TODO: how could I write something like hero().home.residence.possess and get "her home" or "his shed" ?
    propp['func21'].templates.push('<%= hero().name %> sets out for <%= hero().home.residence %> in <%= hero().home.location %>.');

    // Pursuit: hero is chased
    // TODO: character/thing that chases
    // TODO: chase() function
    propp['func22'].templates.push('<%= hero().name %> is chased.');

    // Rescue: pursuit ends
    // TODO: template to end the above
    propp['func23'].templates.push('pursuit ends.');

    // Arrival: hero arrives unrecognized
    propp['func24'].templates.push('<%= hero().name %> arrives in <%= hero().home.location %> but is unrecognized.');

    // Claim: False hero makes unfounded claims
    propp['func25'].templates.push('<%= falsehero().name %> makes unfounded claims.');

    // Task: Difficult task proposed to the <%= hero().name %>
    propp['func26'].templates.push('<%= advisor().name %> charges <%= hero().name %> to <%= task() %>.');

    // Solution: Task is resolved
    propp['func27'].templates.push('<%= task() %> is completed.');
    propp['func27'].templates.push('<%= task() %> is completed by <%= hero().name %>.');
    propp['func27'].templates.push('<%= hero().name %> finishes off <%= task() %>.');

    // Recognition: hero is recognised
    propp['func28'].templates.push('<%= hero().name %> is recognized.');

    // Exposure: False hero is exposed
    propp['func29'].templates.push('<%= falsehero().name %> is exposed.');

    // Transfiguration: hero is given a new appearance
    // TODO: character description, associated adjectives ???
    propp['func30'].templates.push('<%= hero().name %> is given a new appearance.');

    // Punishment: Villain is punished
    propp['func31'].templates.push('<%= villain().name %> is <%= punished() %> by <%= hero().name %>.');

    // Wedding: hero marries and ascends the throne
    propp['func32'].exec = function(world, subFunc) {

        // marriage/ascension are arrays in the wordbank
        var templates = [
            '<%= hero().name %> <%= (select(marriage, ascension))() %>. It\'s a good life.',
            '<%= hero().name %> <%= marriage() %> and <%= ascension() %>.',
            '<%= hero().name %> settles down and <%= (select(marriage, ascension))() %>.',
            'Everything works out for <%= hero().name %>, who <%= (select(marriage, ascension))() %>.',
            // TODO: verb tense DOES NOT WORK here
            // TODO: posession DOES NOT WORK here
            '<%= (select(marriage, ascension))() %>, <%= hero().name %> retires to <%= select("a life of farming", "write memoirs", "live in peace", "pine for days of adventure") %>.'
        ];

        var dead = [];
        var people = world.hero().family.concat(world.hero().acquaintances);
        for (var i = 0; i < people.length; i++) {
            if (people[i].health == healthLevel.dead) { dead.push(people[i]); }
        }

        var t = pick(templates);

        // this a proof-of-concept
        if (dead.length > 0) {
            var sent = '<%= hero().name %> still mourns the stinging loss of ' + world.list(dead) + '.';
            t += ' ' + sent;
        };

        return t;

    };

    return propp;

};
