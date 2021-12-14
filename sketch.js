var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);

  spookySound.loop()

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost= createSprite(300,300,20,40),
  ghost.addImage(ghostImg);
  ghost.scale=0.4;
  
  invisibleBlockGroup=new Group(); 
  climbersGroup=new Group();
  doorsGroup = new Group();
}

function draw() {
  background(000);

  if(gameState === "play"){
    if(tower.y > 400){
      tower.y = 300
  }
  if(keyDown("a")){
  ghost.x = ghost.x-3;
  }

  if(keyDown("d")){
    ghost.x = ghost.x +3;
   }

  if(keyDown("space")){
   ghost.velocityY = -3
  }

  if(climbersGroup.isTouching(ghost)){
   ghost.velocityY=0;
  }
  if(invisibleBlockGroup.isTouching(ghost)|| ghost.y>600){
  ghost.destroy();
  gameState="end";
  }
  ghost.velocityY=ghost.velocityY+0.8
  
  spawDoors()
  drawSprites();
  }
  
  if(gameState === "end"){
  stroke("yellow");
  fill('yellow');
  textSize(30);
  text("GAME OVER",250,300);
  }
  
}

function spawDoors(){
 if(frameCount % 240 === 0){
  door = createSprite(200,-10,20,100);
 door.addImage(doorImg);
 door.x =Math.round(random(120,400));
 door.velocityY = 1;
 door.lifetime = 700;
 ghost.depth=door.depth;
 ghost.depth = ghost.depth +1;
 doorsGroup.add(door);
//climbers
 climber=createSprite(200,55,20,100);
 climber.addImage(climberImg);
 climber.x = door.x;
 climber.velocityY = 1;
 climber.lifetime = 700;
 climbersGroup.add(climber);
//bloco invisivel
 invisibleBlock=createSprite(65,65,10,2);
 invisibleBlock.width=climber.width;
 invisibleBlock.x = door.x;
 invisibleBlock.velocityY = 1;
 invisibleBlock.debug=true;
 invisibleBlockGroup.add(invisibleBlock);
 invisibleBlock.lifetime=700;
 }
}

