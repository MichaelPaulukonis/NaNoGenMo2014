
var nTemplates = function(propp) {

    // TODO: what? why?
    //WHEN YOU START FILLING IN CONTENT, STICK '\N' AT END OF LINE
    //THEN ERASE THE '\N' IN FINAL STRING

    // 0: Initial situation
    // missing so far....

    // Proppian-function templates
    // Absentation: Someone goes missing
    propp["func1"].templates.push("Someone close to the hero goes missing.");
    propp["func1"].templates.push("Someone close to the hero dies.");

    // Interdiction: Hero is warned
    propp["func2"].templates.push("Hero is warned.");

    // Violation of Interdiction
    propp["func3"].templates.push("Violation of Interdiction");

    // Reconnaissance: Villain seeks something
    propp["func4"].templates.push("Villain seeks something.");

    // Delivery: The villain gains information
    propp["func5"].templates.push("The villain gains information.");

    // Trickery: Villain attempts to deceive victim.
    propp["func6"].templates.push("Villain attempts to deceive victim.");

    // Complicity: Unwitting helping of the enemy
    propp["func7"].templates.push("Unwitting helping of the enemy.");

    // 2nd Sphere: The Body of the story
    // Villainy and lack: The need is identified (Villainy)
    propp["func8"].templates.push("Villainy and lack: The need is identified (Villainy).");

    //  Villainy and lack: The need is identified (Lack)
    propp["func9"].templates.push("Villainy and lack: The need is identified (Lack)");

    // Mediation: Hero discovers the lack
    propp["func10"].templates.push("Mediation: Hero discovers the lack.");

    // Counteraction: Hero chooses positive action
    propp["func11"].templates.push("Counteraction: Hero chooses positive action.");

    // Departure: Hero leave on mission
    propp["func12"].templates.push("Departure: Hero leaves on mission.");

    // 3rd Sphere: The Donor Sequence
    // Testing: Hero is challenged to prove heroic qualities
    propp["func13"].templates.push("Testing: Hero is challenged to prove heroic qualities.");

    // Reaction: Hero responds to test
    propp["func14"].templates.push("Reaction: Hero responds to test.");

    //  Acquisition: Hero gains magical item
    propp["func15"].templates.push(" Acquisition: Hero gains magical item.");

    // Guidance: Hero reaches destination
    propp["func16"].templates.push("Guidance: Hero reaches destination");

    // Struggle: Hero and villain do battle
    propp["func17"].templates.push("Struggle: Hero and villain do battle");

    // Branding: Hero is branded
    propp["func18"].templates.push("Branding: Hero is branded");

    // Victory: Villain is defeated
    propp["func19"].templates.push("Victory: Villain is defeated");

    // Resolution: Initial misfortune or lack is resolved
    propp["func20"].templates.push("Resolution: Initial misfortune or lack is resolved");

    // 4th Sphere: The Hero's return
    // In the final (and often optional) phase of the storyline, the hero returns home, hopefully uneventfully and to a hero's welcome, although this may not always be the case.

    // Return: Hero sets out for home
    propp["func21"].templates.push("Return: Hero sets out for home");

    // Pursuit: Hero is chased
    propp["func22"].templates.push("Pursuit: Hero is chased");

    // Rescue: pursuit ends
    propp["func23"].templates.push("Rescue: pursuit ends");

    // Arrival: Hero arrives unrecognized
    propp["func24"].templates.push("Arrival: Hero arrives unrecognized");

    // Claim: False hero makes unfounded claims
    propp["func25"].templates.push("Claim: False hero makes unfounded claims");

    // Task: Difficult task proposed to the hero
    propp["func26"].templates.push("Task: Difficult task proposed to the hero");

    // Solution: Task is resolved
    propp["func27"].templates.push("Solution: Task is resolved");

    // Recognition: Hero is recognised
    propp["func28"].templates.push("Recognition: Hero is recognised");

    // Exposure: False hero is exposed
    propp["func29"].templates.push("Exposure: False hero is exposed");

    // Transfiguration: Hero is given a new appearance
    propp["func30"].templates.push("Transfiguration: Hero is given a new appearance");

    // Punishment: Villain is punished
    propp["func31"].templates.push("Punishment: Villain is punished");

    // Wedding: Hero marries and ascends the throne
    propp["func32"].templates.push("Wedding: Hero marries and ascends the throne.");
    propp["func32"].templates.push("Everything works out for the hero.");

    return propp;

};
