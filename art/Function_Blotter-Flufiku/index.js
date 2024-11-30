/*
@title: Function_Blotter
@author: Flufiku
@snapshot: heart.png
*/










const width = 125;
const height = 125;

setDocDimensions(width, height);

// store final lines here
const finalLines = [];

HeartGraph()
//FlowerGraph()
//StarGraph()










function StarGraph()
{
  const Resolution = 10;

  function Star(angle)
  {
    return Math.abs(Math.sin((angle)*2.5))+0.5
  }

  drawgraph_polar(Resolution, [0, Math.PI*2], Star)

  let thisgraph = finalLines.pop()
  thisgraph.push(thisgraph[0])
  finalLines.push(thisgraph)
}










function FlowerGraph()
{
  const Resolution = 366;

  function Petals(angle)
  {
    return Math.abs(Math.sin((angle+Math.PI/2)*2.5))+0.5
  }

  drawgraph_polar(Resolution, [0, Math.PI*2+0.1], Petals)

  function Center(angle)
  {
    return 1
  }

  drawgraph_polar(Resolution, [0, Math.PI*2+0.1], Center, 3)
}










function HeartGraph()
{
  const Resolution = 100;
  
  function Heart(angle)
  {
    return Math.sin(angle)*Math.sqrt(Math.abs(Math.cos(angle))) / (Math.sin(angle) + 7/5) - 2*Math.sin(angle) + 2;
  }
  
  drawgraph_polar(Resolution*3+1, [0,Math.PI*2+0.1], Heart)
  
  finalLines.push(bt.scale(bt.translate([finalLines.pop()], [0, width/2]), 0.7, [width/2, height/2])[0])
  
  
  
  function Line(x){return Math.sin(x)}
  drawgraph_cartesian(Resolution, [-Math.PI*9, Math.PI*9], Line, 16)
  
  function Line2(x){return Math.sin(x) - height/96}
  drawgraph_cartesian(Resolution, [-Math.PI*9, Math.PI*9], Line2, 16)
  
  function Line3(x){return Math.sin(x) - height/96 * 2}
  drawgraph_cartesian(Resolution, [-Math.PI*9, Math.PI*9], Line3, 16)
  
  function Line4(x){return Math.sin(x) - height/96 * 3}
  drawgraph_cartesian(Resolution, [-Math.PI*9, Math.PI*9], Line4, 16)
  
  function Line5(x){return Math.sin(x) - height/96 * 4}
  drawgraph_cartesian(Resolution, [-Math.PI*9, Math.PI*9], Line5, 16)
}










function drawgraph_cartesian(resolution, range, y, range_y=0)
{
//resolution (int): How many lines to draw the function with
//range ([float, float]): From where to where to graph the function, i.e. [-5, 5] means graphing fomr -5 to 5
//y (function): Function taking in an x value and returning a corresponding y
//range_y (float): OPTIONAL, defines the max height of the graph
  
//Calculates the Points where Lines need to be drawn
let polyline = [];
for (let i = 0; i < resolution; i++)
{
  let x = i/resolution;
  let point = [x, y(range[0]+x*range[1])];
  polyline.push(point);
}

//Get the maximum Amplitude of the Graph
let maxAmp = 0;
if (range_y == 0)
{
  for (let i = 0; i < polyline.length; i++)
  {
    if (Math.abs(polyline[i][1]) > maxAmp)
    {
      maxAmp = Math.abs(polyline[i][1]);
    }
  }
}
else
{
  maxAmp = range_y
}

//Centers and enlarges the graph
for (let i = 0; i < polyline.length; i++)
{
  polyline[i] = [polyline[i][0]*width, polyline[i][1]/maxAmp*height/2 + height/2];
}

// add the polyline to the final lines
finalLines.push(polyline);
}



  

function drawgraph_polar(resolution, range, y, range_y=0)
{
//resolution (int): How many lines to draw the function with
//range ([float, float]): From where to where to graph the function, i.e. [-5, 5] means graphing fomr -5 to 5
//y (function): Function taking in an x value and returning a corresponding y
//range_y (float): OPTIONAL, defines the max height of the graph
  
//Calculates the Points where Lines need to be drawn
let polyline = [];
for (let i = 0; i < resolution; i++)
{
  let x = i/resolution;
  let point = [range[0]+x*range[1], y(range[0]+x*range[1])];
  polyline.push(point);
}

//Get the maximum Amplitude of the Graph
let maxAmp = 0;
if (range_y == 0)
{
  for (let i = 0; i < polyline.length; i++)
  {
    if (Math.abs(polyline[i][1]) > maxAmp)
    {
      maxAmp = Math.abs(polyline[i][1]);
    }
  }
}
else
{
  maxAmp = range_y
}

//Centers and enlarges the graph
for (let i = 0; i < polyline.length; i++)
{
  polyline[i] = [Math.cos(polyline[i][0])*polyline[i][1]/maxAmp*width/2 + width/2, Math.sin(polyline[i][0])*polyline[i][1]/maxAmp*height/2 + height/2];
}

// add the polyline to the final lines
finalLines.push(polyline);
}
  




// draw it
drawLines(finalLines);