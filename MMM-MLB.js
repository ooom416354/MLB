//Config
//TBD - set these values in config.js
var focusOn = "Yankees";

//Date functions
var dtDate = new Date();
dtDate.setDate(dtDate.getDate());

var strMth = ('0' + (dtDate.getMonth()+1)).slice(-2);
var strDay = ('0' + dtDate.getDate()).slice(-2);
var strYear = String(dtDate.getFullYear());

/*
//testing
var strMth = "07";
var strDay = "16";
var strYear = "2016";
*/

//Create connection to pull MLB JSON data
var output = document.getElementById("output");
document.getElementById("btn1").onclick = function () {
    var connReq = new XMLHttpRequest();
    connReq.onreadystatechange =
        function () {
            if (this.readyState == 4) {
                var myObj = JSON.parse(this.responseText);

                //Start of loop
                for (i = 0; i < myObj.data.games.game.length; i++) {

                    //Pull data for team selected in config
                    if (myObj.data.games.game[i].away_team_name === focusOn ||
                        myObj.data.games.game[i].home_team_name === focusOn) {

                        //Check if game is final, if so, list winning and losing pitcher
                        if (myObj.data.games.game[i].status.ind === "F") {
                            output.innerHTML +=
                                myObj.data.games.game[i].away_team_name + "   " +
                                myObj.data.games.game[i].linescore.r.away +
                                " (" + myObj.data.games.game[i].away_win + "-" +
                                myObj.data.games.game[i].away_loss + ") " +
                                myObj.data.games.game[i].home_team_name + "   " +
                                myObj.data.games.game[i].linescore.r.home +
                                " (" + myObj.data.games.game[i].home_win + "-" +
                                myObj.data.games.game[i].home_loss + ")" + "<br>"

                            output.innerHTML +=
                                "W - " + myObj.data.games.game[i].winning_pitcher.first + " " +
                                myObj.data.games.game[i].winning_pitcher.last + " (" +
                                myObj.data.games.game[i].winning_pitcher.wins + "-" +
                                myObj.data.games.game[i].winning_pitcher.losses + ")<br>" +

                                "L - " + myObj.data.games.game[i].losing_pitcher.first + " " +
                                myObj.data.games.game[i].losing_pitcher.last + " (" +
                                myObj.data.games.game[i].losing_pitcher.wins + "-" +
                                myObj.data.games.game[i].losing_pitcher.losses + ")<br>"

                            if (myObj.data.games.game[i].save_pitcher.id != "") {
                                output.innerHTML +=
                                    "S - " + myObj.data.games.game[i].save_pitcher.first + " " +
                                    myObj.data.games.game[i].save_pitcher.last + " (" +
                                    myObj.data.games.game[i].save_pitcher.saves + ")<br>"
                            }
                        }
                        //Check if game is scheduled, if so, list probable losing pitcher
                        else if (myObj.data.games.game[i].status.ind === "S") {
                            output.innerHTML +=
                                myObj.data.games.game[i].away_team_name + " at " +
                                myObj.data.games.game[i].home_team_name + " - " +
                                myObj.data.games.game[i].time + " " + myObj.data.games.game[i].ampm + "<br>";

                            //If no starting pitcher is named, populate TBD
                            if (myObj.data.games.game[i].away_probable_pitcher.last_name === " ") {
                                var awayPitcher = "TBD";
                            }
                            else {
                                var awayPitcher =
                                    myObj.data.games.game[i].away_probable_pitcher.first_name + " " +
                                    myObj.data.games.game[i].away_probable_pitcher.last_name + " " +
                                    myObj.data.games.game[i].away_probable_pitcher.era;
                            }
                            if (myObj.data.games.game[i].home_probable_pitcher.last_name === " ") {
                                var homePitcher = "TBD";
                            }
                            else {
                                var homePitcher =
                                    myObj.data.games.game[i].home_probable_pitcher.first_name + " " +
                                    myObj.data.games.game[i].home_probable_pitcher.last_name + " " +
                                    myObj.data.games.game[i].home_probable_pitcher.era;
                            }
                            output.innerHTML += awayPitcher + " vs " + homePitcher + " <br>";
                        }
                        //Output inning, pitcher, and score of in progress game.
                        else {
                            if (myObj.data.games.game[i].status.top_inning === "Y") {
                                output.innerHTML +=
                                    myObj.data.games.game[i].away_team_name + " at " +
                                    myObj.data.games.game[i].home_team_name + "<br>" +
                                    myObj.data.games.game[i].linescore.r.away + " - " +
                                    myObj.data.games.game[i].linescore.r.home + " " +
                                    "Top " + myObj.data.games.game[i].status.inning;
                            }
                            else {
                                output.innerHTML += 
                                    myObj.data.games.game[i].away_team_name + " at " +
                                    myObj.data.games.game[i].home_team_name + "<br>" +
                                    myObj.data.games.game[i].linescore.r.away + " - " +
                                    myObj.data.games.game[i].linescore.r.home + " " +
                                    "Bottom " + myObj.data.games.game[i].status.inning;
                            }
                        }
                    }
                }
            }
        };

    function hours12(date) {
        return (date.getHours() + 24) % 12 || 12;
    };

    connReq.open("GET", "http://gd2.mlb.com/components/game/mlb/year_" + strYear + "/month_" + strMth + "/day_" + strDay + "/master_scoreboard.json", true);
    connReq.send();

};