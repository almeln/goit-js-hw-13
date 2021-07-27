import './sass/main.scss';

// import './js/fetchPhotos'

import photoCardTpl from './templates/photo-card.hbs';
import PhotosApiService from './js/photos-api';


import getRefs from './js/get-refs';
import LoadMoreBtn from './js/components/load-more-btn';



const refs = getRefs();

const loadMoreBtn = new LoadMoreBtn({
    selector: '.load-more',
    hidden: true,
});

// loadMoreBtn.show();

const photosApiService = new PhotosApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', fetchPhotos);

function onSearch(e) {
    e.preventDefault();

    photosApiService.query = e.currentTarget.elements.searchQuery.value.trim();

    if (photosApiService.query === '') {
        return alert('Введи что-то нормальное');
    }

    loadMoreBtn.show();
    photosApiService.resetPage();
    clearPhotosCard();


    fetchPhotos();

}

// function onLoadMore() {
//     fetchPhotos();
// }

function fetchPhotos() {
    loadMoreBtn.disable();
    photosApiService.fetchPhotos().then(photos => {
        appendPhotosMarkup(photos);
        loadMoreBtn.enable();
    });
}

function appendPhotosMarkup(photos) {
    refs.gallery.insertAdjacentHTML('beforeend', photoCardTpl(photos));
}

function clearPhotosCard() {
    refs.gallery.innerHTML = '';
}

