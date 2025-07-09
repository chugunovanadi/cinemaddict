import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { createFilmDetailsInfoTemplate } from './film-details-info-template.js';
import { createFilmDetailsControlsTemplate } from './film-details-controls-template.js';
import { createFilmDetailsCommentsListTemplate } from './film-details-comments-list-template.js';
import { createFilmDetailsFormNewCommentTemplate } from './film-details-form-new-comment-template.js';

const createFilmDetailsTemplate = (film, comments, emotion, newComment) => `
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
        ${createFilmDetailsFormNewCommentTemplate(emotion, newComment)}
      </section>
    </div>
  </form>
</section>
`;

export default class FilmDetailsView extends AbstractStatefulView {
  #comments = null;

  constructor (film, comments) {
    super();
    this._state = FilmDetailsView.transformFilmToState(film);
    this.#comments = comments;
    this._restoreHandlers();
  }

  get template() {
    return createFilmDetailsTemplate(this._state, this.#comments, this._state.emotion, this._state.newComment);
  }

  static transformFilmToState = (film) => ({
    ...film,
    newComment: null,
    emotion: null,
    scrollPosition: 0,
  });

  static transformStateToFilm = (state) => {
    const film = {...state};
    delete film.emotion;
    delete film.scrollPosition;
    delete film.newComment;
    return film;
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setCloseClickHandler(this._callback.clickClose);
    this.setWatchlistClickHandler(this._callback.watchlistClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);

    this.#restoreScroll();
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.film-details__emoji-list').addEventListener('click', this.#emotionClickHandler);
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#commentInputHandler);
  };

  #restoreScroll = () => {
    this.element.scrollTop = this._state.scrollPosition;
  };

  #emotionClickHandler = (evt) => {
    if (evt.target.name !== 'comment-emoji') {
      return;
    }
    evt.preventDefault();
    this.updateElement({
      emotion: evt.target.value,
      scrollPosition: this.element.scrollTop,
    });
  };

  #commentInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      newComment: evt.target.value,
    });
  };


  setCloseClickHandler = (callback) => {
    this._callback.clickClose = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeClickHandler);
  };

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchlistClickHandle);
  };

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#watchedClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickClose();
  };

  #watchlistClickHandle = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick();
  };

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}
