//<!-- Back End -->
function Game() {
  this.progress = false;
  this.displayArea = [];
  this.hipsterTracker;
  this.displayedItems;
  this.userMonies;
}

Game.prototype.newPlayer = function(fieldLength){
  this.progress = true;
  this.hipsterTracker = 0;
  this.userMonies = 6;
  for(var i = 0; i < fieldLength; i++){
    if(i === Math.floor(fieldLength/2)){
      this.displayArea.push("hipster");
    } else {
    this.displayArea.push(i);
    }
  }
  return this.progress;
}

Game.prototype.addMonies = function(amountToAdd){
  this.userMonies += amountToAdd;
  return this.userMonies;
}

Game.prototype.createItems = function(){
  this.itemArray = [new Item("pbr", "beer", 2), new Item("craft", "beer", 5), new Item("recumbent", "bikes", 10), new Item("fixed", "bikes", 7), new Item("cigar", "cigarettes", 6), new Item("americanSpirit", "cigarettes", 4), new Item("vinyl", "music", 8), new Item("cd", "music", 3), new Item("latte", "coffee", 5), new Item("drip", "coffee", 3)];
}

Game.prototype.createHipster = function(){
  this.hipsterArray = [new Hipster("beardy",["beer", "bikes", "music"], ["cigarettes", "coffee"], "img/beardy.png"),
  new Hipster("glasses",["cigarettes", "coffee", "music"], ["beer", "bikes"], "img/glasses.png"),
new Hipster("hat",["beer", "cigarettes", "coffee"], ["music", "bikes"], "img/hat.png"),
new Hipster("beardyPrime",["craft", "recumbent", "vinyl"], ["pbr", "fixed", "cd", "cigarettes", "coffee"], "img/beardyprime.png"),
new Hipster("glassesPrime",["americanSpirit", "latte", "cd"], ["beer", "bikes", "drip", "cigar", "vinyl"], "img/glassesprime.png"),
new Hipster("hatPrime",["pbr", "cigar", "drip"], ["music", "bikes", "craft", "americanSpirit", "latte"], "img/hatprime.png")];
}

Game.prototype.addInventory = function(itemType, itemName){
  for(var i = 0; i < this.itemArray.length; i++){
    if(this.itemArray[i].type === itemType && this.itemArray[i].name === itemName){
      this.itemArray[i].toggleInventory();
      return this.itemArray[i].inInventory;
    }
  }
}

