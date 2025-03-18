const createFilmDetailsControlsTemplate = (film) => {
  const {isWatchlist, isAlreadyWatched, isFavorite} = film.userDetails;
  const watchlistClassnName = isWatchlist ? 'film-details__control-button--watchlist film-details__control-button--active' : 'film-details__control-button--watchlist';
  const alreadyWatchedClassName = isAlreadyWatched ? 'film-details__control-button--watched film-details__control-button--active' : 'film-details__control-button--watched';
  const favoriteClassName = isFavorite ? 'film-details__control-button--favorite film-details__control-button--active' : 'film-details__control-button--favorite';
  return `
<section class="film-details__controls">
  <button type="button" class="film-details__control-button ${watchlistClassnName}" id="watchlist" name="watchlist">Add to watchlist</button>
  <button type="button" class="film-details__control-button ${alreadyWatchedClassName}" id="watched" name="watched">Already watched</button>
  <button type="button" class="film-details__control-button ${favoriteClassName}" id="favorite" name="favorite">Add to favorites</button>
</section>
`;};

export {createFilmDetailsControlsTemplate};

