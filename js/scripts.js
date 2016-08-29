//<!-- Back End -->
function Game() {
  this.progress = false;
}

Game.prototype.newPlayer = function(){
  this.progress = true;
  return this.progress;
}

Game.prototype.createItems = function(){
  this.itemArray = [new Item("beer"), new Item("bikes"), new Item("cigarettes"), new Item("music"), new Item("coffee")];
}

Game.prototype.createHipster = function(){
  this.hipsterArray = [new Hipster("beardy",["beer", "bikes", "music"], ["cigarettes", "coffee"]),
  new Hipster("glasses",["cigarettes", "coffee", "music"], ["beer", "bikes"]),
new Hipster("hat",["beer", "cigarettes", "coffee"], ["music", "bikes"])];
}

Game.prototype.addInventory = function(itemId){
  for(var i = 0; i < this.itemArray.length; i++){
    if(this.itemArray[i].type === itemId){
      this.itemArray[i].toggleInventory();
      console.log("here is inInventory of this thing" + this.itemArray[i].inInventory)
      return this.itemArray[i].inInventory;
    }
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
    return "nope";
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

function Hipster(type, likedItems, dislikedItems) {
  this.type = type;
  this.likedItems = likedItems;
  this.dislikedItems =  dislikedItems;
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
  var newGame = new Game();
  newGame.createItems();
  newGame.createHipster();
  $("#store img").click(function(){
    var found = false;
    var clickedImg = $(this).attr("src");
    var itemId = $(this).attr("id");
    if($(this).hasClass("lowOpacity")){
      $("#inventory-row img").each(function(index){
        var idNoNumber = $(this).attr("id").replace(/\d/g, "");
        var idNumber = parseInt($(this).attr("id").replace(/[A-Za-z]/g, ""));
        if(idNoNumber === itemId && idNumber === inventoryItems){
          $(this).remove();
          newGame.addInventory(itemId);
          inventoryItems--;
          found = true;
        }
      });
      if(!found){
        alert("Please do not remove out of order, moron");
      } else {
        $(this).removeClass("lowOpacity");
      }
    } else {
      //debugger;
      if(inventoryItems < 3){
        if(newGame.addInventory(itemId)){
          inventoryItems++;
          $("#inventory"+inventoryItems).append("<img id='" + itemId + inventoryItems + "'src='" + clickedImg + "'>");
          $(this).addClass("lowOpacity");
        }
      } else {
          alert("lolnope");
      }
    }
  });
});
