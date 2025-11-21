//API : https://www.omdbapi.com/?apikey=da55dd74&s=%22fast%22

/*
Here are the requirements for the Module 4 final project 👇

HTML Structure: Properly structured HTML with semantic elements

Styling (CSS): Layout and design using CSS

API Fetching: Use an external API to fetch data dynamically

Search Bar: User can type and search through the API

Dynamic Results Display: Show results dynamically on the page

Responsiveness: Make sure it looks good on both desktop and mobile

Bonus(optional): Add a filter feature
*/
const moviesResult = document.querySelector(`#movies`);
const searchName = document.querySelector(`#search__name`);
let currentMovies;

// async function main() {
//   try {
//     const response = await fetch(`https://www.omdbapi.com/?apikey=da55dd74&s="fast"`);
    
//     // Check if the response is ok (status 200)
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
    
//     const usersData = await response.json(); // Convert the response to JSON
//     const usersDataResult =  usersData.Search;
    
//     console.log(usersDataResult); // Log the JSON data by "Search"
//     usersDataResult.map((movie) => console.log(movie));

//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }
//   main();


/**
The functions slideOne() and slideTwo() are executed only after the webpage is completely loaded.
This guarantees that all DOM elements are accessible when these functions run, preventing potential errors from attempting to access elements that are not yet rendered.
2. Indicators of Initial State
Calling slideOne() and slideTwo() immediately upon load likely sets the initial state of your sliders based on their current values.
This allows you to display their values correctly and ensures that any related visual elements, such as the fill color of the slider track, are updated from the start.
3. Preventing Race Conditions
Without window.onload, if your script is placed in the <head> section without proper deferment, the code might run before the elements it references are available, leading to null or undefined errors.
 */
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


 // this will calculate the current range and fill based on where it is
// fills the color gray for areas not part of the range
// this will work anything between 0 to current thumb for slider1
// and fills the range between two numbers in purple
// this will work anything between current to max value thumb for slider2
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




function searchChange(ev){
  console.log(ev.target.value);
  const showLoader = document.querySelector('');
  resetSort();
  document.querySelector('#movieSort').selectedIndex;
  console.log(document.querySelector('#movieSort').selectedIndex);
  renderMovies(ev.target.value);
  searchName.innerHTML = ev.target.value;
}



// async function renderMovies(searchTerm) {
//   console.log(`I am searching.... ${searchTerm}`);
//   const response = await fetch(`https://www.omdbapi.com/?apikey=da55dd74&s=${searchTerm}`);
//   const data = await response.json();
//   currentMovies = data.Search;
//   console.log(currentMovies);
  
//   displayMovies(currentMovies);
// }
async function renderMovies(searchTerm) {
    console.log(`I am searching.... ${searchTerm}`);
    
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=da55dd74&s=${searchTerm}`);
        
        // Check if the response is okay (status 200)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Check if movies were found
        if (!data.Search) {
            console.log("No results found.");
            currentMovies = []; // Clear currentMovies if no results
            displayMovies(currentMovies);
            return;
        }

        currentMovies = data.Search;
        console.log(currentMovies);
        
        // Display the movies
        displayMovies(currentMovies);
        
    } catch (error) {
        console.error("Error fetching data:", error);
        // Optionally display a message to the user
        document.getElementById("movies").innerHTML = "<p>Error fetching movies. Please try again.</p>";
    }
}


function displayMovies(moviesList){
  console.log(moviesList.length);

  if(moviesList.length !== 0){
    moviesResult.innerHTML = moviesList.map((movie) => {
      return `<div class="movie__card">
              <figure>
                <img src="${movie.Poster}" alt="">
              </figure>
              
              <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
                <p>${movie.Type}</p>
            </div>`
    }).join("");
  }else {
  
    moviesResult.innerHTML = `<div">No Result </div>`;
  }
}


function sortChange(ev){
  console.log('after sort Change', currentMovies)
  
  const sortOption = ev.target.value;
  //this creates a copy of array and using spreading will generate a copy
  let sortedMovies = [...currentMovies];
  console.log(sortedMovies);
  
  if(sortOption === "newest"){
    sortedMovies.sort((a, z) => parseInt(z.Year) - parseInt(a.Year));
  }else if(sortOption === "oldest"){
    sortedMovies.sort((a, z) => parseInt(a.Year) - parseInt(z.Year));
  }
  console.log(sortedMovies);
  displayMovies(sortedMovies);
}

function resetSort() {
    // Sorting logic here (if needed)

    // After sorting (or regardless), reset select index to 0
    document.querySelector('#movieSort').selectedIndex = 0; 

}