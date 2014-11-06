// ganked from https://raw.githubusercontent.com/dariusk/ao3

// var gim = require('google-images');
// var exec = require('child_process').exec;
// var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var _ = require('underscore');
_.mixin( require('underscore.deferred') );
var inflection = require('inflection');
// var Twit = require('twit');
// var T = new Twit(require('./config.js'));
// var wordfilter = require('wordfilter');
var ent = require('ent');

var debug = false;

Array.prototype.pick = function() {
    return this[Math.floor(Math.random()*this.length)];
};

Array.prototype.pickRemove = function() {
    var index = Math.floor(Math.random()*this.length);
    return this.splice(index,1)[0];
};

function generate() {
    var dfd = new _.Deferred();
    var urls = [
	'http://archiveofourown.org/tags/Mythical%20Beings%20*a*%20Creatures/works',
	'http://archiveofourown.org/tags/Harry%20Potter%20-%20J*d*%20K*d*%20Rowling/works',
	'http://archiveofourown.org/tags/Sherlock%20Holmes%20*a*%20Related%20Fandoms/works',
	'http://archiveofourown.org/tags/Lost/works',
	'http://archiveofourown.org/tags/Scandal%20(TV)/works',
	'http://archiveofourown.org/tags/Marvel/works',
	'http://archiveofourown.org/tags/One%20Direction%20(Band)/works',
	'http://archiveofourown.org/tags/DCU/works',
	'http://archiveofourown.org/tags/Supernatural/works',
	'http://archiveofourown.org/tags/Dragon%20Age%20-%20All%20Media%20Types/works',
	'http://archiveofourown.org/tags/Final%20Fantasy/works',
	'http://archiveofourown.org/tags/Mass%20Effect/works',
	'http://archiveofourown.org/tags/Star%20Wars%20-%20All%20Media%20Types/works',
	'http://archiveofourown.org/tags/Teen%20Wolf%20(TV)/works',
	'http://archiveofourown.org/tags/Star%20Trek:%20The%20Original%20Series/works',
	'http://archiveofourown.org/tags/Star%20Trek:%20The%20Next%20Generation/works',
	'http://archiveofourown.org/tags/Game%20of%20Thrones%20(TV)/works',
	'http://archiveofourown.org/tags/Doctor%20Who%20*a*%20Related%20Fandoms/works',
	'http://archiveofourown.org/tags/The%20Lord%20of%20the%20Rings%20(Movies)/works',
	'http://archiveofourown.org/tags/Battlestar%20Galactica%20(2003)/works',
	'http://archiveofourown.org/tags/Buffy%20the%20Vampire%20Slayer/works',
	'http://archiveofourown.org/tags/Friday%20Night%20Lights/works',
	'http://archiveofourown.org/tags/The%20X-Files/works',
	'http://archiveofourown.org/tags/due%20South/works',
	'http://archiveofourown.org/tags/Community%20(TV)/works',
	'http://archiveofourown.org/tags/Gilmore%20Girls/works',
	'http://archiveofourown.org/tags/Once%20Upon%20a%20Time%20(TV)/works',
	'http://archiveofourown.org/tags/Parks%20and%20Recreation/works',
	'http://archiveofourown.org/tags/Sailor%20Moon%20-%20All%20Media%20Types/works',
	'http://archiveofourown.org/tags/Vampire%20Diaries%20(TV)/works',
	'http://archiveofourown.org/tags/Veronica%20Mars%20(TV)/works',
	'http://archiveofourown.org/tags/Twilight%20Series%20-%20All%20Media%20Types/works',
	'http://archiveofourown.org/tags/The%20West%20Wing/works',
	'http://archiveofourown.org/tags/Xena:%20Warrior%20Princess/works'
    ];

    var result = [],
	resultCount = 0;
    _.each(urls, function (url) {
	request(url, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
		var $ = cheerio.load(body);
		// parse stuff and resolve
		var fandom = $('h2.heading > a').text();
		fandom = fandom.replace(/[\-\(\:\&\|].*$/,'');
		// "DCU" gets you a toy line, "DC" gets better results
		if (fandom === 'DCU') {
		    fandom = 'DC';
		}
		//        console.log(fandom);
		var names = $('#tag_category_character > ul > li').map(function(ind, el) { return($(el).text().replace(/\(.*\)/,'').trim())});
		names = _.map(names, function(name) {
		    return {
			name: name,
			fandom: fandom
		    };
		});
		result.push(names);
		resultCount++;

		result = _.flatten(result);
		var first = result.pick();
		var second = result.pick();

		var myTweet = first.name + ' (' + first.fandom + ') and ' + second.name + ' (' + second.fandom + ')';// + ' in ' + settings.pick();
		console.log(myTweet);


		// if we've gathered all the results
		// if (result.length === urls.length) {
		//     // Grab potential settings from twitter
		//     _.when(
		// 	search('"wish I was in"'),
		// 	search('"pretend we\'re in"')
		//     )
		// 	.done(function() {
		// 	    var res = _.flatten(arguments);
		// 	    console.log(res);
		// 	    var settings = _.chain(res)
		// 		    .map(function(el) {
		// 			return inflection.titleize(el.replace(/(\.|,|!|\?).*/,'').trim());
		// 		    })
		// 		    .reject(function(el) {
		// 			return el.match(/\si\s/i) !== null || el.length > 25 || el.length <= 2;
		// 		    })
		// 		    .value();
		// 	    //console.log(settings);

		// 	    result = _.flatten(result);
		// 	    var first = result.pick();
		// 	    var second = result.pick();

		// 	    var myTweet = first.name + ' and ' + second.name + ' in ' + settings.pick();
		// 	    console.log(myTweet);



		// 	});
		// }
	    }
	    else {
		dfd.reject();
	    }
	});
    });
    return dfd.promise();
}

function search(term) {
    var dfd = new _.Deferred();
    T.get('search/tweets', { q: term, count: 100 }, function(err, reply) {
	var tweets = reply.statuses;
	tweets = _.chain(tweets)
	    .map(function(el) {
		if (el.retweeted_status) {
		    return ent.decode(el.retweeted_status.text);
		}
		else {
		    return ent.decode(el.text);
		}
	    })
	    .map(function(el) {
		var reg = new RegExp('.*'+term.replace(/"/g,''),'i');
		return el.replace(reg,'');
	    })
	    .reject(function(el) {
		// filtering out substring of "Antarctica" because of a stupid song lyric
		return (el.indexOf('#') > -1 || el.indexOf('http') > -1 || el.indexOf('@') > -1 || el.indexOf('"') > -1 || el.indexOf(':') > -1 || el.toLowerCase().indexOf('antar') > -1);
	    })
	    .uniq()
	    .value();
	dfd.resolve(tweets);
    });
    return dfd.promise();
}


// tweet once, this is meant to be run on a cron job
generate();
