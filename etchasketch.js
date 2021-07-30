const whiteCanvas = document.getElementById('whiteCanvas');
const sizeButton = document.getElementById('sizeButton');
const rainbowButton = document.getElementById('rainbowButton');
const allPixels = document.querySelectorAll('.pixel');

let colorBlack = true;
let gridSize = 16;

function createGrid(value) {
    whiteCanvas.style.gridTemplateColumns = `repeat(${value}, 1fr)`;
    whiteCanvas.style.gridTemplateRows = `repeat(${value}, 1fr)`;
}

function createPixel() {
    let pixel = document.createElement('div');
    pixel.className = 'pixel';
    pixel.style.opacity = '1';
    pixel.addEventListener("mouseenter", function() { 
        paintPixel(pixel);
    });
    return pixel;
}

function insertPixelInGrid(value) {
    for (let i = 0; i < value; i++) {
        whiteCanvas.appendChild(createPixel());
    }
}

function changeSize(value) {
    if (value === 64) {
        gridSize = resetCanvas(16);
    } else if (value === 16) {
        gridSize = resetCanvas(32);
    } else if (value === 32) {
        gridSize = resetCanvas(48);
    } else {
        gridSize = resetCanvas(64);
    }
    ;
}

function resetCanvas(value) {
    whiteCanvas.innerHTML = '';
    createGrid(value);
    insertPixelInGrid(value ** 2);
    return value;
}

function blackOrRainbow(value) {
    gridSize = resetCanvas( gridSize );

    if ( value === true ) {
        return false;
    }
    return true;
}

function paintPixel(c) {
    if( colorBlack === true ) {
        c.style.background  = 'black';

        let pixelOpacity = parseFloat(c.style.opacity);
        if( pixelOpacity === 1 ) {
            pixelOpacity = 0;
        }

        if (pixelOpacity < 1) {
            pixelOpacity += 0.21;
        }
        
        c.style.opacity = `${pixelOpacity}`;
    } else {
        c.style.background  = randomRainbow();
        c.style.opacity = 1;
    }
}

function randomRainbow() {
    let rainbowColor = Math.floor(Math.random() * 7) + 1;

    switch(rainbowColor) {
        case 1:
            color = 'violet';
        break;
        case 2:
            color = 'indigo';
        break;
        case 3:
            color = 'blue';
        break;
        case 4:
            color = 'green';
        break;
        case 5:
            color = 'yellow';
        break;
        case 6:
            color = 'orange';
        break;
        default:
            color = 'red';
    }

    return color;
}

window.onload = function () {
    createGrid(gridSize);
    insertPixelInGrid(gridSize ** 2);
};

sizeButton.addEventListener('click', function () { changeSize(gridSize) });
rainbowButton.addEventListener('click', function() { colorBlack = blackOrRainbow(colorBlack) });
