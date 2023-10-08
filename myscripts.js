const gridContainer = document.querySelector('#grid');
const drawingTools = document.querySelector('#drawingTools');
const gridInput = document.querySelector('#gridInput');
const displayGrid = document.querySelector('#displayGrid');
const setColor = document.querySelector('#setColor');
const rainbowButton = document.querySelector('.rainbow');
const pageContainer = document.querySelector('#pageContainer');

let isHover = true;
let isDraw = false;
let isRainbow = false;
let isEraser = false;
let color = 'black';
let grid; 

function clear() {
    gridContainer.textContent = '';
}

function removeHandler(...target) {
    for (x in target) {
        const temp = target[x];

        if (temp === 'isHover') {
            gridContainer.removeEventListener('mouseover', hoverHandler);
            isHover = false;
        } else if (temp === 'isDraw') {

        } else if (temp === 'isRainbow') {
            gridContainer.removeEventListener('mouseover', rainbowHandler);
            isRainbow = false;
        } else if (temp === 'isEraser') {

        }
    }
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

function rainbowHandler(event) {
    let color = [];
    for (let i = 0; i < 3; i++) {
        color.push(Math.floor(Math.random() * 256));
    }
    let randomColor = 'rgb(' + color.join(', ') + ')';

    let target = '.' + event.target.classList[1];
    document.querySelector(target).style.backgroundColor = randomColor; 
}

function setColor() {
    setColor.addEventListener('input', (event) => {
        color = event.target.value;
    });
}

function hoverHandler(event) {
    //get the className, change color
    let target = '.' + event.target.classList[1];
    document.querySelector(target).style.backgroundColor = color;
}

function drawHandler(event) {
    let target = '.' + event.target.classList[1];
    document.querySelector(target).style.backgroundColor = color;
}

function buttonHandler() {
    drawingTools.addEventListener('click', (event) => {
        let target = event.target;

        switch(target.className) {
            case 'draw':
                if(isHover === true) {
                    removeHandler('isHover');
                    gridContainer.addEventListener('click', drawHandler);
                    isDraw = true;
                } else if (isDraw === true) {
                    removeHandler('isDraw');
                    gridContainer.addEventListener('mouseover', hoverHandler);
                    isHover = true;
                }
                break;
            case 'rainbow':
                if(isRainbow === false) {
                    gridContainer.addEventListener('mouseover', rainbowHandler);
                }
                break;
            case 'setGrid':
            case 'clear':
                createGrid();
                break;
        }
    });
}

function keydownHandler(event) {
    if(event.code === 'KeyE') {
        console.log("keyE is pressed");
        if(isHover === true) {
            removeHandler('isHover');
            gridContainer.addEventListener('click', drawHandler);
            isDraw = true;
        } else if (isDraw === true) {
            removeHandler('isDraw');
            gridContainer.addEventListener('mouseover', hoverHandler);
            isHover = true;
        }
    }
}

function setColorHandler() {

}

function main() {
    getInitialGrid();
    gridScrollbar();
    createGrid();
    setColor();
    buttonHandler();

    //press e to toggle between hover and draw
    window.addEventListener('keypress', keydownHandler);

    //set mouse hover effect by default
    gridContainer.addEventListener('mouseover', hoverHandler);
}

main();

//rainbow, draw, hover, eraser
//add hover
//when draw button is clicked,
//remove


//toggle between draw and hover
