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
    var propp = storyGen.resetProppFunctions(false); // ARGH these are all now true!

    for (var i = 0; i < presets.functions.length; i++) {
        propp[presets.functions[i]].active = true;
    }

    return propp;
};


var pushPreset = function(setname) {
    if (!storyGen.presets[setname]) { return; }

    var story = preset(storyGen.presets[setname]);
    pushSettingsToGui(story);

};

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
    var funcs = storyGen.resetProppFunctions();
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

    window.document.myform.output.value = tale.title.toUpperCase() + '\n\n' + tale.tale;

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

// TODO: use the preset when generating
// no, when selected update the gui....
// and then get rid of the other links
$(document).ready(function() {

    var inp = $('#presets');
    var ps = storyGen.presets;
    $.each(ps, function(key) {
        inp.append($('<option />').val(key).text(key));
    });

});
