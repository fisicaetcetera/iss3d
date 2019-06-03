let earthjpg;
let isspng;
let starsjpg;
let assinatura;
let posx=-200, posz=100;
let zsol;
let ysol;
let xsol;
let sollat, sollong;
let isslong, isslat;
const earthradius = 180;
const moonradius = earthradius/3;
const moondistance = earthradius * 50;
const isssize = earthradius/2;
let piover2;
let pi;


function preload() {
  earthjpg = loadImage('earthmap1k.jpg');
  starsjpg = loadImage('stars.jpg');
  isspng = loadImage('iss.png');
}
function setup() {
  pi = PI;
  piover2 = PI/2;
  createCanvas(1400,700, WEBGL);
  const degtorad = PI/180; 
    const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';
    var myVar = setInterval(getISS, 5000);
    async function getISS(){
      const response = await fetch(api_url);
      const data = await response.json();
      isslat = data.latitude * degtorad;
      isslong = data.longitude * degtorad;
      sollat = data.solar_lat * degtorad;
      sollong = data.solar_lon * degtorad;

      //console.log(isslat);
      //console.log(isslong);

    };

  assinatura = createGraphics(600, 150);
  assinatura.background(255, 100);
  assinatura.fill(0);
  assinatura.textAlign(CENTER);
  assinatura.textSize(75);
  assinatura.text('Bonelli_1906', 280, 70);

}

function draw() {
  background(0);
  translate(0,0,mouseX/5);
  
  //ESTRELAS
  //push();
  //translate(0, 0, -1000);
  //texture(starsjpg);
  //plane(2500);
  //pop();

  //ASSINATURA
  push();
  texture(assinatura);
  translate(posx++,50,posz--);
  rotateX(frameCount/185);
  plane(200, 80);
  pop();
  
  //LUZ SOLAR
  //zsol = sin(millis()/1000);
  //xsol = cos(millis()/1000);
  xsol = cos(-sollat+isslat)*sin(-sollong+isslong);
  zsol = cos(-sollat+isslat)*cos(-sollong+isslong);
  ysol = sin(-sollat+isslat);
  directionalLight(255, 255, 255, xsol, ysol, -zsol)
  directionalLight(60,60,60,0,0,-1);
  
  //TERRA
  push();
  texture(earthjpg);
  rotateY(pi-isslong);
  rotateX(isslat);
  sphere(earthradius);
  pop();
  
  //ESTAÇÃO
  push();
  translate(0, 0, earthradius + earthradius/10 );
  texture(isspng);
  plane(isssize);
  pop();

   //LUA
  push();
  //translate(0,0,moondistance/100);
  noStroke();
  rotateY(millis()/1000000);
  translate(0,0,-earthradius*50);
  sphere(moonradius);
  pop();
 


}
