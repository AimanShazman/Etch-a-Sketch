const gridContainer = document.querySelector('#grid');
const drawingTools = document.querySelector('#drawingTools');
const gridInput = document.querySelector('#gridInput');
const displayGrid = document.querySelector('#displayGrid');
const setColorButton = document.querySelector('.setColor');
const pageContainer = document.querySelector('#pageContainer');
const rainbowButton = document.querySelector('.rainbow');
const setGridButton = document.querySelector('.setGrid');
const drawButton = document.querySelector('.draw');
const eraserButton = document.querySelector('.eraser');
const clearButton = document.querySelector('.clear');


let isHover = true;
let isDraw = false;
let isSetColor = true;
let isRainbow = false;
let isEraser = false;
let activeButton; //store currently active button when using eraser
let color = 'black';
let grid; 

function clear() {
    gridContainer.textContent = '';
}

function eraser() {
    if(isEraser === false) {
        activeButton = checkActiveButton();
        removeHandler(activeButton);
        color = 'white';
        addHandler('isEraser');

    } else if (isEraser === true) {
        addHandler(activeButton);
        activeButton = null;
        removeHandler('isEraser');
    }
}

function checkActiveButton() {
    if (isSetColor) {
        return 'isSetColor';
    } else if (isRainbow) {
        return 'isRainbow';
    }
}

function addClickEffect(target) {
    switch(target) {
        case 'isDraw':
            drawButton.classList.add('activeButton');
            break;

        case 'isRainbow':
            rainbowButton.classList.add('activeButton');
            break;

        case 'isEraser':
            eraserButton.classList.add('activeButton');
            break;

        default:
            break;
    }
}

function removeClickEffect(target) {
    switch(target) {
        case 'isDraw':
            drawButton.classList.remove('activeButton');
            break;

        case 'isRainbow':
            rainbowButton.classList.remove('activeButton');
            break;

        case 'isEraser':
            eraserButton.classList.remove('activeButton');
            break;

        default:
            break;
    }
}

function addHandler(target) {
    switch(target) {
        case 'isHover':
            gridContainer.addEventListener('mouseover', hoverHandler);
            isHover = true;
            break;

        case 'isDraw':
            gridContainer.addEventListener('click', draw);
            isDraw = true;
            break;

        case 'isSetColor':
            setColorButton.addEventListener('input', setColor);
            color = setColorButton.value;
            isSetColor = true;
            break;

        case 'isRainbow':
            gridContainer.addEventListener('mouseover', rainbow);
            isRainbow = true;
            break;

        case 'isEraser':
            isEraser = true;
            break;
    }
    addClickEffect(target);
    // buttonHoverEffect(target);
}

function removeHandler(...target) {
    for (x in target) {
        const temp = target[x];

        if (temp === 'isHover' && temp) {
            gridContainer.removeEventListener('mouseover', hoverHandler);
            isHover = false;
        } else if (temp === 'isDraw' && temp) {
            gridContainer.removeEventListener('click', draw);
            isDraw = false;
        } else if (temp === 'isSetColor' && temp) {
            setColorButton.removeEventListener('input', setColor);
            isSetColor = false;
        } else if (temp === 'isRainbow' && temp) {
            gridContainer.removeEventListener('mouseover', rainbow);
            isRainbow = false;
        } else if (temp === 'isEraser' && temp) {
            isEraser = false;
        }
        removeClickEffect(temp);
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

function hoverHandler(event) {
    //get the className, change color
    let target = '.' + event.target.classList[1];
    document.querySelector(target).style.backgroundColor = color;
}

function draw(event) {
    let target = '.' + event.target.classList[1];
    document.querySelector(target).style.backgroundColor = color;
}

function drawHandler() {
    if (isHover) {
        removeHandler('isHover');
        addHandler('isDraw');
        isDraw = true;

    } else if (isDraw) {
        removeHandler('isDraw');
        addHandler('isHover');
        isHover = true;
    }
}

function rainbow() {
    let colorArray = [];
    for (let i = 0; i < 3; i++) {
        colorArray.push(Math.floor(Math.random() * 256));
    }
    let randomColor = 'rgb(' + colorArray.join(', ') + ')';
    color = randomColor;
}

function rainbowHandler() {
    if (isSetColor) {
        removeHandler('isSetColor', 'isEraser');
        addHandler('isRainbow');

    } else if (isRainbow) {
        color = setColorButton.value;
        removeHandler('isRainbow', 'isEraser');
        addHandler('isSetColor');

    } else {
        //if eraser is on and user clicked rainbow, turn eraser off and rainbow on
        removeHandler('isEraser', 'isSetColor');
        activeButton = null;
        addHandler('isRainbow');
    }
}

function setColor(event) {
    color = event.target.value;
}

function setColorHandler() {
    if (!isSetColor) {
        removeHandler('isRainbow', 'isEraser');
        addHandler('setColor');
        isSetColor = true;
    }
}

function buttonHandler() {
    drawingTools.addEventListener('click', (event) => {
        let target = event.target.classList[1];

        switch(target) {
            case 'draw':
                drawHandler();
                break;

            case 'setColor':
                setColorHandler();
                break;

            case 'rainbow':
                rainbowHandler();
                break;

            case 'eraser':
                eraser();
                break;

            case 'setGrid':
            case 'clear':
                createGrid();
                break;
        }
    });
}

function keydownHandler(event) {
    switch (event.code) {
        case 'KeyQ':
            drawHandler();
            break;
        
        case 'KeyE':
            eraser();
            break;
        
        case 'KeyR':
            rainbowHandler();
            break;
    }
}


function main() {
    getInitialGrid();
    gridScrollbar();
    createGrid();
    buttonHandler();

    //set black by default color
    setColorButton.addEventListener('input', setColor);

    //set mouse hover effect by default
    gridContainer.addEventListener('mouseover', hoverHandler);

    //press e to toggle between hover and draw
    //press r to toggle between setColor and rainbow mode
    window.addEventListener('keypress', keydownHandler);
}

main();

