
var hero = {x:150, y:650}
var villains = [{x:50, y:50},{x:300, y:20}, {x:500, y:0},{x:700, y:0}]
var ammunition = []
var ammunition_2 = []
var score = 0 


function displayHero(){
	output = ''
	output += "<div id='hero' style='left:" + hero.x + "px; top:" + hero.y + "px;'></div>"
	// console.log(output)
	document.getElementById('heroh').innerHTML = output
}

function displayVillains(){
	output = ''
	for(var i=0; i<villains.length; i++){
		output += "<div class='villains' style='left:" + villains[i].x + "px; top:" + villains[i].y + "px;'></div>"
		document.getElementById('villains').innerHTML = output
		villains[i].y += 5
		if(villains[i].y > 800){
			villains[i].y = 0
			villains[i].x = Math.random()*700 
		}
	}
}

function displayAmmunition(){    
 	output = ''
	for(var i=0; i<ammunition.length; i++){
		output += "<div class='ammo' style='left:" + ammunition[i].x + "px; top:" + ammunition[i].y + "px;'></div>"
		document.getElementById('ammunition').innerHTML = output
		ammunition[i].y -= 40
		//remove last item(ammo) from the ammunition array to avoid stack overflow
		if(ammunition[i].y < -35){
			ammunition[i] = ammunition[ammunition.length - 1]
			ammunition.pop()
		}
	}
}

function displayAmmunition_2(){
 	output = ''
	for(var i=0; i<ammunition_2.length; i++){
		output += "<div class='ammo' style='left:" + ammunition_2[i].x + "px; top:" + ammunition_2[i].y + "px;'></div>\n"
		document.getElementById('ammunition_2').innerHTML = output
		ammunition_2[i].y -= 25

		if(ammunition_2[i].y < -35){
			ammunition_2[i] = ammunition_2[ammunition_2.length - 1]
			ammunition_2.pop()
		}
	}
}

function displayExplosion(a,b){
	output = "<div id='explosion' style='left:" + explosion.a + "px; top:" + explosion.b + "px;'></div>"
	document.getElementById('explode').innerHTML = output  
}

function ammunitionVillainCollision(){
	for(var i=0; i<ammunition.length; i++){
		for(var j=0; j<villains.length; j++){
			if(Math.abs(ammunition[i].y - villains[j].y) < 20 && Math.abs(ammunition[i].x - villains[j].x)  <= 60){
				score += 1030
				villains[j] = villains[villains.length -1]
				villains.pop()

				if(villains.length < 1 ){
					win_audio = document.getElementById('winner')
					win_audio.play() 
					document.getElementById('win').innerHTML = "<div id='winner'></div>" 
				}
			}
		}
	}
}
ammunitionVillainCollision()
 
function ammunition_2VillainCollision(){
	for(var i=0; i<ammunition_2.length; i++){
		for(var j=0; j<villains.length; j++){
			if(Math.abs(ammunition_2[i].y - villains[j].y) < 20 && Math.abs(ammunition_2[i].x - villains[j].x) <= 60){
				score += 50
			}
		}
	}
}

function heroVillainDetectionCollision(){
	for(var i=0; i<villains.length; i++){
		if(Math.abs(hero.x - villains[i].x) < 80 && Math.abs(hero.y - villains[i].y) < 100){
			if(score <  0){
				hero = {}
 				document.getElementById('game_over').innerHTML = "<div id='gameover'></div>"
				looser_audio = document.getElementById('looser')
				looser_audio.play()
			}
			else{
				score -= 50
			}
		}
	}
}
heroVillainDetectionCollision()

function displayScore(){
	document.getElementById('score').innerHTML = score
}

function gameplaySound(){
	if(score < 0 || villains.length < 1){
		gameplay_audio.pause()
	}
	else if(villains.length > 0){
		gameplay_audio = document.getElementById('gameplay')
		gameplay_audio.play() 
	}
	
}
// gameplaySound()

setInterval(gameLoop, 100) 
function gameLoop(){ 
	displayHero()
	displayVillains()
	displayAmmunition()
	displayAmmunition_2()
	ammunitionVillainCollision()
	ammunition_2VillainCollision()
	displayScore()
	heroVillainDetectionCollision()
	gameplaySound()
}

document.onkeydown = function(a){
	// console.log(a.keyCode) 
	if(a.keyCode == 38|| a.keyCode == 87){
		hero.y -= 20 
	}
	else if(a.keyCode == 40 || a.keyCode == 83){
		hero.y += 20
	}
	else if(a.keyCode == 39|| a.keyCode == 68){
		hero.x += 20
	}
	else if(a.keyCode == 37|| a.keyCode == 65){
		hero.x -= 20
	}
	else if(a.keyCode == 32){
		ammunition.push({x:hero.x+12, y:hero.y-3}) 
		ammunition_2.push({x:hero.x+60, y:hero.y-3}) 
		ammunition_audio = document.getElementById('ammunition_audio')
		ammunition_audio.play() 
	} 
}



