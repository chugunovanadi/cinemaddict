import { nanoid } from 'nanoid';
import { UpdateType, UserAction } from '../const.js';
import { render, remove, replace } from '../framework/render.js';
import FilmDetailsView from '../view/film-details-view.js';

export default class FilmDetailsPopupPresenter {
  #container = null;
  #film = null;
  #comments = null;
  #filmDetailsComponent = null;
  #changeData = null;
  #scrollPosition = 0;

  constructor(container, changeData){
    this.#container = container;
    this.#changeData = changeData;
  }

  init = (film, comments) => {
    this.#film = film;
    this.#comments = comments;
    const prevFilmDetailsComponent = this.#filmDetailsComponent;

    if (prevFilmDetailsComponent) {
      this.#scrollPosition = prevFilmDetailsComponent.getScrollPosition();
    }

    this.#filmDetailsComponent = new FilmDetailsView(this.#film, this.#comments);
    this.#filmDetailsComponent.setCloseClickHandler(() => this.destroy());
    this.#filmDetailsComponent.setWatchlistClickHandler(this.#watchlistBtnClickHandler);
    this.#filmDetailsComponent.setWatchedClickHandler(this.#watchedBtnClickHandler);
    this.#filmDetailsComponent.setFavoriteClickHandler(this.#favoriteBtnClickHandler);
    this.#filmDetailsComponent.setDeleteCommentClickHandler(this.#deleteCommentBtnClickHandler);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#onEscKeyDown);
    document.addEventListener('keydown', this.#onCntrlEnterDown);

    if (prevFilmDetailsComponent === null) {
      render(this.#filmDetailsComponent, this.#container);
      return;
    }

    if (this.#container.contains(prevFilmDetailsComponent.element)) {
      replace(this.#filmDetailsComponent, prevFilmDetailsComponent);
    }
    remove(prevFilmDetailsComponent);
    this.#filmDetailsComponent.restoreScroll(this.#scrollPosition);
  };

  destroy = () => {
    remove(this.#filmDetailsComponent);
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #watchlistBtnClickHandler = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      {...this.#film, userDetails: {...this.#film.userDetails, isWatchlist: !this.#film.userDetails.isWatchlist}}
    );
  };

  #watchedBtnClickHandler = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      {...this.#film, userDetails: {...this.#film.userDetails, isAlreadyWatched: !this.#film.userDetails.isAlreadyWatched}}
    );
  };

  #favoriteBtnClickHandler = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      {...this.#film, userDetails: {...this.#film.userDetails, isFavorite: !this.#film.userDetails.isFavorite}}
    );
  };

  #createComment = () => {
    const {emotion, comment} = this.#filmDetailsComponent.getCommentStateData();

    if (emotion && comment) {
      const newCommentId = nanoid();
      const createdComment = {
        id: newCommentId,
        author: 'Nadya',
        date: new Date(),
        emotion,
        comment,
      };
      this.#changeData(
        UserAction.ADD_COMMENT,
        UpdateType.PATCH,
        {
          ...this.#film,
          comments: [...this.#film.comments, newCommentId]
        },
        createdComment,
      );
    }
  };

  #onCntrlEnterDown = (evt) => {
    if (evt.key === 'Enter' && (evt.metaKey || evt.ctrlKey)) {
      evt.preventDefault();
      this.#createComment();
    }
  };

  #deleteCommentBtnClickHandler = (commentId) => {
    const filmCommnetIdIndex = this.#film.comments.findIndex((id) => id === commentId);
    const deletedComment = this.#comments.find((comment) => comment.id === commentId);
    if (filmCommnetIdIndex === -1 || !deletedComment) {
      return;
    }

    this.#changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      {...this.#film,
        comments: [
          ...this.#film.comments.slice(0, filmCommnetIdIndex),
          ...this.#film.comments.slice(filmCommnetIdIndex + 1)
        ]
      },
      deletedComment,
    );
  };
}
