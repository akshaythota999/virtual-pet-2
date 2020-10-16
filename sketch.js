//Create variables here
var dog,happydog,database,foodS,foodstock,realdog,fedTime,lastFed1,foodObj;
function preload()
{
  dog=loadImage("images/dogImg.png")
  happydog=loadImage("images/dogImg1.png")
	//load images here
}

function setup() {
  createCanvas(500,500);
  realdog=createSprite(250,250,50,50)
  realdog.scale=0.5;
  realdog.addImage(dog)
  database=firebase.database()
  fedTime=database.ref('feedtime')
  fedTime.on("value",function(data){
    lastFed1=data.val();
  })
  foodstock=database.ref('food')
  foodstock.on("value",readStock)
  foodobj = new Food1()
}


function draw() {  
  background(46,139,87);
  var button=createButton("add food")
    button.position(130,80)
    button.mousePressed(addFood)
  var button1=createButton("feed dog")
    button1.position(130,110)
  
  text("note:press up arrow to feed dog!")
  textSize(20)
  
  display();
  drawSprites();
  //add styles here

}
function readStock(data){
  foodS=database.val();
}
function writeStock(x){
  if(x<=0){
    x=0
  }else{
    x=x-1;
  }
  database.ref('/').update({
    food:x
  })
}
function addFood(){
  foodS++;
  database.ref('/').update({Food:foodS
  })
}
function feedDog(){
  realdog.addImage("happydog")
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedtime:hour()
  })
}

