const addMovieModal = document.getElementById('add-modal'); //
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const closeButtonAddMovieModal = addMovieModal.querySelector('.btn--passive'); //
const addButtonAddMovieModal = addMovieModal.querySelector('.btn--success'); //
const userInputs = document.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');

let movies = [];

const cancelMovieDeletion = () => {
  toggleBackdrop();
  deleteMovieModal.classList.remove('visible');
};

const updateEntryText = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
};

const deleteMovie = id => {
  let index = 0;
  for (let movie of movies) {
    if (movie.id === id) {
      break;
    }
    index++;
  }
  movies.splice(index, 1);
  const movieList = document.getElementById('movie-list');
  movieList.children[index].remove();
  cancelMovieDeletion();
  updateEntryText();
};

const deleteMovieModalHandler = id => {
  deleteMovieModal.classList.add('visible');
  toggleBackdrop();
  const cancelMovieDeletionButton = deleteMovieModal.querySelector('.btn--passive');
  let confirmMovieDeletionButton = deleteMovieModal.querySelector('.btn--danger');
  confirmMovieDeletionButton.replaceWith(confirmMovieDeletionButton.cloneNode(true));
  confirmMovieDeletionButton = deleteMovieModal.querySelector('.btn--danger');
  cancelMovieDeletionButton.removeEventListener('click',cancelMovieDeletion);
  cancelMovieDeletionButton.addEventListener('click',cancelMovieDeletion);
  confirmMovieDeletionButton.addEventListener('click',deleteMovie.bind(this,id));
};

const renderMovieList = (id, title, image, rating) => {
  const movieListItem = document.createElement('li');
  movieListItem.className = 'movie-element';
  movieListItem.innerHTML = `
  <div class="movie-element__image">
    <img src="${image}" alt="${title}">
  </div>    
  <div class="movie-element__info">
    <h2>${title}</h2>
    <p>${rating}/5 stars</p>
  </div>
    `;
  movieListItem.addEventListener(
    'click',
    deleteMovieModalHandler.bind(this, id)
  );
  const movieList = document.getElementById('movie-list');
  movieList.append(movieListItem);
};

const addMovieModalHandler = () => {
  addMovieModal.classList.add('visible'); //
  toggleBackdrop();
};

const closeMovieModal = () => {
  addMovieModal.classList.remove('visible'); //
};

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const backdropHandler = () => {
  closeMovieModal();
  cancelMovieDeletion();
  clearAllUserInputs();
};

const closeButtonAddMovieModalHandler = () => {
  toggleBackdrop();
  closeMovieModal();
  clearAllUserInputs();
};

const clearAllUserInputs = () => {
  for (const userinput of userInputs) {
    userinput.value = '';
  }
};

const addButtonAddMovieModalHandler = () => {
  let movieTitleValue = userInputs[0].value;
  let imageUrlValue = userInputs[1].value;
  let movieRatingValue = userInputs[2].value;

  if (
    movieTitleValue.trim() === '' ||
    imageUrlValue.trim() === '' ||
    movieRatingValue.trim() === '' ||
    parseInt(movieRatingValue) < 0 ||
    parseInt(movieRatingValue) > 5
  ) {
    alert('Please Enter Valid Data In the Input Fields');
    return;
  }

  let movie = {
    id: Math.random().toString(),
    title: movieTitleValue,
    imageUrl: imageUrlValue,
    rating: movieRatingValue
  };

  movies.push(movie);
  clearAllUserInputs();
  toggleBackdrop();
  updateEntryText();
  closeMovieModal();
  renderMovieList(movie.id, movieTitleValue, imageUrlValue, movieRatingValue);
  console.log(movies);
};

startAddMovieButton.addEventListener('click', addMovieModalHandler);
backdrop.addEventListener('click', backdropHandler);
closeButtonAddMovieModal.addEventListener(
  'click',
  closeButtonAddMovieModalHandler
);
addButtonAddMovieModal.addEventListener('click', addButtonAddMovieModalHandler);
