// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryRef = document.querySelector('.gallery');

const listItemsMarkup = createListMarkup(galleryItems);

function createListMarkup(items) {
    return items
        .map(({ preview, original, description }) =>
            `
        <a 
        class="gallery__item" 
        href="${original}">
            <img class="gallery__image" 
            src="${preview}" 
            alt="${description}" />
        </a>
        `)
        .join("");
}

galleryRef.insertAdjacentHTML('beforeend', listItemsMarkup);

const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: "alt",
    captionDelay: 250
});