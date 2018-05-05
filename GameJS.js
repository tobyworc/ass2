
var count = 20;
var spawnCount = 100;
var score = 0;
var lives = 3;
var PowerUpTimer = 10000;
var playerColour;
var ScreenH = screen.height;
var ScreenW = screen.width;
var screenClicked = 0;

//document.getElementById("score").innerHTML = score
//document.getElementById("lives").innerHTML = lives

	window.onload = function(){
	$("#GameCanvas").hide();	
	$("#Display").hide();
	startScreen();
	highscores();
	
	function startScreen(){
		$("#startButton").click(function(){
			$("#GameCanvas").show();	
			$("#Display").show();
			$("#startButton").parent().hide();	
			$("#quitButton").parent().hide();
			screenClicked = 0;
			
			startGame();
		})
	}
	}
	
	function startGame(){
	var canvas = document.getElementById("GameCanvas");
	var gc = canvas.getContext("2d");
	
	document.getElementById("ScoreDisplay").innerHTML = "Score: " + score;
	document.getElementById("LivesDisplay").innerHTML = "Lives: " + lives;
	
	
	var player = {
		x:canvas.width/2,
		y:canvas.height - 30,
		w:25,
		h:25,
	};
	
	var ShotX 
	var ShotY
	
	//var dPressed = false;
	//var aPressed = false;
	//var sPressed = false;
	//var wPressed = false;
	
	var bulletArray = [];
	
	var enemyArray = [];
	
	var powerUpArray = [];
	
	
	//document.addEventListener("keydown", keyDownHandler, false);
	//document.addEventListener("keyup", keyUpHandler, false);
	
	function drawChar(){
		
		gc.beginPath();
		gc.rect(player.x, player.y, player.w, player.h);
		gc.fillStyle = playerColour;
		gc.fill();
		gc.closePath();
		
	}
	
	function drawBullet(){
		
		for ( var i = 0 ; i < bulletArray.length ; i++ ){
			
			var bullet = bulletArray[i]
				
				bullet.y += -10;			
			
			gc.beginPath();
			gc.rect(bullet.x, bullet.y, bullet.w, bullet.h);
			gc.fillStyle = "red";
			gc.fill();
			gc.closePath();
			
			if (bullet.x > canvas.width || bullet.y >canvas.height || bullet.x < 0 || bullet.y < 0){
				
				bulletArray.splice(i, 1)
				
			}
			
		}
		
	}
	
	function drawEnemy(){
		
		for ( var i = 0 ; i < enemyArray.length ; i++ ){
			
			var enemy = enemyArray[i]
			
			enemy.y = enemy.y + 3;

			
			gc.beginPath();
			gc.rect(enemy.x, enemy.y, enemy.w, enemy.h);
			gc.fillStyle = "green";
			gc.fill();
			gc.closePath();
		}
	}
	
	function EnemyBulletCollision(){
		
		for ( var i = 0 ; i < enemyArray.length ; i++ ){
		
		for ( var j = 0 ; j < bulletArray.length ; j++ ){
		
		var enemy = enemyArray[i]
		
		var bullet = bulletArray[j]
		
		var collide = isColliding(enemy, bullet)
		
		if (collide == true){
			
			enemyArray.splice(i, 1)
			bulletArray.splice(j, 1)
			
			score = score + 1
			
		document.getElementById("ScoreDisplay").innerHTML = "Score: " + score;
			
		}
		
		}
		
		
	}}
	
	function EnemyPlayerCollision(){
		
		for ( var i = 0 ; i < enemyArray.length ; i++ ){
			
			var enemy = enemyArray[i]
			
			var collide = isColliding(enemy, player)
			
			if (collide == true){
			
			enemyArray.splice(0, enemyArray.length)
			
			bulletArray.splice(0, bulletArray.length)
			
			//powerUpArray.splice(0, powerUpArray.length)
			
			//isPoweredUp = false;
			
			lives = lives - 1;
			screenClicked = 0;
			
			document.getElementById("LivesDisplay").innerHTML = "Lives: " + lives;
			
			if (lives == 0){
				
				var hs1 = localStorage.getItem("hs1");
				var hs2 = localStorage.getItem("hs2");
				var hs3 = localStorage.getItem("hs3");
				var hs4 = localStorage.getItem("hs4");
				var hs5 = localStorage.getItem("hs5");
				
				if (hs1 == "" || hs1<score) {
					
					localStorage.setItem("hs1", score);
					
				} else if (hs2 == "" || hs2<score) {
					
					localStorage.setItem("hs2", score);
					
				} else if (hs3 == "" || hs3<score) {
					
					localStorage.setItem("hs3", score);
					
				} else if (hs4 == "" || hs4<score) {
					
					localStorage.setItem("hs4", score);
					
				} else if (hs5 == "" || hs5<score) {
					
					localStorage.setItem("hs5", score);
					
				};
				
				console.log(hs1);
				console.log(hs2);
				console.log(hs3);
				console.log(hs4);
				console.log(hs5);
				
				
				window.location.reload();				
			}
			
			//document.getElementById("lives").innerHTML = lives
			
			player.x = canvas.width/2
			player.y = canvas.height - 30;
		}
			
		}
		
	}
	
	function isColliding(rect1,rect2){
		
		if (rect1.x < rect2.x + rect2.w &&
            rect1.x + rect1.w > rect2.x &&
            rect1.y < rect2.y + rect2.h &&
            rect1.h + rect1.y > rect2.y){
			
				return true
				
			} else {
				
				return false
				
			}
		
	}
	
	function drawPowerUp(){
		
	}
	
	function PowerUpPlayerCollision(){
		
	}
	
	function spawnEnemy(){
		
		var pos = Math.floor( Math.random() * (canvas.width-30) );
		
		// 0 = top 1 = right 2 = bot 3 = left
		
		var Enemy = {
			w:30,
			h:30
		};
		
		Enemy.x = pos;
		Enemy.y = 0;

			enemyArray.push(Enemy);
		
	}
	
	function DisplayScoreboard(){
		
	}
	
	function DrawBackground(){
		
		gc.beginPath();
		gc.rect(0, 0, canvas.width, canvas.height);
		gc.fillStyle = "#2C3E50  ";
		gc.fill();
		gc.closePath();
		
	}
	
	function render(){
			
		playerColour = "blue";		
		
		gc.clearRect(0,0,canvas.width,canvas.height);
		
		DrawBackground();
		drawChar();
		drawBullet();	
		//DisplayScoreboard();
		//drawPowerUp();
		//PowerUpPlayerCollision();
		
		if (spawnCount == 100){
			
			spawnEnemy();
			
			spawnCount = 0;
			
		}
		
		drawEnemy();
		EnemyBulletCollision();
		EnemyPlayerCollision();
		
		
		if(screenClicked == 2 && player.x <canvas.width-player.w){
			
			player.x +=5;
			
		}
		
		if(screenClicked == 1 && player.x > 0){
			
			player.x -=5;
			
		}
		

		
		if (count == 20){
			
			bulletArray.push({
				x : player.x,
				y : player.y,
				w : 10,
				h : 10,
			})
		
		count = 0
		
		}
		
		count ++
		spawnCount ++
	}
		
		setInterval(render,10);
		
		
		
	$("#mainDiv").click(function(e) {
		var divWidth = $("#mainDiv").width();		
		var clickX = e.clientX;
		
		if ($("GameCanvas").parent().is(":hidden")){
			
			screenClicked = 0;
			
		} else{
		
		if (clickX > divWidth/2) {
			
			if (screenClicked !== 2 ){
				
				screenClicked = 2;
				
			} else {
				
				screenClicked = 0;
				
			}	
			
		console.log("Div was clicked on the right");
		} else {
			
			if (screenClicked !== 1 ){
				
				screenClicked = 1;
				
			} else {
				
				screenClicked = 0;
				
			}
			
		console.log("Div was clicked on the left");
		}};
		});
		
		
		
	}
	