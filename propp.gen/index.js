// var defaultTemplates = require('./default.templates.js');
var templates = require('./templates.js');
var words = require('./words.js');
// words is a requirement for wordbank.....
var wordbank = require('./wordbank.test.js')(words);
var storygen = require('./propp.js');

var world = storygen().world;

try {

    var text = [];

    var setts = {
        herogender: 'random',
        villaingender: 'random',
        peoplegender: 'random',
        functions: world.resetProppFunctions(),
        funcs: ['func0', 'func2', 'func3', ['func8', 'commits murder'], 'func30', 'func31'],
        // funcs: [['func8', 'casting into body of water'], 'func30'],
        bossmode: true,
        verbtense: 'past'
        // narrator: _.deepClone(narrator),
        // swap them on some key?
        // unswapped, the hero gets killled
        // which should shake them up a bit....
        // TODO: cache.characters not populated in this situation
        // fix inside of init()
        // what I don't get is WHY IT WORKED FOR A WHILE
        // hero: _.deepClone(god.hero),
        // villain: _.deepClone(god.villain),
        // characters: _.deepClone(god.cache.characters) // needed for hero and villain
    };

    // OH FOR CRYING IN THE BEER
    // setts.functions['func0'].active = true;
    // setts.functions['func2'].active = true; // _.deepClone is not accessible yet. blarg.
    // setts.functions['func8'].active = true;
    // setts.functions['func30'].active = true;

    var theme = {
        bank: wordbank,
        templates: templates
    };


    var sg = new storygen(setts);

    // console.log(sg);

    var tale = sg.generate(setts, theme);

    console.log(tale);

} catch(ex) {
    // the last 3 items are non-standard.....
    var msg = ex.name + ' : ' + ex.message;
    if (ex.lineNumber && ex.columnNumber && ex.stack) {
        msg += ' line: ' + ex.lineNumber + ' col: ' + ex.columnNumber + '\n'
            + ex.stack;
    }
    console.log(msg);
}
