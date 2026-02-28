import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const searchParams = new URLSearchParams({
  key: '54497061-8a3f1039e79f08659d000d130',
  image_type: "photo",
  lang: 'en',
  orientation: 'horizontal',
  safesearch: true,
});

export function getImagesByQuery (query) {
	 return axios.get(`/?${searchParams}&q=${query}`)
	 	.then(response => {
	 		 return response.data.hits;
	 	})
	 	.catch(error => {
	 		console.log(error);
	 		console.log(error.response?.status);
	 		console.log(error.response?.statusText);
	 		return error;
	 	});
}
