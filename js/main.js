document.getElementById("title").innerText = "point and click adventure game ";

//Game window reference
const playscreen = document.getElementById("playscreen");

//game state
gameState = {
    "door2locked": true,
    "inventory": []
}

//Main character 
const maincharacter = document.getElementById("maincharacter");
const offsetcharacterX = 16;

//inventory
const inventorybox = document.getElementById('inventorybox');

//foreground items
const door1 = document.getElementById("door1");
const sing = document.getElementById('sign');



playscreen.onclick = function (e) {
    var rect = playscreen.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    console.log(e.target.id);
    maincharacter.style.left = x - offsetcharacterX + "px";
    maincharacter.style.top = y - offsetcharacterX + "px";


    switch (e.target.id) {
        case "door1":
            maincharacter.style.backgroundColor = "#FFFF00"
            door1.style.opacity = 0.5;
            sign.style.opacity = 1;

            if (document.getElementById("key1") !== null) {
                console.log('Found key');
                document.getElementById("key1").remove();
                changeinventory('key', 'add');
            }
            break;

        case "door2":
            if (gameState.door2locked == true) {
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

        case "sign":
            mainCharacter.style.backgroundColor = "#FF0000"
            sign.style.opacity = 0.5;
            door1.style.opacity = 1;
            break;

        default:
            //explode
            maincharacter.style.backgroundColor = "#FFFFFF";
            door1.style.opacity = 1;
            sign.style.opacity = 1;
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