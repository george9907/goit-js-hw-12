import { form, page, input } from '../main';
import axios from "axios";

export let pageLimit = 15;

export async function pixabayPhoto() {
    let formValue;
    if (page === 1) {
        const inputSearch = form.elements.search;
        formValue = inputSearch.value.trim().split(' ').join('+');
    } else {
        formValue = input.trim().split(' ').join('+');
    }
    const searchParams = new URLSearchParams({
        key: '43219571-0a26e2304ee50d7f75a2b614a',
        q: formValue,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page: page,
        per_page: pageLimit,
    });
    const response = await axios.get(`https://pixabay.com/api/?${searchParams}`);
    return response.data;
}