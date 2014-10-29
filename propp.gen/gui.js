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


var getFunctionsFromGui = function() {

    for (var index in proppFunctions) {
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
