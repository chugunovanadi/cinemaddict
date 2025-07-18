import { generateFilms } from '../mock/film.js';
import Observable from '../framework/observable.js';

export default class FilmsModel extends Observable {
  #films = generateFilms();

  get films() {
    return this.#films;
  }

  updateFilm = (updateType, updateData) => {
    const index = this.#films.findIndex((film) => film.id === updateData.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this.#films = [
      ...this.#films.slice(0, index),
      updateData,
      ...this.#films.slice(index + 1),
    ];

    this._notify(updateType, updateData);
  };
}
