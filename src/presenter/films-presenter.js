import SortView from '../view/sort-view.js';
import FilmsView from '../view/films-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import FilmButtonMoreView from '../view/film-button-show-more-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import { render } from '../render.js';
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

  constructor(container, filmsModel, commentsModel) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init() {
    this.#renderFilm();
    this.#renderFilmDetails();
  }

  #renderFilm = () => {
    this.#films = [...this.#filmsModel.films];
    render(this.#sortComponent, this.#container);
    render(this.#filmsComponent, this.#container);
    render(this.#filmListComponent, this.#filmsComponent.element);
    render(this.#filmListContainerComponent, this.#filmListComponent.element);

    for (let i = 0; i < this.#films.length; i++) {
      render(new FilmCardView(this.#films[i]), this.#filmListContainerComponent.element);
    }

    render(this.#filmButtonMoreComponent, this.#filmListComponent.element);
  };

  #renderFilmDetails = () => {
    this.#commentsModel.film = this.#films[0];
    const comments = [...this.#commentsModel.film];
    render(new FilmDetailsView(this.#films[0], comments), this.#container.parentElement);
  };
}
