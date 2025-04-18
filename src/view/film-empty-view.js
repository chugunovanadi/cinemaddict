import AbstractView from '../framework/view/abstract-view.js';

const createFilmEmptyTemplate = () => `
<h2 class="films-list__title">There are no movies in our database</h2>
`;

export default class FilmEmptyView extends AbstractView {
  get template() {
    return createFilmEmptyTemplate();
  }
}
