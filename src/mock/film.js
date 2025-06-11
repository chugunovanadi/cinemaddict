import { getRandomInteger, getRandomFloat, getRandomValue, getRandomBoolean } from '../utils';
import { nanoid } from 'nanoid';

const titles = [
  'Country On Him',
  'Raiders With The Carpet',
  'Guest Who Sold The Darkness',
  'The Godfather',
  'Pulp Fiction',
  'One Flew Over the Cuckoos Nest',
  'The Good, the Bad and the Ugly'];
const posters = ['made-for-each-other.png', 'popeye-meets-sinbad.png', 'sagebrush-trail.jpg', 'santa-claus-conquers-the-martians.jpg', 'the-dance-of-life.jpg', 'the-great-flamarion.jpg'];
const directors = ['Alfred Hitchcock', 'Stanley Kubrick', 'Akira Kurosawa', 'Ingmar Bergman', 'Jean-Luc Godard'];
const writers = ['Paul Thomas Anderson', 'Bong Joon-ho', 'Greta Gerwig', 'Phoebe Waller-Bridge',];
const actors = ['Audrey Hepburn', 'Sophia Loren', 'Marlene Dietrich', 'Meryl Streep', 'Cate Blanchett', 'Charlize Theron',];
const dates = ['2006-12-23T00:00:00.000Z', '2004-01-22T00:00:00.000Z','2007-03-09T00:00:00.000Z', '2021-05-27T00:00:00.000Z', '2020-08-21T00:00:00.000Z', '2006-04-19T00:00:00.000Z', '2005-05-09T00:00:00.000Z'];
const releaseCountries =['France', 'United States', 'Italy', 'Japan', 'Sweden'];
const runtimes = [77, 88, 90, 81, 100, 70];
const genres = ['Comedy', 'Drama', 'Horror', 'Thriller', 'Musical'];
const description = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'];
const FILM_COUNT = 11;
const MAX_COMMENTS_COUNT = 10;

const generateFilmInfo = () => ({
  title: getRandomValue(titles),
  alternativeTitle: 'Laziness Who Sold Themselves',
  totalRating: getRandomFloat(1, 10, 2),
  poster: `${getRandomValue(posters)}`,
  ageRating: getRandomInteger(0, 18),
  director: getRandomValue(directors),
  writers: [
    getRandomValue(writers), getRandomValue(writers)
  ],
  actors: [
    getRandomValue(actors), getRandomValue(actors)
  ],
  release: {
    date: getRandomValue(dates),
    releaseCountry: getRandomValue(releaseCountries)
  },
  runtime: getRandomValue(runtimes),
  genre: [
    getRandomValue(genres), getRandomValue(genres)
  ],
  description: getRandomValue(description),
});

const generateUserDetails = () => ({
  isWatchlist: getRandomBoolean(),
  isAlreadyWatched: true,
  watchingDate:'2021-05-27T00:00:00.000Z',
  isFavorite: getRandomBoolean(),
});

const generateFilms = () => {
  let totalCommentCount = 0;
  const films = Array.from({length: FILM_COUNT}, generateFilmInfo);
  return films.map((film) => {
    const hasComment = getRandomInteger(0, 1);
    const filmCommentsCount = (hasComment) ? getRandomInteger(1, MAX_COMMENTS_COUNT) : 0 ;
    totalCommentCount += filmCommentsCount;
    return {
      id: nanoid(),
      filmInfo: film,
      userDetails: generateUserDetails(),
      comments: (hasComment) ? Array.from({length:filmCommentsCount}, (_, commentIndex) => String(totalCommentCount - commentIndex)) : [],
    };
  }
  );
};

export {generateFilms};

