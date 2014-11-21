var first = require('./firstnames.js').firstnames;
var last = require('./lastnames.js').lastnames;
var fs = require('fs');
var path = require('path');
var tmp = require('tmp');

// TODO: create a new person
// they enter a room
// they say hello: everybody there says hello in return (we track people inside).
// new personal asks how to get out
// there is no way out, they say in return
// lather rinse repeat.

// function for new person

// array to hold existing people


var people = [];

// generates a random number, up to BUT NOT INCLUDING limit
// so, use like random(array.length)
var random = function(limit){
    var num = Math.floor(Math.random() * limit);
    return num;
};

var select = function() {
    return pick(arguments);
};


var pick = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};

// doesn't work with initial punctuation.....
var capitalize = function(str) {
    // how about regex on start of each line w/in the string????
    if (!str) return null;
    return str.replace(/^[a-z]/mg, function(m) { return m.toUpperCase(); });
    return str.slice(0,1).toUpperCase() + str.slice(1);
};



var newPerson = function() {

    return first[random(first.length)] + ' ' + last[random(last.length)];

};

var entrance = function(person) {

    var t = [];

    // TODO: some variety, here.
    t.push('{{NP}} enters a featureless white room, filled with beige chairs and soft, ambient lighting, and quickly discovers the door has disappeared.');

    t.push('"Hello, my name is {{NP}}", says {{NP}}. "I\m pretty sure I\m not supposed to be here; how do I get back out?"');

    return t.join('\n\n').replace(/{{NP}}/mg, person);


};

var greets = function(people, newperson) {

    var t = [];

    for (var i = 0; i < people.length; i++) {

        var says = select('says', 'responds', 'answers', 'deadpans', 'notes', 'replies');
        var hello = select('Hello', 'Welcome' ,'Greetings');

        var so = select('{{SAYS}} {{OP}}', '{{OP}} {{SAYS}}');

        var templates = [
            '"{{GRT}}, {{NP}}," ' + so + '. "There is no exit."',
            '"There is no exit, {{NP}}," ' + so + '. "Not that I know of. Oh, and {{GRT}}."',
            '"{{GRT}}, {{NP}}," ' + so + '. "There is no exit, not that I know of."',
            '"Not likely," ' + so + '. "I\'ve never found one. {{GRT}}, by the way."'
        ];

        t.push(pick(templates).replace(/{{OP}}/mg, people[i]).replace(/{{GRT}}/mg, hello).replace(/{{SAYS}}/mg, says));
    }

    return t.join('\n\n').replace(/{{NP}}/mg, newperson);

};

// http://stackoverflow.com/questions/18679576/counting-words-in-string
var wordcount = function(s) {

    s = s.replace(/(^\s*)|(\s*$)/gi,"");//exclude  start and end white-space
    s = s.replace(/[ ]{2,}/gi," ");//2 or more space to 1
    s = s.replace(/\n /,"\n"); // exclude newline with a start spacing
    return s.split(' ').length;

};


var text = function() {

    var wc = 0;
    var n = [];

    var person = newPerson();

    var t = [];
    t.push('{{NP}} enters a featureless white room, filled with beige chairs and soft, ambient lighting, and quickly discovers the door has disappeared.');
    t.push('{{NP}} looks around for few minutes, find nobody, and sits down.');

    n.push(t.join('\n\n').replace(/{{NP}}/mg, person));

    people.push(person);

    while (wc < 50000) {

        // n time passes
        // lights flicker.

        var e = [];

        person = newPerson();

        e.push(entrance(person));

        e.push(greets(people, person));

        people.push(person);

        wc = wc + wordcount(e.join('\n\n')); // we skip the opening words, but what they hey.

        n.push(e);

    }

    // TODO: last person sits down, and waits. or something.


    return n.join('\n\n');

};

var writeitout = function(text) {

    var fn = 'no.exit.' + (Math.random() * 0x1000000000).toString(36) + '.txt';

    fs.writeFile(fn, text);

    console.log('\n\nWritten to ' + fn);

};


var novel = text();

writeitout(novel);
