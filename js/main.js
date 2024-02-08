document.getElementById("title").innerText = "point and click adventure game ";

//Game window reference
const playscreen = document.getElementById("playscreen");

//Main character 
const maincharacter = document.getElementById("maincharacter");
const offsetcharacterX = 16;

//foreground items

const door1 = document.getElementById("door1");

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
            break;
        case "sign":
            mainCharacter.style.backgroundColor = "#FF0000"
            sign.style.opacity = 0.5;
            break;
        default:
            //explode
            maincharacter.style.backgroundColor = "#FFFFFF";
            door1.style.opacity = 1;
            sign.style.opacity = 1;
            break;

    }

}
