import './sass/main.scss';

import photoCardTpl from './templates/photo-card.hbs';
import PhotosApiService from './js/photos-api';


import getRefs from './js/get-refs';
import LoadMoreBtn from './js/components/load-more-btn';

import Notiflix from "notiflix";

const refs = getRefs();

const loadMoreBtn = new LoadMoreBtn({
    selector: '.load-more',
    hidden: true,
});

const photosApiService = new PhotosApiService();

let sum = null;

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', fetchPhotos);

function onSearch(e) {
    e.preventDefault();

    photosApiService.query = e.currentTarget.elements.searchQuery.value.trim();

    if (photosApiService.query === '') {
        clearPhotosCard();
        loadMoreBtn.hide();
        return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } 

    loadMoreBtn.show();
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
    loadMoreBtn.disable();
    photosApiService.fetchPhotos().then(({hits, totalHits}) => {
        sum += hits.length;

        if (hits.length === 0) {
            loadMoreBtn.hide();
            return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        } else if (sum <= totalHits) {
            photosApiService.incrementPage();
            appendPhotosMarkup(hits);
            loadMoreBtn.enable();
        } else {
            loadMoreBtn.hide();
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

