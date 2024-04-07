import { getImages} from './js/pixabay-api';
import { renderPhotos } from './js/render-functions';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


export const refs = {
form: document.querySelector('.search-form'),
photosGallery: document.querySelector('.gallery'),
loadMoreBtn: document.querySelector('.load-more-btn'),
}

export const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250
});
export let page = 1;
export let pageLimit = 15;
export let searchQuery;
export let maxPage = 0;

const preloader = document.querySelector('.loader');
preloader.style.display = 'none';

export const showLoader = () => {
    preloader.style.display = 'flex';
};
export const hideLoader = () => {
    preloader.style.display = 'none';
};


function scroll() {
  const height = refs.gallery.firstChild.getBoundingClientRect().height;

  scrollBy({
    top: height,
  });
}

hideLoader();

refs.form.addEventListener('submit', sendForm);
refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);


hideLoadMore();

async function sendForm(e) {
  e.preventDefault();
  showLoader();

  searchQuery = e.target.elements.request.value.trim();
  refs.gallery.innerHTML = '';
  page = 1;

  if (!searchQuery) {
    hideLoader();
    hideLoadMore();
    iziToast.error({
        theme: 'dark',
        backgroundColor: '#EF4040',
        progressBarColor: '#B51B1B',
        message: 'Please complete the field!',
        messageColor: '#FAFAFB',
        position: 'topRight',
    });
    return;
    }
    try {
    const data = await getImages(searchQuery, page);
    console.log(data);
    if (data.hits.length === 0) {
      hideLoader();
      iziToast.error({
            theme: 'dark',
            backgroundColor: '#EF4040',
            progressBarColor: '#B51B1B',
            message: "Sorry, there are no images matching your search query. Please try again!",
            messageColor: '#FAFAFB',
            position: 'topRight',
        });
      return;
    }
    maxPage = Math.ceil(data.totalHits / pageLimit);
    renderPhotos(data.hits);
  } catch (err) {
    console.log(err);
  }

  hideLoader();
  statusCheck();
  refs.form.reset();
}



refs.loadMoreBtn.addEventListener('click', onLoadMoreClick)

async function onLoadMoreClick() {
  page += 1;
  showLoader();
  try {
    const data = await getImages(searchQuery, page);
    renderPhotos(data.hits);
  } catch (err) {
    console.log(err);
  }

  scroll();
  statusCheck();
  hideLoader();
}


function statusCheck() {
  if (page >= maxPage) {
    hideLoadMore();
    iziToast.error({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  } else {
    showLoadMore();
  }
}


function showLoadMore() {
    refs.loadMoreBtn.classList.remove('hidden');
}
function hideLoadMore() {
    refs.loadMoreBtn.classList.add('hidden');
}


