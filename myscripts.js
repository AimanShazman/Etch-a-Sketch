const gridContainer = document.querySelector('#grid');
const colorButton = document.querySelector('.color');
const rainbowButton = document.querySelector('.rainbow');
const drawButton = document.querySelector('.draw');
const eraserButton = document.querySelector('.eraser');
const clearButton = document.querySelector('.clear');

let isHover = true;
let isDraw = false;
let isRainbow = false;
let setColor;
let totalPixels = 100;

// main();
setGrid();

function main() {
    //draw mode button

    //rainbow mode button
    //clear button
    //set grid size button
    //set color
}

function setGrid() {
    let gridWidth = gridContainer.clientWidth; 

    //width of each pixel = sqrt of total number of pixels /  grid's width
    //Next, convert it to a percentage of the grid's width. (ans*100 / grid's width)
    let eachPixelWidth = Math.round((gridWidth / Math.sqrt(totalPixels))*100 / gridWidth); 

    //create grid 
    for (let i = 1; i <= totalPixels; i++) {
        const newDiv = document.createElement('div');
        let className = "pixel_" + i;
        newDiv.classList.add("pixels", className);
        newDiv.style.cssText = "flex: 1 1 auto; background-color: white;";
        newDiv.style.minWidth = eachPixelWidth + '%';
        gridContainer.appendChild(newDiv);
    }
    return;
}

//default: set the grid to 16x16, hover mode to draw, black color
// the user can customize the settings to his liking
//Buttons: -draw mode, -rainbow mode, -clear, -set grid size, -set color
//the size of the drawing container will not change, only the pixel inside it will