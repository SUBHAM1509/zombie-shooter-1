var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie;
var gravestone;
var ammo

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  zombieImg = loadImage("assets/zombie.png")
  player_fallen = loadImage("assets/shooter-fallen.png")
  graveyard = loadImage("assets/rip.png")
  ammoImg = loadImage("assets/bullet.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   gravestone = createSprite(displayWidth/2,displayHeight/2)
   gravestone.x = player.x
   gravestone.y = player.y
   gravestone.addImage(graveyard)
   gravestone.scale=1.6
   gravestone.visible=false

   ammoGroup = new Group()
  

spawnZombie()

}

function draw() {
  background(0); 


if(zombie.isTouching(player)){
player.addImage(player_fallen)
player.scale=0.6
zombie.visible=false;
player.visible=false;
gravestone.visible=true
ammoGroup.visible=false;
ammoGroup.destroyEach()
}

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  spawnAmmo()
  player.addImage(shooter_shooting)
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

drawSprites();

}

function spawnZombie() {
if(frameCount % 80 === 0){
  

  zombie=createSprite(displayWidth,400)
zombie.addImage(zombieImg)
zombie.velocityX=-10
zombie.scale=0.15
}

}

function spawnAmmo() {
  ammo = createSprite(displayWidth,displayHeight)
  ammo.x = player.x
  ammo.y = player.y
  ammo.addImage(ammoImg)
  ammo.scale=0.13
  ammo.velocityX = 10
  ammoGroup.add(ammo)
}