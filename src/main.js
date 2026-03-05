import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, hideLoader, showLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions.js';
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

let pagen = 1;
let search_text;

const form = document.querySelector(".form");
form.addEventListener("submit", handleSubmit);
const loadMoreBtn = document.querySelector(".load-btn");
loadMoreBtn.addEventListener("click", handleLoadMoreBtn);



async function handleSubmit(event) {
  event.preventDefault();
	const currentForm = event.target;
  search_text = currentForm.elements["search-text"].value;  
  
  if (search_text.trim() === "") {
    return;
  } else {
  clearGallery();
	pagen = 1;
	showLoader();
		try {
  		const hits = await getImagesByQuery(search_text, pagen);
			if (hits.length === 0) {
				iziToast.error({
				    title: '',
				    position: 'topRight',
				    message: 'Sorry, there are no images matching your search query. Please try again!',
				});
			} else {
				createGallery(hits);
				showLoadMoreButton();
				hideLoader();
			}
		} catch (error) {
				iziToast.error({
				    title: 'Error',
				    message: 'Something went wrong.',
				    position: 'topRight',
				});
		}
  }
}

async function  handleLoadMoreBtn (event) {
	pagen += 1;
	console.log('pagen from handleLoadMoreBtn: ' + pagen); 
	try {
		const hits = await getImagesByQuery(search_text, pagen);
		createGallery(hits);
	} catch ( error) {
			iziToast.error({
			    title: 'Error',
			    message: 'Something went wrong.',
			    position: 'topRight',
			});
	}
	
	showLoadMoreButton();
	hideLoader();
}

