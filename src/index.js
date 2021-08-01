import './sass/main.scss';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.css';

import photoCardTpl from './templates/photo-card.hbs';
import PhotosApiService from './js/photos-api';


import getRefs from './js/get-refs';
import LoadMoreBtn from './js/components/load-more-btn';

import Notiflix from "notiflix";

const refs = getRefs();

var lightbox = new SimpleLightbox('.gallery a');

const loadMoreBtn = new LoadMoreBtn({
    selector: '.load-more',
    hidden: true,
});

const photosApiService = new PhotosApiService();

let sum = null;

refs.searchForm.addEventListener('submit', onSearch);

// Загрузка следующих станиц при помощи кнопки
// refs.loadMoreBtn.addEventListener('click', fetchPhotos);

// Бесконечный скролл

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if(clientHeight + scrollTop >= scrollHeight - 5) {
		fetchPhotos();
	}
});

function onSearch(e) {
    e.preventDefault();

    photosApiService.query = e.currentTarget.elements.searchQuery.value.trim();

    if (photosApiService.query === '') {
        clearPhotosCard();
        loadMoreBtn.hide();
        return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } 

    // loadMoreBtn.show();
    photosApiService.resetPage();
    clearPhotosCard();
    fetchPhotos();
    photosApiService.fetchPhotos().then(({hits, totalHits}) => {
        if (hits.length !== 0) {
            return Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        }
    })

}

function fetchPhotos() {
    // loadMoreBtn.disable();
    photosApiService.fetchPhotos().then(({hits, totalHits}) => {
        sum += hits.length;

        if (hits.length === 0) {
            loadMoreBtn.hide();
            return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        } else if (sum <= totalHits) {
            photosApiService.incrementPage();
            appendPhotosMarkup(hits);
            lightbox.refresh();
            loadMoreBtn.enable();
            scrollPhotos();
        } else {
            // loadMoreBtn.hide();
            return Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        }
    });
}

function appendPhotosMarkup(photos) {
    refs.gallery.insertAdjacentHTML('beforeend', photoCardTpl(photos));
}

function clearPhotosCard() {
    refs.gallery.innerHTML = '';
}

function scrollPhotos() {
    const { height: cardHeight } = document
  .querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 10,
  behavior: 'smooth',
});
}