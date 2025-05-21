const API_KEY = '723208091423f6b45714cb7362bf4986';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const movieContainer = document.getElementById('movie-container');
const searchInput = document.getElementById('search');

// Fetch popular movies on load
getMovies(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);

// Function to fetch movies
async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
}

// Display movies
function showMovies(movies) {
  movieContainer.innerHTML = '';

  movies.forEach(movie => {
    const { title, poster_path } = movie;

    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    movieEl.innerHTML = `
      <img src="${IMG_URL + poster_path}" alt="${title}">
      <h3>${title}</h3>
    `;

    movieContainer.appendChild(movieEl);
  });
}

// Search functionality
searchInput.addEventListener('keyup', (e) => {
  const query = e.target.value;
  if (query) {
    getMovies(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  } else {
    getMovies(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  }
});
