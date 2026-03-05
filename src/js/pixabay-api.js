import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
/*const searchParams = new URLSearchParams({
  key: '54497061-8a3f1039e79f08659d000d130',
  image_type: "photo",
  lang: 'en',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  per_page: 15,
});
*/
export async function getImagesByQuery(query, pagen = 1) {
  const response = await axios.get('/', {
    params: {
      key: '54497061-8a3f1039e79f08659d000d130',
      image_type: "photo",
      lang: 'en',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page: pagen, // Updates dynamically
      q: query     // Added directly to the object
    }
  });
  return response.data.hits;
}
