# _Hipster Atsume_

#### By _Ewa Manek, Francis Prus, Addison Nishijima, Amber Farrington_

## Description

_Like neko atsume but with hipsters! See if you can collect all 6!_

### Specs

Program can create item objects with type
* Example input: beer = new Item("beer")
* Example input: {type: "beer"}

Program can track if items are in inventory and/or displayed
* Example input: item.toggleInventory
* Example input: item.inInventory = true;

Program can create hipster objects with type, liked objects and disliked objects
* Example input: alcoholicHipster = new Hipster("beard", ["beer"], ["bikes"]);
* Example input: {type: "beardy", likedItems: ["beer"], dislikedItems: ["bikes"]}

Program checks displayed items against hipster's liked/disliked objects to check how much hipster 'likes' the current displayed items
* Example input: alcoholicHipster.checkAffinity(["beer"])
* Example output: alcoholicHipster.affinity = 1;

Program has "rare" hipsters that have 1/20 (5%) chance of appearing when their items are displayed
* Example input: craft beer, recumbent bike, and a cd;
* Example output: alcoholicHipster Prime;

Program has a game object that tracks player progress
* Example input: var game = new Game();
* Example input: game.progress = true;

Game uses hipster affinity to track which hipster is output
* Example input: alcoholicHipster.affinity = 1; bikeHipster.affinity = 0;
* Example output: alcoholicHipster;

Game tracks which hipsters user has discovered
* Example input: alcoholicHipster
* Example output: alcoholicHipster.discovered = true;

All of this gets translated to the ui
* Example input: display alcoholicHipster;
* Example output: alcoholicHipster is displayed;

Hipster returns monies which can be used to buy items
* Example input: alcoholicHipster.giveMonies();
* Example output: 3 hipster monies;

Game keeps track of monies that user collects
* Example input: Game.addMonies(alcoholicHipster.giveMonies())
* Example output: Game.userMonies = 3;

On purchase of items in store, game deducts the cost of the item from the user monies
* Example input: Game.buyThing(new environment)
* Example output: Game.userMonies -= 50;

## Setup/Installation Requirements

* _Site is live (here)[https://ewajm.github.io/hipsterAtsume]
* _Copy the repository from GitHub_
* _Open the index.html file a browser of your choice_

## GitHub link

https://github.com/ewajm/hipsterAtsume

## Licensing

* MIT

Copyright (c) 2016 **_Francis Prus, Addison Nishijima, Amber Farrington, Ewa Manek_**

Original Template Copyright (c) 2016 **_Ryan Loos_**
