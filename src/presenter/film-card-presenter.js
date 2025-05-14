import { render } from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';

export default class FilmCardPresenter {
  #filmListContainer = null;
  #onFilmCardClick = null;
  #filmCardComponent = null;
  #film = null;

  constructor(filmListContainer, onFilmCardClick){
    this.#filmListContainer = filmListContainer;
    this.#onFilmCardClick = onFilmCardClick;
  }

  init = (film) => {
    this.#film = film;
    this.#filmCardComponent = new FilmCardView(this.#film);
    this.#filmCardComponent.setClickHandler(() => {
      this.#onFilmCardClick(this.#film);
    });
    render(this.#filmCardComponent, this.#filmListContainer.element);
  };
}
