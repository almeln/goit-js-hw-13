import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '22659377-0dd97b237805bca735c774318';

export default class PhotosApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchPhotos() {
        console.log(this);
        const PARAMETERS = `q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;
        const url = `${BASE_URL}?key=${API_KEY}&${PARAMETERS}`;

        const response = await axios.get(url);
        return response.data;
    }

    incrementPage() {
        this.page +=1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}