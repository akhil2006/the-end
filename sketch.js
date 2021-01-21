localStorage["HighestScore"]=0;

var trex,trex_running

var ground,ground_image

var invisible_ground

var cloud_image

var obstacle1_image
 
var obstacle2_image

var obstacle3_image

var obstacle4_image

var obstacle5_image

var obstacle6_image

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var gameOver

var gameover_img

var restart_img

var restart

var trex_collided

var ObstaclesGroup

var CloudsGroup

var score

var jump

var die

var checkpoint

function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
    trex_collided=loadAnimation("trex_collided.png");
  
  ground_image=loadImage("ground2.png");
  
  cloud_image=loadImage("cloud.png");
  
obstacle1_image=loadImage("obstacle1.png");
obstacle2_image=loadImage("obstacle2.png");
obstacle3_image=loadImage("obstacle3.png");
obstacle4_image=loadImage("obstacle4.png");
obstacle5_image=loadImage("obstacle5.png");
obstacle6_image=loadImage("obstacle6.png");
  
  gameover_img=loadImage("gameOver.png");
  restart_img=loadImage("restart.png");
  
  jump=loadSound("jump.mp3");
  die=loadSound("die.mp3");
  checkpoint=loadSound("checkPoint.mp3");
}
function setup() {
      createCanvas(displayWidth-20, displayHeight-165);
  
  trex=createSprite(100,180);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale=0.5;
  
  ground=createSprite(200,180,400,20);
  ground.addImage(ground_image);
  ground.x=ground.width/2
 
  
  invisible_ground=createSprite(200,192,400,20);
  invisible_ground.visible=false;
  
  gameOver=createSprite(200,300);
  gameOver.addImage(gameover_img);
  gameOver.scale=0.7;
  gameOver.visible=false;
  
  restart = createSprite(200,340);
  restart.addImage(restart_img);
  restart.scale=0.7;
  restart.visible=false;
  
  ObstaclesGroup=createGroup();
  CloudsGroup=createGroup();
  
  score=0;
  
  //place gameOver and restart icon on the screen
     gameOver = createSprite(300,100);
     restart = createSprite(300,140);
    
    gameOver.addImage(gameover_img);
    gameOver.scale = 0.5;
    restart.addImage(restart_img);
    restart.scale = 0.5;
}

function draw() {
  
  background(255);
     
  trex.collide(invisible_ground);

  trex.setCollider("circle",0,0,40);
  textSize(20);
     text("score: "+score,470,50) ;
  text("High score :"+localStorage["HighestScore"],300,50);
  if(gameState==PLAY){
    
    score=score+Math.round(getFrameRate()/60);

     ground.velocityX=-6 ;
    
    gameOver.visible=false;
    restart.visible=false;
    
    if(ObstaclesGroup.isTouching(trex)){
       gameState=END
      die.play();
       }
    
  if(ground.x<0){
    ground.x=ground.width/2
  }
  
    ground.velocityX=-(6+3*score/100);
        
  if(keyDown("space") && trex.isTouching(ground)){
     trex.velocityY=-12    
     jump.play();
     }
  if(score>0 && score%100==0){
     checkpoint.play();
     }
  trex.velocityY=trex.velocityY+0.8;   
  
  spawnClouds();
  spawnObstacles();  
  }else if(gameState==END){
    
    gameOver.visible=true;
    restart.visible=true;
    
    
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
      
    
  }
     
    if(mousePressedOver(restart)){
       reset();
       }
    
  drawSprites(); 
}

function reset(){
  gameState=PLAY;
  if(localStorage["HighestScore"]<score){
   localStorage["HighestScore"]=score;
  }
  score=0;
  CloudsGroup.destroyEach();
  ObstaclesGroup.destroyEach();
  gameOver.visible=false;
  restart.visible=false;
  trex.changeAnimation("running",trex_running);
  //   trex.y=385;
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(displayWidth-20,120,40,10);
    cloud.y = random(80,120);
    cloud.addImage(cloud_image);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
     //assign lifetime to the variable
    cloud.lifetime = 210;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    CloudsGroup.add(cloud);
  }
  
  }

function spawnObstacles(){
  //spawn obstacles

  if(World.frameCount%60==0){
var obstacle=createSprite(displayWidth-20,165,10,10);
    obstacle.scale=0.5;                 
    obstacle.velocityX=-6;
    obstacle.lifetime=250;
    ObstaclesGroup.add(obstacle);
    obstacle.velocityX=-(6+3*score/100);
    
var rand=Math.round(random(1,6));
    switch(rand){
        case 1:obstacle.addImage(obstacle1_image);
        break;
        case 2:obstacle.addImage(obstacle2_image);
        break;
        case 3:obstacle.addImage(obstacle3_image);
        break;
        case 4:obstacle.addImage(obstacle4_image);
        break;
        case 5:obstacle.addImage(obstacle5_image);
        break;
        case 6:obstacle.addImage(obstacle6_image);
        break;
        default:break;
      
    }                       
}
}















