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
const shadeButton = document.querySelector('.shade');

let isHover = true;
let isDraw = false;
let isSetColor = true;
let isRainbow = false;
let isEraser = false;
let isShade = false;
let activeButton; //store currently active button when using eraser
let currentGridColor;
let color = 'rgb(0, 0, 0)';
let grid; //use to calculate the size of grid
let isMouseDown = false;

function clear() {
    gridContainer.textContent = '';
}

function eraser() {
    if(!isEraser) {
        // activeButton = checkActiveButton();
        removeHandler('isSetColor', 'isRainbow', 'isShade');
        color = 'rgb(255, 255, 255)';
        addHandler('isEraser');

    } else if (isEraser) {
        removeHandler('isEraser');
        addHandler('isSetColor');
    }
}

function checkActiveButton() {
    if (isSetColor) {
        return 'isSetColor';
    } else if (isRainbow) {
        return 'isRainbow';
    } else if (isShade) {
        return 'isShade';
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

        case 'isShade':
            shadeButton.classList.add('activeButton');
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

        case 'isShade':
            shadeButton.classList.remove('activeButton');
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
            gridContainer.addEventListener('mousedown', mouseDownEvent);
            gridContainer.addEventListener('mouseup', mouseUpEvent);
            gridContainer.addEventListener('mouseover', draw);
            isDraw = true;
            break;

        case 'isSetColor':
            setColorButton.addEventListener('input', setColor);
            color = setColorButton.value;
            isSetColor = true;
            break;

        case 'isRainbow':
            // gridContainer.addEventListener('mouseover', rainbow);
            isRainbow = true;
            break;

        case 'isEraser':
            isEraser = true;
            break;

        case 'isShade':
            gridContainer.addEventListener('mouseover', shade);
            isShade = true;
            break;
    }
    addClickEffect(target);
}

function removeHandler(...target) {
    for (let x in target) {
        const temp = target[x];

        if (temp === 'isHover' && temp) {
            gridContainer.removeEventListener('mouseover', hoverHandler);
            isHover = false;
        } else if (temp === 'isDraw' && temp) {
            gridContainer.removeEventListener('mouseover', draw);
            gridContainer.removeEventListener('mousedown', mouseDownEvent);
            gridContainer.removeEventListener('mouseup', mouseUpEvent);
            isDraw = false;
        } else if (temp === 'isSetColor' && temp) {
            setColorButton.removeEventListener('input', setColor);
            isSetColor = false;
        } else if (temp === 'isRainbow' && temp) {
            // gridContainer.removeEventListener('mouseover', rainbow);
            isRainbow = false;
        } else if (temp === 'isEraser' && temp) {
            isEraser = false;
        } else if (temp === 'isShade' && temp) {
            isShade = false;
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
        newDiv.style.cssText = "flex: 1 1 auto; background-color: rgb(255, 255, 255);";
        newDiv.style.minWidth = gridWidth + '%';
        gridContainer.appendChild(newDiv);
    }
    return;
}

function hoverHandler(event) {
    //check for the current grid color
    currentGridColor = event.target.style.backgroundColor;

    if (isShade) {
        shade();
    } else if (isRainbow) {
        rainbow();
    }
    event.target.style.backgroundColor = color;
}

function mouseDownEvent(event) {
    if(isShade) {
        shade();
    } else if (isRainbow) {
        rainbow();
    }
    event.target.style.backgroundColor = color;
    isMouseDown = true;
}

function mouseUpEvent() {
    isMouseDown = false
}

function draw(event) {
    //check for the current grid color
    currentGridColor = event.target.style.backgroundColor;

    if(isMouseDown) {
        if(isShade) {
            shade();
        } else if (isRainbow) {
            rainbow();
        }
        event.target.style.backgroundColor = color;
    } 
}

function drawHandler() {
    if (isHover) {
        removeHandler('isHover');
        addHandler('isDraw');

    } else if (isDraw) {
        removeHandler('isDraw');
        addHandler('isHover');
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
        removeHandler('isSetColor', 'isEraser', 'isShade');
        addHandler('isRainbow');

    } else if (isRainbow) {
        color = setColorButton.value;
        removeHandler('isRainbow', 'isEraser', 'isShade');
        addHandler('isSetColor');

    } else {
        //if eraser is on and user clicked rainbow, turn eraser off and rainbow on
        removeHandler('isEraser', 'isSetColor', 'isShade');
        activeButton = null;
        addHandler('isRainbow');
    }
}

function setColor(event) {
    color = event.target.value;
}

function setColorHandler() {
    if (!isSetColor) {
        removeHandler('isRainbow', 'isEraser', 'isShade');
        addHandler('setColor');
        isSetColor = true;
    }
}

function shadeHandler() {
    if(!isShade) {
        removeHandler('isSetColor', 'isRainbow', 'isEraser');
        addHandler('isShade');
    } else if (isShade) {
        removeHandler('isShade');
        addHandler('isSetColor');
    }
}

function shade(event) {
    let rgb = currentGridColor.split(",");
    let red = rgb[0].substr(4);
    let green = rgb[1];
    let blue = rgb[2].slice(0, -1);

    //the max value of rgb is 255, to make a color black on the 10th click,
    //set the num to 255/10 = 25.5
    const num = 25.5; 

    //red
    if(red <= num) {
        red = red - red;
    } else if(red > num) {
        red = red - num;
    }

    //green
    if(green <= num) {
        green = green - green;
    } else if(green > num) {
        green = green - num;
    }

    //blue
    if(blue <= num) {
        blue = blue - blue;
    } else if(blue > num) {
        blue = blue - num;
    }

    let newShade = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
    // console.log(newShade);
    color = newShade
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
            
            case 'shade':
                shadeHandler();
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

        case 'KeyS':
            shadeHandler()
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

