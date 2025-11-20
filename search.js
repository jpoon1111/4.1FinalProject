window.onload = function () {
  slideOne();
  slideTwo();
};

const sliderOne = document.querySelector("#slider-1");
const sliderTwo = document.querySelector("#slider-2");

let displayValOne = document.querySelector("#range1");
let displayValTwo = document.querySelector("#range2");
let miniGap = 10000;

let sliderTrack = document.querySelector(".slider-track");
//background-color: rgb(96, 52, 177);

let sliderMaxValue = document.querySelector("#slider-1").max;

function slideOne() {
  console.log(parseInt(sliderTwo.value) - parseInt(sliderOne.value));
  if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= miniGap) {
    sliderOne.value = parseInt(sliderTwo.value) - miniGap;
  }

  displayValOne.textContent = sliderOne.value;
  fillColor();
}

function slideTwo() {
  console.log(parseInt(sliderTwo.value) - parseInt(sliderOne.value));
  if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= miniGap) {
    console.log(slideTwo.value);
    sliderTwo.value = parseInt(sliderOne.value) + miniGap;
  }
  displayValTwo.textContent = sliderTwo.value;
  fillColor();
}

function fillColor() {
  percent1 = (sliderOne.value / sliderMaxValue) * 100;
  percent2 = (sliderTwo.value / sliderMaxValue) * 100;
  console.log(percent1, percent2);
  sliderTrack.style.background = `linear-gradient(
    to right, #dadae5 ${percent1}%, rgb(96, 52, 177) 
    ${percent1}%,  rgb(96, 52, 177) ${percent2}%, 
    #dada ${percent2}%
    )`;
  console.log(percent1, percent2);
  console.log(sliderTrack.style.background);
}
