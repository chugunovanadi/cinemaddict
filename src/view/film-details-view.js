import {createElement} from '../render.js';
import { createFilmDetailsInfoTemplate } from './film-details-info-template.js';
import { createFilmDetailsControlsTemplate } from './film-details-controls-template.js';
import { createFilmDetailsCommentsListTemplate } from './film-details-comments-list-template.js';
import { createFilmDetailsFormNewCommentTemplate } from './film-details-form-new-comment-template.js';

const createFilmDetailsTemplate = () => `
<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      ${createFilmDetailsInfoTemplate()}
      ${createFilmDetailsControlsTemplate()}
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        ${createFilmDetailsCommentsListTemplate()}
        ${createFilmDetailsFormNewCommentTemplate()}
      </section>
    </div>
  </form>
</section>
`;

export default class FilmDetailsView {
  getTemplate() {
    return createFilmDetailsTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement(){
    this.element = null;
  }

}
