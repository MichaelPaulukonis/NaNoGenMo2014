
var nTemplates = function(propp) {

    // TODO: what? why?
    //WHEN YOU START FILLING IN CONTENT, STICK '\N' AT END OF LINE
    //THEN ERASE THE '\N' IN FINAL STRING

    // 0: Initial situation
    // missing so far..
    propp["func0"].templates.push("<%= hero() %> lives in <%= home() %>. <%= hero() %> lives with <%= family().join(' and ') %>.");
    // Proppian-function templates
    // Absentation: Someone goes missing
    propp["func1"].templates.push("<%= victim() %> goes missing.");
    propp["func1"].templates.push("<%= victim() %> unexpectedly dies, leaving <%= hero() %> devastated.");

    // Interdiction: hero is warned
    propp["func2"].templates.push("<%= hero() %> is warned.");

    // Violation of Interdiction
    propp["func3"].templates.push("Violation of Interdiction");

    // Reconnaissance: Villain seeks something
    propp["func4"].templates.push("<%= villain() %> seeks something.");

    // Delivery: The villain gains information
    propp["func5"].templates.push("<%= villain() %> gains information.");

    // Trickery: Villain attempts to deceive victim.
    propp["func6"].templates.push("<%= villain() %> attempts to deceive victim.");

    // Complicity: Unwitting helping of the enemy
    propp["func7"].templates.push("<%= hero() %> unwittingly helps <%= villain() %>.");

    // 2nd Sphere: The Body of the story
    // Villainy and lack: The need is identified (Villainy)
    propp["func8"].templates.push("The need is identified (Villainy).");

    //  Villainy and lack: The need is identified (Lack)
    propp["func9"].templates.push("The need is identified (Lack)");

    // Mediation: hero discovers the lack
    propp["func10"].templates.push("<%= hero() %> discovers the lack.");

    // Counteraction: hero chooses positive action
    // TODO: positiveaction()
    propp["func11"].templates.push("<%= hero() %> chooses positive action.");

    // Departure: hero leave on mission
    // TODO: journey() function
    propp["func12"].templates.push("<%= hero() %> leaves to <%= task() %>.");

    // 3rd Sphere: The Donor Sequence
    // Testing: hero is challenged to prove heroic qualities
    propp["func13"].templates.push("<%= hero() %> is challenged to prove heroic qualities.");

    // Reaction: hero responds to test
    propp["func14"].templates.push("<%= hero() %> responds to test.");

    //  Acquisition: hero gains magical item
    propp["func15"].templates.push("<%= hero() %> gains <%= magicalitem() %>.");

    // Guidance: hero reaches destination
    // TODO: destination is related to task()
    propp["func16"].templates.push("<%= hero() %> reaches destination.");

    // Struggle: hero and villain do battle
    // TODO: battle() function
    propp["func17"].templates.push("<%= hero() %> and <%= villain() %> do battle.");

    // Branding: hero is branded
    propp["func18"].templates.push("<%= hero() %> is branded.");

    // Victory: Villain is defeated
    propp["func19"].templates.push("<%= villain() %> is defeated.");

    // Resolution: Initial misfortune or lack is resolved
    propp["func20"].templates.push("Initial misfortune or lack is resolved.");

    // 4th Sphere: The hero's return
    // In the final (and often optional) phase of the storyline, the hero returns home, hopefully uneventfully and to a hero's welcome, although this may not always be the case.

    // Return: hero sets out for home
    propp["func21"].templates.push("<%= hero() %> sets out for <%= home() %>.");

    // Pursuit: hero is chased
    // TODO: character/thing that chases
    // TODO: chase() function
    propp["func22"].templates.push("<%= hero() %> is chased.");

    // Rescue: pursuit ends
    // TODO: template to end the above
    propp["func23"].templates.push("pursuit ends.");

    // Arrival: hero arrives unrecognized
    propp["func24"].templates.push("<%= hero() %> arrives in <%= home() %> but is unrecognized.");

    // Claim: False hero makes unfounded claims
    propp["func25"].templates.push("<%= falsehero() %> makes unfounded claims.");

    // Task: Difficult task proposed to the <%= hero() %>
    propp["func26"].templates.push("<%= task() %>: Difficult task proposed to <%= hero() %>.");

    // Solution: Task is resolved
    propp["func27"].templates.push("<%= task() %> is resolved.");

    // Recognition: hero is recognised
    propp["func28"].templates.push("<%= hero() %> is recognised.");

    // Exposure: False hero is exposed
    propp["func29"].templates.push("<%= falsehero() %> is exposed.");

    // Transfiguration: hero is given a new appearance
    propp["func30"].templates.push("<%= hero() %> is given a new appearance.");

    // Punishment: Villain is punished
    propp["func31"].templates.push("<%= villain() %> is <%= punished() %> by <%= hero() %>.");

    // Wedding: hero marries and ascends the throne
    propp["func32"].templates.push("<%= hero() %> marries and ascends the throne.");
    propp["func32"].templates.push("Everything works out for <%= hero() %>.");

    return propp;

};
