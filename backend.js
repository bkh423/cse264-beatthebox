
let deck = [];
let grid = [];
let deckInd = 9; // first 9 cards (0-8) used to create grid 

function shuffle(array) {
    let currentInd = array.length,  randomIndex;
  
    while (currentInd != 0) {
      randomIndex = Math.floor(Math.random() * currentInd);
      currentInd--;
      [array[currentInd], array[randomIndex]] = [
        array[randomIndex], array[currentInd]];
    }
    return array;
  }

function initDeck() {
    for (let i = 0; i < 52; i++)
        deck.push(i);

    return shuffle(deck);
}

function initGrid(deck) {
    grid.push([deck[0], deck[1], deck[2]]);
    grid.push([deck[3], deck[4], deck[5]]);
    grid.push([deck[6], deck[7], deck[8]]);
    document.getElementById("z0").innerHTML = getNumber(deck[0]);
    document.getElementById("z1").innerHTML = getNumber(deck[1]);
    document.getElementById("z2").innerHTML = getNumber(deck[2]);
    document.getElementById("o0").innerHTML = getNumber(deck[3]);
    document.getElementById("o1").innerHTML = getNumber(deck[4]);
    document.getElementById("o2").innerHTML = getNumber(deck[5]);
    document.getElementById("t0").innerHTML = getNumber(deck[6]);
    document.getElementById("t1").innerHTML = getNumber(deck[7]);
    document.getElementById("t2").innerHTML = getNumber(deck[8]);
    document.getElementById("deckcounter").innerHTML = "Cards Remaining: 43";
    return grid;
}

function getNumber(cardVal) {
    return cardVal % 13;
}

// takes row, col of subdeck bet was placed on, and if the bet was a "higher" or not 
// returns an updated grid, or false if a flipped subdeck was played on 
function executeTurn(row, col) {
    cardValAtGrid = getNumber(grid[row][col]);
    if (cardValAtGrid === -1) {
        console.log("invalid subdeck");
        return false;
    }
    cardValInDeck = getNumber(deck[deckInd]);

    console.log("card in grid:", cardValAtGrid);
    console.log("card in deck:", cardValInDeck);

    let isHigh = cardValInDeck > cardValAtGrid; 
    let high = document.querySelector('#switch').checked;
    if (cardValInDeck === cardValAtGrid)
        grid[row][col] = -1;
    else if (high === isHigh)
        grid[row][col] = deck[deckInd];
    else
        grid[row][col] = -1;
    // update display
    if (row === 0) {
        if (col === 0)
            document.getElementById("z0").innerHTML = getNumber(grid[row][col]);
        else if (col === 1) 
            document.getElementById("z1").innerHTML = getNumber(grid[row][col]);
        else 
            document.getElementById("z2").innerHTML = getNumber(grid[row][col]);
    }
    else if (row === 1) {
        if (col === 0) 
            document.getElementById("o0").innerHTML = getNumber(grid[row][col]);
        else if (col === 1) 
            document.getElementById("o1").innerHTML = getNumber(grid[row][col]);
        else 
            document.getElementById("o2").innerHTML = getNumber(grid[row][col]);
        
    }
    else {
        if (col === 0) 
            document.getElementById("t0").innerHTML = getNumber(grid[row][col]);
        else if (col === 1)
            document.getElementById("t1").innerHTML = getNumber(grid[row][col]);
        else
            document.getElementById("t2").innerHTML = getNumber(grid[row][col]);
    }
    // increment to next card in deck
    deckInd += 1;
    let remcards = 52 - deckInd;
    document.getElementById("deckcounter").innerHTML = "Cards Remaining: " + remcards;
    if (isWin()) {
        console.log("win");
    }
    if (isLoss()) {
        console.log("lose");
    }
    return grid;
}

// if end of deck is played successfully (ind = 52), win case
// need returns?
function isWin() {
    if (deckInd == 52)
        window.alert("You Win!");
        return true;

    return false;
}

// if all subdecks are flipped (=-1), loss case
// need returns?
function isLoss() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            if (grid[i][j] !== -1)
                return false;
        }
    }
    window.alert("You Lose!");
    return true;
}

deck = initDeck();
grid = initGrid(deck);
console.log(deck);
console.log(grid);