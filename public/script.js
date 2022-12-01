let userSubmit = document.getElementById("logBut");
let username;

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
    let removeDiv = document.getElementById('login');
    removeDiv.remove();
    window.alert("Login success!");
});

