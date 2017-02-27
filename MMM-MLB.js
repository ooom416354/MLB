//Config
//***TODO - set these values in config.js
var focusOn = "Yankees";

//Date functions
var dtDate = new Date();
dtDate.setDate(dtDate.getDate());

var strMth = ('0' + (dtDate.getMonth() + 1)).slice(-2);
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
//***TODO change to onload instead of a button click
document.getElementById("button").onclick = function () {
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
                                    myObj.data.games.game[i].save_pitcher.saves + ")<br>" + 
                                    myObj.data.games.game[i].alerts.text}
                            else {myObj.data.games.game[i].alerts.text
                            
                            }
                        }
                        //Check if game is scheduled, if so, list probable starting pitchers
                        else if (myObj.data.games.game[i].status.ind === "S" ||
                            myObj.data.games.game[i].status.ind === "P" ||
                            myObj.data.games.game[i].status.ind === "PW") {
                            output.innerHTML +=
                                myObj.data.games.game[i].away_team_name + " (" +
                                myObj.data.games.game[i].away_win + "-" +
                                myObj.data.games.game[i].away_loss + ") at " +

                                myObj.data.games.game[i].home_team_name + " (" +
                                myObj.data.games.game[i].home_win + "-" +
                                myObj.data.games.game[i].home_loss + ") at " +
                                myObj.data.games.game[i].time + " " + myObj.data.games.game[i].ampm + "<br>";

                            //If no starting pitcher is named, populate TBD
                            if (myObj.data.games.game[i].away_probable_pitcher.last_name === " ") {
                                var awayPitcher = "TBD";
                            }
                            else {
                                var awayPitcher =
                                    myObj.data.games.game[i].away_probable_pitcher.first_name + " " +
                                    myObj.data.games.game[i].away_probable_pitcher.last_name + " (" +
                                    myObj.data.games.game[i].away_probable_pitcher.wins + "-" +
                                    myObj.data.games.game[i].away_probable_pitcher.losses + ") " +
                                    myObj.data.games.game[i].away_probable_pitcher.era;
                            }
                            if (myObj.data.games.game[i].home_probable_pitcher.last_name === " ") {
                                var homePitcher = "TBD";
                            }
                            else {
                                var homePitcher =
                                    myObj.data.games.game[i].home_probable_pitcher.first_name + " " +
                                    myObj.data.games.game[i].home_probable_pitcher.last_name + " (" +
                                    myObj.data.games.game[i].home_probable_pitcher.wins + "-" +
                                    myObj.data.games.game[i].home_probable_pitcher.losses + ") " +
                                    myObj.data.games.game[i].home_probable_pitcher.era;
                            }
                            output.innerHTML += awayPitcher + " vs " + homePitcher + " <br>" +
                                    myObj.data.games.game[i].alerts.text;
                        }
                        //Output inning, current pitcher, and score of in progress game.
                        else {
                            if (myObj.data.games.game[i].status.top_inning === "Y") {
                                output.innerHTML +=
                                    myObj.data.games.game[i].away_team_name + " at " +
                                    myObj.data.games.game[i].home_team_name + " " +
                                    myObj.data.games.game[i].linescore.r.away + " - " +
                                    myObj.data.games.game[i].linescore.r.home + "<br>" +
                                    "Top " + myObj.data.games.game[i].status.inning + " - " +
                                             myObj.data.games.game[i].status.o + " outs <br>" +
              
                                    myObj.data.games.game[i].opposing_pitcher.first + " " +
                                    myObj.data.games.game[i].opposing_pitcher.last + " vs " +

                                    myObj.data.games.game[i].pitcher.first + " " +
                                    myObj.data.games.game[i].pitcher.last + "<br>" +
                                    
                                    myObj.data.games.game[i].pbp.last;

                            }
                            else {
                                output.innerHTML +=
                                    myObj.data.games.game[i].away_team_name + " at " +
                                    myObj.data.games.game[i].home_team_name + " " +
                                    myObj.data.games.game[i].linescore.r.away + " - " +
                                    myObj.data.games.game[i].linescore.r.home + "<br>" +
                                    "Bottom " + myObj.data.games.game[i].status.inning + " - "
                                                myObj.data.games.game[i].status.o + " outs <br>" +

                                    myObj.data.games.game[i].opposing_pitcher.first + " " +
                                    myObj.data.games.game[i].opposing_pitcher.last + " vs " +

                                    myObj.data.games.game[i].pitcher.first + " " +
                                    myObj.data.games.game[i].pitcher.last + "<br>" +

                                    myObj.data.games.game[i].pbp.last;

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