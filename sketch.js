//let cam;
let earthjpg;
let isspng;
let starsjpg;
let assinatura;
let posx=-200, posz=100;
let zsol;
let xsol;

function preload() {
  earthjpg = loadImage('earthmap1k.jpg');
  starsjpg = loadImage('stars.jpg');
  isspng = loadImage('iss.png');
}

function setup() {
  createCanvas(1400,600, WEBGL);
  assinatura = createGraphics(600, 150);
  assinatura.background(255, 100);
  assinatura.fill(0);
  assinatura.textAlign(CENTER);
  assinatura.textSize(75);
  assinatura.text('Bonelli_1905', 280, 70);

}

function draw() {
  background(0);
  translate(0,0,mouseX/5);
  //push();
  //translate(0, 0, -1000);
  //texture(starsjpg);
  //plane(2500);
  //pop();

  push();
  texture(assinatura);
  translate(posx++,50,posz--);
  rotateX(frameCount/185);
  plane(200, 80);
  pop();
  
  zsol = sin(millis()/10000);
  xsol = cos(millis()/10000);
  directionalLight(255, 255, 255, -xsol, 0, -zsol)
  pointLight(0,0,205,0,0,395);

  push();

  texture(earthjpg);
  rotateY(-frameCount / 2280);
  sphere(250);
    
  pop();
  
  push();
  translate(0, 0, 250 + 25 );
  texture(isspng);
  plane(100);
  pop();

  
 


}
