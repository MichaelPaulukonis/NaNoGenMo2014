var nTemplates = function(story, world, storyGen) {

    var tersely = true;

    var blankLine = '';

    story = story || [];

    // sub-functions
    // hunh. template only, I would think.....
    var func8 = {
        '1'   : 'kidnapping of person',
        '2'   : 'seizure of magical agent or helper',
        '2b'  : 'forcible seizure of magical helper',
        '3'   : 'pillaging or ruining of crops',
        '4'   : 'theft of daylight',
        '5'   : 'plundering in other forms',
        '6'   : 'bodily injury, maiming, mutilation',
        '7'   : 'causes sudden disappearance',
        '7b'  : 'bride is forgotten',
        '8'   : 'demand for delivery or enticement, abduction',
        '9'   : 'expulsion',
        '10'  : 'casting into body of water',
        '11'  : 'casting of a spell, transformation',
        '12'  : 'false substitution',
        '13'  : 'issues order to kill [requires proof]',
        '14'  : 'commits murder',
        '15'  : 'imprisonment, detention',
        '16'  : 'threat of forced matrimony',
        '16b' : 'threat of forced matrimony between relatives',
        '17'  : 'threat of cannibalism',
        '17b' : 'threat of cannibalism among relatives',
        '18'  : 'tormenting at night (visitaion, vampirism)',
        '19'  : 'declaration of war'
    };

    story.title = function(god) {

        var subject = god.hero;
        var villForm;
        if (god.hero.healthLevel === world.healthLevel.dead && god.villain.healthLevel === world.healthLevel.alive) {
            subject = god.villain;
        } else if (god.villain.form !== 'human') {
            villForm = god.villain.form;
        }

        var tale = god.select('story', 'tale', 'narrative');
        var sn = god.select(subject.name, subject.nickname);
        var pron = god.pronoun(subject);
        var poss = god.possessive(subject);

        var templates = [
            'The {{TL}} of {{SN}} and {{POSS}} adventures',
            '{{SN}} of <%= hero.home.nation %>',
            'A certain {{SN}} and what {{PRON}} did' + (god.coinflip() ? ' in <%= hero.home.nation %>' : ''),
            (villForm ? 'The {{VF}} ' : '') + '{{VN}} and what happened to <%= pronounobject(villain) %>',
            'The {{TL}} of {{HN}} and ' + (villForm ? 'the {{VF}} ' : '') + '{{VN}}'
        ];

        var t = god.pick(templates);

        return t.replace(/{{TL}}/mg, tale).replace(/{{PRON}}/mg, pron).replace(/{{POSS}}/mg, poss).replace(/{{SN}}/mg, sn).replace(/{{VF}}/mg, villForm);

    };

    story.introduceHero = function(god, terse) {

        var near = god.select("in", "near", "close to", "not far from", "just on the verge of", "within a days walk of");
        var nationType = god.select("country", "province", "kingdom", "nation", "city-state") ;
        var res = '<%= hero.home.residence %>';
        var vicin = '<%= hero.home.vicinity %>';
        var hn = '<%= coinflip() ? hero.name : hero.nickname %>';
        var mw = (god.hero.gender === world.gender.male ? 'man' : 'woman');

        var templates = [
            'in a certain {{RES}} lived {{HN}}. ',
            'a certain {{MW}} was very <%= pick(hero.description) %>. ' + (god.coinflip() ? '<%= capitalize(possessive(hero)) %> name {{was}} {{HN}}.' : '{{HN}} <%= possessive(hero) %> name {{was}}.'),
            'there was once an old {{RES}} that stood in the middle of a deep gloomy {{VCN}}, and in the {{RES}} lived {{HN}}.',
            '{{HN}} {{lived}} in a {{RES}} {{NEAR}} {{VCN}} in the {{NT}} <%= hero.home.nation %>. ',
            'in the distant {{NT}} of <%= hero.home.nation %>, {{HN}} {{lived}} in a {{RES}} {{NEAR}} {{VCN}}. ',
            '{{NEAR}} {{VCN}} in the {{NT}} of <%= hero.home.nation %>, there {{was}} a {{RES}} where {{HN}} {{lived}}.'
        ];

        var t = [];

        if (terse) {
            t.push(god.pick(templates).replace('{{NT}}', nationType).replace('{{NEAR}}', near));
        } else {

            t.push((god.coinflip() ? story.intro(god) + ' ' : '' ) + god.pick(templates).replace('{{NT}}', nationType).replace('{{NEAR}}', near));
            // TODO: list regular name or nickname at random
            t.push(blankLine, '<%= hero.name %> {{lived}} with <%= list(hero.family, "nickname") %>.');
            if (god.hero.acquaintances.length > 0) {
                if (god.hero.acquaintances.length > 1) {
                    t.push(blankLine, '<%= list(hero.acquaintances, "nickname") %> {{were}} <%= select("friends of", "known to") %> <%= hero.name %>.');
                } else {
                    t.push(blankLine, '<%= list(hero.acquaintances, "nickname") %> {{was}} <%= select("a friend of", "known to") %> <%= hero.name %>.');
                }
            }
        }

        god.hero.introduced = true;

        return t.join('\n').replace(/{{RES}}/gm, res).replace(/{{VCN}}/mg, vicin).replace(/{{HN}}/mg, hn).replace(/{{MW}}/mg, mw);

};

    // shouldn't this be back in the god() function?
    story.createVictim = function(god) {

        var victim = god.getCharacter(god.pick(god.hero.family.concat(god.hero.acquaintances)));
        god.cache.victim = victim;
        return victim;

    };

    story.journey = function(p1, destination) {

        // walk, run, ramble, travel
        // time-period
        // random amount
        // random sights?

        // Next day Petrusha set off on his visit to the Devil. He walked and
        // walked, for three whole days did he walk, and then he reached a great
        // forest, dark and dense - impossible even to see the sky from within it!
        // And in that forest there stood a rich palace. Well, he entered the
        // palace, and a fair maiden caught sight of him. She had been stolen
        // from a certain village by the evil spirit. And when she caught sight
        // of him she cried:

        // So the girl went away, and walked and walked, till she came
        // to the place. There stood a hut, and in it sat weaving the
        // Baba Yaga, the Bony-shanks.


        // So Vasilissa got ready, put her doll in her pocket, crossed
        // herself, and went out into the thick forest.

        // As she walks she trembles. Suddenly a horseman gallops by. He is
        // white, and he is dressed in white, under him is a white horse, and
        // the trappings of the horse are white - and the day begins to break.

        // She goes a little further, and a second rider gallops by. He is
        // red, dressed in red, and sitting on a red horse - and the sun rises.

        // Vasilissa went on walking all night and all next day. It was only
        // towards the evening that she reached the clearing on which stood
        // the dwelling of the Baba Yaga. The fence around it was made of dead
        // men's bones; on the top of the fence were stuck human skulls with
        // eyes in them; instead of uprights at the gates [Pg 162] were men's
        // legs; instead of bolts were arms; instead of a lock was a mouth
        // with sharp teeth.

        // Vasilissa was frightened out of her wits, and stood still as if
        // rooted to the ground.

        // Suddenly there rode past another horseman. He was black, dressed
        // all in black, and on a black horse. He galloped up to the Baba
        // Yaga's gate and disappeared, just as if he had sunk through the
        // ground - and night fell. But the darkness did not last long. The eyes
        // of all the skulls on the fence began to shine and the whole
        // clearing became as bright as if it had been midday. Vasilissa
        // shuddered with fear, but stopped where she was, not knowing which
        // way to run.

        // Once upon a time there was a smith. "Well now," says he, "I've
        // never set eyes on any harm. They say there's evil (likho)[225] in
        // the world. I'll go and seek me out evil." So he went and had a
        // goodish drink, and then started in search of evil.

        var text = [];
        var prn = god.pronoun(p1);

        var templates = [
            'So he went and had a goodish drink, and then started in search of evil.'
        ];

        return text.join('\n\n'); // or something like that. need to improve paragraphization

    };

    story.introduceVillain = function(god) {

        // A certain woman was very bumptious.
        // There once was a rich merchant named Marko - a stingier fellow never lived!

        // Koshchei is merely one of the many incarnations of the dark spirit
        // which takes so many monstrous shapes in the folk-tales of the class
        // with which we are now dealing. Sometimes he is described as altogether
        // serpent-like in form; sometimes he seems to be of a mixed nature,
        // partly human and partly ophidian, but in some of the stories he is
        // apparently framed after the fashion of a man. His name is by some
        // mythologists derived from kost, a bone whence comes a verb signifying
        // to become ossified, petrified, or frozen; either because he is bony of
        // limb, or because he produces an effect akin to freezing or
        // petrifaction.


        // from springhole.arabian.nights.gen.htm
        // "With nothing else to do"
        // "One day in <place>"
        // "One evening in <place>"
        // "One morning in <place>"
        // "One night in <place>"


        var time = god.select('one morning', 'one evening', 'one night', 'one day', 'in the middle of the night', 'when nobody {{was}} paying attention', 'after breakfast', 'around lunchtime');
        var person = god.select('person', 'individual');
        if (god.villain.form != 'human') {
            person = god.villain.form;
        }

        person = god.pick(god.villain.description) + ' ' + person;

        var A = '{{came}} into the region of <%= hero.home.vicinity %>';
        var B = 'a <%= coinflip() ? "very " : "" %>{{PP}} known as {{VN}}';
        var hh = '<%= hero.home.vicinity %>';

        // the villainy of the person is not..... AWESOME... but it will do for now.
        var templates = [
            time + ' in {{HH}}, {{B}} {{strides}} in.',
            time + ', there {{A}} {{B}}.',
            'There {{A}} {{B}}.',
            '{{B}} {{A}}.',
            '{{B}} {{A}} {{TIME}}.',
            '{{VN}}, a {{PP}}, {{paid}} a visit to {{HH}}.',
            '{{HH}} {{plays}} host to a {{PP}}, {{VN}}' + (god.coinflip() ? ' ' + time: '') + '.'
        ];

        god.villain.introduced = true;

        return god.pick(templates).replace(/{{HH}}/mg, hh).replace(/{{B}}/mg, B).replace(/{{A}}/mg, A).replace(/{{TIME}}/mg, time).replace(/{{PP}}/mg, person);

    };

    story.deathResponse = function(god, person) {
        var name = god.coinflip() ? person.name : person.nickname;
        var t = [];

        // Remember what his name was.
        // Long may he be remembered.
        // Not too many took notice, but those few were hard-pressed to save their tears for another day.

        var templates = [
            'It happens to everyone eventually. It {{happened}} to ' + god.pronounobject(person) + ' sooner.',
            'These things happen. ' + (god.coinflip() ? 'Unfortunately.' : 'It is unfortunate.'),
            'When G-d calls one home, there is never room for argument.',
            'It was done.'
        ];
        t.push(god.pick(templates));

        // there was no|little solace to their grief.`
        if (god.coinflip()) { t.push('There {{was}} much wailing in ' + god.hero.home.vicinity + '.'); }

        return t.join(' ');

    };

    // embedded stories
    // too much is hard-coded here, and should be passed-it, instead.
    story.subtale = function(narrator, god) {

        var text = [];

        var setts = {
            herogender: 'male',
            villaingender: 'male',
            peoplegender: 'male',
            functions: storyGen().resetProppFunctions(),
            // funcs: ['func0', ['func8', 'casting into body of water']],
            funcs: [['func8', 'casting into body of water'], 'func30'],
            bossmode: true,
            verbtense: 'present',
            narrator: storyGen().deepClone(narrator),
            // swap them on some key?
            // unswapped, the hero gets killled
            // which should shake them up a bit....
            // TODO: cache.characters not populated in this situation
            // fix inside of init()
            // what I don't get is WHY IT WORKED FOR A WHILE
            hero: storyGen().deepClone(god.hero),
            villain: storyGen().deepClone(god.villain),
            characters: storyGen().deepClone(god.cache.characters) // needed for hero and villain
        };

        // OH FOR CRYING IN THE BEER
        // setts.functions['func0'].active = true;
        setts.functions['func8'].active = true;
        setts.functions['func30'].active = true;

        // TODO: need to re-use, or get access to everything
        // UGH UGH UGH
        // NO GLOBALS!!!!!
        // var theme = {
        //     bank: defaultbank(), // TROUBLE TROUBLE
        //     templates: nTemplates
        // };

        // TODO: pass in the narrator, hero, and villain (and other situations, items, etc)
        // like.... a magical item. or a violated interdiction that goes disastrously
        // except, interdictions are ALWAYS violated.....
        var sg = new storyGen(setts);
        var tale = sg.generate(setts, god.theme);

        // TODO: indent every line in the inner-story.
        // SOMEHOW
        // NOT GOOD ENOUGH - doesn't respect word-boundaries.
        // need something more complicated
        // respect word-boundaries (incl. punc)
        // David lives with Nathan the Love-lorn, Sullen Ethan, Clean James, Joyous Tyl
        // er, Interesting Christopher, Brandon the Steady, Prudent Samuel, Dylan the D
        // elightful, and Dainty Benjamin.

        // initial space should be deleted:
        // Whether you believe it or not, this is what happened, for what I tell you is
        //  true.
        // tale = tale.replace(/(.{1,76})/mg, '$1\n');
        // tale = tale.replace(/^/mg, '    ');
        // text.push(world.blankLine, tale);

        return tale;

    };

    story.createLack = function(god) {

        // TODO: need to have verbs/object set apart, so we can resolve this....
        // TODO: need there to be a lack THING, then there can be additional things to say.
        var lacks = ['{{needs}} a bride, a friend, or just somebody to talk to.',
                     '{{needs}} a helper or magical agent.',
                     '{{needs}} a wondrous object or two. Possibly three. No more than that. Unless they {{were}} collectible?',
                     '{{needs}} a egg of death or love. Either would do.',
                     '{{needs}} money or means of existence. Times {{were}} tough.',
                     '{{had}} lacks in other forms. Tsk tsk. Those lacks.'
                    ];

        var l = god.pick(lacks);
        var p = god.pick(god.hero.family); // argh, this ain't gonna work...
        var lack = {
            lack: l,
            person: p
        };

        god.cache.lack = lack;

        return lack;

    };

    story.punish = function(god, person) {

        var descr = god.pick(person.description);

        var eitherName = function(p) {
            if (p.form && p.form != 'human') {
                return god.select(p.nickname, p.name, 'the ' + descr + ' ' + p.form);
            } else {
                return god.coinflip() ? p.nickname : p.name;
            }
        };

        var hn = '<%= coinflip() ? hero.nickname : hero.name %>';
        var as = '<%= coinflip() ? "and " : coinflip() ? "so " : "" %>';
        var ba = '<%= (coinflip() ? "" : coinflip() ? "But " : "And ")%>';
        var poss = god.possessive(person);
        var proo = god.pronounobject(person);
        var vpro = god.pronoun(person); // v:= villain, but it could be false-hero or somebody punishable.
        var hpron = god.pronoun(god.hero);
        var hprono = god.pronounobject(god.hero);

        // Following the advice of her daughters, three fair maidens whom he
        // meets in her palace, Ivan does not attempt to touch the magic sword
        // while she sleeps. But he awakes her gently, and offers her two golden
        // apples on a silver dish. She lifts her head and opens her mouth,
        // whereupon he seizes the sword and cuts her head off.

        // TODO: helpers - family, advisor, helper or whatnot

// Listen, O Dog! thou wert a Dog (Sobaka), a clean beast; through
// all Paradise the most holy didst thou roam. Henceforward shalt thou
// be a Hound (Pes, or Pyos), an unclean beast. Into a dwelling it
// shall be a sin to admit thee; into a church if thou dost run, the
// church must be consecrated anew.

        // TODO: some of these ending should not have a dispersal. or not a violent one.
        // how to BEST separate....
        var end = [
            '{{AS}}{{PN}} {{was}} <%= punished() %> by {{HN}}.',
            '{{AS}}{{HN}} <%= punished() %> {{PN}}.',
            // okay. so there's been no mention of a horse. SO IT GOES.
            '{{HN}}\'s horse smote {{PN}} full swing with its hoof, and cracked {{POSS}} '
                + 'skull, and {{HN}} made an end of {{PROO}} with a club.',
            'Such behavior could not be tolerated: {{HN}} fell upon {{PN}}, bound {{PROO}} with ropes.',
            '{{VN}} was struck down by the hand of {{HN}}.',
            'Seeing that {{VN}} was perfectly enfeebled, {{HN}} snatched from {{PROO}} {{POSS}} '
            + 'keen faulchion, and with a single blow struck off {{POSS}} head. Behind {{HPRNO}} '
            + 'voices began to cry: "Strike again! strike again! or {{VPRO}} will come to life!" '
            + '"No," replied {{HN}}, "a hero\'s hand does not strike twice, but '
            + 'finishes its work with a single blow."',
            '{{HN}} greeted {{PN}}, and caught hold of {{POSS}} right little finger. '
            + '{{PN}} tried to shake {{HPN}} off, flying first '
            + 'about the house and then out of it, but all in vain. At last {{PN}} '
                + 'after soaring on high, struck the ground, and fell to pieces, becoming '
                + 'a fine yellow sand.',
            '{{AS}}{{HN}} cut the feet off from {{PN}} and placed {{PROO}} on a stump by the roadside.'
        ];

        var dispersal = [
            (god.coinflip() ? 'Thanks to {{HN}}, ' : '') + '{{PN}} was completely burnt to cinders.',
            '{{AS}}that {{was}} that.',
            'Afterwards {{HN}} {{heaped}} up a pile of wood, {{set}} fire to it, {{burnt}} {{PN}} on the pyre, '
                + 'and {{scattered}} {{POSS}} ashes to the wind.',
            'The body {{was}} left in the possession of {{HN}}, who {{scraped}} together the pieces and {{burned}} them in the stove.',
            '{{AS}}they placed {{PROO}} in a coffin, and carried it to church, whereupon it burst into horrible flames, singeing the hands of those who dared carry it.',
            // this doesn't work if already a fine yellow sand.....
            '{{AS}}{{HN}} cut {{PROO}} into small pieces, which were buried throughout the woods.',
            '{{BA}}{{HN}} said, "Into the bottomless pit with you! Out of sight, accursed one!"'
        ];

        god.villain.health = 'dead';

        var t = [];
        t.push(god.capitalize(god.pick(end)));
        t.push(god.capitalize(god.pick(dispersal)));

        if (god.coinflip()) {
            var tmpl2 = [
                'God <%= (coinflip() ? "evidently " : "")%>{{did}} it to <%= select("punish", "remonstrate", "educate", "rebuke") %> {{PN}} for {{POSS}}'
                    + '<%= (coinflip() ? " great" : "")%> <%= nlp.adjective("' + descr + '").conjugate().noun %>.',
                '{{BA}}{{PN}} sits to this day in the pit - in Tartarus.',
                '{{BA}}{{PN}} ' + (god.coinflip() ? '<%= select("{{disappear}}", "{{vanish}}") %>, and ' : '' ) +'{{was}} never seen again.'
            ];
            t.push(god.pick(tmpl2));
        };

        return t.join(' ').replace(/{{PN}}/mg, function() { return eitherName(person); }).replace(/{{AS}}/mg, as)
            .replace(/{{BA}}/mg, ba).replace(/{{POSS}}/mg, poss).replace(/{{PROO}}/mg, proo)
            .replace(/{{HPN}}/mg, hpron).replace(/{{HPRNO}}/mg, hprono).replace(/{{VPRO}}/mg, vpro);

    };

    story.intro = function(god) {

        // There lived in a certain land an old man of this kind

        // can't use a complete sentence. DANG. because: capitalization
        // 'This is the way the world begins.',
        var intros = [
            'Once upon a time,', 'Once there was, and there wasn\'t,',
            'I\'ve heard it said that once',
            'A long time ago,', 'Some years before you were born,',
            'In the time when your parents\' parents were but small babies,',
            'Once upon a time,',
            (god.coinflip() ? 'We <%= coinflip() ? "like to " : "" %><%= coinflip() ? "say" : "think" %> '
             + 'that we are wise<%= select(" folk", " folks", " people", "") %>, '
             + 'but our <%= select("old", "old people", "elders") %> dispute <%= select("the fact", "this fact", "this") %>, '
             + 'saying: "No, no, we were wiser than you are." But '
             + 'stories tell that ' : '') + 'before our grandfathers had learnt anything, and before their grandfathers were born,'.replace(/fathers/mg, (god.coinflip() ? 'fathers' : 'mothers'))
        ];

        // TODO: if blank, don't output the empty lines before the first paragraph.
        var intro = god.pick(intros);
        return '{{**}}' + intro;
    };

    // TODO: VERB TENSE STANDARDIZATION - s/b past in all places. OR .... ???
    // TODO: verb tense DOES NOT WORK here
    // this is the... what tense? past would work.
    // if ALL verb ar infinitive and appear as {{verb}}, then we do a global pull, conjugate, replace prior to template parsing. or after. whatever.


    // 0: Initial situation
    // TODO: multiple sentences within a template may not be punctuated correctly.
    // hrm. maybe they should each appear as a sub-component, so they can be processed externally?
    // for example, if sentence begins with <%= list(acquainainces()) %> and the first is 'the Easter Bunny' it will not be auto-capitalised
    // since that only works on the first letter of the template-output (erroneously called 'sentence' in the code).
    // TODO: what about "lives alone." how would THAT be figured out???
    // aaaand: Milan are known to Natalie.
    story['func0'].exec = function(god, subFunc, terseness) {

        // do we need an "introduction" flag?
        // if the intro is skipped, how do we get this info across?
        // ALT: if we start in-media-res, and come BACK to this, skip the "a long time ago" nonsense.
        // or, if we are doing it a SECOND time (re: brothers killed by dragon; new baby born, story starts again)

        // In a certain village there lived a husband and wife - lived happily, lovingly, peaceably. All their neighbors envied them; the sight of them gave pleasure to honest folks.
        // There once lived an old couple who had one son called Ivashko;[207] no one can tell how fond they were of him!

        // TODO: also need to get an approximate "age" for the hero -
        // In [country] there is a legend about a [adjective] and [adjective] [gender- man, woman, boy, girl depending]

        // TODO: hero could use nickname OR adj + adj and name. Or something.

        // age of person plus one adjective. or we add a NEW adjective as PRIMARY DESCRIPTION ???
        // Once there was an old man who was such an awful drunkard as passes all description.
        // A certain woman was very bumptious.

        // Some men are born to good luck: all they do or try to do comes
        // right all that falls to them is so much gain all their geese are
        // swans all their cards are trumps toss them which way you will, they
        // will always, like poor puss, alight upon their legs, and only move on so
        // much the faster. The world may very likely not always think of them as
        // they think of themselves, but what care they for the world? what can it
        // know about the matter?
        // One of these lucky beings was neighbour Hans.

        // There was once an old castle, that stood in the middle of a deep gloomy wood, and in the castle lived an old fairy.
        var t = story.introduceHero(god, terseness);

        return '{{**}}' + t;

    };

    // Proppian-function templates
    // Absentation: Someone goes missing
    // this could be the hero leaving home
    // so we\'d have to have more logic to cover this
    // TODO: also need to define the action, so it can be dealt with in Resolution (func20) and elsewhere...
    // people have a location; if the location is xs"unknown" we can process this elsewhere...
    story['func1'].exec = function(god, subFunc) {

        // TODO: some way to track missing, and set this up
        // TODO: track the death

        // [blah blah] and there was an end of him.

        // example without introdcution that takes place PRIOR to hero intro
        // A certain priest's daughter went strolling in the forest one day,
        // without having obtained leave from her father or her mother - and she
        // disappeared utterly. Three years went by. Now in the village in which
        // her parents dwelt there lived a bold hunter, who went daily roaming
        // through the thick woods with his dog and his gun. One day he was going
        // through the forest; all of a sudden his dog began to bark, and the
        // hair of its back bristled up.

        var t = [];

        if (!god.hero.introduced) { t.push(story.introduceHero(god, tersely)); }

        if (!god.cache.victim) { story.createVictim(god); }


        var templates = [
            '{{VICN}} went missing.',
            '{{VICN}} unexpectedly {{died}}, leaving <%= hero.name %> devastated.'  + (god.coinflip() ? ' ' + story.deathResponse(god, god.cache.victim) : ''),
            'Sooner or later, {{VICN}} {{died}}.' + (god.coinflip() ? ' ' + story.deathResponse(god, god.cache.victim) : '')
        ];
        god.cache.victim.health = world.healthLevel.dead;

        // there should be concern for the first, grief for the latter two
        // and abstention could simple be left for work. Sheesh!

        t.push(god.pick(templates));

        if (god.hero != god.cache.victim) {
            t.push(blankLine, god.converse(god.hero).replace('!', '?'));
        }

        return t.join('\n');

    };
    // Interdiction: hero is warned
    // story['func2'].templates.push('<%= hero.name %> is warned.');
    // TODO: introduction of personage from interdiction
    // TODO: rework the d**n interdiction template-function
    // this is now just a proof-of-concept of executing larger functions to deal with templates
    story['func2'].exec = function(god) {

        var loc;
        var person;
        var action;

        // here for reference...
        // var prohibitType = {
        //     movement: 'movement',
        //     action: 'action',
        //     speak: 'speakwith'
        // };

        var ptype = god.randomProperty(world.interdictionType);
        var advisor = god.advisor;
        var hero = god.hero;

        // hey. shouldn't the advisor be... NOT a property?
        var interdiction = {
            type: ptype,
            location: '',
            action: '',
            person: '',
            advisor: advisor
        };

        var text = [];

        if (!god.hero.introduced) { text.push(story.introduceHero(god, tersely)); }

        text.push('<%= hero.name %> met <%= advisor.nickname %>.');
        text.push(blankLine);

        text.push(god.converse(advisor, hero), blankLine);

        hero.interdiction = interdiction;

        switch (ptype) {
        case world.interdictionType.movement:
            interdiction.place = god.location();

            // TODO: more better coversation
            text.push('<%= advisor.name %> warned <%= hero.name %> to avoid <%= randomProperty(hero.interdiction.place) %>.');

            break;

        case world.interdictionType.action:

            interdiction.action = 'take the Lord\'s name in vain AGAIN';
            text.push('<%= advisor.name %> told <%= hero.name %> to not <%= hero.interdiction.action %>.');

            break;

        case world.interdictionType.speak:

            // TODO: action should have a target
            // that way, we can "travel" to target....
            interdiction.action = 'talk to ' + god.villain.nickname;
            text.push('<%= hero.interdiction.advisor.name %> warns <%= hero.name %> to not <%= hero.interdiction.action %>.');

            break;
        }

        var mh = god.magicalhelper.name;

        // TODO: make the magicalhelper here. I guess
        text.push(world.blankLine, interdiction.advisor.name + ' introduced {{MH}} to ' + hero.name);
        text.push(world.blankLine, god.converse(hero, god.magicalhelper));

        var tale = story.subtale(god.magicalhelper, god);

        var intro = god.pick([
            '{{MH}} {{said}} "I will tell you a story":',
            '"I have a tale for you," {{said}} {{MH}}, "' + tale.title + ':"'
        ]);
        text.push(world.blankLine, intro, world.blankLine);

        text.push(tale.tale);

        text.push(world.blankLine, '"And now," {{concluded}} {{MH}}, "my tale is done."');

        return text.join('\n').replace(/{{MH}}/mg, mh);

    };

    // Violation of Interdiction
    story['func3'].exec = function(god) {

        var text = [];

        // TODO: if interdiction is undefined, create it!
        // which means it needs to be in a function.....
        var interdiction = god.hero.interdiction;

        switch (interdiction.type) {
        case world.interdictionType.movement:

            text.push('Despite the warning, <%= hero.name %> went to <%= randomProperty(hero.interdiction.place) %>.');
            text.push(world.blankLine, '<%= villain.name %>, a rather <%= list(villain.description) %> person, appeared.');

            break;

        case world.interdictionType.action:

            text.push('Shockingly, <%= hero.name %> proceeded to <%= hero.interdiction.action %>.');
            text.push(world.blankLine,'<%= villain.name %>, a rather <%= list(villain.description) %> person, appeared in front of <%= hero.name %>.');
            break;

        case world.interdictionType.speak:

            var t = 'As soon as <%= hero.interdiction.advisor.name %> {{was}} gone, <%= hero.name %> '
                + 'ran off to find <%= villain.name %> and had an interesting conversation.';
            text.push(t);
            break;
        }

        god.villain.introduced = true;

        text.push(world.blankLine,god.converse(god.villain, god.hero));

        // find a way to integrate this
        //     story['func3'].templates.push('<%= violation() %> <%= list(villain.family) %> are in league with <%= villain.name %>.');


        return text.join('\n');


    };
    // Reconnaissance: Villain seeks something
    story['func4'].exec = function(god) {

        var t = [];

        if (!god.villain.introduced) { t.push(story.introduceVillain(god)); }

        // WHOAH!!!! where'd the reonnaissance go ?!?!?!?

        return t.join('\n');

    };


    // Delivery: The villain gains information
    story['func5'].exec = function(god) {

        var t = [];

        if (!god.villain.introduced) { t.push(story.introduceVillain(god)); }

        var vn = '<%= select(villain.name, villain.nickname) %>';

        var tmpls = [
            '{{VN}} {{gained}} information.',
            'After a chat with <%= getCharacter(pick(hero.family)).name %>, {{VN}} {{learned}} some interesting news.',
            'While skulking about <%= hero.home.vicinity %>, {{VN}} {{overheard}} some gossip about <%= hero.name %>.'
        ];

        t.push(god.pick(tmpls).replace(/{{VN}}/mg, vn));

        return t.join('\n\n');

    };

    // Trickery: Villain attempts to deceive victim.
    story['func6'].exec = function(god) {

        var t = [];

        if (!god.villain.introduced) { t.push(story.introduceVillain(god)); }

        t.push('{{VN}} {{attempted}} to deceive victim.');

        return t.join('\n\n');

    };

    // Complicity: Unwitting helping of the enemy
    story['func7'].exec = function(god) {

        var text = [];
        if (!god.villain.introduced) { text.push(story.introduceVillain(god)); }
        if (!god.hero.introduced) { text.push(story.introduceHero(god, tersely)); }

        text.push('{{HN}} unwittingly {{helped}} {{VN}}.');

        return text.join('\n\n');

    };


    // 2nd Sphere: The Body of the story
    // 8A - Villainy: The need is identified (Villainy)
    // function 8 (and/or 8a) is always present in tale
    // antagonist(s) causes harm or injury to victim(s)/member of protagonist's family = villainy - A
    story['func8'].exec = function(god, subFunc) {

        // this needs to be picked AHEAD OF TIME
        // since some of these require other creations earlier
        // like 7b 'bride is forgotten'
        // the bride should have been introduced earlier....

        // if not picked ahead of time, pick a sub-function at random
        subFunc = subFunc || god.randomProperty(func8);
        var template = []; // text returned to story
        var t = []; // common use in sub-funcs

        var vn = '<%= select(villain.name, villain.nickname) %>';
        var hn = '<%= select(hero.name, hero.nickname) %>';

        if (!god.hero.introduced) { template.push(story.introduceHero(god, tersely)); }

        // TODO: this is not always the case for villainy.
        // sometimes... things just happen.
        // but for coding purposes, FOR NOW, we shall assume
        // bad things happen BECAUSE villain
        if (!god.villain.introduced) {
            template.push(story.introduceVillain(god));
        }

        // subFunc = 'causes sudden disappearance'; // for testing
        // subFunc = 'commits murder';
        // subFunc = 'casting into body of water';
        // subFunc =  'theft of daylight';
        // subFunc =  'threat of cannibalism';
        // subFunc = 'kidnapping of person';

        // console.log(subFunc);

        switch(subFunc) {
        case 'kidnapping of person':
            template.push('{{VN}} kidnapped <%= getCharacter(pick(select(hero.family, hero.acquaintances))).name %>.');
            break;

            // TODO: name not setup???
        case 'seizure of magical agent or helper':
            template.push('{{VN}} <%= select("forcibly seized", "kidnapped", "made off with") %> <%= magicalhelper.name %>.');
            break;

        case 'forcible seizure of magical helper':
            template.push('{{VN}} <%= select("forcibly seized", "kidnapped", "makde off with") %> <%= magicalhelper.name %>.');
            break;

        case 'pillaging or ruining of crops':
            template.push('The harvest {{was}} destroyed by {{VN}}. All in <%= hero.home.nation %> began to feel the pangs of hunger.');
            break;

        case 'theft of daylight':
            t = [
                // TODO: all of these need to be CLEANED UP WITH APPROPRIATE REFERENCES
                'Suddenly, it became as night. {{VN}} had stolen the daylight!',
                'Suddenly, it became as night. {{VN}} had the sun, as easily as eating a corn-cake.',
                'Suddenly the sky was covered by a black cloud; a terrible storm arose.',
                'The moon came across the sun, turning the landscape a dark, curdled, black-red.',
                // http://hbar.phys.msu.su/gorm/atext/ginzele.htm
                // TODO: clean this up a bit, still.....
                'There {{is}} a shroud of darkness drawn over the everyone in the land from head to foot, their cheeks {{were}} wet with tears; the air {{was}} alive with wailing voices; the walls and roof-beams drip blood; the gate of the cloisters and the court beyond them are full of ghosts trooping down into the night of hell; the sun is blotted out of heaven, and a blighting gloom is over allthe land.',
                'Sudden strange and unaccountable disorders and alterations took place in the air; the face of the sun was darkened, and the day turned into night, and that, too, no quiet, peaceable night, but with terrible thunderings, and boisterous winds from all quarters.',
                // TODO: victim disappears...
                'A violent thunderstorm suddenly arose and enveloped {{VN}} in so dense a cloud that he was quite invisible to the assembly. From that hour Romulus was no longer seen on earth. When the fears of the Roman youth were allayed by the return of bright, calm sunshine after such fearful weather, they saw that the royal seat was vacant.',
                '{{VN}} has made night out of noonday, hiding the ',
                + 'bright sunlight, and fear has come upon mankind. ',
                + 'After this, men can believe anything, expect anything. ',
                + 'Nobody would be surprised in the future if land beasts ',
                + 'change places with dolphins to go to live in their ',
                + 'salty pastures, and get to like the sounding waves of ',
                + 'the sea more than the land, while the dolphins prefer ',
                + 'the mountains.',
                'For when the sun suddenly obscured and darkness '
                + 'reigned, and the <%= hero.home.nation %> were overwhelmed with the '
                + 'greatest terror, {{HN}}, who was then supreme among '
                + '<%= possessive(hero) %> countrymen in influence, eloquence, and wisdom, is '
                + 'said to have communicated to <%= possessive(hero) %> fellow citizens the '
                + 'information he had received from <%= advisor.name %>, whose pupil '
                + 'he had been - that this phenomenon occurs at fixed '
                + 'periods and by inevitable law, whenever the moon '
                + 'passes entirely beneath the orb of the sun, and that '
                + 'therefore, though it does not happen at every new '
                + 'moon, it cannot happen except at certain periods of '
                + 'the new moon. When he had discussed the subject and '
                + 'given the explanation of the phenomenon, the people '
                + 'scoffed, and pointed out that a two-headed calf had been born in the neighboring village, the recent actions of {{VN}}',
                'A cloud, however, overspread the sun and hid it from sight until the inhabitants abandoned their city; and thus it was taken by {{VN}}',
                'The sun was suddenly darkened in mid sky.',
                'The moon shuts off the beams of the sun as it passes across it, and darkens so much of the earth as the breadth of the blue-eyed moon amounts to.',
                'The sun was darkened and there was darkness over the world, greater than any that had been known before. Night prevailed at the sixth hour of the day so that even the stars appeared',
                'There occurred too a thick succession of portents, which meant nothing. A woman gave birth to a snake, and another was killed by a thunderbolt in her husband\'s embrace. Then the sun was suddenly darkened and the fourteen districts of the city were struck by lightning. All this happened quite without any providential design; so much so, that for many subsequent years {{VN}} prolonged <% possessive(villain) %> reign and <% possessive(villain) %> crimes.',
                'While {{VN}} was behaving in this way, evil omens occurred. A comet was seen, and the moon, contrary to precedent, appeared to suffer two eclipses, being obscured on the fourth and on the seventh day. Also people saw two suns at once, one in the west weak and pale, and one in the east brilliant and powerful.'
            ];
            template.push(god.pick(t));
            break;

        case 'plundering in other forms':
            template.push('{{VN}} engaged in plundering in ... other forms.');
            break;

        case 'bodily injury, maiming, mutilation':
            template.push('{{VN}} caused bodily injury, maiming, mutilation. Oh!');
            break;

        case 'causes sudden disappearance':
            // TODO: thing or person
            // people have a location; if the location is "unknown" we can process this elsewhere...
            template.push('{{VN}} caused a sudden disappearance.');
            if (god.coinflip()) { template.push(god.converse(god.villain)); }
            break;

        case 'bride is forgotten':
            // doesn't this have to be known AHEAD of time, so there is a bride function prepped earlier???
            template.push('{{HN}}\'s bride {{was}} forgotten after {{VN}} cast a spell.');
            break;

        case 'demand for delivery or enticement, abduction':
            template.push('{{VN}} made a demand for delivery or enticement, abduction. Something like that.');
            break;

        case 'expulsion':
            template.push('{{HN}} {{was}} driven from <%= possessive(hero.gender) %> <%= hero.home.residence %>.');
            break;

        case 'casting into body of water':
            // TODO: hero has to get out of the water.
            // I guess that's part of the template?
            // OR NO. HERO DIES. THAT'S AN ENDING AS WELL!

            // Once there was an old man who was such an awful drunkard as passes all
            // description. Well, one day he went to a kabak, intoxicated himself
            // with liquor, and then went staggering home blind drunk. Now his way
            // happened to lie across a river. When he came to the river, he didn't
            // stop long to consider, but kicked off his boots, hung them round his
            // neck, and walked into the water. Scarcely had he got half-way across
            // when he tripped over a stone, tumbled into the water - and there was an
            // end of him.

            // There was once an old woman who had a daughter; and her daughter went
            // down to the pond one day to bathe with the other girls. They all
            // stripped off their shifts, and went into the water. Then there came a
            // snake out of the water, and glided on to the daughte's shift. After a
            // time the girls all came out, and began to put on their shifts, and the
            // old woman's daughter wanted to put on hers, but there was the snake
            // lying on it. She tried to drive him away, but there he stuck and would
            // not move. Then the snake said:

            // "To the blue sea," answered the raven. (there's more there, there)
            // if hero has not been introduced, time to do it!

            var water = god.select("a small stream", "a local lake", "the murky pond", "the well");
            god.hero.location = water;
            template.push('{{VN}} {{threw}} {{HN}} into <%= hero.location %>.');

            if (god.coinflip() ) {
                god.hero.health = world.healthLevel.dead;
                var drowns = [
                    (god.coinflip() ? 'Too bad ' : '') + '<%= pronoun(hero) %> had never learned to swim.'
                ];
                template.push(god.pick(drowns));
                template.push(story.deathResponse(god, god.hero));
            };

            break;

        case 'casting of a spell, transformation':
            template.push('There {{was}} a casting of a spell, a transformation. The effects {{were}} simply amazing. Words could not do them justice.');
            break;

        case 'false substitution':
            // TODO: posession needs to be tracked
            // so item now "belongs" to villain (or hench-person)
            // TODO: and the item cannot be used in the battle
            // TODO: _OR_ this is a substitution for a family member
            // I think that is too complicated for me to handle at this point...
            template.push('A false substitution {{was}} perpretrated by {{VN}}.');
            break;

        case 'issues order to kill [requires proof]':
            template.push('{{VN}} {{issues}} an order to kill. It {{requires}} proof. THIS {{WAS}} CRUEL.');
            break;

        case 'commits murder':

            // hey..... this has to be a LIVING character.....
            //  aaaaand if no more people are left, create a new one from the local town. or something.
            // aaaaand, what if the hero is SOMEWHERE ELSE, now....

            if (!god.cache.victim) { story.createVictim(god); }
            var murdervictim = god.cache.victim;
            var mvn = god.coinflip() ? murdervictim.name : murdervictim.nickname;

            // TODO: healthLevel is currently a global (only in browser env);
            murdervictim.health = world.healthLevel.dead;

            // She persuades the murderer to show her the body of her dead love, and weeps over it bitterly.
            // He is killed, however, by his elder brothers, who cut him into small pieces and scattered the fragments
            // The Princess died; they placed her in a coffin, and carried it to church
            // About a year after this one of the young men fell ill and died.

            var kill = god.select('kill', 'murder', 'eliminate', 'stilled', 'ate', 'consumed');
            var sudden = god.select('suddenly', 'without warning', 'for reasons unknown', 'just for spite', 'because anything {{was}} possible', 'without explanation', 'since <%= pronoun(villain) %> {{was}} unstoppable');

            t = [
                '{{SDN}}, {{VN}} {{{{KL}}}} {{MVN}}.',
                '{{VN}} {{{{KL}}}} {{MVN}}, {{SDN}}.',
                '{{VN}}, {{SDN}}, {{{{KL}}}} {{MVN}}.'
            ];

            // if character has not been introduced, identify: 'a relative of', a friend of' the hero

            template.push(god.pick(t).replace(/{{SDN}}/g, sudden).replace(/{{KL}}/g, kill).replace(/{{MVN}}/mg, mvn));
            template.push(story.deathResponse(god, murdervictim));

            template.push(god.converse(god.villain));
            break;

        case 'imprisonment, detention':
            template.push('Imprisonment, detention of {{HN}}.');
            break;

        case 'threat of forced matrimony':
            template.push('{{VN}} {{threatened}} to marry <%= getCharacter(pick(hero.family)).name %>.');
            break;

        case 'threat of forced matrimony between relatives':
            template.push('{{VN}} {{<%= select("insinuated", "suggested", "mused") %>}} that <%= list(hero.family) %> could be forced into a marriage of convenience.');
            break;

        case 'threat of cannibalism':
            // TODO: a specific person (victim?) should be threatened.
            // both threat and victim must be stored, for later resolution
            // this is true of all of these sub-Funcs, but I could work on it here, I suppose....
            t = [
                'There {{was}} a threat of cannibalism.',
                'Hungry and faint, {{HN}} wandered on, walked farther and farther and at last came to where stood the house of {{VN}}. '
                    + 'Round the house were set twelve poles in a circle, and on each of eleven of these poles was stuck a human head, the twelfth alone remained unoccupied.'
            ];

            template.push(god.pick(t));

            break;

        case 'threat of cannibalism among relatives':
            template.push('Thanks to the ravages {{VN}}\'s predations had left on the land, there {{was}} the threat of cannibalism among the relatives of {{HN}}\'s family. <%= list(hero.family) %> eyed each other hungrily.');
            break;

        case 'tormenting at night (visitaion, vampirism)':
            template.push('{{HN}} {{was}} tormented at night by <%= getCharacter(pick(villain.family)).name %>.');
            break;

        case 'declaration of war':
            template.push('{{VN}} declared war on {{HN}}.');
            break;

        };

        // replacements here
        return template.join('\n\n').replace(/{{VN}}/mg, vn).replace(/{{HN}}/mg, hn);

    };


    //  8a - Lack: The need is identified (Lack)
    // function 8a: one member of family lacks/desires something = lack - a
    // or.... figure out a better way to accomplish this...
    story['func8a'].exec = function(god, subFunc) {

        var lack = story.createLack(god);

        return god.getCharacter(lack.person).name + ' ' + lack.lack;

    };


    // Mediation: hero discovers the lack
    story['func9'].exec = function(god) {
        // TODO: if lack has not previously been created, this is an issue
        // aaaaand, 8a is not required for 9. WTF?
        if (!god.cache.lack) { story.createLack(god); }

        return '<%= hero.name %> {{discovered}} that ' + god.getCharacter(god.cache.lack.person).name + ' ' + god.cache.lack.lack;
    };

    // Counteraction: hero chooses positive action
    // TODO: positiveaction()
    story['func10'].exec = function(god) {

        var templates = [
            '{{HN}} chose positive action (just like in all those self-help books).',
            'No longer willing to sit idly by, {{HN}} set off to do something about this outrage.'
        ];

        var t = [];
        t.push(god.pick(templates));

        return t.join('\n\n');

};
    // Departure: hero leave on mission
    // TODO: journey() function
    // where is task created?
    story['func11'].templates.push('<%= hero.name %> left <%= hero.location %> to <%= task %>.');

    // 3rd Sphere: The Donor Sequence
    // Testing: hero is challenged to prove heroic qualities
    story['func12'].templates.push('<%= hero.name %> {{was}} challenged to prove heroic qualities.');

    // Reaction: hero responds to test
    story['func13'].templates.push('<%= hero.name %> responded to this test.');

    //  Acquisition: hero gains magical item
    story['func14'].exec = function(god, item) {

        var t = [];

        item = item || god.createMagicalitem();
        // but we never get rid of the previous item.....
        god.hero.possessions.push(item);

        if (!god.advisor.introduced) {
            t.push(god.converse(god.advisor, god.hero), blankLine);
        }

        var hn = '<%= select(hero.name, hero.nickname) %>';
        var an = '<%= select(advisor.name, advisor.nickname) %>';
        var met = '<%= select("met", "encountered", "came across", "found", "was found by", "bumped into") %>';

        var templates = [
            (god.advisor.introduced ? '{{HN}} {{MET}} {{AN}} again.\n\n'  : '') + '"Here," said {{AN}}, "you\'ll need this," and gave {{HN}} the {{IT}}.'
        ];

        // TODO: make this into conversation with a goal?
        t.push(god.pick(templates));
        t.push('"What\'s this?" asked {{HN}}.');
        // TODO: magical items will have propeties that can be enumerated, here....
        t.push('"What does it look like?" replied {{AN}}. "It\'s a special, magical {{IT}}."');
        // TODO: greatfully, thankfully - which require
        if (god.coinflip()) {
            t.push('"Thanks!" said a <%= select("grateful", "thankful") %> {{HN}}'
                   + (god.coinflip() ? god.select(' gratefully', ' thankfully') : '') + '.'); }

        god.advisor.introduced = true;

        var para = t.join('\n').replace(/{{HN}}/g, hn).replace(/{{AN}}/g, an).replace(/{{IT}}/g, item).replace(/{{MET}}/g, met);

        return para;

    };

    // Guidance: hero reaches destination
    // TODO: destination is related to task
    story['func15'].templates.push('<%= hero.name %> reached destination.');

    // Struggle: hero and villain do battle
    // TODO: battle() function
    // TODO: _FOR MY PURPOSES_ combine the functions of 16 and 18, and put 17 in the middle as well (make it a parameter)
    // TODO: if villain and hero have not met, they must converse
    story['func16'].exec = function(god) {
        var t = [];

        // if not known to each other....
        t.push(god.converse(god.villain, god.hero));

        t.push(blankLine, '<%= hero.name %> and <%= villain.name %> {{engage}} in battle.');

        return t.join('\n');
    };

    // Branding: hero is branded
    // TODO: make this a function callable from 16/18
    story['func17'].templates.push('<%= hero.name %> {{was}} changed by the encounter.');
    story['func17'].templates.push('<%= hero.name %> {{was}} scarred internally.');
    story['func17'].templates.push('This day would never be forgotten by <%= hero.name %>.');
    story['func17'].templates.push('<%= hero.name %> received a stylish scarf as a souvenir of the encounter!');
    story['func17'].templates.push('<%= villain.name %>\'s head popped off, and {{was}} scavenged by <%= hero.name %>.');

    // Victory: Villain is defeated
    // TODO: use the defeat/punishment structures built for #30
    story['func18'].exec = function(god) {

        var t = [];

        var hn = '<%= select(hero.name, hero.nickname) %>';
        // func14 (recepit of magical item) is a rule if 18 is active
        var mi = god.hero.possessions[god.hero.possessions.length-1];
        if (!mi) {
            mi = god.createMagicalitem();
            // but we never get rid of the previous item.....
            god.hero.possessions.push(mi);

            t.push('{{HN}} remembered the {{MI}} <%= pronoun(hero) %> had been given before.');

        }

        var template = [
            // 'Through deft use of the {{MI}}, <%= villain.name %> {{was}} defeated.',
            '{{HN}} {{<%= select("deploy", "use", "manipulate") %>}} the {{MI}} to <%= select("defeat", "trounce", "vanquish", "annoy") %> <%= villain.name %>.'
        ];

        t.push(god.pick(template));

        // proof-of-concept YES, but doesn't use the magical item, above.
        // I guess that should be part of the punishment/defeat
        // optionally, LEVELS?
        // or maybe not...... punishments in these stories are often beyond the pale.....
        t.push(blankLine, story.punish(god, god.villain));

        return t.join('\n').replace(/{{MI}}/mg, mi).replace(/{{HN}}/mg, hn);

    };

    // Resolution: Initial misfortune or lack is resolved
    story['func19'].exec = function(god) {

        var t = [];

        // '<%= hero.name %> {{discovered}} that ' + god.getCharacter(god.cache.lack.person).name + ' ' + god.cache.lack.lack;


        var lt = god.cache.lack.lack;
        // this is singularly un-interesting
        var tmpls = ['The problems experienced by ' + god.getCharacter(god.cache.lack.person).name + ', who {{LT}},  {{are}} resolved by {{HN}}.'];

        t.push(god.pick(tmpls));

        return t.join('\n').replace(/{{LT}}/mg, lt);

};

    // 4th Sphere: The hero\'s return
    // In the final (and often optional) phase of the storyline, the hero returns home, hopefully uneventfully and to a hero\'s welcome, although this may not always be the case.

    // Return: hero sets out for home
    // TODO: how could I write something like hero.home.residence.possess and get "her home" or "his shed" ?
    story['func20'].templates.push('<%= hero.name %> set out for <%= hero.home.residence %> in <%= hero.home.vicinity %>.');

    // Pursuit: hero is chased
    // TODO: character/thing that chases
    // TODO: chase() function
    story['func21'].templates.push('<%= hero.name %> {{was}} chased.');

    // Rescue: pursuit ends
    // TODO: template to end the above
    story['func22'].templates.push('the pursuit ended.');

    // Arrival: hero arrives unrecognized
    story['func23'].templates.push('<%= hero.name %> arrived in <%= hero.home.vicinity %> but {{was}} unrecognized.');

    // Claim: False hero makes unfounded claims
    story['func24'].templates.push('<%= falsehero.name %> made unfounded claims.');

    // Task: Difficult task proposed to the <%= hero.name %>
    story['func25'].templates.push('<%= advisor.name %> charged <%= hero.name %> to <%= task %>.');

    // Solution: Task is resolved
    story['func26'].templates.push('<%= task %> {{was}} completed.');
    story['func26'].templates.push('<%= task %> {{was}} completed by <%= hero.name %>.');
    story['func26'].templates.push('<%= hero.name %> finishes off <%= task %>.');

    // Recognition: hero is recognised
    story['func27'].templates.push('<%= hero.name %> {{was}} recognized.');

    // Exposure: False hero is exposed
    // So he regained his wife and went home with her. But as for the false wife, he took a gun and shot her.
    story['func28'].templates.push('<%= falsehero.name %> {{was}} exposed.');

    // Transfiguration: hero is given a new appearance
    // TODO: character description, associated adjectives ???
    story['func29'].templates.push('<%= hero.name %> {{was}} given a new appearance.');

    // Punishment: Villain is punished
    story['func30'].exec = function(god) {

        // rules will tell us a bit about when this can be created or not
        // if villain is dead, it would have to be the false hero
        // if the false hero is dead... WELL I DO NOT KNOW
        // TODO: person = falsefriend or villain (or henchperson?)
        var person = (god.villain.health === world.healthLevel.living ? god.villain : god.falsehero);

        return story.punish(god, person);

    };

    // Wedding: hero marries and ascends the throne
    story['func31'].exec = function(god, subFunc) {

        // marriage/ascension are arrays in the wordbank
        var templates = [
            '<%= hero.name %> <%= select(marriage, ascension) %>. It {{was}} a good life.',
            '<%= hero.name %> <%= marriage %> and <%= ascension %>.',
            '<%= hero.name %> {{settles}} down and <%= select(marriage, ascension) %>.',
            'Everything {{worked}} out for <%= hero.name %>, who <%= select(marriage, ascension) %>.',
            // TODO: verb tense DOES NOT WORK here
            // this is the... what tense? past would work.
            // if ALL verb ar infinitive and appear as {{verb}}, then we do a global pull, conjugate, replace prior to template parsing. or after. whatever.
            '<%= select(marriage, ascension) %>, <%= hero.name %> {{retired}} to ' + god.select("a life of farming", "write <%= possessive(hero) %> memoirs", "live in peace", "pine for days of adventure")  + '.'
        ];

        // yeah, so THIS doesn't work. DANG
        // had parking tickets forgiven, Morgan retired to pine for days of adventure.

        // this version needs to be in the infinitive....
        // Dated for a few years, but decided to remain single, Kaitlyn retired to write her memoirs.

        var lod = story.latd(god.hero, god);

        var t = [];
        t.push(god.pick(templates));

        // this a proof-of-concept
        if (lod.dead.length > 0) {
            // Years passes, but Lauren still mourns the stinging loss of Megan.
            // passed needs to be in the infinitive, here. need to pass this as something extra.
            var sent = 'Years {{passed}}, but <%= hero.name %> still {{mourns}} the stinging loss of ' + god.list(lod.dead) + '.';
            t.push(sent);
        };

        // TODO: enumerate some posessions, perhaps. and places visited.
        // ALTHOUGH NONE OF THIS IS VERY FAIRY-TALELY

        // if single, can't be they
        // TODO: earlier bride business....
        // 'And from that time forward they knew neither sorrow nor separation, but they all lived together long and happily.'
        // From that time forward they lived together in all happiness and prosperity.
        // But he and his daughter lived on and flourished, and everything went well with them.

        // The old people were delighted, and asked their boy about everything that had happened. And after that he and they lived on happily together.
        //
        // From that time forward the Smith gave up spitting at the Demon and
        // striking him with his hammer. The journeyman disappeared, and was
        // never seen again. But the seigneur and his lady entered upon a
        // prosperous course of life, and if they haven't {{died}}, they're living
        // still.

        t.push('After that <%= pronoun(hero) %> lived long and happily, survived to a great age, and then died peacefully.');

        return t.join(' ');

    };

    // from person, separate out the living and the dead
    story.latd = function(person, god) {

        var dead = [];
        var living = [];
        var people = person.family;
        if (person.acquaintances) { people = people.concat(person.acquaintances); }
        for (var i = 0; i < people.length; i++) {
            var c = god.getCharacter(people[i]);
            var dora = (c.health == world.healthLevel.dead ? dead : living);
            dora.push(people[i]);
        }

        return {
            living: living,
            dead: dead
        };

    };

    story.outro = function(god) {

        // And then they went home, and there they lived and enjoyed themselves, feasting and revelling, and drinking mead and wine.
        // I was there, too, and had liquor to drink; it didn't go into my mouth, but only ran down my beard

        var templates = [
            'All of this took place long before you were born, so it\'s not surprising that you don\'t remember it. But it happened, and people speak of it still.',
            'This may sound fantastic, but it all happened exactly as I have told you.',
            'Whether you believe it or not, this is what happened, for what I tell you is true.'
        ];

        var hero = god.hero;
        var ld = story.latd(hero, god);
        var narr = god.cache.narrator || null;

        var t = [];
        // this could get convoluted (Which is good!) "and I tell you this story as you can tell your children"
        // 'and I tell you this story as I told your mother  [or father] and her mother before her' [or father as the case may be].

        if (narr || (god.coinflip(0.2) && ld.living.length > 0)) {
            var name = god.select('name', 'nickname');
            narr = (narr ? narr.name : god.getCharacter(god.pick(ld.living))[name]);
            t.push((god.coinflip() ? 'This may sound fantastic, but ' : '') + 'in all the world there is nothing stranger than the truth, and it all happened exactly as I have told you, for I was there, as sure as my name is ' + narr + '.');
        } else {
            t.push(god.pick(templates));
        }

        return t.join('\n');

    };

    return story;

};



module = module || {};
module.exports = nTemplates;
