import { inputSearch, showLoader } from '../main';


export function pixabayPhoto() {
    const formValue = inputSearch.value.trim().split(',').join('+');
    const searchParams = new URLSearchParams({
        key: "43219571-0a26e2304ee50d7f75a2b614a",
        q: [formValue],
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true
    });
    showLoader();
    return fetch(`https://pixabay.com/api/?${searchParams}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        }
        );
}