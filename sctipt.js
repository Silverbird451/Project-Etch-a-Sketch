const container = document.getElementById("grid-container");
container.addEventListener("click",checkIfDraw)
let draw = false;

const blackBtn = document.getElementById("blackBtn");
let black = true;
blackBtn.addEventListener("click", ()=> {
    black = true;
    random = false;
    eraser = false;
    colorPickerPaint = false;

})


const randomBtn = document.getElementById("randomBtn");
let random = false;
randomBtn.addEventListener("click", ()=> {
    black = false;
    random = true;
    eraser = false;
    colorPickerPaint = false;
})


const eraserBtn = document.getElementById("eraserBtn");
let eraser = false;
eraserBtn.addEventListener("click", ()=> {
    black = false;
    random = false;
    eraser = true;
    colorPickerPaint = false;

})


const newBtn = document.getElementById("newBtn");
newBtn.addEventListener("click", () => {
    const value = sliderBar.value; 
    createBoxesInGrid(value); 
    //takes the slider-bar value and uses it to crete the indicated amount of squares in the grid.
})


const sliderBarValue = document.getElementById("slider-value");

const sliderBar = document.getElementById("slider");
sliderBar.addEventListener("input", () => {changeSliderValue()});



const colorPickerBtn = document.getElementById("color-picker");
let colorPickerPaint = false; 
colorPickerBtn.addEventListener("click", () => {
    black = false;
    random = false;
    eraser = false;
    colorPickerPaint = true;
    changePickedColor()})

const pickedColorBox = document.getElementById("picked-color-box");


const bgColorPickerBox = document.getElementById("bg-picked-color-box");

const bgColorPickerBtn = document.getElementById("bg-color-picker");
bgColorPickerBtn.addEventListener("click", () => {pickBackgroundColor()})





function createBoxesInGrid(size){
    console.log("I was clicked")
    const totalBoxes = size*size;
    const boxSize = 800 / size;
    const boxesBGColor = getPickedBackgroundColor();

    container.innerHTML = ""; //clear previous boxes from inside the container

    container.style.gridTemplateColumns = `repeat(${size}, ${boxSize}px)`; //adjust size of grid depending on the boxes per side
    container.style.gridTemplateRows = `repeat(${size}, ${boxSize}px)`; //adjust size of grid depending on the boxes per side


    for(let i = 0; i < totalBoxes; i++){
        const box = document.createElement("div");
        
        box.className = "box";
        box.id = "box";
        box.style.backgroundColor = boxesBGColor;

        box.addEventListener("mouseenter", ()=> {
            if (draw === true){
                box.style.backgroundColor = getWhatColorToPaint();
            }
        });

        container.appendChild(box);
    }
}

//function changeBoxColor(box){
    
    //box.classList.remove("white-box");
    //box.classList.add = "black-box"; 
//}

function checkIfDraw(){
    if (draw === false){
        draw = true
    } else if (draw === true){
        draw = false
    }
}

function getRandomHexColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color; 
}

function getWhatColorToPaint(){
    if (black === true){
        return "black";

    } else if (random === true) {
        const randomColor = getRandomHexColor();
        return randomColor;

    } else if (eraser === true){
        return "white";

    } else if (colorPickerPaint === true){
        const pickedColorToPaint = getPickedColor();
        return pickedColorToPaint;
    } 
}

function changeSliderValue(){
    const value = sliderBar.value;
    sliderBarValue.textContent = `Grid Size: ${value}`;
}

function changePickedColor(){
    const colorInput = document.createElement('input');
    colorInput.type = 'color';

    colorInput.addEventListener('input', function(event) {
      const selectedColor = event.target.value;
      pickedColorBox.style.backgroundColor = selectedColor; //for applying the picked color to the div that shows it in the button
    });

    // Simulate a click event on the color input to open the color picker
    colorInput.click();
}

//function rgbToHex(rgbColor) {
    //const rgbValues = rgbColor.match(/\d+/g);
    //const hexValues = rgbValues.map(value => {
      //const hex = parseInt(value).toString(16);
      //return hex.length === 1 ? `0${hex}` : hex;
    //});
    //return `#${hexValues.join('')}`;
//}

function getPickedColor(){
    const computedStyles = getComputedStyle(pickedColorBox);
    const bgColor = computedStyles.backgroundColor;
    console.log(bgColor)
    return bgColor;
}


function pickBackgroundColor(){
    const colorInput = document.createElement('input');
    colorInput.type = 'color';

    colorInput.addEventListener('input', function(event) {
      const selectedColor = event.target.value;
      bgColorPickerBox.style.backgroundColor = selectedColor; //for applying the picked color to the div that shows it in the button
    });

    // Simulate a click event on the color input to open the color picker
    colorInput.click();
}

function getPickedBackgroundColor(){
    const computedStyles = getComputedStyle(bgColorPickerBox);
    const bgColor = computedStyles.backgroundColor;
    console.log(bgColor)
    return bgColor;
}


createBoxesInGrid(16)