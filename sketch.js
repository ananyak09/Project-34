//Create variables here
var dogI,happyDogI;
var dog ;
var database;
var foodS, foodStock;

function preload()
{
  //load images here
  dogI = loadImage("images/dogImg.png");
  happyDogI = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500 , 500);
  
  var dog = createSprite(250,250,10,10);
  dog.addImage(dogI);
  //dog.addImage("xyz",happyDogI);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

}

function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDogI);
  }

  //add styles here
  textSize(20);
  fill(0);
  stroke(10);
  text("   Food Left:" + foodS,150,100);
  text("  NOTE: "+ "Press Up Arrow key to feed Drago milk !",25,50);

  drawSprites();

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x -= 1;
  }
  database.ref('/').update({
    Food:x
  })
}



