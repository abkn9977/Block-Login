//username and password to verify
const username = "admin";
const password = "admin";

//login attempts
var counter = 2;

const uname = document.getElementById("username");
const upass = document.getElementById("password");
const sbtbtn = document.getElementById("submit");
const timeout = document.getElementById("timeout");

/*
    
*/

function restrictLogin(timerDuration) {
    var timer = timerDuration,
        minutes, seconds;
    var restricted = setInterval(() => {

        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timeout.innerHTML = "Login has been blocked<br>Wait for " + minutes + " : " + seconds + " mins";

        //set time to localstorage each second
        //if someone try to clear localstorage, it will set again

        localStorage.setItem("seconds", seconds);
        localStorage.setItem("minutes", minutes);

        document.getElementById("username").disabled = true;
        document.getElementById("password").disabled = true;
        document.getElementById("submit").disabled = true;
        sbtbtn.style.cursor = "default";
        sbtbtn.style.opacity = .5;

        //end timer
        if (--timer < 0) {

            localStorage.clear();

            document.getElementById("username").disabled = false;
            document.getElementById("password").disabled = false;
            document.getElementById("submit").disabled = false;
            sbtbtn.style.cursor = "pointer";
            sbtbtn.style.opacity = 1;
            timeout.innerHTML = "";
            counter = 3;
            clearInterval(restricted);
        }
    }, 1000);
}

/*
If user reloads or close browser and open to try login again
first check if user has some left time, if so then continue timer
*/
if (localStorage.getItem("seconds") || parseInt(localStorage.getItem("minutes"))) {
    sec = parseInt(localStorage.getItem("seconds"));
    min = parseInt(localStorage.getItem("minutes"));

    var loadTimer = (parseInt(min * 60) + sec);
    
    restrictLogin(loadTimer);
}

//submit 
sbtbtn.addEventListener("click", (e) => {
    e.preventDefault();
    var getname = uname.value;
    var getpass = upass.value;

    if (counter <= 0) {
        
        //time for which login will be restricted (should be in seconds)
        // 600 sec = 10 min
        var countdown = 600; 
        
        //restric login after 3 unsuccessful login attempts
        restrictLogin(countdown);
    } else {
        if (getname == username && getpass == password) {
            document.getElementById("timeout").innerHTML = "Login successful";

            //do something here

        }else if(getname == "" || getpass == ""){
            
            counter--;
            document.getElementById("timeout").innerHTML = "Enter username and password";
        }else {
            
            counter--;
            document.getElementById("timeout").innerHTML = "Wrong username or password";
        }
    }
})
