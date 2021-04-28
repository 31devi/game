let c = document.getElementById("myCanvas");

let ctx = c.getContext("2d");
ctx.beginPath();
//loadeimage the images
let loadimage = (src, callback) => {
  let img = document.createElement("img");

  img.onload = () => callback(img);
  img.src = src;
};
let imagepath = (framenumber) => {
  return "" + framenumber + ".png";
};
//loadimage 
let Loadimages = (callback) => {
  let images = [];
  let imagetoload = 2;
  [1, 2].forEach((framenumber) => {
    let path = imagepath(framenumber);
    loadimage(path, (image) => {
      images[framenumber - 1] = image;
      imagetoload = imagetoload - 1;
      if (imagetoload === 0) {
        callback(images);
      }
    });
  });
};

let x = 0;
let y = 200;
// the array store the retangelaxis
let rectangleXAxis = [300, 600, 900];
let rectangleYAxis = [250, 175, 100];
//animate the function
let animate = (ctx, images, callback) => {
  images.forEach((image, index) => {
    setTimeout(() => {
      ctx.clearRect(0, 0, 1200, 300);

      ctx.drawImage(image, x,y, 120, 100);
//draw a square
      let drawRectangle = (xAxis, yAxis) => {
        ctx.beginPath();
        ctx.fillRect(xAxis, yAxis, 40, 40);
        ctx.fillStyle = "#FF0000";
        ctx.stroke();
        ctx.closePath();
      };
//callback to the drawRectangle 
      drawRectangle(rectangleXAxis[0], rectangleYAxis[0]);
      drawRectangle(rectangleXAxis[1], rectangleYAxis[1]);
      drawRectangle(rectangleXAxis[2], rectangleYAxis[2]);
    }, index * 100);
  });

  setTimeout(callback, images.length * 100);
};

Loadimages((images) => {
  animate(ctx, images, () => {});

  document.getElementById("right").onclick = () => {
    x = x + 50;
//call the animate function ,once hit the ball reloade the game
    animate(ctx, images, () => {
      for (let i = 0; i < 3; i++) {
        if (rectangleXAxis[i] == x + 100 && rectangleYAxis[i] == y + 50) {
          
          alert("reload");
          location.reload();
        }
        console.log(x + "out condtion");
      }
      if(x>1000){
        alert("game over");
        location.reload();
      }
    });
  };
  document.getElementById("up").onclick = () => {
    y = y - 75;
    animate(ctx, images, () => {});
  };
});
