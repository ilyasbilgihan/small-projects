
let isSpinning = false;


let c1 = document.getElementById('wheel1');
let c2 = document.getElementById('wheel2');

let items1 = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let items2 = ["Jennifer Goines", "James Cole", "Deacon", "Dr. C. Railly", "Katarina Jones"]




let h1 = document.querySelector('.history.wheel1');
let h2 = document.querySelector('.history.wheel2');

function spinWheels(){

  if(!isSpinning){
    isSpinning = true;

    w1.spin();
    w2.spin();
    

    setTimeout(() => {
      let el1 = document.createElement('li');
      el1.innerText = w1.labels[w1.current].text;   
      h1.prepend(el1);
      
      let el2 = document.createElement('li');
      el2.innerText = w2.labels[w2.current].text; 
      h2.prepend(el2);

      isSpinning = false;
    }, 5000);
  }
  
}


let w1 = initWheel(c1, 400, items1);
let w2 = initWheel(c2, 400, items2);

function addItemToWheel(wheelName){
  let item = document.querySelector('input[name="'+wheelName+'"]').value;

  if(item != "" && !isSpinning){

    if(wheelName == "wheel1"){

      w1.canvas.style.transition = "";
      w1.addLabel(item);
      setTimeout(() => {
        w1.canvas.style.transition = "transform 5s cubic-bezier(0.3, 1, 0.7, 1)";
      }, 10);

    }else{

      w2.canvas.style.transition = "";
      w2.addLabel(item);
      setTimeout(() => {
        w2.canvas.style.transition = "transform 5s cubic-bezier(0.3, 1, 0.7, 1)";
      }, 10);

    }

  }
}




function initWheel(canvas, size, wheelItems) {

  canvas.width = size;
  canvas.height = size;


  let wheel = new Wheel(size, canvas);

  wheelItems.forEach(item => {
    wheel.addLabel(item);
  });

  canvas.addEventListener('dblclick', (e)=> {

    
    if(wheel.labels.length > 2 && !isSpinning){
      let x = e.layerX;
      let y = e.layerY;
      let degree = findDegree(x, y, size/2);
      let index = Math.floor((degree+(180/wheel.labels.length)) / (360 / wheel.labels.length));
      let realIndex = (index + wheel.current) % wheel.labels.length
      let label = wheel.labels[realIndex];

      if(label){
        wheel.labels.splice(realIndex, 1);
        wheel.colors.splice(realIndex, 1);
        wheel.ctx.clearRect(0, 0, size, size);
        wheel.draw();

        if(realIndex == wheel.current){
          wheel.current = wheel.current%wheel.labels.length;
        }
        if(wheel.current != 0){
          wheel.current -= 1;
        }
        wheel.rotateAmount = (180 / wheel.labels.length) + (wheel.current * (360 / wheel.labels.length));

        wheel.canvas.style.transition = "";
        wheel.canvas.style.transform = `rotate(-${wheel.rotateAmount}deg)`;
        setTimeout(() => {
          wheel.canvas.style.transition = "transform 5s cubic-bezier(0.3, 1, 0.7, 1)";
        }, 10);
      }
    }

  })
  
  return wheel;
}


function Wheel(size, canvas, strokeColor = "#fff") {
  this.x = size/2;
  this.y = size/2;
  this.strokeWidth = size / 100;
  this.strokeColor = strokeColor;
  this.r = (size-this.strokeWidth)/2;
  this.angle = 0;
  this.labels = [];
  this.colors = [];
  this.ctx = canvas.getContext('2d');
  this.current = 0;
  this.rotateAmount = 0;
  this.canvas = canvas;
  


  this.draw = function () {

    this.ctx.translate(this.x, this.y);
    
    this.ctx.strokeStyle = this.strokeColor;

    // The angle of slices is stored in variable "a".
    let a = 2*Math.PI/this.labels.length;

    for (let i = 0; i < this.colors.length; i++) {

      // Coloring the slices.
      this.ctx.beginPath();
      this.ctx.fillStyle = this.colors[i];
      this.ctx.moveTo(0, 0);
    
      this.ctx.arc(0, 0, this.r, i*a, (i+1)*a, false);
      this.ctx.closePath();
      this.ctx.fill();
      
    }

    for (let j = 0; j< this.labels.length; j++){

      // Adding strokes between the slices.
      this.ctx.beginPath();
      this.ctx.moveTo(0, 0);
      this.ctx.lineWidth = this.strokeWidth;
      this.ctx.lineTo(this.r, 0);
      this.ctx.stroke();


      // Adding lables to the center of the slices.
      this.ctx.rotate(a/2);

      this.ctx.font = '16px Arial';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillStyle = '#f8f8f8';
      this.ctx.textAlign = 'end';
      this.ctx.fillText(this.labels[j].text, 85*this.r/100, 4);
      
      this.ctx.rotate(a/2);

    }
    
    // Adding stroke around the wheel.
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.r, 0, 2*Math.PI);
    this.ctx.stroke();

    this.ctx.translate(-this.x, -this.y);
  }
  
  
  this.addLabel = function (text) {
    
    this.colors.push(`rgb(${randomRGB()}, ${randomRGB() / 2}, ${randomRGB() / 2})`);

    this.labels.push({
      text: text
    });

    this.ctx.clearRect(0, 0, size, size);
    this.draw();

    this.rotateAmount = (180 / this.labels.length) + this.current * (360 / (this.labels.length));
    canvas.style.transform = `rotate(-${this.rotateAmount}deg)`;
  
  }


  this.spin = function (){
    let randomIndex = getRandomInt(0, this.labels.length - 1);
    let randomRotateAmount = getRandomInt(3,4) * 360;

    this.rotateAmount += randomIndex * (360 / this.labels.length) + randomRotateAmount;

    canvas.style.transform = `rotate(-${this.rotateAmount}deg)`;

    this.current = (this.current + randomIndex)%this.labels.length;
    // console.log(this.labels[this.current].text);

  }

}


// Utility Functions

function randomRGB () {
  return Math.floor(Math.random()*256);
}

function findDegree (x, y, radius){

  let dx = x - radius;
  let dy = y - radius;
  let angle = Math.atan2(dy, dx) * 180 / Math.PI;

  return angle < 0 ? 360 + angle : angle

}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}