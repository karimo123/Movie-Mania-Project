let moviesExist = false
let moviesContentContainer = document.querySelector('.content__container')
let searchResultsWrapper = document.querySelector('.search__results--wrapper')
let spinner = document.querySelector(".spinner")


function onSearch(event) {
    getMovies(event.target.value)
}



async function getMovies(searchText) {
    moviesContentContainer.innerHTML = ""

    let existingSearchedText = localStorage.getItem("searchedValue")
    userSearchText = existingSearchedText
    localStorage.removeItem("searchedValue")
    let movies
    if (existingSearchedText) {
        spinner.classList += " spinner--visible"
        movies = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=8e3aabe&s=${existingSearchedText}`)
        await new Promise(r => setTimeout(r, 500));
        spinner.classList.remove("spinner--visible")

    } else {
        
        spinner.classList += " spinner--visible"
        movies = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=8e3aabe&s=${searchText}`)
        await new Promise(r => setTimeout(r, 500));
        spinner.classList.remove("spinner--visible")

    }
    const moviesObject = await movies.json()
    let moviesData = moviesObject.Search

    if (!moviesData) {
        renderSearchedText(searchText)
        renderNoMovies()
    }

    if (!moviesExist) {
        
        moviesData.map((movie) => renderMoviesHtml(movie))
        renderSearchedText(existingSearchedText || searchText)
        moviesData = null
        moviesExist = true
    } else {
        moviesData.map((movie) => renderMoviesHtml(movie))
        moviesData = null
        renderSearchedText(searchText)
    }
}

function renderSearchResults() {

}

function renderMoviesHtml(movie) {
    let movieName = movie.Poster
    if(movie.Poster === "N/A"){
        movieName = "./assets/NoImg.jpg"
    }

    moviesContentContainer.innerHTML += `
    <div class="movie__wrapper">
        <div class="movie--img__wrapper">
            <a href=""> <img src="${movieName}" class="movie--img" alt=""> </a>
        </div>
        <h1 class="movie__title">Movie: ${movie.Title}</h1>
        <h4 class="movie__year">Release Date: ${movie.Year}</h4>
        <h4 class="movie__rating">Type: ${capitalizeFirstLetter(movie.Type)}</h4>
    </div>
    `
}
function renderSearchedText(searchText) {
    searchResultsWrapper.innerHTML = `Search Results: <p class="search__results--para">"${searchText}"</p>`
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function renderNoMovies(){
    moviesContentContainer.innerHTML = 
    ` <div class="unknown__container">
        <div class="unknown__img--wrapper">
            <img src="./assets/Unknown.svg" alt="" class="unknown--img">
        </div>
        <h3 class="unknown--header">Couldn't find any matches related to your search.</h3>
        <p class="unknown--msg">Please try searching for a different movie.</p>
    </div>  `
}

getMovies("")

async function sleep(timeMs) {
}