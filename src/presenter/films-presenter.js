import SortView from '../view/sort-view.js';
import FilmsView from '../view/films-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import FilmButtonMoreView from '../view/film-button-show-more-view.js';
import FilmEmptyView from '../view/film-empty-view.js';
import FilmListTitleView from '../view/film-list-title-view.js';
import { render, remove } from '../framework/render.js';
import FilmCardPresenter from './film-card-presenter.js';
import FilmDetailsPopupPresenter from './film-details-popup-presenter.js';
import { updateItem } from '../utils.js';
const FILM_COUNT_PER_STEP = 5;
export default class FilmsPresenter {
  #container = null;
  #filmsModel = null;
  #commentsModel = null;
  #films = [];
  #sortComponent = new SortView();
  #filmsComponent = new FilmsView();
  #filmListComponent = new FilmListView();
  #filmListContainerComponent = new FilmListContainerView();
  #filmButtonMoreComponent = new FilmButtonMoreView();
  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #filmCardPresenter = new Map();
  #currentFilmDetailsPopupPresenter = null;

  constructor(container, filmsModel, commentsModel) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init() {
    this.#films = [...this.#filmsModel.films];
    this.#renderFilmsBoard();
  }

  #renderFilmsBoard = () => {
    if (this.#films.length === 0) {
      this.#renderNoFilms();
      return;
    }
    this.#renderSort();
    this.#renderFilmsStructure();
    this.#renderFilmsList();
  };

  #renderFilmsBatch = (start, end) => {
    this.#films.slice(start, end)
      .forEach((film) => this.#renderFilmCard(film, this.#filmListContainerComponent));
  };

  #renderFilmsStructure = () => {
    render(this.#filmsComponent, this.#container);
    render(this.#filmListComponent, this.#filmsComponent.element);
    render(new FilmListTitleView(), this.#filmListComponent.element);
    render(this.#filmListContainerComponent, this.#filmListComponent.element);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#container);
  };

  #renderNoFilms = () => {
    render(new FilmEmptyView(), this.#container);
  };

  #renderLoadMoreButton = () => {
    render(this.#filmButtonMoreComponent, this.#filmListComponent.element);
    this.#filmButtonMoreComponent.setButtonClickHandler(this.#handleFilmButtonLoadMoreClick);
  };

  #handleFilmButtonLoadMoreClick = () => {
    this.#renderFilmsBatch(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);
    this.#renderedFilmCount += FILM_COUNT_PER_STEP;
    if (this.#renderedFilmCount >= this.#films.length) {
      remove(this.#filmButtonMoreComponent);
    }
  };

  #renderFilmCard = (film, container) => {
    const filmCardPresenter = new FilmCardPresenter(container, this.#renderFilmDetails, this.#handleFilmChange, this.#removeCurrentFilmDetailsPopup);
    filmCardPresenter.init(film);
    this.#filmCardPresenter.set(film.id, filmCardPresenter);
  };

  #renderFilmsList = () => {
    this.#renderFilmsBatch(0, Math.min(this.#films.length, FILM_COUNT_PER_STEP));
    if (this.#films.length > FILM_COUNT_PER_STEP) {
      this.#renderLoadMoreButton();
    }
  };

  #handleFilmChange = (updatedFilm) => {
    this.#films = updateItem(this.#films, updatedFilm);
    this.#filmCardPresenter.get(updatedFilm.id).init(updatedFilm);

    this.#commentsModel.currentFilm = updatedFilm;
    const comments = [...this.#commentsModel.currentFilmComments];
    this.#currentFilmDetailsPopupPresenter.init(updatedFilm, comments);
  };

  #renderFilmDetails = (film) => {
    this.#commentsModel.currentFilm = film;
    const comments = [...this.#commentsModel.currentFilmComments];
    const filmDetailsPopupPresenter = new FilmDetailsPopupPresenter(this.#container, this.#handleFilmChange);
    filmDetailsPopupPresenter.init(film, comments);
    this.#currentFilmDetailsPopupPresenter = filmDetailsPopupPresenter;
  };

  #removeCurrentFilmDetailsPopup = () => {
    if (this.#currentFilmDetailsPopupPresenter) {
      this.#currentFilmDetailsPopupPresenter.destroy();
      this.#currentFilmDetailsPopupPresenter = null;
    }
  };

  #clearFilmList = () => {
    this.#filmCardPresenter.forEach((presenter) => presenter.destroy());
    this.#filmCardPresenter.clear();
    this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this.#filmButtonMoreComponent);
  };
}
