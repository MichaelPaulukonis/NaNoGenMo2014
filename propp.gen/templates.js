
var nTemplates = function(propp) {

    // 0: Initial situation
    // TODO: multiple sentences within a template may not be punctuated correctly.
    // hrm. maybe they should each appear as a sub-component, so they can be processed externally?
    // for example, if sentence begins with <%= list(acquainainces()) %> and the first is 'the Easter Bunny' it will not be auto-capitalised
    // since that only works on the first letter of the template-output (erroneously called 'sentence' in the code).
    // TODO: what about "lives alone." how would THAT be figured out???
    propp['func0'].templates.push('<%= hero().name %> lives in <%= home() %>. <%= hero().name %> lives with <%= list(hero().family) %>. <%= list(acquantainces()) %> are <%= select("friends of", "known to") %> <%= hero().name %>.');

    // Proppian-function templates
    // Absentation: Someone goes missing
    // this could be the hero leaving home
    // so we\'d have to have more logic to cover this
    // TODO: also need to define the action, so it can be dealt with in Resuloution (func20)
    propp['func1'].templates.push('<%= victim().name %> goes missing.');
    propp['func1'].templates.push('<%= victim().name %> unexpectedly dies, leaving <%= hero().name %> devastated.');

    // Interdiction: hero is warned
    // propp['func2'].templates.push('<%= hero().name %> is warned.');
    // TODO: introduction of personage from interdiction
    // TODO: rework the d**n interdiction template-function
    propp['func2'].templates.push('<%= interdiction().text %>.');
    // this is now just a proof-of-concept of executing larger functions to deal with templates
    propp['func2'].exec = function(world) {
        // world is not actually used here (now)...
        return '<%= interdiction().text %>.';

        // the reason you'd build the entire thing above HERE
        // is that THIS is the template
        // texts should be built here. otherwise... what's the point?
    };

    // Violation of Interdiction
    propp['func3'].templates.push('<%= violation() %> <%= list(minions()) %> are in league with <%= villain().name %>.');

    // Reconnaissance: Villain seeks something
    propp['func4'].templates.push('<%= villain().name %> pays a visit to <%= home() %>.');
    propp['func4'].templates.push('<%= home() %> plays host to <%= villain().name %>.');

    // Delivery: The villain gains information
    propp['func5'].templates.push('<%= villain().name %> gains information.');
    propp['func5'].templates.push('After a chat with <%= pick(hero().family).name %>, <%= villain().name %> learns some interesting news.');
    propp['func5'].templates.push('While skulking about <%= home() %>, <%= villain().name %> overhears some gossip about <%= hero().name %>.');

    // Trickery: Villain attempts to deceive victim.
    propp['func6'].templates.push('<%= villain().name %> attempts to deceive victim.');

    // Complicity: Unwitting helping of the enemy
    propp['func7'].templates.push('<%= hero().name %> unwittingly helps <%= villain().name %>.');

    // 2nd Sphere: The Body of the story
    // 8A - Villainy: The need is identified (Villainy)
    // function 8 (and/or 8a) is always present in tale
    // antagonist(s) causes harm or injury to victim(s)/member of protagonist's family = villainy - A
    // propp['func8'].templates.push('The need is identified (Villainy).');
    propp['func8'].templates.push('<%= villain().name %> kidnaps <%= pick(select(hero().family, acquantainces)()).name %>.');
    propp['func8'].templates.push('<%= villain().name %> <%= select("seizes", "steals", "grabs", "nicks") %> the <%= magicalitem() %>.');
    propp['func8'].templates.push('<%= villain().name %> forcibly seizes <%= magicalhelper().name %>.');
    propp['func8'].templates.push('pillaging or ruining of crops by <%= villain().name %>.');
    propp['func8'].templates.push('<%= villain().name %> steals the daylight!');
    propp['func8'].templates.push('plundering in other forms.');
    propp['func8'].templates.push('<%= villain().name %> causes bodily injury, maiming, mutilation.');
    propp['func8'].templates.push('<%= villain().name %> causes sudden disappearance.');
    // TODO: more code is needed for THIS one...
    propp['func8'].templates.push('<%= hero().name %>\'s bride is forgotten after <%= villain().name %> casts a spell.');
    propp['func8'].templates.push('<%= villain().name %>  makes a demand for delivery or enticement, abduction.');
    propp['func8'].templates.push('<%= hero().name %> is driven from <%= home() %>.');
    propp['func8'].templates.push('<%= villain().name %>  throws <%= hero().name %> into body of water.');
    propp['func8'].templates.push('casting of a spell, transformation.');
    // TODO: posession needs to be tracked
    // so item now "belongs" to villain (or hench-person)
    propp['func8'].templates.push('false substitution.');
    propp['func8'].templates.push('<%= villain().name %> issues order to kill [requires proof].');
    propp['func8'].templates.push('<%= villain().name %> commits murder.');
    propp['func8'].templates.push('imprisonment, detention of <%= hero().name %>.');
    propp['func8'].templates.push('<%= villain().name %> threat of forced matrimony.');
    propp['func8'].templates.push('<%= villain().name %> threat of forced matrimony between relatives.');
    propp['func8'].templates.push('threat of cannibalism.');
    propp['func8'].templates.push('threat of cannibalism among relatives.');
    propp['func8'].templates.push('<%= villain().name %> tormenting at night (visitaion, vampirism).');
    propp['func8'].templates.push('<%= villain().name %> declares war on <%= hero().name %>.');


    //  8a - Lack: The need is identified (Lack)
    propp['func9'].templates.push('The need is identified (Lack)');
    // function 8a: one member of family lacks/desires something = lack - a
    // TODO: push this into an exec function
    // pick one of the following, and store the object
    // or.... figure out a better way to accomplish this...
    propp['func9'].exec = function(world) {

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
    propp['func10'].templates.push('<%= hero().name %> discovers the lack.');
    propp['func10'].exec = function(world) {
        return '<%= hero().name %> discovers that ' + world.cache.lack.person.name + ' ' + world.cache.lack.lack;
    };

    // Counteraction: hero chooses positive action
    // TODO: positiveaction()
    propp['func11'].templates.push('<%= hero().name %> chooses positive action.');

    // Departure: hero leave on mission
    // TODO: journey() function
    propp['func12'].templates.push('<%= hero().name %> leaves to <%= task() %>.');

    // 3rd Sphere: The Donor Sequence
    // Testing: hero is challenged to prove heroic qualities
    propp['func13'].templates.push('<%= hero().name %> is challenged to prove heroic qualities.');

    // Reaction: hero responds to test
    propp['func14'].templates.push('<%= hero().name %> responds to test.');

    //  Acquisition: hero gains magical item
    propp['func15'].templates.push('<%= advisor().name %> gives <%= hero().name %> <%= magicalitem() %>.');

    // Guidance: hero reaches destination
    // TODO: destination is related to task()
    propp['func16'].templates.push('<%= hero().name %> reaches destination.');

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
    propp['func21'].templates.push('<%= hero().name %> sets out for <%= home() %>.');

    // Pursuit: hero is chased
    // TODO: character/thing that chases
    // TODO: chase() function
    propp['func22'].templates.push('<%= hero().name %> is chased.');

    // Rescue: pursuit ends
    // TODO: template to end the above
    propp['func23'].templates.push('pursuit ends.');

    // Arrival: hero arrives unrecognized
    propp['func24'].templates.push('<%= hero().name %> arrives in <%= home() %> but is unrecognized.');

    // Claim: False hero makes unfounded claims
    propp['func25'].templates.push('<%= falsehero().name %> makes unfounded claims.');

    // Task: Difficult task proposed to the <%= hero().name %>
    propp['func26'].templates.push('<%= advisor().name %> charges <%= hero().name %> to <%= task() %>.');

    // Solution: Task is resolved
    propp['func27'].templates.push('<%= task() %> is completed.');
    propp['func27'].templates.push('<%= task() %> is completed by <%= hero().name %>.');
    propp['func27'].templates.push('<%= hero().name %> finishes off <%= task() %>.');

    // Recognition: hero is recognised
    propp['func28'].templates.push('<%= hero().name %> is recognised.');

    // Exposure: False hero is exposed
    propp['func29'].templates.push('<%= falsehero().name %> is exposed.');

    // Transfiguration: hero is given a new appearance
    propp['func30'].templates.push('<%= hero().name %> is given a new appearance.');

    // Punishment: Villain is punished
    propp['func31'].templates.push('<%= villain().name %> is <%= punished() %> by <%= hero().name %>.');

    // Wedding: hero marries and ascends the throne
    propp['func32'].templates.push('<%= hero().name %> <%= (select(marriage, ascension))() %>. It\'s a good life.');
    propp['func32'].templates.push('<%= hero().name %> <%= marriage() %> and <%= ascension() %>.');
    propp['func32'].templates.push('<%= hero().name %> settles down and <%= (select(marriage, ascension))() %>.');
    propp['func32'].templates.push('Everything works out for <%= hero().name %>, who <%= (select(marriage, ascension))() %>.');
    // TODO: verb tense DOES NOT WORK here
    // TODO: posession DOES NOT WORK here
    propp['func32'].templates.push('<%= (select(marriage, ascension))() %>, <%= hero().name %> retires to <%= select("a life of farming", "write memoirs", "live in peace", "pine for days of adventure") %>.');

    return propp;

};
