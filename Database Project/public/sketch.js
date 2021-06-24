let bird;
let pipes = [];
let scores = 0;
let bg;
let score1 = document.querySelector("#div0");
let inputscore = document.querySelector("#abc");
inputscore.style.visibility = "hidden";
function preload(){
	img1 = loadImage('/pipe1.png');
	img2 = loadImage('/pipeRed.png');
	img3 = loadImage('/donald.png');
}
function setup(){
	let cnv = createCanvas(800,630);
	cnv.position(0,0);
	bg = loadImage('/flappybird.png');
	bird = new Bird();
	pipes.push(new Pipe());
}
function draw(){
	background(bg);
	for(let i = pipes.length-1;i>=0;i--){
		pipes[i].show();
		pipes[i].update();
		if(!pipes[i].hits(bird)){
			scores++;
			//console.log(scores/100);
			score1.innerHTML = (scores/100).toString();
			inputscore.value = (scores/100).toString();
		}
		if(pipes[i].offscreen()){
			pipes.splice()
		}
	}
	bird.update();
	bird.show();
	if(frameCount%100==0){
		pipes.push(new Pipe());
	}
}
function keyPressed(){
	if(key==' '){
		bird.up(); 
	}
}
