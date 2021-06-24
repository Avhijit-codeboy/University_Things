let bird;
let pipes = [];
let scores = 0;
let score1 = document.querySelector("#div0");
//score1.innerHTML="jmfnkdj";
function setup(){
	let cnv = createCanvas(800,630);
	cnv.position(0,0);
	bird = new Bird();
	pipes.push(new Pipe());
}
function draw(){
	background(0);
	for(let i = pipes.length-1;i>=0;i--){
		pipes[i].show();
		pipes[i].update();
		if(!pipes[i].hits(bird)){
			scores++;
			//console.log(scores/100);
			score1.innerHTML = (scores/100).toString();
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
