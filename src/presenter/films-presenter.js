import SortView from '../view/sort-view.js';
import FilmsView from '../view/films-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import FilmButtonMoreView from '../view/film-button-show-more-view.js';
import FilmEmptyView from '../view/film-empty-view.js';
import FilmListTitleView from '../view/film-list-title-view.js';
import { render, remove, replace } from '../framework/render.js';
import FilmCardPresenter from './film-card-presenter.js';
import FilmDetailsPopupPresenter from './film-details-popup-presenter.js';
import { SortType, UserAction, UpdateType } from '../const.js';
import { sortData, sortRating } from '../utils.js';
const FILM_COUNT_PER_STEP = 5;
export default class FilmsPresenter {
  #container = null;
  #filmsModel = null;
  #commentsModel = null;
  #sortComponent = null;
  #filmsComponent = new FilmsView();
  #filmListComponent = new FilmListView();
  #filmListContainerComponent = new FilmListContainerView();
  #filmButtonMoreComponent = new FilmButtonMoreView();
  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #filmCardPresenter = new Map();
  #currentFilmDetailsPopupPresenter = null;
  #currentSortType = SortType.DEFAULT;

  constructor(container, filmsModel, commentsModel) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filmsModel.addObserver(this.#handleFilmModelChange);
    this.#commentsModel.addObserver(this.#handleCommentModelChange);
  }

  get films() {
    switch (this.#currentSortType) {
      case SortType.DATE:
        return [...this.#filmsModel.films].sort(sortData);
      case SortType.RATING:
        return [...this.#filmsModel.films].sort(sortRating);
      default:
        return this.#filmsModel.films;
    }
  }

  init() {
    this.#renderFilmsBoard();
  }

  #renderFilmsBoard = () => {
    if (this.films.length === 0) {
      this.#renderNoFilms();
      return;
    }
    this.#renderSort();
    this.#renderFilmsStructure();
    this.#renderFilmsList();
  };

  #renderFilmsBatch = (films, start, end) => {
    const batch = films.slice(start, end);
    batch.forEach((film) => this.#renderFilmCard(film, this.#filmListContainerComponent));
  };

  #renderFilmsStructure = () => {
    render(this.#filmsComponent, this.#container);
    render(this.#filmListComponent, this.#filmsComponent.element);
    render(new FilmListTitleView(), this.#filmListComponent.element);
    render(this.#filmListContainerComponent, this.#filmListComponent.element);
  };

  #renderSort = () => {
    if (!this.#sortComponent) {
      this.#sortComponent = new SortView(this.#currentSortType);
      render(this.#sortComponent, this.#container);
    } else {
      const updatedSortComponent = new SortView(this.#currentSortType);
      replace(updatedSortComponent, this.#sortComponent);
      this.#sortComponent = updatedSortComponent;
    }
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderNoFilms = () => {
    render(new FilmEmptyView(), this.#container);
  };

  #renderLoadMoreButton = () => {
    render(this.#filmButtonMoreComponent, this.#filmListComponent.element);
    this.#filmButtonMoreComponent.setButtonClickHandler(this.#handleFilmButtonLoadMoreClick);
  };

  #handleFilmButtonLoadMoreClick = () => {
    const films = this.films;
    const filmCount = films.length;
    const newRenderedFilmCount = Math.min(filmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);
    this.#renderFilmsBatch(films, this.#renderedFilmCount, newRenderedFilmCount);
    this.#renderedFilmCount = newRenderedFilmCount;
    if (this.#renderedFilmCount >= filmCount) {
      remove(this.#filmButtonMoreComponent);
    }
  };

  #renderFilmCard = (film, container) => {
    const filmCardPresenter = new FilmCardPresenter(container, this.#renderFilmDetails, this.#handleAction, this.#removeCurrentFilmDetailsPopup);
    filmCardPresenter.init(film);
    this.#filmCardPresenter.set(film.id, filmCardPresenter);
  };

  #renderFilmsList = () => {
    const films = this.films;
    const filmCount = films.length;
    this.#renderFilmsBatch(films, 0, Math.min(filmCount, FILM_COUNT_PER_STEP));
    if (filmCount > FILM_COUNT_PER_STEP) {
      this.#renderLoadMoreButton();
    }
  };

  #handleAction = (actionType, updateType, updateDataFilm, updateDateComment) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#filmsModel.updateFilm(updateType, updateDataFilm);
        break;
      case UserAction.ADD_COMMENT:
        this.#commentsModel.addComment(updateType, updateDateComment);
        this.#filmsModel.updateFilm(updateType, updateDataFilm);
        break;
      case UserAction.DELETE_COMMENT:
        this.#commentsModel.deleteComment(updateType, updateDateComment);
        this.#filmsModel.updateFilm(updateType, updateDataFilm);
        break;
    }
  };

  #handleFilmModelChange = (updateType, updateData) => {
    switch (updateType) {
      case UpdateType.PATCH: {
        this.#filmCardPresenter.get(updateData.id).init(updateData);
        this.#commentsModel.currentFilm = updateData;
        const comments = [...this.#commentsModel.currentFilmComments];
        this.#currentFilmDetailsPopupPresenter.init(updateData, comments);
        break;
      }
      case UpdateType.MINOR: {
        break;
      }
      case UpdateType.MAJOR: {
        break;
      }
    }
  };

  // eslint-disable-next-line no-unused-vars
  #handleCommentModelChange = (updateType) => {};

  #renderFilmDetails = (film) => {
    this.#commentsModel.currentFilm = film;
    const comments = [...this.#commentsModel.currentFilmComments];
    const filmDetailsPopupPresenter = new FilmDetailsPopupPresenter(this.#container, this.#handleAction);
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

  #handleSortTypeChange = (sortType) => {
    if (sortType === this.#currentSortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#renderSort();
    this.#clearFilmList();
    this.#renderFilmsList();
  };
}
