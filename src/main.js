import { render } from './render.js';
import HeaderProfileRatingView from './view/header-profile-view.js';
import FilterView from './view/filter-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import FilmsPresenter from './presenter/films-presenter.js';

const headerContainer = document.querySelector('.header');
const mainContainer = document.querySelector('.main');
const footerStatisticsContainer = document.querySelector('.footer__statistics');

render(new HeaderProfileRatingView, headerContainer);
render(new FilterView, mainContainer);
render (new FooterStatisticsView, footerStatisticsContainer);

const filmsPresenter=new FilmsPresenter();
filmsPresenter.init(mainContainer);
