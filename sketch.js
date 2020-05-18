let angle = 0;
let grapgics;
let mouth;
let eye;
let sky;
let s;
let cam;
let bread;
let Park;
let sound;

function preload() {
mouth = loadImage('mouth.jpg');
eye = loadImage('eye.jpg');
sky = loadImage('sky.jpg');
bread = loadImage('bread.jpg');
Park = loadImage('Park.jpg');
soundFormats('mp3');
sound = loadSound('music.mp3');
}

function setup() {

createCanvas(900, 600, WEBGL);

s = createGraphics(300, 300);
s.fill('magenta');
s.textAlign(CENTER, CENTER);
s.textSize(32);
s.text('home,city,planet,universe',150, 150);
cam = createCapture(VIDEO);
cam.hide();

//sound.loop();

}

function draw() {
  background(40);
  let radius = width * 2.5;
  
  push();
  translate(-width /5, -height /5, -250);
  translate(p5.Vector.fromAngle(millis() / 1000, 100));
  //ambientLight(255);
  rotateZ(angle * 0.01);
  rotateX(angle * 0.5);
  rotateY(angle);
  texture(bread);
  box(70, 60);
  pop();
  
  push();
  translate(-900, 100);
  ambientLight(255);
  rotateZ(angle * 0.01);
  rotateX(angle * 0.4);
  rotateY(angle);
  texture(cam);
  noStroke();
  box(mouseX, mouseY,400,300);
  pop();
  
  push();
  tree(300, 300, angle);
  noStroke();
  ambientLight(255, 255);
  let c = map(-mouseX, 0, width, 20, 200, 200);
  let d = map(mouseX, 0, width, 100, 200, 350);
  rotateZ(angle * 0.01);
  rotateX(angle * 0.01);
  rotateY(angle);
  texture(eye);
  ellipse(-width/10, -height/11, d, d);
  pop();
  
  push();
  translate(300, 200);
  noStroke();
  ambientLight(255, 255);
  rotateZ(angle * 0.01);
  rotateX(angle * 0.01);
  rotateY(angle);
  texture(s);
  sphere(400, 400);
  pop();
  

  push();
  translate(-440, -200);
  rotateX(HALF_PI);
  ambientLight(255);
  noStroke();
  rotateY(angle *2 );
  texture(Park);
  sphere(200,200);
  pop();
  
  angle += 0.03;
  orbitControl();
  normalMaterial();
  translate(0, 0, -600);
  for (let i = 0; i <= 12; i++) {
    for (let j = 0; j <= 12; j++) {
      
      push();
      let dx = mouseX - width / 2;
      let dy = mouseY - height / 2;
      let v = createVector(dx,dy, 0);
      v.div(200);
      directionalLight(255, 255,255, v);
      let a = (j / 12) * PI;
      let b = (i / 12) * PI;
      translate(
        sin(2 * a) * radius * sin(b),
        (cos(b) * radius) / 2,
        cos(2 * a) * radius * sin(b)
      );
      if (j % 2 === 0) {
        texture(sky);
        sphere(70, 20);
      } else {
        texture(mouth);
        box(100, 100, 100);
      }
      pop();
    }
  }
}

// Tree
function tree(w, h, angle) {
  push();
  stroke('rgba(0,255,0,2)');
  theta = angle % (PI/6);
  translate(w/2,h);
  // Draw a line h/3 pixels
  line(0,0,0,-h/3);
  // Move to the end of that line
  translate(0,-h/3);
  // Start the recursive branching
  branch(h/3)
  pop();
}

function branch(h) {
  h *= 0.66;
  if (h > 2) {
    push();
    rotate(theta);
    line(0, 0, 0, -h);
    translate(0, -h);
    branch(h);
    pop();
    push(); //another side of the tree
    rotate(-theta);
    line(0, 0, 0, -h);
    translate(0, -h);
    branch(h);
    pop();
  }
}