Game.prototype.addDisplay = function(itemType, itemName, itemNumber){
  for(var i = 0; i < this.itemArray.length; i++){
    if(this.itemArray[i].type === itemType && this.itemArray[i].name === itemName){
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

Game.prototype.buyThing = function(itemName){
  if (itemName === "inventory"){
    if (this.userMonies >= 20) {
      this.userMonies -= 20;
      return true;
    } else {
      return false;
    }
  } else {
    for(var i = 0; i < this.itemArray.length; i++){
      if(this.itemArray[i].name === itemName){
        if(this.userMonies >= this.itemArray[i].cost){
          this.userMonies -= this.itemArray[i].cost;
          return true;
        } else {
          return false;
        }
      }
    }
  }

}

Game.prototype.checkForHipster = function(){
  this.getDisplayed();
  var returnHipster;
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
  if(this.hipsterArray[0].affinityMeter > 1){
    console.log("inside greater than 0 check")
    if(this.hipsterArray[0].affinityMeter === this.hipsterArray[1].affinityMeter){
      console.log("inside tie check")
      if(this.hipsterArray[0].affinityMeter !== 0 && this.hipsterArray[0].name + "Prime" ===  this.hipsterArray[1].name || this.hipsterArray[1].name + "Prime" ===  this.hipsterArray[0].name){
        console.log("inside prime check")
        var primeReturn = Math.floor(Math.random()*20);
        if(primeReturn === 0){
          if(this.hipsterArray[0].name.endsWith("Prime")){
            returnHipster = this.hipsterArray[0];
          } else {
            returnHipster =  this.hipsterArray[1];
          }
        } else {
          if(this.hipsterArray[0].name.endsWith("Prime")){
            returnHipster =  this.hipsterArray[1];
          } else {
            returnHipster =  this.hipsterArray[0];
          }
        }
      } else {
        returnHipster =  false;
      }
    } else {
      console.log("inside no tie check")
      returnHipster =  this.hipsterArray[0];
    }
  } else {
    console.log("inside less than 0 check")
    returnHipster = false;
  }
  if(returnHipster && !returnHipster.discovered){
      this.hipsterTracker++;
      returnHipster.discovered = true;
  }
  return returnHipster;
}

Game.prototype.clearDisplay = function(){
  this.hipsterArray.forEach(function(hipster){
    hipster.affinityMeter = 0;
  });
  this.itemArray.forEach(function(item){
    item.displayed = false;
  });
  this.displayedItems = [];
  for(var i = 0; i < this.displayArea.length; i++){
    if(!(this.displayArea[i] === "hipster")){
      this.displayArea[i] = i;
    }
  }
}

Game.prototype.resetEverything = function(){
  this.hipsterArray.forEach(function(hipster){
    hipster.affinityMeter = 0;
    hipster.discovered = false;
  });
  this.itemArray.forEach(function(item){
    item.displayed = false;
    item.inInventory = false;
  });
  this.displayedItems = [];
  this.displayArea = [];
}

function Item(name, type, cost) {
  this.name = name;
  this.type = type;
  this.cost = cost;
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

function Hipster(name, likedItems, dislikedItems, imgLink) {
  this.name = name;
  this.likedItems = likedItems;
  this.dislikedItems =  dislikedItems;
  this.imgLink = imgLink;
  this.affinityMeter = 0;
  this.discovered = false;
}

Hipster.prototype.checkAffinity = function(displayedItems){
  for(var i = 0; i < displayedItems.length; i++){
    if(this.likedItems.indexOf(displayedItems[i].type) !== -1 || this.likedItems.indexOf(displayedItems[i].name) !== -1){
      this.affinityMeter++;
    } else if(this.dislikedItems.indexOf(displayedItems[i].type || this.dislikedItems.indexOf(displayedItems[i].name) !== -1) !== -1){
      this.affinityMeter--;
    }
  }
  return this.affinityMeter;
}
Hipster.prototype.giveMonies = function () {
  this.name.endsWith("Prime")
  if (this.name.endsWith("Prime")) {
    return Math.floor(Math.random() * (4)) + 2;
  } else {
    return Math.floor(Math.random() * (3)) + 1;
  }
};

//<!-- Front End  -->
$(document).ready(function(){
  var inventoryItems = 0;
  var inventoryMax = 4;
  //game initialization
  var newGame = new Game();
  newGame.newPlayer($("#yard .row div").length);
  newGame.createItems();
  newGame.createHipster();

  $("#toggleInstructions").click(function(){
    $("#instructions").toggle();
  });

  $("#inventoryButton").click(function(){
    $("#inventory").toggle();
  });

  $("#storeButton").click(function(){
    $("#store").toggle();
  });

  $("#clearItemsButton").click(function(){
    newGame.clearDisplay();
    resetDisplay();
  });

  $("#anotherId").click(function(){
    $(".modal").modal();
  });

  $("#inventory button").click(function(){
    $("#notEnoughForInventory").hide();
    var buySuccess = newGame.buyThing("inventory");
    if (buySuccess && inventoryMax === 4){
      $(".extraRow").first().show();
      inventoryMax = 6;
      updateMoniesSpan();
    }else if (buySuccess && inventoryMax === 6){
      $(".extraRow").last().show();
      inventoryMax = 8;
      $(this).hide();
      updateMoniesSpan();
    } else if(!buySuccess) {
      $("#notEnoughForInventory").addClass("animated fadeIn");
      $("#notEnoughForInventory").show();
      $('#notEnoughForInventory').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $("#notEnoughForInventory").removeClass("animated fadeIn");
        $("#notEnoughForInventory").fadeOut();
      });
    }
  });

  $("#newGameButton").click(function(){
    if (confirm("This will completely reset the game, continue?")){
      newGame.resetEverything();
    resetDisplay();
    $(".inventory-row img").remove();
    $("#store img").removeClass("lowOpacity");
    newGame.newPlayer($("#yard .row div").length);
    inventoryItems = 0;
    }
  });

  function resetDisplay(){
    $("#yard img.itemImage").remove();
    $("#hipsterImage").hide();
    $("#yard p").hide();
    $(".inventory-row img").removeClass("lowOpacity");
  }

  //STORE IMAGE CLICK
  $("#store .storeItem").click(function(){
    $("#fullInventory").hide();
    $("#notEnough").hide();
    var clickedImg = $(this).attr("src");
    var itemIdArray = $(this).attr("id").split("_");
    var itemType = itemIdArray[0];
    var itemName = itemIdArray[1];
    //if clicked (store) image has lowOpacity class then it is already in inventory
    if($(this).hasClass("lowOpacity")){
      //find image in inventory and remove it, then remove lowOpacity class from store and toggle inInventory in game object
      var itemIndex = newGame.itemArray.findIndex(function(item){
        return (item.type === itemType && item.name === itemName);
      });
      if(itemIndex !== -1){
        $("#yard .itemImage").each(function(){
          var yardImgId = $(this).attr("id").split("-");
          if(yardImgId[0] === (itemType + "_" + itemName)){
            newGame.displayArea[parseInt(yardImgId[1])] = parseInt(yardImgId[1]);
            $(this).remove();
            return false;
          }
        });
      }
      $(".inventory-row img").each(function(index){
        if($(this).hasClass(itemType + "_" + itemName)){
          $("#" + itemType + "_" + itemName).removeClass("lowOpacity");
          $(this).remove();
          newGame.addInventory(itemType, itemName);
          inventoryItems--;
        }
      });
    } else {
      //if under 4 items and object does not have lowOpacity class, can add to inventory
      if(inventoryItems < inventoryMax){
        if (newGame.buyThing(itemName)) {
          if(newGame.addInventory(itemType, itemName)){
            inventoryItems++;
            updateMoniesSpan();
            //find first empty div and shove image inside - return false breaks the each loop
            $(".inventory-row div").each(function(){
              if(!$(this).html()){
                $(this).append("<img class='" + itemType + "_" + itemName + "' src='" + clickedImg + "'>");
                $(this).children("img").click(inventoryImgClick);
                return false;
              }
            });
            $("#"+ itemType + "_" + itemName).addClass("lowOpacity");
          }
        } else {
          $("#notEnough").show();
        }

      } else {
          //if more than 4 items can't add more
          $("#fullInventory").show();
      }
    }
  });

  //INVENTORY IMAGE CLICK
  function inventoryImgClick(){
    //debugger;
    var clickedItemArray = $(this).attr("class").split("_");
    var clickedItemType = clickedItemArray[0];
    var clickedItemName = clickedItemArray[1];
    var clickedImgSrc = $(this).attr("src");
    var hipster, monies;
    if($(this).hasClass("lowOpacity")){
      //remove (already in inventory)
      $(this).removeClass("lowOpacity");
      clickedItemArray = $(this).attr("class").split("_");
      $("#yard .itemImage").each(function(){
        var imgId = $(this).attr("id").split("-");
        if(imgId[0] === clickedItemArray.join("_")){
          $(this).remove();
          newGame.addDisplay(clickedItemArray[0], clickedItemArray[1], parseInt(imgId[1]));
          hipster = newGame.checkForHipster();
          if(hipster){
            monies = hipster.giveMonies();
            newGame.addMonies(monies);
            updateMoniesSpan();
            $("#hipsterName").text(hipster.name);
            $("#hipsterGiveAmt").text(monies);
            $("#hipsterImage").attr("src", hipster.imgLink);
            $("#hipsterImage").addClass("animated rollIn");
            $("#hipsterImage").show();
            $("." + hipster.name).show();
            $("#yard p").show();
            $("#hipsterTracker").text(newGame.hipsterTracker);
          } else {
            $("#hipsterImage").removeClass("animated rollIn");
            $("#hipsterImage").hide();
            $("#yard p").hide();
          }
          return false;
        }
      });
    } else {
      //add (not yet in inventory)
      var randomSquare;
      do{
        randomSquare = Math.floor(Math.random() * $("#yard .row div").length);
      }while(!randomSquare || randomSquare === 4 || isNaN(newGame.displayArea[randomSquare]))
      var counter = 0;
      $("#yard .row div").each(function(){
        if(counter === randomSquare){
          $(this).append("<img class='itemImage' id='" + clickedItemType + "_" + clickedItemName + "-"+ randomSquare + "' src='" + clickedImgSrc + "'>");
          newGame.addDisplay(clickedItemType, clickedItemName, randomSquare);
          hipster = newGame.checkForHipster();
          if(hipster){
            monies = hipster.giveMonies();
            newGame.addMonies(monies);
            updateMoniesSpan();
            $("#hipsterName").text(hipster.name);
            $("#hipsterGiveAmt").text(monies);
            $("#hipsterImage").attr("src", hipster.imgLink);
            $("#hipsterImage").addClass("animated rollIn");
            $("#hipsterImage").show();
            $("." + hipster.name).show();
            $("#yard p").show();
            $("#hipsterTracker").text(newGame.hipsterTracker);
          } else {
            $("#hipsterImage").removeClass("animated rollIn");
            $("#hipsterImage").hide();
            $("#yard p").hide();
          }
          return false;
        }
        counter++;
      });
      $(this).addClass("lowOpacity");
    }
  }

  function updateMoniesSpan(){
    $(".resources").text(newGame.userMonies);
  }

});
