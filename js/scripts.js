//<!-- Back End -->
function Game() {
  this.progress = false;
  this.displayArea = [];
}

Game.prototype.newPlayer = function(fieldLength){
  this.progress = true;
  for(var i = 0; i < fieldLength; i++){
    if(i === Math.floor(fieldLength/2)){
      this.displayArea.push("hipster");
    } else {
    this.displayArea.push(i);
    }
  }
  console.log(this.displayArea);
  return this.progress;
}

Game.prototype.createItems = function(){
  this.itemArray = [new Item("beer"), new Item("bikes"), new Item("cigarettes"), new Item("music"), new Item("coffee")];
}

Game.prototype.createHipster = function(){
  this.hipsterArray = [new Hipster("beardy",["beer", "bikes", "music"], ["cigarettes", "coffee"], "http://dummyimage.com/250x250/000000/fff.png&text=B"),
  new Hipster("glasses",["cigarettes", "coffee", "music"], ["beer", "bikes"], "http://dummyimage.com/250x250/000000/fff.png&text=G"),
new Hipster("hat",["beer", "cigarettes", "coffee"], ["music", "bikes"], "http://dummyimage.com/250x250/000000/fff.png&text=H")];
}

Game.prototype.addInventory = function(itemId){
  for(var i = 0; i < this.itemArray.length; i++){
    if(this.itemArray[i].type === itemId){
      this.itemArray[i].toggleInventory();
      return this.itemArray[i].inInventory;
    }
  }
}

Game.prototype.addDisplay = function(itemName, itemNumber){
  for(var i = 0; i < this.itemArray.length; i++){
    if(this.itemArray[i].type === itemName){
      this.itemArray[i].toggleDisplay();
      break;
    }
  }
  if(isNaN(this.displayArea[itemNumber])){
    this.displayArea[itemNumber] = itemNumber;
  } else {
  this.displayArea[itemNumber] = "full";
  }
}

Game.prototype.getDisplayed = function(){
  this.displayedItems = [];
  for(var i = 0; i < this.itemArray.length; i++){
    if(this.itemArray[i].displayed){
      this.displayedItems.push(this.itemArray[i]);
    }
  }
}

Game.prototype.checkForHipster = function(){
  this.getDisplayed();
  for(var j = 0; j < this.hipsterArray.length; j++){
    this.hipsterArray[j].affinityMeter = 0;
    this.hipsterArray[j].checkAffinity(this.displayedItems);
  }
  this.hipsterArray.sort(function(hipster1, hipster2){
    if(hipster1.affinityMeter > hipster2.affinityMeter){
      return -1;
    }
    if(hipster2.affinityMeter > hipster1.affinityMeter){
      return 1;
    }
    return 0;
  });
  if(this.hipsterArray[0].affinityMeter === this.hipsterArray[1].affinityMeter){
    return false;
  } else {
    return this.hipsterArray[0];
  }
}

Game.prototype.clearDisplay = function(){
  this.hipsterArray.forEach(function(hipster){
    hipster.affinityMeter = 0;
  });
  this.itemArray.forEach(function(item){
    item.displayed = false;
  });
  this.displayedItems = [];
}

Game.prototype.resetEverything = function(){
  this.hipsterArray.forEach(function(hipster){
    hipster.affinityMeter = 0;
  });
  this.itemArray.forEach(function(item){
    item.displayed = false;
    item.inInventory = false;
  });
  this.displayedItems = [];
}


function Item(type) {
  this.type = type;
  this.inInventory = false;
  this.displayed = false;
}

Item.prototype.toggleInventory = function(){
  this.inInventory = !this.inInventory;
  if(!this.inInventory && this.displayed){
    this.displayed = false;
  }
}

Item.prototype.toggleDisplay = function(){
  if(this.inInventory){
    this.displayed = !this.displayed;
  }
  return this.displayed;
}

function Hipster(type, likedItems, dislikedItems, imgLink) {
  this.type = type;
  this.likedItems = likedItems;
  this.dislikedItems =  dislikedItems;
  this.imgLink = imgLink;
  this.affinityMeter = 0;
}

Hipster.prototype.checkAffinity = function(displayedItems){
  for(var i = 0; i < displayedItems.length; i++){
    if(this.likedItems.indexOf(displayedItems[i].type) !== -1){
      this.affinityMeter++;
    } else if(this.dislikedItems.indexOf(displayedItems[i].type) !== -1){
      this.affinityMeter--;
    }
  }
  return this.affinityMeter;
}


//<!-- Front End  -->
$(document).ready(function(){
  var inventoryItems = 0;
  //game initialization
  var newGame = new Game();
  newGame.newPlayer($("#yard .row div").length);
  newGame.createItems();
  newGame.createHipster();

  $("#store img").click(function(){
    var clickedImg = $(this).attr("src");
    var itemId = $(this).attr("id");
    //if clicked (store) image has lowOpacity class then it is already in inventory
    if($(this).hasClass("lowOpacity")){
      //find image in inventory and remove it, then remove lowOpacity class from store and toggle inInventory in game object
      $("#inventory-row img").each(function(index){
        if($(this).hasClass(itemId)){
          $("#" + itemId).removeClass("lowOpacity");
          $(this).remove();
          newGame.addInventory(itemId);
          inventoryItems--;
        }
      });
    } else {
      //if under 3 items and object does not have lowOpacity class, can add to inventory
      if(inventoryItems < 3){
        if(newGame.addInventory(itemId)){
          inventoryItems++;
          //find first empty div and shove image inside - return false breaks the each loop
          $("#inventory-row div").each(function(){
            if(!$(this).html()){
              $(this).append("<img class='" + itemId + "' src='" + clickedImg + "'>");
              $(this).children("img").click(inventoryImgClick);
              return false;
            }
          });
          $("#"+ itemId).addClass("lowOpacity");
        }
      } else {
          //if more than 3 items can't add more
          alert("lolnope");
      }
    }
  });

  function inventoryImgClick(){
    //debugger;
    var clickedItem = $(this).attr("class");
    var clickedImgSrc = $(this).attr("src");
    var hipster;
    if($(this).hasClass("lowOpacity")){
      //remove
      $(this).removeClass("lowOpacity");
      clickedItem = $(this).attr("class");
      $("#yard img").each(function(){
        var imgId = $(this).attr("id").split("-");
        if(imgId[0] === clickedItem){
          console.log("inside if statement");
          $(this).remove();
          newGame.addDisplay(clickedItem, parseInt(imgId[1]));
          hipster = newGame.checkForHipster();
          if(hipster){
            $("#hipsterImage").attr("src", hipster.imgLink);
            $("#hipsterImage").show();
          } else {
            $("#hipsterImage").hide();
          }
        }
      });
    } else {
      //add
      var randomSquare;
      do{
        randomSquare = Math.floor(Math.random() * $("#yard .row div").length);
      }while(!randomSquare || randomSquare === 4 || isNaN(newGame.displayArea[randomSquare]))
      var counter = 0;
      $("#yard .row div").each(function(){
        if(counter === randomSquare){
          $(this).append("<img id='" + clickedItem + "-"+ randomSquare + "' src='" + clickedImgSrc + "'>");
          newGame.addDisplay(clickedItem, randomSquare);
          hipster = newGame.checkForHipster();
          if(hipster){
            $("#hipsterImage").attr("src", hipster.imgLink);
            $("#hipsterImage").show();
          } else {
            $("#hipsterImage").hide();
          }
          return false;
        }
        counter++;
      });
      $(this).addClass("lowOpacity");
    }
  }

});
