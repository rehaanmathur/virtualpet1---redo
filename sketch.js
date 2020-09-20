//Create variables here
var dog,happyDog,database,foodS,foodStock;
function preload()
{
 dog=loadImage("images/dogimg.png");
 happyDog = loadImage("images/dogimg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  dog1 = createSprite(235,200)
  dog1.addImage(dog);
  dog1.scale  = 0.3;
 
  foodStock = database.ref('food');
  foodStock.on("value",readStock);
 
  
}


function draw() {  
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodStock);
    dog1.addImage(happyDog);
  }

  drawSprites();
  //add styles here
  fill("black");
  textSize(18);
  text("Press up arrow key to feed the dog!",130,10,300,20);
  text("food remaining : "+foodStock,100,450)
  

}
function readStock(data){
  foodStock=data.val();
}
function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }

  database.ref('/').update({
    food:x
  })
}



