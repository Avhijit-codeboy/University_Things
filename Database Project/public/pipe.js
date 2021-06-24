function Pipe() {
	this.top = random(height/2);
	this.bottom = random(height/2);
	this.x = width;
	this.w = 35;
	this.speed = 2;
	this.a = img1;
	this.highlight = false;
	this.hits = (bird)=>{
		if(bird.y<this.top||bird.y>height-this.bottom){
			if(bird.x>this.x&&bird.x<this.x+this.w){
				this.highlight = true;
			return true;
		}
		}
		this.highlight = false;
		return false;
	}
	this.show =()=>{
		this.a=img1;
		if(this.highlight){
			this.a=img2;
		}
		image(this.a,this.x,0,this.w,this.top);
		image(this.a,this.x,height-this.bottom,this.w,this.bottom);
	}
	this.update=()=>{
		this.x-=this.speed;
	}
	this.offscreen=()=>{
		if(this.x<-this.w){
			return true;
		}else{
			return false;
		}
	}
}