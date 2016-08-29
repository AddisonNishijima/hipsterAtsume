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
  $("form#inputForm").submit(function(event){
    event.preventDefault();

  });
});
