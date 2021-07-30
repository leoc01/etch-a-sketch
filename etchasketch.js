//trying to implement a download/upload functionality
const downloadPimba = document.createElement("a");
const uploadPimba = document.getElementById('load');
downloadPimba.innerHTML = "<button id='savePimba'>Save</button>";
document.getElementById('save').appendChild(downloadPimba);
let content = '';


//BEGINNING OF THE ACTUAL GAME
const whiteCanvas = document.getElementById('whiteCanvas');
const sizeButton = document.getElementById('sizeButton');
const rainbowButton = document.getElementById('rainbowButton');
const allPixels = document.querySelectorAll('.pixel');

let colorBlack = true;
let gridSize = 16;

function createGrid(value) {
    whiteCanvas.style.gridTemplateColumns = `repeat(${value}, 1fr)`;
    whiteCanvas.style.gridTemplateRows = `repeat(${value}, 1fr)`;

    return;
}

function insertPixelInGrid(value) {
    for (let i = 0; i < value; i++) {
        whiteCanvas.appendChild( createPixel() );
    }

    return;
}

function createPixel() {
    let pixel = document.createElement('div');
    pixel.className = 'pixel';
    pixel.style.opacity = 1;
    pixel.style.backgroundColor = 'white';
    pixel.addEventListener( "mouseenter", function () {
        paintPixel(pixel);
    });

    return pixel;
}

function paintPixel(pixel) {
    if ( colorBlack === true ) {
        pixel.style.backgroundColor = 'black';
        pixel.style.opacity = shadesOfGray(pixel);
    } else {
        pixel.style.backgroundColor = randomRainbow();
        pixel.style.opacity = 1;
    }

    return;
}

function shadesOfGray(pixel) {
    let pixelOpacity = parseFloat(pixel.style.opacity);
    
    if ( pixelOpacity === 1 ) {
        pixelOpacity = 0.11;
    } else if ( pixelOpacity < 1 ) {
        pixelOpacity += 0.225;
    }

    return `${pixelOpacity}`;
}

function randomRainbow() {
    let rainbowColor = Math.floor(Math.random() * 7) + 1;

    switch (rainbowColor) {
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

function changeSize(value) {
    if ( value === 64 ) {
        gridSize = resetCanvas(16);
    } else if ( value === 16 ) {
        gridSize = resetCanvas(32);
    } else if ( value === 32 ) {
        gridSize = resetCanvas(48);
    } else {
        gridSize = resetCanvas(64);
    }

    return;
}

function blackOrRainbow() {
    resetCanvas(gridSize);

    if ( colorBlack === true ) {
        colorBlack = false;
    } else {
        colorBlack = true;
    }

    return;
}

function resetCanvas(value) {
    removeAllChildNodes(whiteCanvas);
    createGrid(value);
    insertPixelInGrid( value ** 2 );

    return value;
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }

    return;
}

window.onload = function () {
    createGrid(gridSize);
    insertPixelInGrid(gridSize ** 2);
};

sizeButton.addEventListener( 'click', function () {
    changeSize(gridSize)
});
rainbowButton.addEventListener( 'click', function () {
    blackOrRainbow()
});
//END OF THE ACTUAL GAME

//download/upload function are working, but I still have to figure out how to work with the uploaded file
function downloadFile() {
    let myBlob = new Blob([createFile()], { type: 'text/plain' });
    const blobURL = URL.createObjectURL(myBlob);
    downloadPimba.download = "yourArt.pimba";
    downloadPimba.href = blobURL;

    return;
}

function createFile() {
    content = '';
    let changedPixels = document.querySelectorAll('.pixel');
    let pixelsArray = Array.prototype.slice.call(changedPixels);

    pixelsArray.forEach(e => {
        content += `${e.style.backgroundColor} ${e.style.opacity},`;
    });

    return content;
}

function uploadFile() {
    document.getElementById('fileid').click();
    console.log( readAsText( document.getElementById('fileid').files[0] ) );

    return;
}

downloadPimba.addEventListener( 'click', function () {
    downloadFile()
});
uploadPimba.addEventListener( 'click', uploadFile );

