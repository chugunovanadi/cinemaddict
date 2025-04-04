import {createElement} from '../render.js';
import { createFilmDetailsInfoTemplate } from './film-details-info-template.js';
import { createFilmDetailsControlsTemplate } from './film-details-controls-template.js';
import { createFilmDetailsCommentsListTemplate } from './film-details-comments-list-template.js';
import { createFilmDetailsFormNewCommentTemplate } from './film-details-form-new-comment-template.js';

const createFilmDetailsTemplate = (film, comments) => `
<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      ${createFilmDetailsInfoTemplate(film)}
      ${createFilmDetailsControlsTemplate(film)}
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
      <ul class="film-details__comments-list">
        ${createFilmDetailsCommentsListTemplate(comments)}
      </ul>
        ${createFilmDetailsFormNewCommentTemplate()}
      </section>
    </div>
  </form>
</section>
`;

export default class FilmDetailsView {
  #element = null;
  #film = null;
  #comments = null;

  constructor (film, comments) {
    this.#film = film;
    this.#comments = comments;
  }

  get template() {
    return createFilmDetailsTemplate(this.#film, this.#comments);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement(){
    this.#element = null;
  }
}
