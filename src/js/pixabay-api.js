import {searchQuery, showLoader, page} from '../main';
import axios from "axios";


export async function getImages(searchQuery, page) {
  const BASE_URL = 'https://pixabay.com/api/';

  const params = {
    key: '43219571-0a26e2304ee50d7f75a2b614a',
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: page,
  };

  const res = await axios.get(BASE_URL, { params });
  return res.data;
}

