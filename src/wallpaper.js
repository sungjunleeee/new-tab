const body = document.querySelector("body");

const IMG_NUMBER = 3;

function handleImageLoad(){
    console.log("finished loading");
}

function showImage(imgNum){
    const image = new Image();
    image.src = `/src/images/${imgNum + 1}.jpg`;
    image.classList.add("bgImage");
    body.appendChild(image);
    image.addEventListener("loadend", handleImageLoad);
}

function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init() {
    const randomNumber = genRandom();
    showImage(randomNumber);
}

init();