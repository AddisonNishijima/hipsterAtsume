# _Hipster Atsume_

#### By _Ewa Manek, Francis Prus, Addison Nishijima, Amber Farrington_

## Description

_Like neko atsume but with hipsters!_

### Specs

Program can create item objects with type
* Example input: beer = new Item("beer")
* Example input: {type: "beer"}

Program can track if items are in inventory and/or displayed
* Example input: item.toggleInventory
* Example input: item.inInventory = true;

Program can create hipster objects with type, liked objects and disliked objects
* Example input: alcoholicHipster = new Hipster("beard", ["beer"], ["bikes"]);
* Example input: {type: "beard", likedItems: ["beer"], dislikedItems: ["bikes"]}

Program checks displayed items against hipster's liked/disliked objects to check how much hipster 'likes' the current displayed items
* Example input: alcoholicHipster.checkAffinity(["beer"])
* Example output: alcoholicHipster.affinity = 1;

Program has a game object that tracks player progress
* Example input: var game = new Game();
* Example input: game.progress = true;

Game uses hipster affinity to track which hipster is output
* Example input: alcoholicHipster.affinity = 1; bikeHipster.affinity = 0;
* Example output: alcoholicHipster;

All of this gets translated to the ui
* Example input: display alcoholicHipster;
* Example output: alcoholicHipster is displayed;

Hipster returns monies which can be used to buy items
* Example input: beardy;
* Example output: 3 hipster monies;

New environments can be purchased with hipster monies
* Example input: 50 monies;
* Example output: New environment;

Rare hipsters appear when specific items are placed in the yard (20% chance)
* Example input: craft beer, recumbent bike, and a cd;
* Example output: Beardy Prime;

Collect all 6 hipsters to complete your album
* Example input: whatever your last hipster you needed was(depends on order);
* Example output: Shows all 6 hipsters in album on click of link;

Buying items in store deducts total hipster monies
* Example input: Buy cd;
* Example output: total monies -3;


## Setup/Installation Requirements

* _Copy the repository from GitHub_
* _Open the index.html file a browser of your choice_

## GitHub link

https://github.com/ewajm/hipsterAtsume

## Licensing

* MIT

Copyright (c) 2016 **_Francis Prus, Addison Nishijima, Amber Farrington, Ewa Manek_**

Original Template Copyright (c) 2016 **_Ryan Loos_**
