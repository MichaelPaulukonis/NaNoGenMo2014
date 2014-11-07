
var nTemplates = function(propp) {

    // 0: Initial situation
    // TODO: multiple sentences within a template may not be punctuated correctly.
    // hrm. maybe they should each appear as a sub-component, so they can be processed externally?
    // for example, if sentence begins with <%= list(acquainainces()) %> and the first is 'the Easter Bunny' it will not be auto-capitalised
    // since that only works on the first letter of the template-output (erroneously called 'sentence' in the code).
    // TODO: what about "lives alone." how would THAT be figured out???
    propp['func0'].templates.push('<%= hero() %> lives in <%= home() %>. <%= hero() %> lives with <%= list(family()) %>. <%= list(acquantainces()) %> are <%= select("friends of", "known to") %> <%= hero() %>.');

    // Proppian-function templates
    // Absentation: Someone goes missing
    // this could be the hero leaving home
    // so we\'d have to have more logic to cover this
    // TODO: also need to define the action, so it can be dealt with in Resuloution (func20)
    propp['func1'].templates.push('<%= victim() %> goes missing.');
    propp['func1'].templates.push('<%= victim() %> unexpectedly dies, leaving <%= hero() %> devastated.');

    // Interdiction: hero is warned
    // propp['func2'].templates.push('<%= hero() %> is warned.');
    // TODO: introduction of personage from interdiction
    // TODO: rework the d**n interdiction template-function
    propp['func2'].templates.push('<%= interdiction().text %>.');

    // Violation of Interdiction
    propp['func3'].templates.push('<%= violation() %> <%= list(minions()) %> are in league with <%= villain() %>.');

    // Reconnaissance: Villain seeks something
    propp['func4'].templates.push('<%= villain() %> pays a visit to <%= home() %>.');
    propp['func4'].templates.push('<%= home() %> plays host to <%= villain() %>.');

    // Delivery: The villain gains information
    propp['func5'].templates.push('<%= villain() %> gains information.');
    propp['func5'].templates.push('After a chat with <%= pick(family()) %>, <%= villain() %> learns some interesting news.');
    propp['func5'].templates.push('While skulking about <%= home() %>, <%= villain() %> overhears some gossip about <%= hero() %>.');

    // Trickery: Villain attempts to deceive victim.
    propp['func6'].templates.push('<%= villain() %> attempts to deceive victim.');

    // Complicity: Unwitting helping of the enemy
    propp['func7'].templates.push('<%= hero() %> unwittingly helps <%= villain() %>.');

    // 2nd Sphere: The Body of the story
    // 8A - Villainy: The need is identified (Villainy)
    // function 8 (and/or 8a) is always present in tale
    // antagonist(s) causes harm or injury to victim(s)/member of protagonist's family = villainy - A
    // propp['func8'].templates.push('The need is identified (Villainy).');
    // propp['func8'].templates.push('<%= villain() %> kidnaps <%= pick(select(family, acquantainces)()) %>.');
    // propp['func8'].templates.push('<%= villain() %> seizes of <%= magicalitem() %>.');
    // originally "magical helper" ... which could be a person
    // that's probably for the item function to handle...
    propp['func8'].templates.push('<%= villain() %> forcibly seizes <%= magicalhelper() %>.');
    // propp['func8'].templates.push('pillaging or ruining of crops by <%= villain() %>.');
    // propp['func8'].templates.push('<%= villain() %> steals the daylight!');
    // propp['func8'].templates.push('plundering in other forms.');
    // propp['func8'].templates.push('<%= villain() %> causes bodily injury, maiming, mutilation.');
    // propp['func8'].templates.push('<%= villain() %> causes sudden disappearance.');
    // TODO: more code is needed for THIS one...
    // propp['func8'].templates.push('<%= hero() %>\'s bride is forgotten after <%= villain() %> casts a spell.');
    // propp['func8'].templates.push('<%= villain() %>  makes a demand for delivery or enticement, abduction.');
    // propp['func8'].templates.push('<%= hero() %> is driven from <%= home() %>.');
    // propp['func8'].templates.push('<%= villain() %>  throws <%= hero() %> into body of water.');
    // propp['func8'].templates.push('casting of a spell, transformation.');
    // // TODO: posession needs to be tracked
    // // so item now "belongs" to villain (or hench-person)
    // propp['func8'].templates.push('false substitution.');
    // propp['func8'].templates.push('<%= villain() %> issues order to kill [requires proof].');
    // propp['func8'].templates.push('<%= villain() %> commits murder.');
    // propp['func8'].templates.push('imprisonment, detention of <%= hero() %>.');
    // propp['func8'].templates.push('<%= villain() %> threat of forced matrimony.');
    // propp['func8'].templates.push('<%= villain() %> threat of forced matrimony between relatives.');
    // propp['func8'].templates.push('threat of cannibalism.');
    // propp['func8'].templates.push('threat of cannibalism among relatives.');
    // propp['func8'].templates.push('<%= villain() %> tormenting at night (visitaion, vampirism).');
    // propp['func8'].templates.push('<%= villain() %> declares war on <%= hero() %>.');


    //  8a - Lack: The need is identified (Lack)
    propp['func9'].templates.push('The need is identified (Lack)');

    // Mediation: hero discovers the lack
    propp['func10'].templates.push('<%= hero() %> discovers the lack.');

    // Counteraction: hero chooses positive action
    // TODO: positiveaction()
    propp['func11'].templates.push('<%= hero() %> chooses positive action.');

    // Departure: hero leave on mission
    // TODO: journey() function
    propp['func12'].templates.push('<%= hero() %> leaves to <%= task() %>.');

    // 3rd Sphere: The Donor Sequence
    // Testing: hero is challenged to prove heroic qualities
    propp['func13'].templates.push('<%= hero() %> is challenged to prove heroic qualities.');

    // Reaction: hero responds to test
    propp['func14'].templates.push('<%= hero() %> responds to test.');

    //  Acquisition: hero gains magical item
    propp['func15'].templates.push('<%= advisor() %> gives <%= hero() %> <%= magicalitem() %>.');

    // Guidance: hero reaches destination
    // TODO: destination is related to task()
    propp['func16'].templates.push('<%= hero() %> reaches destination.');

    // Struggle: hero and villain do battle
    // TODO: battle() function
    propp['func17'].templates.push('<%= hero() %> and <%= villain() %> do battle.');

    // Branding: hero is branded
    propp['func18'].templates.push('<%= hero() %> is changed by the encounter.');
    propp['func18'].templates.push('<%= hero() %> is scarred internally.');
    propp['func18'].templates.push('This day would never be forgotten by <%= hero() %>.');
    propp['func18'].templates.push('<%= hero() %> receives a stylish scarf as a souvenir of the encounter!');
    propp['func18'].templates.push('<%= villain() %>\'s head pops off, and is scavenged by <%= hero() %>.');

    // Victory: Villain is defeated
    propp['func19'].templates.push('Through deft use of <%= magicalitem() %>, <%= villain() %> is defeated.');
    propp['func19'].templates.push('<%= hero() %> <%= select("deploys", "uses", "manipulates") %> <%= magicalitem() %> to <%= select("defeat", "trounce", "vanquish", "annoy") %> <%= villain() %>.');

    // Resolution: Initial misfortune or lack is resolved
    propp['func20'].templates.push('Initial misfortune or lack is resolved.');

    // 4th Sphere: The hero\'s return
    // In the final (and often optional) phase of the storyline, the hero returns home, hopefully uneventfully and to a hero\'s welcome, although this may not always be the case.

    // Return: hero sets out for home
    propp['func21'].templates.push('<%= hero() %> sets out for <%= home() %>.');

    // Pursuit: hero is chased
    // TODO: character/thing that chases
    // TODO: chase() function
    propp['func22'].templates.push('<%= hero() %> is chased.');

    // Rescue: pursuit ends
    // TODO: template to end the above
    propp['func23'].templates.push('pursuit ends.');

    // Arrival: hero arrives unrecognized
    propp['func24'].templates.push('<%= hero() %> arrives in <%= home() %> but is unrecognized.');

    // Claim: False hero makes unfounded claims
    propp['func25'].templates.push('<%= falsehero() %> makes unfounded claims.');

    // Task: Difficult task proposed to the <%= hero() %>
    propp['func26'].templates.push('<%= advisor() %> charges <%= hero() %> to <%= task() %>.');

    // Solution: Task is resolved
    propp['func27'].templates.push('<%= task() %> is completed.');
    propp['func27'].templates.push('<%= task() %> is completed by <%= hero() %>.');
    propp['func27'].templates.push('<%= hero() %> finishes off <%= task() %>.');

    // Recognition: hero is recognised
    propp['func28'].templates.push('<%= hero() %> is recognised.');

    // Exposure: False hero is exposed
    propp['func29'].templates.push('<%= falsehero() %> is exposed.');

    // Transfiguration: hero is given a new appearance
    propp['func30'].templates.push('<%= hero() %> is given a new appearance.');

    // Punishment: Villain is punished
    propp['func31'].templates.push('<%= villain() %> is <%= punished() %> by <%= hero() %>.');

    // Wedding: hero marries and ascends the throne
    propp['func32'].templates.push('<%= hero() %> <%= (select(marriage, ascension))() %>. It\'s a good life.');
    propp['func32'].templates.push('<%= hero() %> <%= marriage() %> and <%= ascension() %>.');
    propp['func32'].templates.push('<%= hero() %> settles down and <%= (select(marriage, ascension))() %>.');
    propp['func32'].templates.push('Everything works out for <%= hero() %>, who <%= (select(marriage, ascension))() %>.');
    // TODO: verb tense DOES NOT WORK here
    // TODO: posession DOES NOT WORK here
    propp['func32'].templates.push('<%= (select(marriage, ascension))() %>, <%= hero() %> retires to <%= select("a life of farming", "write memoirs", "live in peace", "pine for days of adventure") %>.');

    return propp;

};
