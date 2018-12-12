var sg = 0;
var sp = .2
var num = 300 
var ArrayofStars = [];
var ArrayofGuns = [];
var stars; 
var Mid_of_portalX;
var Mid_of_portalY;
var flag = 0
var RMSpaceship; 
var Gun;
var Bottle;
var MyRick = [];
var NumberOfRicks = 0;
var pr
var ohm
var theme
var button1
var button2
var Fire=[];
var numoffb = 0;
var cf = 0
var Starflag = 0
var Shipflag = 0
var diameter; 
var angle = 0;
var D = 3


function preload() {
  Portal = loadImage('portal.png');	
	Spaceship = loadImage ('rick-and-morty-szechuan-sauce-png.png');
	TheGun = loadImage('portalgun.png');
	TheBottle = loadImage('alcohol-bottle-cartoon-png.png');
	Pickle = loadImage ('cartoon-pickle-png.png')	
	
	theme = loadSound('Rick_and_Morty.mp3')
	ohm = loadSound('oh_man.wav')
	pr = loadSound('pickle_rick.mp3')
	
Fireimg = loadImage ('fireball3.png')
Cloudimg = loadImage ('rick-and-morty-fart-png.png')
Background = loadImage ('rick-and-morty-background-21.jpg')
	
}

function setup() {
	  createCanvas(800, 500);
    Spaceship.resize(400,0);
	  Portal.resize(500,600);
		TheGun.resize(50,0)
		TheBottle.resize(50,0)
		Pickle.resize(50,0)
		Cloudimg.resize(200,0);
		Fireimg.resize(30,0);
		
	  Cloud = new Cloudobject(Cloudimg);
	

	
	for (var i = 0; i <num; i++){   ///define an array of stars
			var stars = new dots;
			stars.PickStarLocation(width,height);
			ArrayofStars[i] = stars;
		}		
	

	
	button1 = createButton('"Hold on, Morty"');
	button1.position(50, 50);
	button1.size(90,50);
  button1.mousePressed(mousePressed1);
	
	button2 = createButton('"Whats that floating in front of the portal?"');
  button2.position(50, 115);
	button2.size(90,70);
  button2.mousePressed(mousePressed2);
		
	theme.setVolume(0.1)
	theme.play();
	theme.loop();
	
	  Mid_of_portalY = 100 + Portal.height/2-Spaceship.height/2;
	  Mid_of_portalX = 900 + Portal.width/2-Spaceship.width/2;
	 	InitX = .0005*width;

	  
	  RMSpaceship = new SpaceshipObject(Spaceship);
		Gun = new Gunobject(TheGun)
		
		for (var i = 0; i <num; i++){   ///define an array of stars
			var stars = new dots;
			stars.PickStarLocation(width,height);
			ArrayofStars[i] = stars;
		}
	for (var i =0;i < 0; i++) {
	  MyRick[i] = new pickleObject(random(width),random(height),Pickle);
	}
	

}

function mousePressed1() {
  if ( ohm.isPlaying() ) 
    ohm.stop();
   else 
    ohm.play();
}
 
function mousePressed2() {
	if (pr.isPlaying () )
		pr.stop()
		else 
			pr.play();
	
}

function draw() {	
	background (0,0,0)
	
		RMSpaceship.HitCheck();
RMSpaceship.AnotherHit();

//Added hitcheck
if (Starflag == 1) {
	image(Background,0,0)
	Portal.resize(1,0)
	Cloudimg.resize(2,0);
	Fireimg.resize(1,0);

}

/// 2nd hitcheck
if (Shipflag == 1) {
	D = 0
	sg == 50
	var n = 50;
		if (keyCode === RIGHT_ARROW) {
			 sg = sg + n
		} else if (keyCode === LEFT_ARROW) {
			 sg = sg - n
		}
	
	
	Mid_of_portalX = 3000	
	
  var c1 =  SineWave(angle,500,100,3,0)
	
	fill(10, 204, 0,255);
 image(Spaceship,c1,random(-2,2)+250);
  
  angle += 1;
	
	
}
	
	//Draw Stars
	for (var i = 0; i <num; i++){
		fill(255);
		ellipse(ArrayofStars[i].X, ArrayofStars[i].Y, D, D);
	}
	
		for (var i =0;i < MyRick.length; i++) {
	  MyRick[i].Display();
	  MyRick[i].X = (MyRick[i].X+MyRick[i].step)%width;
	}	 
	
	
	image(Portal,1100,100); 

		
	
	RMSpaceship.move(sg,this.ratio);
	RMSpaceship.display();
	RMSpaceship.CalculateDistance();
	
	for (var i = 0; i<ArrayofGuns.length; i++){
		ArrayofGuns[i].display();
		ArrayofGuns[i].move();
	}
	
	
	  for (j = 0;j < numoffb;j++){ 
	     Fire[j].display(Fireimg);
			 Fire[j].move(Fire[j].step,1);
	   
			
			if (Fire[j].X < 0) {
			  Fire.splice(0,1);
			  numoffb--;
			 }	
	  }	
		
	Cloud.move(cf);
	Cloud.display(Cloudimg);
}

