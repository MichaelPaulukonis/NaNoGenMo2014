var gui = function() {

    // TODO: these are information popups
    // grab the information from the original, or rewrite
    var popup = function(url) {
        window.open(url+".html", "win", "toolbar=0,location=0,directories=0,status=0,menubar=1,scrollbars=1,resizable=1,width=300,height=300");
    };

    var popup2 = function(url) {
        window.open(url+".html", "win", "toolbar=0,location=0,directories=0,status=0,menubar=1,scrollbars=1,resizable=1,width=350,height=400");
    };

    return {
        popup: popup,
        popup2: popup2
    };

}();

// TODO: we don't need a global anymore....
var preset = function(presets) {

    // reset should not be global.
    var propp = resetProppFunctions();

    for (var i = 0; i < presets.length; i++) {
        propp[presets[i]].active = true;
    }

    return propp;
};

// make this part of propp.js
// also... need a randomizer
// although... that's not really a preset...
var presets = {

    cinderella: ['func1', 'func8', 'func8a', 'func14', 'func19', 'func23', 'func27', 'func31'],
    hansel: ['func6', 'func7', 'func8', 'func8a', 'func16', 'func18', 'func20'],
    swhite: ['func1', 'func5', 'func6', 'func7', 'func11', 'func21', 'func30', 'func31'],
    lrrh: ['func4', 'func5', 'func6', 'func7', 'func8', 'func9', 'func10', 'func16', 'func18'],
    juniper:  ['func6', 'func7', 'func8', 'func11', 'func12', 'func13', 'func14', 'func20', 'func30'],
    barebones: ['func0', 'func8', 'func14', 'func16', 'func18', 'func30', 'func31']

};

function cinderella() {
    proppFunctions = preset(presets.cinderella);
    pushSettingsToGui(proppFunctions);
}

function hansel(){
    proppFunctions = preset(presets.hansel);
    pushSettingsToGui(proppFunctions);
}

function swhite(){
    proppFunctions = preset(presets.swhite);
    pushSettingsToGui(proppFunctions);
}

function lrrh(){
    proppFunctions = preset(presets.lrrh);
    pushSettingsToGui(proppFunctions);
}

function juniper(){
    proppFunctions = preset(presets.juniper);
    pushSettingsToGui(proppFunctions);
}

function barebones() {
    var story = preset(presets.barebones);
    pushSettingsToGui(story);
}

var pushSettingsToGui = function(proppFunctions) {

    for (var index in proppFunctions) {
        window.document.myform[index].checked = proppFunctions[index].active;
    }

    // set the radios
    // http://stackoverflow.com/questions/871063/how-to-set-radio-option-checked-onload-with-jquery

};


var getFunctionsFromGui = function() {

    // proppFunctions is defined in propp.js
    // this is an external dependency to the GUI
    // to the extant that without that file, the GUI has no purpose
    // propp.js should be able to function w/o the GUI, however...
    var funcs = resetProppFunctions();
    var f = [];
    for (var index in funcs) {
        funcs[index].active = window.document.myform[index].checked;
    }

    var herog = $('input[name=herogender][type=radio]:checked').val();
    var villaing = $('input[name=villaingender][type=radio]:checked').val();
    var peopleg = $('input[name=peoplegender][type=radio]:checked').val();
    var bossmode = window.document.myform.bossmode.checked;

    // TOO LATE - not in the array, which has to be in order. DANG.
    // funcs = storyGen.enforceRules(funcs);
    pushSettingsToGui(funcs);

    // this is awkward....
    for (index in funcs) {
        if (window.document.myform[index].checked) { f.push(index); }
    }

    return {
        herogender: herog,
        villaingender: villaing,
        peoplegender: peopleg,
        functions: funcs,   // object with [funcn].active
        funcs: f,           // array-based list
        bossmode: bossmode
    };

};

var shoveToGui = function(tale) {

    window.document.myform.output.value = tale.title + '\n\n' + tale.tale;

};

var guiGet = function() {

    var settings = getFunctionsFromGui();

    var selectedTheme = $('input[name=theme][type=radio]:checked').val();
    settings.verbtense = $('input[name=tense][type=radio]:checked').val();

    var theme = {};
    switch(selectedTheme) {
    case 'office':
        theme = {
            bank: businessbank,
            templates: businessTemplates
        };
        break;

    case 'test':
        theme = {
            bank: defaultbank(words),
            templates: nTemplates
        };
        break;

    case 'original':
        theme = {
            bank: defaultbank(words), // although it won't be used...
            templates: defaultTemplates
        };
    };

    // STILL EXPECTS THE story['funcn'].active stuff to be present. OUTCH
    // WHY ARE WE PASSING THE SETTINGS IN TWICE ?!?!!?!
    var sg = new storyGen(settings);
    var tale = sg.generate(settings, theme);

    shoveToGui(tale);
};

$('#selectall').click(function() {
    var funcs = $('input[type=checkbox]');
    funcs.each(function(index, element) {
        $(element).prop('checked', true);
    });
});
