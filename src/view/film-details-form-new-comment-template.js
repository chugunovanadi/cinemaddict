
import { EmotionType } from '../const';

const createFilmDetailsFormNewCommentTemplate = (checkedEmotion, newComment) => `
        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">
            ${ checkedEmotion ? `<img src="images/emoji/${checkedEmotion}.png" width="55" height="55" alt="emoji-smile">` : ''}
          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"> ${ newComment ? newComment : ''} </textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" data-emotion-type=${EmotionType.SMILE} ${checkedEmotion === EmotionType.SMILE ? 'checked' : ''}>
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" data-emotion-type=${EmotionType.SLEEPING} ${checkedEmotion === EmotionType.SLEEPING ? 'checked' : ''}>
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" data-emotion-type=${EmotionType.PUKE} ${checkedEmotion === EmotionType.PUKE ? 'checked' : ''}>
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" data-emotion-type=${EmotionType.ANGRY} ${checkedEmotion === EmotionType.ANGRY ? 'checked' : ''}>
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
`;

export {createFilmDetailsFormNewCommentTemplate};
