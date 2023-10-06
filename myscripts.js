const gridContainer = document.querySelector('#grid');
const drawingTools = document.querySelector('#drawingTools');
const gridInput = document.querySelector('#gridInput');
const displayGrid = document.querySelector('#displayGrid');

let isHover = true;
let isDraw = false;
let isRainbow = false;
let setColor = 'black';
let grid; 

function mouseoverHandler(event) {
    //get the className, change color
    let target = '.' + event.target.classList[1];
    document.querySelector(target).style.backgroundColor = setColor;
}

function getInitialGrid() {
    grid = gridInput.value;
}

function gridScrollbar() {
    displayGrid.textContent = grid + ' x ' + grid;

    gridInput.addEventListener('input', (event) => {
        grid = event.target.value;
        displayGrid.textContent = grid + ' x ' + grid;
    });
}

function clear() {
    gridContainer.textContent = '';
}

function createGrid() {
    clear();
    let totalGridWidth = gridContainer.clientWidth; 

    //width of each grid(ans) = number of grid in one row / grid's width.
    //Next, convert it to a percentage of the grid's width. 
    let gridWidth = Math.round((totalGridWidth / grid) * (100 / totalGridWidth)); 

    //create grid 
    for (let i = 1; i <= grid * grid; i++) {
        const newDiv = document.createElement('div');
        let className = "grid_" + i;
        newDiv.classList.add("grids", className);
        newDiv.style.cssText = "flex: 1 1 auto; background-color: white;";
        newDiv.style.minWidth = gridWidth + '%';
        gridContainer.appendChild(newDiv);
    }
    return;
}

function main() {
    getInitialGrid();
    gridScrollbar();
    createGrid();

    if(isHover === true) {
        gridContainer.addEventListener('mouseover', mouseoverHandler);
    }

    //set grid size button
    drawingTools.addEventListener('click', (event) => {
        let target = event.target;

        switch(target.className) {
            case 'setGrid':
            case 'clear':
                createGrid();
                break;
        }
    });
    //draw mode button
    //rainbow mode button
    //clear button
    //set color
}

main();

//default: set the grid to 16x16, hover mode to draw, black color
// the user can customize the settings to his liking
//Buttons: -draw mode, -rainbow mode, -clear, -set grid size, -set color
//the size of the drawing container will not change, only the pixel inside it will


