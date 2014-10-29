// SimpleStoryCreator
// (C) 2013 by anihex
// Original-Idea: 2013 by Rick Hoppmann (kddekadenz)
// Original-Project: PlotNarrator (https://github.com/kddekadenz/PlotNarrator)

// SUMMARY:
// The SimpleStoryCreator creates a simple story that can be used
// as a source of inspiration if no other idea is avaible.
// The Usage is quite simple:
// Just call the "new" operator and it's all done.
//
// Example:
//   var MyStory = new TSimpleStoryCreator();
//
// This creates a new instance of TSimpleStoryCreator and it also
// generates a first story. You can get the story-text by calling
// GetStoryText.
//
// Example:
//   MyStory.GetStoryText();
//
// This returns an array of strings containing the story.
// If the story doesn't fit your taste/need, you can always create
// a new story. This can easily achived by calling NewStory.
//
// Example:
//   MyStory.NewStory();
//
// This way you get a new story that (hopefully) fits your needs/taste
// better.
//
//
// Source-Code Note:
// This source is using the Delphi/Lazarus way of naming stuff.
// Means:
// - "Classes" get a big "T" as the first letter
// - "Private Variables and routines" get a small "r" as the first letter
// - "Local Variables" get a small "l" as the first letter
function SimpleStoryCreator() {
    // ************************************************************
    // *                    All required lists                    *
    // ************************************************************

    // List of all possible story plots
    var rPlotList = [
	"destroy",
	"kidnap",
	"witch",
	"revenge"
    ];

    // List of story intros
    var rIntroList = [
	"Once Upon a Time",
	"In a land far away",
	"Before you were born",
	"In a little village"
    ];

    // List of possible endings for the story
    var rPlotEndList = [
	"flee",
	"kill",
	"kill_weapon"
    ];

    // List of all good people (read: Heros)
    var rHeroList = [
	{ Article: "a" , Name: "trader", Gender: "both" },
	{ Article: "a" , Name: "merchant", Gender: "both" },
	{ Article: "a" , Name: "salesperson", Gender: "both" },
	{ Article: "a" , Name: "salesman", Gender: "both" },
	{ Article: "a" , Name: "peasant", Gender: "both" },
	{ Article: "a" , Name: "farmer", Gender: "male" },
	{ Article: "a" , Name: "farmer's wife", Gender: "female" },
	{ Article: "a" , Name: "hero", Gender: "male" },
	{ Article: "a" , Name: "heroine", Gender: "female" },
	{ Article: "a" , Name: "blacksmith", Gender: "both" },
	{ Article: "an", Name: "artist", Gender: "both" },
	{ Article: "a" , Name: "poet", Gender: "both" },
	{ Article: "a" , Name: "programmer", Gender: "both" },
	{ Article: "an", Name: "artist", Gender: "both" },
	{ Article: "a" , Name: "musician", Gender: "both" },
	{ Article: "a" , Name: "princess", Gender: "female" },
	{ Article: "a" , Name: "prince", Gender: "male" }
    ];

    // List of all adjectives of the Hero
    var rHeroMainAdjectiveList = [
	{ Article: "a", Word: "brave" },
	{ Article: "a", Word: "wealthy" },
	{ Article: "a", Word: "rich" },
	{ Article: "a", Word: "poor" }
    ];

    var rHeroSecondaryAdjectiveList = [
	{ Male: "kind to everyone", Female: "kind to everyone" },
	{ Male: "madly in love with his wife", Female: "madly in love with her husband" },
	{ Male: "handsome", Female: "beautiful" }
    ];

    // List of all bad people (read: Villains)
    var rVillainList = [
	{ Article: "a" , Name: "warlock" },
	{ Article: "a" , Name: "necromancer" },
	{ Article: "a" , Name: "ghost" },
	{ Article: "a" , Name: "demon" },
	{ Article: "a" , Name: "goblin" },
	{ Article: "a" , Name: "troll" },
	{ Article: "a" , Name: "monster" },
	{ Article: "a" , Name: "dwarf" },
	{ Article: "a" , Name: "giant" },
	{ Article: "a" , Name: "barbarian" },
	{ Article: "a" , Name: "grook" },
	{ Article: "a" , Name: "rogue" },
	{ Article: "a" , Name: "bandit" },
	{ Article: "a" , Name: "rascal" },
	{ Article: "a" , Name: "scoundrel" },
	{ Article: "an", Name: "orc" },
	{ Article: "an", Name: "ogre" },
	{ Article: "a" , Name: "soldier" },
	{ Article: "a" , Name: "warrior" },
	{ Article: "a" , Name: "fighter" },
	{ Article: "a" , Name: "viking" },
	{ Article: "a" , Name: "mage" },
	{ Article: "a" , Name: "villain" },
	{ Article: "an", Name: "archer" },
	{ Article: "a" , Name: "phantom" }
    ];

    // List of possible wording for "kill"
    var rKillList = [
	"killed",
	"murdered",
	"slayed",
	"assassinated"
    ];

    // List of possible wording for "flee"
    var rFleeList = [
	"fled",
	"fled in terror",
	"escaped",
	"manged to escape",
	"was able to flee"
    ];

    // List of possible wording for "cheat"
    var rCheatList = [
	"cheated",
	"tricked",
	"was able to trick",
	"managed to cheat",
	"fooled"
    ];


    // Plot: Destroy; List of ways to destroy an object
    var rDestroyList = [
	"destroy",
	"ruined",
	"wrecked",
	"smashed",
	"demolished"
    ];

    // Plot: Destroy; List of objects that can be destroyed
    var rDestroyObjectList = [
	"house",
	"garden",
	"doghouse",
	"temple",
	"clock",
	"field",
	"farm",
	"tower",
	"building",
	"residence",
	"domicile",
	"place of birth",
	"home",
	"hovel",
	"hut",
	"flat",
	"flatlet",
    ];


    // Plot: Witch; List of ways to cast the spell
    var rWitchList = [
	"enchanted",
	"spellbound",
	"bewitched",
	"entranced"
    ];

    // Plot: Witch; List of ways to end the spell
    var rWitchEndList = [
	"freed",
	"ended the spell casted on",
	"ended the enchantment of"
    ];

    // Plot: Kidnap; List of ways to be kidnaped
    var rKidnapList = [
	"kidnapped",
	"abducted",
	"carried off"
    ];

    // List of final moments
    var rFinalMoment = [
	"Then",
	"Finally",
	"Ultimately",
	"In the end",
	"Thereupon",
	"Thereat",
	"After that"
    ];

    // List of "One day" events
    var rOneDayList = [
	"One day",
	"There came a day",
	"One night"
    ];

    // List of all possible relatives
    var rRelativeList = [
	"dog",
	"cat",
	"mother",
	"father",
	"grandfather",
	"grandmother",
	"brother",
	"son",
	"sister",
	"daughter",
	"friend",
	"mate",
	"uncle",
	"aunt",
	"son-in-law",
	"dauther-in-law",
	"goldfish",
	"lover",
	"lawyer",
	"helper"
    ];

    // List of possible weapons
    var rWeaponList = [
	"bastard sword",
	"dagger",
	"shovel",
	"rifle",
	"magnum",
	"UZI",
	"AK-47"
    ];


    var rStory = []; // Stores the actual story and is returned by GetStoryText

    // Name       : sprintf
    // Parameters : At least 2 parameters are required. 1 as the actual message, and another for the content.
    //              More values have to be added in case of more placeholders.
    // Description: This function replaces placeholders acording to their type. This way it's possible
    //              to format a string the way the user wants it.
    // Disclaimer : This function is (C) 2006 by Naden Badalgogtapeh. The source can be found at
    //              http://www.naden.de/blog/javascript-printf
    function sprintf() {
	if (sprintf.arguments.length < 2) {
	    return;
	}

	var data = sprintf.arguments[0];

	for (var k = 1; k < sprintf.arguments.length; ++k) {

	    switch (typeof (sprintf.arguments[k])) {
	    case 'string':
		data = data.replace(/%s/, sprintf.arguments[k]);
		break;
	    case 'number':
		data = data.replace(/%d/, sprintf.arguments[k]);
		break;
	    case 'boolean':
		data = data.replace(/%b/, sprintf.arguments[k] ? 'true' : 'false');
		break;
	    default:
		/// function | object | undefined
		break;
	    }
	}
	return data;
    }


    // Name       : rRandom
    // Parameters : This function requires 2 parameters:
    //              - aMin (Integer); The lowest possible number
    //              - aMax (Integer); The highest possible number
    // Description: Generates a random number and returning it.
    // Disclaimer : Exchanged this function with a more reliable solution.
    //              The new version is taken from
    //              http://www.naden.de/blog/zufallszahlen-in-javascript-mit-mathrandom
    //              Authors are:
    //              - (C) 2006 by Naden Badalgogtapeh
    //              - (C) 2008 by batzee
    //              - (C) 2012 by MHN
    function rRandom(aMin, aMax) {
	var lMin = Math.floor( parseInt( aMin ) );
	var lMax = Math.floor( parseInt( aMax ) );

	if ( lMin > lMax) {
	    return rRandom( lMax, lMin ); // This is a suggestion from MHN
	}

	if ( lMin == lMax ) {
	    return lMin;
	}

	var lRandomNumber;

	// Prevent that we go over the destined area
	do {
	    lRandomNumber = Math.random();
	}
	while( lRandomNumber == 1.0 );
	// End of prevention

	return lMin + parseInt( lRandomNumber * ( lMax-lMin + 1 ) );
    }


    // Name       : NewStory
    // Parameters : aStoryMode (optional; string) - In case you want
    //              a specific kind of story. Can be ignored otherwise.
    // Description: Creates a plot and builds a story upon the plot.
    //              Uses a random hero and a random villain for this.
    //              The story is stored in the private variable rStory and can
    //              be called by using the GetStoryText-routine
    this.createStory = function ( aStoryMode ) {
	// General information about the story
	var lPlotMode               = rPlotList[ rRandom( 1, rPlotList.length ) - 1 ];
	var lIntro                  = rIntroList[ rRandom( 1, rIntroList.length ) - 1 ];
	var lSubIntro               = rRandom( 1, 99 );
	var lPlotEndMode            = rPlotEndList[ rRandom( 1, rPlotEndList.length ) - 1 ];
	var lHeroID                 = rRandom( 1, rHeroList.length ) - 1;
	var lVillainID              = rRandom( 1, rVillainList.length ) - 1;

	var lKill                   = rKillList[ rRandom( 1, rKillList.length ) - 1 ]; // Plot-End: kill
	var lWeapon                 = rWeaponList[ rRandom( 1, rWeaponList.length ) - 1 ]; // Plot-End: kill_weapon
	var lFlee                   = rFleeList[ rRandom( 1, rFleeList.length ) - 1 ]; // Plot-End: flee
	var lDayMode                = rRandom( 1, rOneDayList.length ) - 1;
	var lFinal                  = rFinalMoment[ rRandom( 1, rFinalMoment.length ) - 1 ];

	var lKidnapWay              = rRandom( 1, rKidnapList.length ) - 1;  // Plot: Kidnap
	var lDestroyWay             = rRandom( 1, rDestroyList.length ) - 1; // Plot: Destroy
	var lWitchWay               = rRandom( 1, rWitchList.length ) - 1;   // Plot: Witch
	var lWitchEnd               = rWitchEndList[ rRandom( 1, rWitchEndList.length ) - 1 ];

	var lObjectID               = rRandom( 1, rDestroyObjectList.length ) - 1; // Plot: Destroy
	var lRelativeID             = rRandom( 1, rRelativeList.length ) - 1;      // Plot: Revenge

	var lHeroGender             = rHeroList[lHeroID].Gender;
	var lHeroAlternateGender;
	var lHeroName               = rHeroList[lHeroID].Name;
	var lHeroArticle            = rHeroList[lHeroID].Article;
	var lHeroMainAdjective      = rHeroMainAdjectiveList[ rRandom( 1, rHeroMainAdjectiveList.length ) - 1 ];
	var lHeroSecondaryAdjective;
	var lHeroSecondary          = rHeroSecondaryAdjectiveList[ rRandom( 1, rHeroSecondaryAdjectiveList.length ) - 1 ];
	var lCheatWord              = rCheatList[ rRandom( 1, rCheatList.length ) - 1 ];

	var lVillainName            = rVillainList[lHeroID].Name;
	var lVillainArticle         = rVillainList[lHeroID].Article;

	if ( aStoryMode == "destroy" )     lPlotMode = "destroy";
	if ( aStoryMode == "kidnap" )      lPlotMode = "kidnap";
	if ( aStoryMode == "mindcontrol" ) lPlotMode = "witch";
	if ( aStoryMode == "revenge" )     lPlotMode = "revenge";


	switch ( lHeroGender ) {
	case "both":
	    lHeroGender = "He";
	    lHeroSecondaryAdjective = lHeroSecondary.Male;
	    if ( rRandom( 1, 100 ) > 50 ) {
		lHeroGender = "She";
		lHeroSecondaryAdjective = lHeroSecondary.Female;
	    }
	    break;
	case "female":
	    lHeroGender = "She";
	    lHeroSecondaryAdjective = lHeroSecondary.Female;
	    break;
	case "male":
	    lHeroGender = "He";
	    lHeroSecondaryAdjective = lHeroSecondary.Male;
	    break;
	}
	lHeroAlternateGender = "his";
	if ( lHeroGender.toLowerCase() == "she" ) lHeroAlternateGender = "her";


	// Preparing the story and the plot
	rStory = [];
	var lPlot = [];
	switch ( lPlotMode ) {
	case "destroy":
	    lPlot.push( "destroy" );
	    if (rRandom(1, 100) >= 50) {
		lPlot.push("cheat");
	    }
	    break;

	case "kidnap":
	    lPlot.push( "kidnap" );
	    if (rRandom(1, 100) >= 50) {
		lPlot.push("cheat");
	    }
	    break;

	case "witch":
	    lPlot.push("witch");
	    lPlot.push("cheat");
	    lPlot.push("entwitch");
	    break;

	case "revenge":
	    lPlot.push( "revenge" );
	    if (rRandom(1, 100) >= 50) {
		lPlot.push("cheat");
	    }
	    break;
	}
	lPlot.push( lPlotEndMode );


	// Adding the intro
	var lPlotLine = sprintf("%s there lived %s %s.", lIntro, lHeroArticle, lHeroName);
	if ( lSubIntro > 33  ) lPlotLine = sprintf("%s there was %s %s %s.", lIntro, lHeroMainAdjective.Article, lHeroMainAdjective.Word, lHeroName );
	if ( lSubIntro > 66  ) lPlotLine = sprintf("%s there was %s %s who was %s.", lIntro, lHeroArticle, lHeroName, lHeroSecondaryAdjective );
	rStory.push( lPlotLine );

	// Adding the rest of the plot
	for (var lIndex = 0; lIndex < lPlot.length; lIndex++) {

	    switch ( lPlot[ lIndex ] ) {
	    case "cheat":
		lPlotLine = sprintf("%s %s the %s.", lHeroGender, lCheatWord, lVillainName);
		if ( rRandom( 1, 100 ) > 50  ) lPlotLine = sprintf("The %s %s the %s.", lHeroName, lCheatWord, lVillainName);
		rStory.push( lPlotLine );
		break;

	    case "destroy":
		lPotLine = sprintf("%s %s %s %s the %s of the %s.", rOneDayList[ lDayMode ], lVillainArticle, lVillainName, rDestroyList[ lDestroyWay ], rDestroyObjectList[ lObjectID ], lHeroName );
		rStory.push( lPlotLine );
		break;

	    case "entwitch":
		lPotLine = sprintf("The %s %s the %s.", lVillainName, lWitchEnd, lHeroName);
		//if ( rRandom( 1, 100 ) > 50  ) lPlotLine = sprintf("%s the %s was %s by %s %s.", rOneDayList[ lDayMode ], lHeroName, rKidnapList[ lKidnapWay ], lVillainArticle, lVillainName);
		rStory.push( lPlotLine );
		break;

	    case "flee":
		lPotLine = sprintf("%s %s %s.", lFinal, lHeroGender.toLowerCase(), lFlee );
		if ( rRandom( 1, 100 ) > 50  ) lPlotLine = sprintf("%s the %s %s.", lFinal, lHeroName, lFlee );
		rStory.push( lPlotLine );
		break;

	    case "kidnap":
		lPotLine = sprintf("%s %s was %s by %s %s.", rOneDayList[ lDayMode ], lHeroGender.toLowerCase(), rKidnapList[ lKidnapWay ], lVillainArticle, lVillainName);
		if ( rRandom( 1, 100 ) > 50  ) lPlotLine = sprintf("%s the %s was %s by %s %s.", rOneDayList[ lDayMode ], lHeroName, rKidnapList[ lKidnapWay ], lVillainArticle, lVillainName);
		rStory.push( lPlotLine );
		break;

	    case "kill":
		lPotLine = sprintf("%s %s %s the %s.", lFinal, lHeroGender.toLowerCase(), lKill, lVillainName );
		if ( rRandom( 1, 100 ) > 50  ) lPlotLine = sprintf("%s the %s %s.", lFinal, lHeroName, lFlee );
		rStory.push( lPlotLine );
		break;

	    case "kill_weapon":
		lPotLine = sprintf("%s %s %s the %s with %s %s.", lFinal, lHeroGender.toLowerCase(), lKill, lVillainName, lHeroAlternateGender, lWeapon );
		rStory.push( lPlotLine );
		break;

	    case "revenge":
		lPotLine = sprintf("%s %s %s %s the %s of the %s.", rOneDayList[ lDayMode ], lVillainArticle, lVillainName, lKill, rRelativeList[ lRelativeID ], lHeroName );
		rStory.push( lPlotLine );
		break;

	    case "witch":
		lPotLine = sprintf("%s %s was %s by %s %s.", rOneDayList[ lDayMode ], lHeroGender.toLowerCase(), rWitchList[ lWitchWay ], lVillainArticle, lVillainName);
		if ( rRandom( 1, 100 ) > 50  ) lPlotLine = sprintf("%s the %s was %s by %s %s.", rOneDayList[ lDayMode ], lHeroName, rWitchList[ lWitchWay ], lVillainArticle, lVillainName);
		rStory.push( lPlotLine );
		break;
	    };
	}
    };

    // Name       : GetStoryText
    // Parameters : None
    // Description: Returns the stored story as an array where each line is an entry
    this.getStoryText = function () {
	return rStory;
    };


    // Name       : AddHero
    // Parameters : This function requires 3 parameters:
    //              - aArticle (string); The article of the hero; Can either be "a", "an", "the"or ""
    //              - aName (string); the nma or job of the hero
    //              - aGender (string); the gender of the hero; Can either be "male", "female" or "both"
    // Description: Adds a new possible hero to the list of heros. The user can define the name/job, the gender and an article
    //              which is to be used with the name.
    this.addHero = function (aArticle, aName) {
	var lArticle = aArticle.toLowerCase();
	var lGender = aGender.toLowerCase();

	rHeroList.push( { Article: lArticle, Name: aName, Gender: lGender } );
    };

    this.createStory(); // Creatinng a story in advance
}
