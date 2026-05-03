import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import { renderGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';

const searchForm = document.querySelector('.search-form');
const galleryList = document.querySelector('.gallery');
const loader = document.querySelector('.loader-container');

searchForm.addEventListener('submit', event => {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements.searchQuery.value.trim();

  if (searchQuery === '') {
    iziToast.error({
      title: 'Error',
      message: 'The search field cannot be empty! Please enter a query.',
      position: 'topRight',
    });
    return;
  }

  clearGallery(galleryList);
  showLoader(loader); 

  
  getImagesByQuery(searchQuery)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.warning({
          title: 'Caution',
          message: 'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }

      renderGallery(galleryList, data.hits);
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
        position: 'topRight',
      });
      console.error('API Error:', error);
    })
    .finally(() => {
      hideLoader(loader); 
      searchForm.reset();
    });
});