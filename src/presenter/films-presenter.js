import SortView from '../view/sort-view.js';
import FilmsView from '../view/films-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import FilmButtonMoreView from '../view/film-button-show-more-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import FilmEmptyView from '../view/film-empty-view.js';
import FilmListTitleView from '../view/film-list-title-view.js';
import { render } from '../render.js';
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
  #filmDetailsComponent = null;
  #renderedFilmCount = FILM_COUNT_PER_STEP;

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
      render(new FilmEmptyView(), this.#container);
      return;
    }
    render(this.#sortComponent, this.#container);
    render(this.#filmsComponent, this.#container);
    render(this.#filmListComponent, this.#filmsComponent.element);
    render(new FilmListTitleView(), this.#filmListComponent.element);
    render(this.#filmListContainerComponent, this.#filmListComponent.element);
    for (let i = 0; i < Math.min(this.#films.length, FILM_COUNT_PER_STEP); i++) {
      this.#renderFilms(this.#films[i], this.#filmListContainerComponent);
    }
    if (this.#films.length > FILM_COUNT_PER_STEP) {
      render(this.#filmButtonMoreComponent, this.#filmListComponent.element);
      this.#filmButtonMoreComponent.element.addEventListener('click', this.#handleFilmButtonMoreClick);
    }
  };

  #handleFilmButtonMoreClick = (evt) => {
    evt.preventDefault();
    this.#films.slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP).forEach((film) => this.#renderFilms(film, this.#filmListContainerComponent));
    this.#renderedFilmCount += FILM_COUNT_PER_STEP;
    if (this.#renderedFilmCount >= this.#films.length) {
      this.#filmButtonMoreComponent.element.remove();
      this.#filmButtonMoreComponent.removeElement();
    }
  };

  #renderFilms = (film, container) => {
    const filmCardComponent = new FilmCardView(film);
    const filmCardLink = filmCardComponent.element.querySelector('.film-card__link');
    filmCardLink.addEventListener('click', () => {
      this.#renderFilmDetails(film);
      document.body.classList.add('hide-overflow');
      document.addEventListener('keydown', this.#onEscKeyDown);
    });
    render(filmCardComponent, container.element);
  };

  #renderFilmDetails = (film) => {
    this.#commentsModel.currentFilm = film;
    const comments = [...this.#commentsModel.currentFilmComments];
    this.#filmDetailsComponent = new FilmDetailsView(film, comments);
    const filmDetailsCloseButton = this.#filmDetailsComponent.element.querySelector('.film-details__close-btn');
    filmDetailsCloseButton.addEventListener('click', () => {
      this.#removeFilmDetailsPopup();
    });
    render(this.#filmDetailsComponent, this.#container.parentElement);
  };

  #removeFilmDetailsPopup = () => {
    this.#filmDetailsComponent.element.remove();
    this.#filmDetailsComponent.removeElement();
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#removeFilmDetailsPopup();
    }
  };
}
