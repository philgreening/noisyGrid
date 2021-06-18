var stepSize = 20;

function setup() {
  createCanvas(500, 500);
}
///////////////////////////////////////////////////////////////////////
function draw() {
  background(125);

  colorGrid();
  compassGrid();
}
///////////////////////////////////////////////////////////////////////
function colorGrid()
{
  var start = color(102,255, 255);
  var end = color(0,0,51);

  for (var x = 0; x < width; x += stepSize)
  {
    for (var y = 0; y < height; y += stepSize)
    {
      // Scales speed, mapped to MouseX
      var sX = map(mouseX, 0, width, 1, 500);
      // Scales resolution, mapped to MouseY
      var sY = map(mouseY, 0, height, 1, 500 );

      //Creates noise value based on X and Y coordinates, scaled with sX and SY
      var n = noise(x/sY, y/sY, frameCount  /sX );
      //Blends two colours and uses noise to control interpolation
      var c = lerpColor(start,end,n);

      fill(c);
      noStroke();
      rect(x , y , stepSize, stepSize);
    }
  }
}
///////////////////////////////////////////////////////////////////////
function compassGrid()
{
  //translate origin to centre of tile
  translate(12.5, 12.5);

  for (var x = 0; x < width; x += stepSize )
  {
    for (var y = 0; y < height; y += stepSize)
    {
      //Scales speed, mapped to mouseX
      var s = map(mouseX, 0, width, 1, 250);
      //Creates noise value based on X and Y coordinates, scaled with s
      var n = noise(x/s, y/s, frameCount  /s ) ;
      //Maps noise value to create an angle
      var angle = map(n,0,1,0,720);
      //Maps noise to create a random compass line and colour
      var lineSize = map(n, 0, 1, 1 , stepSize);
      var lineColour = map(n, 0, 1, 0, 255);

      stroke(lineColour);
      strokeWeight(3);

      push();
      translate(x,y);
      rotate(radians(angle));
      line(0, 0, 0,-lineSize);
      pop();

    }
  }
}
