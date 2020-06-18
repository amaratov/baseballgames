//Global variables 
var gameNumKey;
var numberOfGames = 0;

// function for the month options
function monthOptions(){
    var getMonthName = document.getElementById("month");

    var monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    for (var index = 0; index < monthName.length; index++) {
        var month = monthName[index];
        
        var option = document.createElement("option");
        option.value = index +1;
        option.text = month;
        //DOM method
        getMonthName.appendChild(option);
    }
}

// function for the day options 
function dayOptions(){

    var getDayNum = document.getElementById("day");
    var monthNumbers = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var selectedMonth = parseInt(document.getElementById("month").value);

    var limit = monthNumbers[selectedMonth - 1];
    for (var index = 0; index < limit; index++) {

        var option = document.createElement("option");
        option.value = index + 1;
        option.text = index + 1;
        //DOM method
        getDayNum.appendChild(option);
    }
}

// retreive button
function retreive() {
    var year;
    var month;
    var day;

    year = document.getElementById("year").value;
    month = document.getElementById("month").value;
    if (month.length === 1) {
        month = "0" + month;
    }
    day = document.getElementById("day").value;
    if (day.length === 1) {
        day = "0" + day;
    }
    console.log(year +"/"+ month +"/"+ day);
    // build a URL as required by the MLB site
    var myUrl = "http://gd2.mlb.com/components/game/mlb/year_" + year + "/month_" + month + "/day_" + day + "/master_scoreboard.json";
    getJson(myUrl);
}

	// AJAX synchronous XMLHttpRequest to get the JSON
	// from the site defined by url
function getJson(url) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            //converting the returned data to a JavaScript object
            var gameArray = JSON.parse(request.responseText);
            gameNumKey=gameArray.data.games.game.length;
            displayData(gameArray);
        }
    };

    //get the JSON from the link
    request.open("GET", url, true);
    //create request.send
    request.send();
}
//displaying data from the url
function displayData(action) {
    var homeTeam = document.getElementById("homeTeam");
    var awayTeam = document.getElementById("awayTeam");
    var winingPitcher = document.getElementById("winning");
    var losingPitcher = document.getElementById("loosing");
    var venue = document.getElementById("venue");
    var game = action.data.games.game[numberOfGames];
    // here's some sample data from within the jsObject object
    homeTeam.value = game.home_team_name;
    awayTeam.value = game.away_team_name;
    winingPitcher.value = game.winning_pitcher.first + "" + game.winning_pitcher.last;
    losingPitcher.value = game.losing_pitcher.first + "" + game.losing_pitcher.last;
    venue.value = game.venue;
}
//button nextGame
function nextGame() {
    if ((gameNumKey-1) > numberOfGames ) {
        numberOfGames++;
        retreive();
    }
}
//button previousGame
function previousGame() {
    if ((numberOfGames) !== 0) {
        numberOfGames--;
        retreive();
    }
}

// filter the currently entered character to see that it is part
// of the acceptable character set
function checkField(code){
	var ch = code.keyCode;
	console.log(ch);
	var chFull = String.fromCharCode(ch);
	console.log(chFull);
    var AllowRegex  = /^[\ba-zA-Z\s-]$/;
    if (AllowRegex.test(chFull)){
        return true;
    }else
        return false;
}
function checkFieldVenue(code){
	var ch = code.keyCode;
	console.log(ch);
	var chFull = String.fromCharCode(ch);
	console.log(chFull);
    var AllowRegex  = /^[\ba-zA-Z&\s-]$/;
    if (AllowRegex.test(chFull)){
        return true;
    }else
        return false;
}
//event handlers
document.getElementById("previousGame").addEventListener("click", previousGame, false);

document.getElementById("nextGame").addEventListener("click", nextGame, false);

document.getElementById("retreive").addEventListener("click", retreive, false);

document.getElementById("year").addEventListener("change", monthOptions, false);

document.getElementById("month").addEventListener("change", dayOptions, false);
    