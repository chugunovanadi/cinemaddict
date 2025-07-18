import { EMOTIONS } from '../const';

const createFilmDetailsFormNewCommentTemplate = (checkedEmotion, newComment) => {
  const emojiListMarkup = EMOTIONS.map((emotion) => {
    const isChecked = (emotion === checkedEmotion) ? 'checked' : '';

    return `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}" ${isChecked}>
            <label class="film-details__emoji-label" for="emoji-${emotion}">
              <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
            </label>`;
  }).join('');

  return `<div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">
            ${checkedEmotion ? `<img src="images/emoji/${checkedEmotion}.png" width="55" height="55" alt="emoji-${checkedEmotion}">` : ''}
          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${newComment ? newComment : ''}</textarea>
          </label>

          <div class="film-details__emoji-list">
          ${emojiListMarkup}
          </div>
        </div>`;
};

export {createFilmDetailsFormNewCommentTemplate};
