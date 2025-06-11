import { render, remove, replace } from '../framework/render.js';
import FilmDetailsView from '../view/film-details-view.js';

export default class FilmDetailsPopupPresenter {
  #container = null;
  #film = null;
  #comments = null;
  #filmDetailsComponent = null;
  #changeData = null;

  constructor(container, changeData){
    this.#container = container;
    this.#changeData = changeData;
  }

  init = (film, comments) => {
    this.#film = film;
    this.#comments = comments;

    const prevFilmDetailsComponent = this.#filmDetailsComponent;
    this.#filmDetailsComponent = new FilmDetailsView(this.#film, this.#comments);

    this.#filmDetailsComponent.setCloseClickHandler(() => {
      this.destroy();
    });

    this.#filmDetailsComponent.setWatchlistClickHandler(this.#watchlistBtnClickHandler);
    this.#filmDetailsComponent.setWatchedClickHandler(this.#watchedBtnClickHandler);
    this.#filmDetailsComponent.setFavoriteClickHandler(this.#favoriteBtnClickHandler);

    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#onEscKeyDown);

    if (prevFilmDetailsComponent === null) {
      render(this.#filmDetailsComponent, this.#container);
      return;
    }

    if (this.#container.contains(prevFilmDetailsComponent.element)) {
      replace(this.#filmDetailsComponent, prevFilmDetailsComponent);
    }
    remove(prevFilmDetailsComponent);
  };

  destroy = () => {
    remove(this.#filmDetailsComponent);
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #watchlistBtnClickHandler = () => {
    this.#changeData({...this.#film, userDetails: {...this.#film.userDetails, isWatchlist: !this.#film.userDetails.isWatchlist}});
  };

  #watchedBtnClickHandler = () => {
    this.#changeData({...this.#film, userDetails: {...this.#film.userDetails, isAlreadyWatched: !this.#film.userDetails.isAlreadyWatched}});
  };

  #favoriteBtnClickHandler = () => {
    this.#changeData({...this.#film, userDetails: {...this.#film.userDetails, isFavorite: !this.#film.userDetails.isFavorite}});
  };

}
