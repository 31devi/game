//create a Rectangle class 
class Rectangle {
  isReachedEnd = false;
  rectangleX = null;
  rectangleY = null;
  ctx = null;

  constructor(xAxis, yAxis, ctx) {
    this.rectangleX = xAxis;
    this.rectangleY = yAxis;
    this.ctx = ctx;
  }
  //get the Rectanglexaxis and return the rectangle
  getRectangleXAxis() {
    return this.rectangleX;
  }
//get the Rectanglyaxis and return the rectangle
  getRectangleYAxis() {
    return this.rectangleY;
  }
// move function

  move() {
    if (this.rectangleY == 0 && !this.isReachedEnd) {    // the  move rectangleY equal to zero and not the reach its true  
      this.isReachedEnd = true;
    } else if (this.rectangleY == 260 && this.isReachedEnd) { // the move  rectangleY equle to 260  and  its reach the end its flase
      this.isReachedEnd = false;
    } else if (this.rectangleY > 0 && !this.isReachedEnd) {      // the rectangelY greate then zero and not reach decress the rectangle
      this.rectangleY--;
    } else if (this.isReachedEnd) {
      this.rectangleY++;  // its e reach the rectangle increass
    }
  }

  draw() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.rectangleX, this.rectangleY, 50, 50);  


  }
  
}


let c = document.getElementById("myCanvas");
let context = c.getContext("2d");

//load image using call back function
let Loadimages = (callback) => {
  let img = document.createElement("img");

  img.onload = () => callback(img);
  img.src = "https://cdn.glitch.com/eb8b28ef-c0c2-4a49-84a1-530dece94a42%2Fball.png?v=1620496168159";
};

let imageX = 0;

let draw = null;
let rectangles = [
  new Rectangle(300, 250, context),      
  new Rectangle(600, 175, context),
  new Rectangle(900, 100, context)
]
 // animate function
let animate = (ctx, image) => {
  draw = setInterval(() => {
    ctx.clearRect(0, 0, 1200, 300);

    ctx.drawImage(image, imageX ,
       100, 120, 100);

    let xAxis1 = 210, xAxis2 = 300;
    for (const iterator of rectangles) {
      if (iterator.getRectangleYAxis() >= 70 && iterator.getRectangleYAxis() <= 190) {  // if the rectangle Yaxis greate than or equal 70 
        //and less the or equl to 190
        if (imageX >= xAxis1 && imageX <= xAxis2 ) { // imagex is greater than or equal to xAxs1 and less the or equal to xaxis2
          clearInterval(draw);
          alert("Game Over");    // is game over
          location.reload();
        }
      }
      xAxis1 += 310; xAxis2 += 300;

      iterator.move();   
      iterator.draw();
    }
  // above the 1090  win the game
    if (imageX > 1090) {      
      alert("You won the game");
      clearInterval(draw);
      location.reload();
    }
  }, 10);
};

Loadimages((images) => {
  animate(context, images);

  document.addEventListener("keydown", (event) => {
    const key = event.key
    if (key ==  "ArrowRight") { 
      // ball moves Right side
      imageX = imageX + 50;
      
    } else if (key == "ArrowLeft") { // ball moves Left side
      imageX = imageX - 20;
    }
   
  });
});
