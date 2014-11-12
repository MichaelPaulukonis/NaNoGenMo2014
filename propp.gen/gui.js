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

// TODO: these all need to be changed for post func8!!!
function cinderella() {
    window.document.myform.func1.checked = true;
    window.document.myform.func8.checked = true;
    window.document.myform.func8a.checked = true;
    window.document.myform.func14.checked = true;
    window.document.myform.func19.checked = true;
    window.document.myform.func23.checked = true;
    window.document.myform.func27.checked = true;
    window.document.myform.func31.checked = true;
}

function hansel(){
    window.document.myform.func6.checked = true;
    window.document.myform.func7.checked = true;
    window.document.myform.func8.checked = true;
    window.document.myform.func8a.checked = true;
    window.document.myform.func16.checked = true;
    window.document.myform.func18.checked = true;
    window.document.myform.func20.checked = true;
}

function swhite(){
    window.document.myform.func1.checked = true;
    window.document.myform.func5.checked = true;
    window.document.myform.func6.checked = true;
    window.document.myform.func7.checked = true;
    window.document.myform.func11.checked = true;
    window.document.myform.func21.checked = true;
    window.document.myform.func30.checked = true;
    window.document.myform.func31.checked = true;
}

function lrrh(){
    window.document.myform.func4.checked = true;
    window.document.myform.func5.checked = true;
    window.document.myform.func6.checked = true;
    window.document.myform.func7.checked = true;
    window.document.myform.func8.checked = true;
    window.document.myform.func9.checked = true;
    window.document.myform.func10.checked = true;
    window.document.myform.func16.checked = true;
    window.document.myform.func18.checked = true;
}

function juniper(){
    window.document.myform.func6.checked = true;
    window.document.myform.func7.checked = true;
    window.document.myform.func8.checked = true;
    window.document.myform.func11.checked = true;
    window.document.myform.func12.checked = true;
    window.document.myform.func13.checked = true;
    window.document.myform.func14.checked = true;
    window.document.myform.func20.checked = true;
    window.document.myform.func30.checked = true;
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
    proppFunctions = resetProppFunctions(proppFunctions);
    for (var index in proppFunctions) {
	proppFunctions[index].active = window.document.myform[index].checked;
    }

    var herog = $('input[name=herogender][type=radio]:checked').val();
    var villaing = $('input[name=villaingender][type=radio]:checked').val();
    var peopleg = $('input[name=peoplegender][type=radio]:checked').val();

    proppFunctions = storyGen.enforceRules(proppFunctions);
    pushSettingsToGui(proppFunctions);

    return {
        herogender: herog,
        villaingender: villaing,
        peoplegender: peopleg,
        functions: proppFunctions
    };

};

var shoveToGui = function(tale) {

    window.document.myform.output.value = tale;

};

var guiGet = function() {

    var settings = getFunctionsFromGui();

    var selectedTheme = $('input[name=theme][type=radio]:checked').val();

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
            bank: defaultbank,
            templates: nTemplates
        };
        break;

        case 'original':
        theme = {
            bank: defaultbank, // although it won't be used...
            templates: defaultTemplates
        };
    };

    var tale = generate(settings, theme);
    shoveToGui(tale);
};

$('#selectall').click(function() {
    var funcs = $('input[type=checkbox]');
    funcs.each(function(index, element) {
        $(element).prop('checked', true);
    });
});
