import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const formatFilmDuration = (minutes) => {
  const dur = dayjs.duration(minutes, 'minutes');
  const hours = Math.floor(dur.asHours());
  const mins = dur.minutes();

  return `${hours}h ${mins}m`;
};


const humanizeFilmDate = (date) => dayjs(date).format('D MMMM YYYY');
const humanizeCommentDate = (date) => dayjs(date).fromNow();

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomFloat = (a = 0, b = 1, decimals = 2) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);

  const randomNumber = lower + Math.random() * (upper - lower);

  return parseFloat(randomNumber.toFixed(decimals));
};

const getRandomValue = (items) => {
  const randomIndex = getRandomInteger(0, items.length-1);
  return items[randomIndex];
};

const getRandomBoolean = () => Math.random() < 0.5;

const sortData = (filmA, filmB) => dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date));

const sortRating = (filmA, filmB) => filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;

export {humanizeCommentDate, sortRating, sortData, getRandomInteger, getRandomFloat, getRandomValue, humanizeFilmDate, formatFilmDuration, getRandomBoolean};
