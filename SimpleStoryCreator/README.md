SimpleStoryCreator
==================
# revisions
* wire up the characters to the archiveofourown puller from Darius Kazemi's [alt universe prompts](https://github.com/dariusk/ao3/blob/master/index.js) for how it pulls characters from http://archiveofourown.org.
* see how that plays out.
* If pleasant, refactor further.
* Or just use as a test-bed.

# Original Overview
---------
The SimpleStoryCreator creates a simple story that can be used
as a source of inspiration if no other idea is avaible.
The Usage is quite simple:
Just call the "new" operator and it's all done.

Example:
```javascript
  var MyStory = new SimpleStoryCreator();
```

This creates a new instance of TSimpleStoryCreator and it also
generates a first story. You can get the story-text by calling
GetStoryText.

Example:
```javascript
  MyStory.getStoryText();
```

This returns an array of strings containing the story.
If the story doesn't fit your taste/need, you can always create
a new story. This can easily achived by calling NewStory.

Example:
```javascript
  MyStory.createStory();
```

This way you get a new story that (hopefully) fits your needs/taste
better.
If you want, you can specify a plot.
Currently these are the possible plots:
* Destroy ("destroy")
* Kidnap ("kidnap")
* Mind Control ("mindcontrol")
* Revenge ("revenge")

Example:
```javascript
  MyStory.createStory( "revenge" );
```

The story would be something like this:
<pre>
Before you were born there lived a merchant.
There came a day a necromancer killed the lover of the merchant.
He was able to trick the necromancer.
Finally the merchant manged to escape.
</pre>


Credits
-------
* Original idea: (C) 2013 by Rick Hoppmann aka kddekadenz ( https://github.com/kddekadenz )
* Original project: Plot Narrator ( https://github.com/kddekadenz/PlotNarrator ) (C) 2013 by Rick Hoppmann aka kddekadenz
* sprintf implementation: (C) 2006 by Naden Badalgogtapeh ( http://www.naden.de/blog/javascript-printf )
* JavaScript Version: (C) 2013-2014 by anihex ( https://github.com/anihex )
* New rRandom implementation: (C) 2006 by Naden Badalgogtapeh ( http://www.naden.de/blog/zufallszahlen-in-javascript-mit-mathrandom ), 2008 by by batzee and  2012 by MHN