///forked from one of Prof. Shapiro's in class examples
function SineWave(t,Mean,Fred,Frequency,Phase) {
   angleMode(DEGREES)
   var Output = Mean + Fred*sin(Frequency*t+Phase);
   return Output;
}

function mouseDragged() {
	MyRick[MyRick.length] = new pickleObject(mouseX,mouseY,Pickle);
}

function move (){
	Spaceship.Y = Spaceship.Y + random (-5,5)
}
	
function keyPressed(){
   var n = 50;
		if (keyCode === RIGHT_ARROW) {
			 sg = sg + n
		} else if (keyCode === LEFT_ARROW) {
			 sg = sg - n
		}
	if (sg == Mid_of_portalX) {
		sg = 0
	}
	  var z = 50;
		if (keyCode === DOWN_ARROW) {
			 cf = cf + z
		} else if (keyCode === UP_ARROW) {
			 cf = cf - z
		}
	
	if (keyCode === ENTER){
		Fire[numoffb] = new Laserobject(Fireimg,Cloud.Y,900);
		Fire[numoffb].velocity = -6;
		numoffb++
			
	}

}

function SpaceshipObject(img) {
	this.img = img;
	this.X = img.X;
	this.InitY = 300;
	this.Y = 300;
	
	this.move = function(step,ratio) {
		this.X = InitX+step;
		this.Y = this.InitY + random(-20*this.ratio,20*this.ratio);
	}
	
	this.display = function() {
		image(img,this.X ,this.Y);	
	}

	
	this.CalculateDistance = function() {
		this.Distance = Mid_of_portalX - InitX
		this.ratio = 1-sg/this.Distance

	}
//Added HitCheck	
	this.HitCheck = function (){
		if ( dist(this.X,this.Y,1050,900) < 617.4) {
	     Starflag = 1
		}  
	}
	
	this.AnotherHit = function (){
			if (Starflag == 1){
		Shipflag = 1
	}
	else { Shipflag =0
			}
}
	
}	


function Gunobject(img,X,Y) {
	this.img = img;
	this.X = X;
	this.Y = Y;
	
	
  this.display = function (){
	  image(this.img,this.X,this.Y)
  }

  this.move  = function (){
	  this.X = this.X + random(-1,2);
	  this.Y = this.Y + random(-1,2);
	}	
}

function mousePressed(){

	
		var d = dist(mouseX,mouseY,(RMSpaceship.X+209),(RMSpaceship.Y+120));
		if (d < 100) {
			if (flag) {
	ArrayofGuns.push(new Gunobject(TheGun,mouseX,mouseY));
			}
			else {	ArrayofGuns.push(new Gunobject(TheBottle,mouseX,mouseY));
		
				}
			changeflag();
		}
}

function changeflag (){
	if (flag == 0){
		flag = 1
	}
	else { flag =0
			}
}

function pickleObject (X,Y,img) {
	this.img = img;
	this.X = X;
	this.Y = Y;
	this.step = random(10)-5;
	
  this.Display = function() {
		image(this.img,this.X,this.Y)
	}
}

function move (){
	Cloudimg.X = Cloudimg.X + random (-5,2)
}

function Cloudobject(img) {
	this.img = img;
	this.InitX = 900
	this.X = 900
	this.InitY = .0005*width
	this.Y = img.Y
	this.gofire = 900 //
	
	this.move = function(step) {
		this.Y = this.InitY+step;
		this.X = this.InitX + random(-1,1);

	}
		
		
	this.display = function() {
		image(Cloudimg,this.X ,this.Y);	
	}

}	

function Laserobject(img,step,X){
		this.img = img;
	this.X = X
	this.InitY = (.0005*width)+80
	this.Y = img.Y
	this.step = step
	this.velocity = 0
	
	this.move = function(step,t) {
		this.Y = this.InitY+step;
		this.X = this.X + this.velocity*t
 
	}
		
	this.display = function() {
		image(Fireimg,this.X ,this.Y);
	}
}

function dots() {
	this.X;
	this.Y;
	this.Size;
	
	this.PickStarLocation = function(W,H) {
		this.X = random(W)
		this.Y = random(H)
	}
}
