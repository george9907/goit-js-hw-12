import { pixabayPhoto, pageLimit } from './js/pixabay-api';
import { renderPhotos, photosGallery } from './js/render-functions';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



export const form = document.querySelector('.search-form');
export let page = 1;
export let input = '';
let maxPage = 1;

const loadMoreBtn = document.querySelector('.load-more-btn');
hideElement(loadMoreBtn);

const preloader = document.querySelector('.loader');
hideElement(preloader);


window.onload = handleLoad;

form.addEventListener('submit', sendForm);
loadMoreBtn.addEventListener('click', onLoadMoreClick);

function sendForm(evt) {
    evt.preventDefault();
    photosGallery.innerHTML = "";
    const newInput = evt.target.elements.search.value.trim();
    if (newInput !== '') {
        page = 1;
        input = newInput;
        submitForm();
    } else {
        return iziToast.show({
        theme: 'dark',
        backgroundColor: '#EF4040',
        progressBarColor: '#B51B1B',
        message: 'Please complete the field!',
        messageColor: '#FAFAFB',
        position: 'topRight',
    });
    }
}
async function submitForm() {
    try {
        hideElement(loadMoreBtn);
        showElement(preloader);
        if (page <= maxPage) {
            const photoFromPixabay = await pixabayPhoto();
            if (photoFromPixabay.totalHits != 0) {
                maxPage = Math.ceil(photoFromPixabay.totalHits / pageLimit);
                renderPhotos(photoFromPixabay.hits);
                const itemOfList = photosGallery.querySelector('.photos-list-item');
                const domRect = itemOfList.getBoundingClientRect();
                window.scrollBy({
                    top: domRect.height * 2,
                    behavior: "smooth",
                });
                if (page < maxPage) {
                    showElement(loadMoreBtn);
                }
                else {
                    iziToast.info({
                        theme: 'dark',
                        backgroundColor: '#EF4040',
                        progressBarColor: '#B51B1B',
                        message: "We're sorry, there are no more images to load",
                        messageColor: '#FAFAFB',
                        position: 'topRight',
                    });
                } } else {
                iziToast.error({
                 theme: 'dark',
                 backgroundColor: '#EF4040',
                 progressBarColor: '#B51B1B',
                 message: "Sorry, there are no images matching your search query. Please try again!",
                 messageColor: '#FAFAFB',
                 position: 'topRight',
        });
        }}} catch (error) {
        console.log(error);
        iziToast.error({
            message: `${error.message}`,
            theme: 'dark',
            progressBarColor: '#FFFFFF',
            color: '#EF4040',
            position: 'topRight',
        });
    } finally {
        hideElement(preloader);
        handleLoad();
        form.reset();
    }
}

function onLoadMoreClick() {
    ++page;
    submitForm();
};

function showElement(element) {
    element.classList.remove('hidden');
    element.style.display = 'flex';
};

function hideElement(element) {
    element.classList.add('hidden');
    element.style.display = 'none';
};

function handleLoad() {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
};







