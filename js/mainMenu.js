var characters_up = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
];
var characters_low = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
];
var title = ["*", "*", "*", "*", "*", " ", "*", "*", "*", "*", "*"];

var myFuncUpper = function (char_num, num) {
    var i = 0;
    var character0 = 0;
    while (i < char_num) {
        (function (i) {
            setTimeout(function () {
                character0 = characters_up[i];
                title[num] = character0;
                //console.log(i)
                update_txt(title);
            }, 100 * i);
        })(i++);
    }
    return true;
};

var myFuncLower = function (char_num, num) {
    var i = 0;
    var character0 = 0;
    while (i < char_num) {
        (function (i) {
            setTimeout(function () {
                character0 = characters_low[i];
                title[num] = character0;
                //console.log(i)
                update_txt(title);
            }, 100 * i);
        })(i++);
    }
    return true;
};

var complete = 0;
function intro() {
    complete = 1;
    setTimeout(function () {
        complete = 2;
        console.log("start");
        myFuncUpper(8, 0);
        myFuncUpper(5, 1);
        myFuncUpper(12, 2);
        myFuncUpper(12, 3);
        myFuncUpper(15, 4);
        //space between
        myFuncLower(23, 6);
        myFuncLower(15, 7);
        myFuncLower(18, 8);
        myFuncLower(12, 9);
        myFuncLower(4, 10);
    }, 1000);

    setTimeout(function () {
        complete = 3;
        console.log("done");
        document.getElementById("title").style.border = "solid 5px white";
        document.getElementById("start").style.top = "10%";
    }, 3400);
}
document.onload = intro();

function update_txt(title) {
    var string = "";
    title.forEach((element) => {
        string += element;
    });
    document.getElementById("title").innerHTML = string;
}

function start() {
    if (complete == 3) {
        document.getElementById("align").style.top = "40%";
        document.getElementById("align").style.opacity = "0%";

        setTimeout(function () {
            //put the start location here
            //location = "";
        }, 1200);
    }
}
document.getElementById("body").addEventListener("click", start);