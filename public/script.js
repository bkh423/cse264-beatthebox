let userSubmit = document.getElementById("logBut");
let username, card;
let cardDeck = [];
let displaySet, checkSet, cardList = [];
loadCardList();
/* IMAGES folder info:
    - named 'number''first letter of suite'.png
    - except 10: labeled with 1
    - face card + ace: labled with letter 
*/


/* loading card deck into array
    - 1st index: card number 
        - 1: 10
        - a: ace
        - j: jack 
        - q: queen
        - k: king
    - 2nd index: card suit
        - c: clubs
        - d: diamonds
        - h: hearts
        - s: spades
    - once card is identified
        - elementID: card number + suit
        - class: suit

*/
function loadCardList(){ //adding all image elements to cardList array
    for (let i = 1; i < 10; i++) {
        //loading SPADE
        let scard = document.createElement('img'); 
        scard.setAttribute('src', './images/' + i + 's.png'); 
        scard.setAttribute('class','card');
        if (i == 1) {
            scard.setAttribute('id',i + '0s');
        }
        else {
            scard.setAttribute('id',i + 's');  
        }

        //loading DIAMOND
        let dcard = document.createElement('img');
        dcard.setAttribute('src', './images/' + i + 'd.png'); 
        dcard.setAttribute('class','card');
        if (i == 1) {
            dcard.setAttribute('id',i + '0d');
        }
        else {
            dcard.setAttribute('id',i + 'd');  
        }

        //loading CLUB
        let ccard = document.createElement('img');
        ccard.setAttribute('src', './images/' + i + 'c.png'); 
        ccard.setAttribute('class','card');
        if (i == 1) {
            ccard.setAttribute('id',i + '0c');
        }
        else {
            ccard.setAttribute('id',i + 'c');  
        }

        //loading HEART
        let hcard = document.createElement('img');
        hcard.setAttribute('src', './images/' + i + 'h.png');
        hcard.setAttribute('class','card');
        if (i == 1) {
            hcard.setAttribute('id',i + '0h');
        }
        else {
            hcard.setAttribute('id',i + 'h');  
        }

        //practice uploading images to the page
        console.log(scard,dcard,ccard,hcard);
        let screen = document.getElementById('gridDisplay');
        screen.append(hcard,ccard,dcard,scard);
        scard,dcard,ccard,hcard = null;
    }
    //loading ace, king, queen, and jack

    let char = '';
    switch(char) {
        case 'a':
        case 'j':
        case 'q':
        case 'k':
    }

};
/*
function loadGrid(displaySet) { //loading an array of images onto screen 
    $("#displayGrid").empty();
    //need to start with 3 ROWS --> each with 3 columns
    for (let i = 0; i < displaySet.length; i=i+3) { //CREATE THREE ROWS, but need to make sure index matches the indeces in displaySet(orig 12)
        let dispRow = document.createElement('tr');
        for(let j = 0; j < 3; j++) { //CREATE THREE COLUMNS
            let imgInd = i + j;
            let fromCard = cardDeck[displaySet[imgInd]];
            let newCell = document.createElement('td');
            newCell.setAttribute('class', 'card');
            newCell.append(fromCard);
            dispRow.append(newCell);
        }
        $("#displayGrid").append(dispRow);
    }
};
*/

userSubmit.addEventListener("click", function getUserName(event) {
    event.preventDefault(); //prevent page reload
    let newUser = document.getElementById("userLog");
    username = newUser.value;
    console.log(username);
    newUser.value = '';
    let dispUser = document.getElementById("currUser");
    dispUser.innerHTML = 'Current user: ' + username;
    let divApp = document.getElementById("navBar");
    divApp.append(dispUser);
    window.alert("Login success!");

});
