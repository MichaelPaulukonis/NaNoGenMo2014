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


function cinderella() {
    window.document.myform.func1.checked = true;
    window.document.myform.func8.checked = true;
    window.document.myform.func9.checked = true;
    window.document.myform.func15.checked = true;
    window.document.myform.func20.checked = true;
    window.document.myform.func24.checked = true;
    window.document.myform.func28.checked = true;
    window.document.myform.func32.checked = true;
}

function hansel(){
    window.document.myform.func6.checked = true;
    window.document.myform.func7.checked = true;
    window.document.myform.func8.checked = true;
    window.document.myform.func9.checked = true;
    window.document.myform.func17.checked = true;
    window.document.myform.func19.checked = true;
    window.document.myform.func21.checked = true;
}

function swhite(){
    window.document.myform.func1.checked = true;
    window.document.myform.func5.checked = true;
    window.document.myform.func6.checked = true;
    window.document.myform.func7.checked = true;
    window.document.myform.func12.checked = true;
    window.document.myform.func22.checked = true;
    window.document.myform.func31.checked = true;
    window.document.myform.func32.checked = true;
}

function lrrh(){
    window.document.myform.func4.checked = true;
    window.document.myform.func5.checked = true;
    window.document.myform.func6.checked = true;
    window.document.myform.func7.checked = true;
    window.document.myform.func8.checked = true;
    window.document.myform.func10.checked = true;
    window.document.myform.func11.checked = true;
    window.document.myform.func17.checked = true;
    window.document.myform.func19.checked = true;
}

function juniper(){
    window.document.myform.func6.checked = true;
    window.document.myform.func7.checked = true;
    window.document.myform.func8.checked = true;
    window.document.myform.func12.checked = true;
    window.document.myform.func13.checked = true;
    window.document.myform.func14.checked = true;
    window.document.myform.func15.checked = true;
    window.document.myform.func21.checked = true;
    window.document.myform.func31.checked = true;
}



var getFunctionsFromGui = function() {

    for (var index in proppFunctions) {
        if (index === 'func0') continue;
	proppFunctions[index].active = window.document.myform[index].checked;
    }

    var g = $('input[type=radio]:checked').val();

    fairyTaleGen.settings.gender = g;
    fairyTaleGen.proppFunctions = proppFunctions;

};

var shoveToGui = function(tale) {

    window.document.myform.fairytale.value = tale;

};

var guiGet = function() {
    var tale = generate();
    shoveToGui(tale);
};
