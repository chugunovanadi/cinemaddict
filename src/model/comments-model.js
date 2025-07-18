import {generateComments} from '../mock/comment.js';
import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable {
  #films = null;
  #allComments = null;
  #film = null;

  constructor(filmsModel) {
    super();
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

  deleteComment = (updateType, updateDataComment) => {
    const index = this.#allComments.findIndex((comment) => comment.id === updateDataComment.id);
    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }
    this.#allComments = [
      ...this.#allComments.slice(0, index),
      ...this.#allComments.slice(index + 1),
    ];
    this._notify(updateType);
  };

  addComment = (updateType, updateDataComment) => {
    this.#allComments = [updateDataComment, ...this.#allComments];
    this._notify(updateType);
  };
}
