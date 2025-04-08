import {generateComments} from '../mock/comment.js';

export default class CommentsModel {
  #films = null;
  #allComments = null;
  #film = null;

  constructor(filmsModel) {
    this.#films = filmsModel.films;
    this.#allComments = generateComments(this.#films);
  }

  set currentFilm(newFilm) {
    this.#film = newFilm;
  }

  get currentFilm() {
    return this.#film;
  }

  get currentFilmComments() {
    if (!this.#film.comments) {
      return [];
    }
    const commentsOnFilmById = this.#allComments.filter((comment) => this.#film.comments.includes(comment.id));
    return commentsOnFilmById;
  }
}
