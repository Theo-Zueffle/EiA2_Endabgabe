"use strict";
var Firework;
(function (Firework) {
    /*Aufgabe: Endabgabe
      Name: Theo Bastian Züffle
      Matrikel: 268027
      Datum: 12.02.2023
      Zusammenarbeit: Kristoffer Müller und Liz Hengsteler
      Quellen: Inverted Classroom, Jirka Videos + Code, W3Schools, Stackoverflow, ChatGPT
      */
    window.addEventListener("load", handleLoad);
    Firework.emitters = [];
    let selected = 0;
    let img;
    let responsedata;
    let responseArray;
    async function send(_query) {
        let response = await fetch(_query);
        let collectionData = await response.text();
        console.log(collectionData);
        responsedata = JSON.parse(collectionData);
        responseArray = responsedata.data;
        //console.log((responseArray['0'].radius).toString());
        for (let i = responseArray.length - 1; i > responseArray.length - 5; i--) {
            //console.log(responseArray['' + i].radius);
            let choiceDiv = document.getElementsByClassName("rockets")[responseArray.length - i - 1];
            choiceDiv.setAttribute("id", "" + i);
            choiceDiv.addEventListener("click", changeChoice);
        }
        return true;
    }
    // show MingiDB's response in the textarea
    function changeChoice(_choiceClick) {
        selected = Number(_choiceClick.target.id);
    }
    function handleLoad(_event) {
        send("https://webuser.hs-furtwangen.de/~zuefflet/Database/?command=find&collection=Firework");
        let canvas = document.querySelector("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        img = document.getElementById("bg");
        if (!canvas)
            return;
        Firework.crc2 = canvas.getContext("2d");
        canvas.addEventListener("click", clickFunction);
        window.setInterval(update, 50);
    }
    function clickFunction(_clickEvent) {
        const mouseX = _clickEvent.clientX;
        const mouseY = _clickEvent.clientY;
        createBoom(mouseX, mouseY, selected);
    }
    function update() {
        Firework.crc2.beginPath();
        Firework.crc2.globalAlpha = 0.3;
        Firework.crc2.drawImage(img, 0, 0, window.innerWidth, window.innerHeight);
        Firework.crc2.closePath();
        for (let i = 0; i < Firework.emitters.length; i++) {
            Firework.emitters[i].life();
        }
    }
    function createBoom(_mouseX, _mouseY, _selected) {
        console.log(responseArray['' + _selected].radius);
        let emitter = new Firework.Emitter(_mouseX, _mouseY, responseArray['' + _selected].color, responseArray['' + _selected].radius, responseArray['' + _selected].shape);
        Firework.emitters.push(emitter);
    }
})(Firework || (Firework = {}));
//# sourceMappingURL=main.js.map