import { render, remove } from '../framework/render.js';
import FilmDetailsView from '../view/film-details-view.js';

export default class FilmDetailsPopupPresenter {
  #container = null;
  #film = null;
  #comments = null;
  #filmDetailsComponent = null;

  constructor(container){
    this.#container = container;
  }

  init = (film, comments) => {
    this.#film = film;
    this.#comments = comments;
    this.#filmDetailsComponent = new FilmDetailsView(this.#film, this.#comments);
    this.#filmDetailsComponent.setFilmDetailsClickHandler(() => {
      this.#removeFilmDetailsPopup();
    });
    render(this.#filmDetailsComponent, this.#container);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#onEscKeyDown);

  };

  #removeFilmDetailsPopup = () => {
    remove(this.#filmDetailsComponent);
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
