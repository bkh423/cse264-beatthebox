const express = require("express");
const path = require("path");

let app = express();
class Winner{
    constructor(name, wins){
        this.name = name;
        this.wins = wins;
    }
}
// Setup static file loading for the index.html file in the public folder
let publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));
let winners = new Object();
let id = 0;
winners[id] = new Winner("Jacob", 5);
let deck = new Array();
let grid = new Array();
app.get("/load", function(req, res) {
    taskString = "";
    for (let i in tasks){
        taskString += `<tr>
                <th><input type = "checkbox" value = ${tasks[i].id}></th>
                <th>${tasks[i].description}</th>
                <th>${tasks[i].type}</th>
                <th>${tasks[i].date}</th>
                </tr>`
    }
    res.end(taskString);
});

app.get("/add", function(req, res) {
    let typeString = req.query.type;
    if (req.query.extra){
        typeString += req.query.extra;
    }
    id++;
    tasks[id] = new Task(id, req.query.task, typeString, req.query.date)
    taskString += `<tr>
                <th><input type = "checkbox" value = ${id}></th>
                <th>${req.query.task}</th>
                <th>${typeString}</th>
                <th>${req.query.date}</th>
                </tr>`
    res.end(taskString);
});

app.get("/delete", function(req, res) {
    taskString = "";
    //delete each checked task
    let checked = req.query.checked;
    for (let i in checked){
        delete tasks[checked[i]];
    }
    for (let i in tasks){
        taskString += `<tr>
                <th><input type = "checkbox" value = ${tasks[i].id}></th>
                <th>${tasks[i].description}</th>
                <th>${tasks[i].type}</th>
                <th>${tasks[i].date}</th>
                </tr>`
    }
    res.end(taskString);
});

app.listen(3000, () => console.log("Starting up Beat the Box"));