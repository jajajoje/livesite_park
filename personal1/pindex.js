const debug = true

let coordsArray = [  [1, 2, 3],
  [-4, 5, 6]
];

let rotationX = 0;
let rotationY = 0;
let rotationZ = 0;

let canvas = document.getElementById('canvasId');
let context = canvas.getContext('2d');

document.getElementById("debug").innerHTML = "New text!";

updateScreen();

var zPower = 0
var yPower = 0
var xPower = 0


// listening for wasdrf
document.addEventListener('keydown', (event) => {
    var name = event.key;
    var code = event.code;
    code == 'KeyW' ? zPower++:code == 'KeyS' ? zPower--:code == 'KeyA' ? yPower++:code == 'KeyD' ? yPower--:code == 'KeyR' ? xPower++:code == 'KeyF' ? xPower--:console.log("all failed")
    updateScreen();
    debug ? console.log(zPower, yPower, xPower, name, code): false
    // alert(`Key pressed ${name} \r\n Key code value: ${code}`);
  }, false);

//setInterval(updateRotation,100)

function updateRotation(){
    console.log("yes")
    rotationX = rotationX + xPower >= 1 ? 10 : xPower <= -1 ? -10 : 0
    rotationY = rotationY + yPower >= 1 ? 10 : yPower <= -1 ? -10 : 0
    rotationZ = rotationZ + zPower >= 1 ? 10 : zPower <= -1 ? -10 : 0
};

context.fillStyle = 'blue';

function updateScreen(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    debug ? console.log("debug on") : false
    for (var i = 0; i < coordsArray.length; i++){
        let projectedCoords = project3DCoords(coordsArray[i], rotationX, rotationY, rotationZ);
        context.fillRect(500+projectedCoords[0]*4, 500+projectedCoords[1]*4, 5, 5);
        for (let coords of projectedCoords) {
            context.fillRect(500+coords[0]*4, 500+coords[1]*4, 5, 5);
        }
    }
}

function project3DCoords(coordsArray, rotationX, rotationY, rotationZ) {
    let projectedCoords = [];

    // Rotate the 3D coordinates around the x axis
    let rotatedX = coordsArray[0];
    let rotatedY = coordsArray[1] * Math.cos(rotationX) - coordsArray[2] * Math.sin(rotationX);
    let rotatedZ = coordsArray[1] * Math.sin(rotationX) + coordsArray[2] * Math.cos(rotationX);

    // Rotate the rotated coordinates around the y axis
    rotatedX = rotatedX * Math.cos(rotationY) + rotatedZ * Math.sin(rotationY);
    rotatedY = rotatedY;
    rotatedZ = -rotatedX * Math.sin(rotationY) + rotatedZ * Math.cos(rotationY);

    // Rotate the rotated coordinates around the z axis
    rotatedX = rotatedX * Math.cos(rotationZ) - rotatedY * Math.sin(rotationZ);
    rotatedY = rotatedX * Math.sin(rotationZ) + rotatedY * Math.cos(rotationZ);
    rotatedZ = rotatedZ;

    // Project the rotated coordinates onto the 2D screen
    let x = rotatedX;
    let y = rotatedY;

    projectedCoords = [x,y]

    return projectedCoords;
    }