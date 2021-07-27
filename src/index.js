import './sass/main.scss';

// import './js/fetchPhotos'

import photoCardTpl from './templates/photo-card.hbs';
import PhotosApiService from './js/photos-api';


import getRefs from './js/get-refs';
// import LoadMoreBtn from './js/components/load-more-btn';



const refs = getRefs();

// const loadMoreBtn = new LoadMoreBtn({
//     selector: '.load-more',
//     hidden: true,
// });

const photosApiService = new PhotosApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
    e.preventDefault();

    photosApiService.query = e.currentTarget.elements.searchQuery.value.trim();

    if (photosApiService.query === '') {
        return alert('Введи что-то нормальное');
    }

    photosApiService.resetPage();
    photosApiService.fetchPhotos().then(photos => {
        clearPhotosCard();
        appendPhotosMarkup(photos);
    });

}

function onLoadMore() {
    photosApiService.fetchPhotos().then(appendPhotosMarkup);
}

function appendPhotosMarkup(photos) {
    refs.gallery.insertAdjacentHTML('beforeend', photoCardTpl(photos));
}

function clearPhotosCard() {
    refs.gallery.innerHTML = '';
}

