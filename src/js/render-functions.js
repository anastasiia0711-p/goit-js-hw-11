import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  return images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="info">
            <p class="info-item"><b>Likes</b><span>${likes}</span></p>
            <p class="info-item"><b>Views</b><span>${views}</span></p>
            <p class="info-item"><b>Comments</b><span>${comments}</span></p>
            <p class="info-item"><b>Downloads</b><span>${downloads}</span></p>
          </div>
        </a>
      </li>`
    )
    .join('');
}

export function renderGallery(container, images) {
  container.style.display = 'flex';
  const markup = createGallery(images);
  container.innerHTML = markup;
  lightbox.refresh();
}

export function clearGallery(container) {
  container.innerHTML = '';
  container.style.display = 'none';
}


export function showLoader(loaderElement) {
  loaderElement.style.display = 'flex';
}

export function hideLoader(loaderElement) {
  loaderElement.style.display = 'none';
}