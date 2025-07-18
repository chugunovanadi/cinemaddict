import { humanizeCommentDate } from '../utils';

const createFilmDetailsCommentsListTemplate = (comments) =>
  comments.map(({ author, comment, date, emotion, id }) => `
    <li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
        </span>
        <div>
          <p class="film-details__comment-text">${comment}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${author}</span>
            <span class="film-details__comment-day">${humanizeCommentDate(date)}</span>
            <button class="film-details__comment-delete" data-comment-id="${id}">Delete</button>
          </p>
        </div>
    </li>
  `).join('');

export {createFilmDetailsCommentsListTemplate};
