import { remove, render, replace } from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import { UserAction, UpdateType } from '../const.js';

export default class FilmCardPresenter {
  #filmListContainer = null;
  #showFilmDetails = null;
  #filmCardComponent = null;
  #film = null;
  #changeData = null;
  #сloseCurrentFilmPopup = null;

  constructor(filmListContainer, showFilmDetails, changeData, сloseCurrentFilmPopup){
    this.#filmListContainer = filmListContainer;
    this.#showFilmDetails = showFilmDetails;
    this.#changeData = changeData;
    this.#сloseCurrentFilmPopup = сloseCurrentFilmPopup;
  }

  init = (film) => {
    const prevFilmCardComponent = this.#filmCardComponent;
    this.#film = film;
    this.#filmCardComponent = new FilmCardView(this.#film);

    this.#filmCardComponent.setClickHandler(() => {
      this.#сloseCurrentFilmPopup();
      this.#showFilmDetails(this.#film);
    });
    this.#filmCardComponent.setWatchlistClickHandler(this.#watchlistBtnClickHandler);
    this.#filmCardComponent.setWatchedClickHandler(this.#watchedBtnClickHandler);
    this.#filmCardComponent.setFavoriteClickHandler(this.#favoriteBtnClickHandler);

    if (prevFilmCardComponent === null) {
      render(this.#filmCardComponent, this.#filmListContainer.element);
      return;
    }

    if (this.#filmListContainer.element.contains(prevFilmCardComponent.element)) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
    }

    remove(prevFilmCardComponent);

  };

  destroy = () => {
    remove(this.#filmCardComponent);
  };

  #watchlistBtnClickHandler = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      {...this.#film, userDetails: {...this.#film.userDetails, isWatchlist: !this.#film.userDetails.isWatchlist}});
  };

  #watchedBtnClickHandler = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      {...this.#film, userDetails: {...this.#film.userDetails, isAlreadyWatched: !this.#film.userDetails.isAlreadyWatched}});
  };

  #favoriteBtnClickHandler = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      {...this.#film, userDetails: {...this.#film.userDetails, isFavorite: !this.#film.userDetails.isFavorite}});
  };
}
