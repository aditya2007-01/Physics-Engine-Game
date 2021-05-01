var Ghost,GhostImage,Tower,TowerImage;
var gameState="PLAY";
var climber ,climberImg;
var door,doorImg;
var doorsGroup;
var climbersGroup;
var backgroundimg;

function preload(){
 GhostImage=loadImage("ghost-standing.png"); 
  TowerImage=loadImage("tower.png");
  climberImg=loadImage("climber.png");
  doorImg=loadImage("door.png");
  bg=loadImage("bg.png")
}
function setup(){
 createCanvas(600,600) ;

  Tower=createSprite(300,300);
  Tower.addImage(TowerImage);
  Tower.velocityY=1;
  
  
  Ghost=createSprite(200,300,20,20);
  Ghost.addImage(GhostImage);
  Ghost.scale=0.5;
  
}
function draw(){
  background("white");
  if(gameState==="PLAY"){
    if(Tower.y>500){
       Tower.y=300;
      
    }
    if(keyDown("space")){
      Ghost.velocityY=-10;
      
      
    }
    
   Ghost.velocityY=Ghost.velocityY+0.5; 
    if(keyDown("right_arrow")){
    Ghost.x=Ghost.x+3;  
    }
    if(keyDown("left_arrow")){
     Ghost.x=Ghost.x-3; 
      
      
    }
    if(Ghost.y>600){
     gameState="END"; 
      Ghost.destroy();
      
    }
    SpawnDoors();
    doorsGroup=new Group();
    climberGroup=new Group();
    
   drawSprites(); 
    
  }
  if(gameState==="END"){
    
    text("gameover",250,300);
    
  }
}
function SpawnDoors(){
if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    Ghost.depth = door.depth;
    Ghost.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}
async function GetbackGroundimg(){

  var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Tokyo")
  var JSON =await response.json()
  var datetime =JSON.datetime
  var hour = datetime.slice(11,13)
  if(hour>=6 & hour<=19){
   TowerImage="tower.png"
 
  }
 else{
  bg="bg.png"
 
 }
 backgroundimg=loadImage(bg)
 
 }