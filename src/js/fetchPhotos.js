import axios from 'axios';

import photoCardTpl from '../templates/photo-card.hbs';

import getRefs from './get-refs';

const refs = getRefs();

refs.form.addEventListener('submit', onSearch)

function onSearch(e) {
    e.preventDefault();

    let searchQuery = e.target.elements.searchQuery.value.trim();
    // if (!searchQuery) {
    //     // updateCountryList();
    //     return;
    // }

    fetchPhotos(searchQuery)
        .then(renderGallery)
        .catch(onFetchError);
}

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '22659377-0dd97b237805bca735c774318';

export function fetchPhotos (name) {
    const PARAMETERS = `?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`;
    const URL = BASE_URL + PARAMETERS;
    return fetch(URL)
    .then(response => {
        if (!response.ok) {
            throw new onFetchError(response.status);
          }
          return response.json();
    });
}

function renderGallery(name) {
    const markup = photoCardTpl(name);
    // refs.gallery.innerHTML = markup;
    console.log(photoCardTpl);
}

function onFetchError () {
    console.log('ERROR');
}