const express = require("express");
const path = require("path");

let app = express();
class Winner{
    constructor(name, wins, losses){
        this.name = name;
        this.wins = wins;
        this.losses = losses;
    }
}
// Setup static file loading for the index.html file in the public folder
let publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));
let winners = new Object();
let id = 0;
winners[id++] = new Winner("Jacob", 1, 5);

app.get("/winners", function(req, res) {
    let name = req.query.name;
    let index = -1;
    for (i in winners){
        if (winners[i].name == name){
            index = i
        }
    }
    if (index == -1){
        index = id;
        winners[id++] = new Winner(name, 0, 0);
    }
    if (req.query.wins == 1){
        winners[index].wins += 1;
    }
    else if (req.query.losses == 1){
        winners[index].losses += 1;
    }
    
    winnerString = "<tr><td id = 'board'>Name</td><td id = 'board'>Wins</td><td id = 'board'>Losses</td></tr>";
    for (let i in winners){
        winnerString += `<tr>
                <td id = 'board'>${winners[i].name}</th>
                <td id = 'board'>${winners[i].wins}</th>
                <td id = 'board'>${winners[i].losses}</th>
                </tr>`
    }
    res.end(winnerString);
});

app.listen(3000, () => console.log("Starting up Beat the Box"));