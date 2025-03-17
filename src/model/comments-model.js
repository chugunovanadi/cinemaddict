import {generateComments} from '../mock/comment.js';

export default class CommentsModel {
  constructor(filmsModel) {
    this.films = filmsModel.films;
    this.allComments = generateComments(this.films);
  }

  get = (film) => {
    if (!film.comments) {
      return [];
    }
    this.commentsOnFilmById = this.allComments.filter((comment) => film.comments.includes(comment.id));
    return this.commentsOnFilmById;
  };
}
