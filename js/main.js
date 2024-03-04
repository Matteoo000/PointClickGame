document.getElementById("title").innerText = "point and click adventure game ";
//gamestate
let gameState = {
    "door2locked": true,
    "inventory": [],
    "keyPickedUp": false
}
//Reset localstorage

// localStorage.removeItem("gameState"); //delete any saved data from previous

//hande browser storage
if (typeof (Storage) !== "undefined") {
    //code for localstorage/sessionstorage.

    //save the state of the game
    if (localStorage.gameState) {
        //load savegame into local variable
        gameState = JSON.parse(localStorage.gameState);
    }
    else {
        //save local gamestate into browser storage
        localStorage.setItem("gameState", JSON.stringify(gameState));
    }

} else {
    //no web storage
    alert('Your browser does not support web storage.');

}

if (gameState.keyPickedUp) {
    document.getElementById("key1").remove();
}

//Game window reference
const playscreen = document.getElementById("playscreen");

//game state


const sec = 1000; //time in milliseconds

//Main character 
const maincharacter = document.getElementById("maincharacter");
const offsetcharacterX = 16;

//speech bubbles
const mainCharacterspeech = document.getElementById("mainCharacterspeech");
const counterspeech = document.getElementById("counterspeech");
const counteravatarimg = document.getElementById("counteravatarimg");
const mcAudio = document.getElementById("mcAudio");
const cAudio = document.getElementById("cAudio");

const counterspeech2 = document.getElementById("counterspeech2");
const counteravatarimg2 = document.getElementById("counteravatarimg2");

//inventory
const inventorybox = document.getElementById('inventorybox');
const inventoryList = document.getElementById('inventorylist');

//foreground items
const door1 = document.getElementById("door1");
const sing = document.getElementById('sign');
const lvltwo = document.getElementById("navigation")
// update gamestate
updateinventory(gameState.inventory, inventoryList);


playscreen.onclick = function (e) {
    var rect = playscreen.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    if (e.target.id !== "mcimage") {
        maincharacter.style.left = x - offsetcharacterX + "px";
        maincharacter.style.top = y - offsetcharacterX + "px";
    }
    console.log(e.target.id);
    switch (e.target.id) {
        case "door1":
            door1.style.opacity = 0.5;
            sign.style.opacity = 1;

            if (document.getElementById("key1") !== null) {
                console.log('Found key');
                document.getElementById("key1").remove();
                changeinventory('key', 'add');
                gameState.keyPickedUp = true;
                saveToBrowser(gameState);
            }
            break;

        case "door2":
            if (gameState.door2locked == true) {
                if (gameState.keyPickedUp) {
                    door2.style.opacity = 0;
                    lvltwo.style.opacity = 1;
                }
                //check if we have key
                if (document.getElementById("inv-key") !== null) {
                    // yes unlock door
                    gameState.door2locked = false;
                    changeinventory('key', 'delete');
                    console.log('door unlocked!');

                }
                else {
                    //no alert door locked
                    alert("Door is locked find key for acces")
                }
            }
            else {
                console.log("Enter building");
            }
            break;
        /*
        case "sign":
            sign.style.opacity = 0.5;
            door1.style.opacity = 1;
            break;

         */

        case "merchant":
            showMessage(mainCharacterspeech, mcAudio, "Hey there, do you know where I can find the door key for the church");
            setTimeout(function () { counteravatarimg.style.opacity = 1 }, 2 * sec);
            setTimeout(showMessage, 4 * sec, counterspeech, cAudio, "Okay are u ready to get your hands dirty?");
            setTimeout(showMessage, 8 * sec, mainCharacterspeech, mcAudio, "uhhhh.... if I have to...");
            setTimeout(showMessage, 4 * sec, counterspeech, cAudio, "Okay, go over to the magical golden pot and put your hands in it and grab it if you feel it");
            setTimeout(showMessage, 8 * sec, mainCharacterspeech, mcAudio, "well thank you very much merchant");
            setTimeout(function () { counteravatarimg.style.opacity = 0 }, 18 * sec);

            break;

        case "merchant2":
            showMessage(mainCharacterspeech, mcAudio, "Hey who are you?");
            setTimeout(function () { counteravatarimg2.style.opacity = 1 }, 2 * sec);
            setTimeout(showMessage, 4 * sec, counterspeech2, cAudio, "Blorpglrops elfrops eeee shmorp");
            setTimeout(showMessage, 8 * sec, mainCharacterspeech, mcAudio, ".....What does that mean and what languages is that");
            setTimeout(showMessage, 4 * sec, counterspeech2, cAudio, "I actually can talk human, Go to the potion storage and find the finish there");
            setTimeout(showMessage, 8 * sec, mainCharacterspeech, mcAudio, "well thank you very much Glrop guy");
            setTimeout(function () { counteravatarimg2.style.opacity = 0 }, 18 * sec);

            break;

        default:
            //explode
            door1.style.opacity = 1;
            //sign.style.opacity = 1;
            break;

    }
    updateinventory(gameState.inventory, inventorylist);
}
/** 
    *@param {string} itemName
    *@param {string} action "add", "delete"
    *@returns
    */
function changeinventory(itemName, action) {
    if (itemName == null || action == null) {


        console.log('wrong parameters given to changeinventory()');
        return
    }

    switch (action) {
        case 'add':
            gameState.inventory.push(itemName);

            break

        case 'delete':
            gameState.inventory.find(function (item, index) {
                if (item == itemName) {
                    var index = gameState.inventory.indexOf(item);
                    if (index !== -1) {
                        gameState.inventory.splice(index, 1);
                    }
                }
            })
            break

        default:
            break;
    }

}


/**
 * 
 * @param {Array} inventory  array of items
 * @param {HTMLAnchorElement} inventorylist
 */
function updateinventory(inventory, inventorylist) {
    inventorylist.innerHTML = '';
    inventory.forEach(function (item) {
        const inventoryitem = document.createElement("li");
        inventoryitem.id = "inv-" + item;
        inventoryitem.innerText = item;
        inventorylist.appendChild(inventoryitem);
    })



}
/**
 * Shows a message in a speech bubble 
 * @param {getElementById} targetBalloon 
 * @param {getElementById} targetSound
 * @param {string} message 
 * 
 */
function showMessage(targetBalloon, targetSound, message) {
    console.log("---->", targetSound);
    targetSound.currentTime = 0;
    targetSound.play();
    targetBalloon.style.opacity = "1";
    targetBalloon.innerText = message;
    setTimeout(hideMessage, 4 * sec, targetBalloon, targetSound)
}


/**
 * Set the opacity to 0
 * @param {string} targetBalloon 
 */
function hideMessage(targetBalloon, targetSound) {
    targetSound.pause();
    targetBalloon.style.opacity = "0";
}

//showMessage("mainCharacterspeech");
//showMessage("counterspeech");
//setTimeout(showMessage, 1 * sec, mainCharacterspeech, "hello");
//setTimeout(showMessage, 2 * sec, counterspeech, "hello");


/**
 * store gameState into localstrorage.gamestate
 * @param {object} gameState our gamestate object
 */
function saveToBrowser(gameState) {
    localStorage.gameState = JSON.stringify(gameState);
}
//Reset localstorage
// localStorage.removeItem("gameState"); //delete any saved data from previous
/*
function newGame() {
    localStorage.removeItem("gameState");
}
*/