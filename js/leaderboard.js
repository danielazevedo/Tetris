"use strict";


(function()
{
	window.addEventListener("load", main);
}());


function main(){
//	localStorage.clear();

	
	sessionStorage.indice = "-1";
	var bbutton=document.getElementsByTagName('button')[1];
	var btn_submit=document.getElementsByTagName('button')[0];

	var back=function(){
		location.href="../html/menu.html";
	}
	

	var submit = function(){
		submit_name();
	}

	carrega_leaderboard();
	verifica_leaderboard();

	
	bbutton.addEventListener('click', back);
	btn_submit.addEventListener('click', submit);
}

function submit_name(){

	var score = parseInt(sessionStorage.score);
	if(sessionStorage.indice != "-1" && document.getElementById('user').value != ""){

		for(let i = 9; i> parseInt(sessionStorage.indice); i--){
			document.getElementsByClassName('name')[i] = document.getElementsByClassName('name')[i-1];
			document.getElementsByClassName('points')[i] = document.getElementsByClassName('points')[i-1];
			localStorage.setItem("lvl"+i,localStorage.getItem("lvl"+(i-1)));

		}
		
		document.getElementsByClassName('name')[parseInt(sessionStorage.indice)-1].innerHTML=document.getElementById('user').value;
		document.getElementsByClassName('points')[parseInt(sessionStorage.indice)-1].innerHTML=score.toString()+"<br>";
		localStorage.setItem("lvl"+sessionStorage.indice,document.getElementById('user').value+" "+score);
		carrega_leaderboard();

	}
	document.getElementById('user').value = "";
}


function verifica_leaderboard(){
	var score = parseInt(sessionStorage.score);
	var btn = document.getElementsByTagName('button')[1];
	console.log(score);
	if(score != 0){

	for(var i=1;i<=10;i++){
		
			if(score >= parseInt(document.getElementsByClassName('points')[i-1].innerHTML)){
				document.getElementById('user').style.visibility = "visible";
				document.getElementsByTagName('input')[0].style.visibility = "visible";
				var indice = i;
				sessionStorage.indice = indice;
				return;
		}


	}
	if(sessionStorage.flag == "0")
		document.getElementById('warning').style.visibility = "visible";
}

	else{
		if(sessionStorage.flag == "0")
			document.getElementById('warning').style.visibility = "visible";

	}
}

function  carrega_leaderboard(){
	var pontuacoes,dados;
	var count=0;
	for(var i=1;i<=10;i++){
		pontuacoes=localStorage.getItem("lvl"+i);
		if(pontuacoes!=null){
			dados=pontuacoes.split(" ");
			document.getElementsByClassName('name')[i-1].innerHTML=dados[0];
			document.getElementsByClassName('points')[i-1].innerHTML=dados[1]+"<br>";
		}
		else{
			localStorage.setItem("lvl"+i,"None 0");
		}
		


	}
}