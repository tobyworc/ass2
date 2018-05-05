	
	var hs1 = localStorage.getItem("hs1");
	var hs2 = localStorage.getItem("hs2");
	var hs3 = localStorage.getItem("hs3");
	var hs4 = localStorage.getItem("hs4");
	var hs5 = localStorage.getItem("hs5");
	
	function highscores(){
	
	document.getElementById("hScore1").innerHTML = "Highscore 1: " + hs1;
	document.getElementById("hScore2").innerHTML = "Highscore 2: " + hs2;
	document.getElementById("hScore3").innerHTML = "Highscore 2: " + hs3;
	document.getElementById("hScore4").innerHTML = "Highscore 3: " + hs4;
	document.getElementById("hScore5").innerHTML = "Highscore 4: " + hs5;
	
	};
	
	$("#HSbutton").click(highscores);