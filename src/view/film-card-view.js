import { humanizeFilmDate, formatFilmDuration } from '../utils.js';
import AbstractView from '../framework/view/abstract-view.js';

const createFilmCardTemplate = (film) => {
  const {title, totalRating, release, runtime, genre, description, poster} = film.filmInfo;
  const {isWatchlist, isAlreadyWatched, isFavorite} = film.userDetails;
  const watchlistClassnName = isWatchlist ? 'film-card__controls-item--add-to-watchlist film-card__controls-item--active' : 'film-card__controls-item--add-to-watchlist';
  const alreadyWatchedClassName = isAlreadyWatched ? 'film-card__controls-item--mark-as-watched film-card__controls-item--active' : 'film-card__controls-item--mark-as-watched';
  const favoriteClassName = isFavorite ? 'film-card__controls-item--favorite film-card__controls-item--active' : 'film-card__controls-item--favorite';

  return `
      <article class="film-card">
          <a class="film-card__link">
            <h3 class="film-card__title">${title}</h3>
            <p class="film-card__rating">${totalRating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${humanizeFilmDate(release.date)}</span>
              <span class="film-card__duration">${formatFilmDuration(runtime)}</span>
              <span class="film-card__genre">${genre.join(', ')}</span>
            </p>
            <img src="./images/posters/${poster}" alt="" class="film-card__poster">
            <p class="film-card__description">${description}</p>
            <span class="film-card__comments">${film.comments.length} comments</span>
          </a>

          <div class="film-card__controls">
            <button class="film-card__controls-item ${watchlistClassnName}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item ${alreadyWatchedClassName}" type="button">Mark as watched</button>
            <button class="film-card__controls-item ${favoriteClassName}" type="button">Mark as favorite</button>
          </div>
      </article>
`;
};

export default class FilmCardView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#clickHandler);
  };

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#watchlistClickHandle);
  };

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#watchedClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  #watchlistClickHandle = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick();
  };

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}
