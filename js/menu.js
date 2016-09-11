"use strict";

(function()
{
    //automatically called as soon as the javascript is loaded
    window.addEventListener("load", main);
}());




function main(){

	sessionStorage.total_linhas = parseInt(0);
    sessionStorage.nivel = 0;
    sessionStorage.score = parseInt(0);
    sessionStorage.flag = "1";

	var playbtn = document.getElementsByTagName("button")[0];
	var leaderboardbtn = document.getElementsByTagName("button")[1];
	var quitbtn = document.getElementsByTagName("button")[2];

	var playHandler=function(ev){
				location.href=('../html/main.html');
	}

	var leaderboardHandler=function(ev){
				location.href=('../html/leaderboard.html');
	}

	var quitHandler=function(ev){
			window.close();	
	}




	

	playbtn.addEventListener('click', playHandler);
	leaderboardbtn.addEventListener('click', leaderboardHandler);
	quitbtn.addEventListener('click', quitHandler);



}