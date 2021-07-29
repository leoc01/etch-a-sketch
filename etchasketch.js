const blocks = document.getElementById('blocks');
let gridSize = 16;


function createGrid(value) {
    blocks.style.gridTemplateColumns = `repeat(${value}, 1fr)`;
    blocks.style.gridTemplateRows = `repeat(${value}, 1fr)`;
}

function createPixel() {
    let pixel = document.createElement('div');
    pixel.className = 'pixel';
    return pixel;
}

function insertPixelInGrid( value ) {
    for( let i = 0; i < value; i++ ) {
        blocks.appendChild( createPixel() );
    }
}

createGrid( gridSize );
insertPixelInGrid( gridSize**2 );

