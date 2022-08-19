
let currentGeneratedMovie;

// Populate dropdown menu with all the available genres
const populateGenreDropdown = (genres) => {
  const select = document.getElementById('genres');

  for(const genre of genres) {
      let option = document.createElement("option");
      option.value = genre.id;
      option.text = genre.name;
      select.appendChild(option);

  }
}



//populate list with liked movies

const populateLikeMoviesList = (likedArray) => {
    const likedList = document.getElementById("likedMovies");

    for(const movie of likedArray) {
        let item = document.createElement("li");
        item.id = movie.id;
        item.value = movie.id;



        item.innerHTML = `<div class="miniPoster"><img src="https://image.tmdb.org/t/p/original//${movie.poster_path}">
                            <div class="miniPosterBottom"><img class="logoTmdb" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz9ORYhX9P-QVyWmMHddgiPtreEW3rVhAGWK3G1iJzD1QpU0QzmWYOc8A4ygB7hf_HSA&usqp=CAU">
                            <div class="movieRating">${movie.vote_average}</div><div id="starRating"><i class="fa-regular fa-star"></i></div></div></div>`

        likedList.appendChild(item);
    }

}



// Returns the current genre selection from the dropdown menu
const getSelectedGenre = () => {
    const selectedGenre = document.getElementById("genres").value;
    return selectedGenre;

}



// Displays the like and dislike buttons on the page
const showBtns = () => {
    const btnDiv = document.getElementById('likeOrDislikeBtns');
    btnDiv.removeAttribute('hidden');
}

//clear current like movies from the screen

const clearLikedList = () => {
    const likedList = document.getElementById("likedMovies");
    likedList.innerHTML = '';
}

// Clear the current movie from the screen
const clearCurrentMovie = () => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    moviePosterDiv.innerHTML= '';
    movieTextDiv.innerHTML = '';
}




// After liking a movie, clears the current movie from the screen and gets another random movie
const likeMovie = () => {
    likedMoviesArray.unshift(currentGeneratedMovie);
    clearLikedList();
    clearCurrentMovie();
    showRandomMovie();
}




// After disliking a movie, clears the current movie from the screen and gets another random movie
const dislikeMovie = () => {
    clearLikedList();
    clearCurrentMovie();
    showRandomMovie();
}




// Create HTML for movie poster
const createMoviePoster = (posterPath) => {
    const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;

    const posterImg = document.createElement('img');
    posterImg.setAttribute('src', moviePosterUrl);
    posterImg.setAttribute('id', 'moviePoster');

    return posterImg;
}




// Create HTML for movie title

const createMovieTitle = (title) => {
  const titleHeader = document.createElement('h1');
  titleHeader.setAttribute('id', 'movieTitle');
  titleHeader.innerHTML=title;

  return titleHeader;

}



// Create HTML for movie overview
const createMovieOverview = (overview) => {
  const overviewParagraph = document.createElement('p');
  overviewParagraph.setAttribute('id', 'movieOverview');
  overviewParagraph.innerHTML = overview;

  return overviewParagraph;
}


// Returns a random movie from the first page of movies
const getRandomMovie = (movies) => {
  const randomIndex = Math.floor(Math.random() * movies.length);
  console.log(movies);
  const randomMovie = movies[randomIndex];
  console.log(randomMovie);

  currentGeneratedMovie=randomMovie;

  return randomMovie;
}


// Uses the DOM to create HTML to display the movie
const displayMovie = (movieInfo) => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    const likeBtn = document.getElementById('likeBtn');
    const dislikeBtn = document.getElementById('dislikeBtn');
    console.log("this is movieInfo: " + movieInfo);


    // Create HTML content containing movie info
    const moviePoster = createMoviePoster(movieInfo.poster_path);
    const titleHeader = createMovieTitle(movieInfo.title);
    const overviewText = createMovieOverview(movieInfo.overview);

    //get info for creating movie object to be added to liked movies list
    const movieId = movieInfo.id;
    console.log(movieId);



    // Append title, poster, and overview to page

    moviePosterDiv.appendChild(moviePoster);
    movieTextDiv.appendChild(titleHeader);
    movieTextDiv.appendChild(overviewText);

    showBtns();
    likeBtn.onclick = likeMovie;
    dislikeBtn.onclick = dislikeMovie;
    populateLikeMoviesList(likedMoviesArray);



}

