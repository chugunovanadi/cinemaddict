import { getRandomValue } from '../utils';

const authors=['Ivan Smirnov', 'Anastasia Kuznetsova', 'Dmitry Ivanov', 'Olga Vasilieva', 'Artem Petrov', 'Ekaterina Sokolova'];
const comments=['a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.', 'An absolute masterpiece, had me hooked from start to finish, 10/10 would recommend!',
  'What a waste of time, nothing made sense, and the acting was terrible', 'I kept waiting for it to get better… it never did', 'One of the best movies Ive seen in years, the ending was just perfection!'
];
const dates=['2019-05-11T16:12:32.554Z', '2022-11-05T22:30:45.678Z', '2015-03-14T14:15:59.999Z', '2020-07-19T06:55:23.456Z', '2018-12-31T23:59:59.123Z', '2016-09-10T18:37:48.250Z'];
const emotions=['smile', 'puke', 'angry', 'sleeping'];

const generateCommentInfo = () => ({
  author: getRandomValue(authors),
  comment: getRandomValue(comments),
  date: getRandomValue(dates),
  emotion: getRandomValue(emotions)
});

const generateCommentCount = (films) => films.reduce((count, film) => count + film.comments.length, 0);

const generateComments = (films) => {
  const commentCount = generateCommentCount(films);
  return Array.from({length: commentCount}, (_, index) => ({
    id: String(index+1),
    ...generateCommentInfo(),
  }));
};


export {generateComments};
