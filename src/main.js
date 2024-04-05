import { pixabayPhoto } from './js/pixabay-api';
import { renderPhotos } from './js/render-functions';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector('.search-form');
export const inputSearch = form.elements.search;
export const photosGallery = document.querySelector('.gallery');
export const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250
});

const preloader = document.querySelector('.loader');
preloader.style.display = 'none';

export const showLoader = () => {
    preloader.style.display = 'flex';
};
const hideLoader = () => {
    preloader.style.display = 'none';
};


form.addEventListener('submit', sendForm);

function sendForm(evt) {
    evt.preventDefault();
    photosGallery.innerHTML = "";
    
    const input = evt.target.elements.search.value.trim();
    if (input !== '') {
        window.onload = () => {
            pixabayPhoto()
                .then((photos) => {
                    renderPhotos(photos.hits);
                    hideLoader();
                })
                .catch((error) => {
                    console.log(error);
                    hideLoader();
                    iziToast.error({
                        theme: 'dark',
                        backgroundColor: '#EF4040',
                        progressBarColor: '#B51B1B',
                        message: 'Sorry, an error occurred while loading. Please try again!',
                        messageColor: '#FAFAFB',
                        position: 'topRight',
                    });
                });
        }
        window.onload();
            form.reset();
        } else {
            iziToast.show({
                theme: 'dark',
                backgroundColor: '#EF4040',
                progressBarColor: '#B51B1B',
                message: 'Please complete the field!',
                messageColor: '#FAFAFB',
                position: 'topRight',
            });
        }
    }
