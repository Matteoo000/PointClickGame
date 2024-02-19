document.getElementById("title").innerText = "point and click adventure game ";

//Game window reference
const playscreen = document.getElementById("playscreen");

//game state
gameState = {
    "door2locked": true,
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
                const keyElement = document.createElement("Li");
                keyElement.id = "inv-key";
                keyElement.innerText = "key";
                inventorylist.appendChild(keyElement);

            }
            break;

        case "door2":
            if (gameState.door2locked == true) {
                //check if we have key
                if (document.getElementById("inv-key") !== null) {
                    // yes unlock door
                    gameState.door2locked = false;
                    //gamestate lvl1door2 = "unlocked"
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

}
