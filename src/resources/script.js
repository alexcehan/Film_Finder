const tmdbKey = '8095031073cadb2df38a992798d9544b';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const likedMoviesArray = [];
const listedMovies = [];

//get a list of all available genres
const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = '?api_key=' + tmdbKey;
  const urlToFetch = tmdbBaseUrl + genreRequestEndpoint + requestParams;

  try {
      const response = await fetch(urlToFetch);
      if(response.ok) {
          const jsonResponse = await response.json();
          const genres = jsonResponse.genres;
          console.log(genres)
          return genres;
      }

  } catch (error) {
      console.log(error);
  }

}

//get a list of movies
//modify this method to get a random page number
const getMovies = async () => {
    const selectedGenre = getSelectedGenre();
    const page = '&page=' + Math.floor(Math.random() * 500);
    const discoverMoviesEndpoint = '/discover/movie';
    const requestParam = '?api_key=' + tmdbKey + '&with_genres=' + selectedGenre + page;
    const urlToFetch = tmdbBaseUrl + discoverMoviesEndpoint + requestParam;

    try {
        const response = await fetch(urlToFetch);
        if(response.ok) {
            const jsonResponse = await response.json();
            const movies = jsonResponse.results;

            return movies;
        }
    } catch (e) {
        console.log(e);
    }

}

//get movie info
const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = '?api_key=' + tmdbKey;
  const urlToFetch = tmdbBaseUrl + movieEndpoint + requestParams;

  try {
      const response = await fetch(urlToFetch);
      if(response.ok) {
          const jsonResponse = await response.json();
          console.log(jsonResponse);
          return jsonResponse;
      }
  } catch (e) {
      console.log(e);
  }
}



// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie =async () => {
    const movieInfo = document.getElementById('movieInfo');
    if(movieInfo.childNodes.length > 0) {
        clearCurrentMovie();
    }

    const movies = await getMovies();
    const randomMovie = getRandomMovie(movies);

    const info = await getMovieInfo(randomMovie);
    displayMovie(info);
    listedMovies.push(randomMovie.id);
    console.log(listedMovies);

}

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;