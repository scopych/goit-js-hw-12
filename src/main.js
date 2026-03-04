import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, hideLoader, showLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions.js';
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
form.addEventListener("submit", handleSubmit);
const loadMoreBtn = document.querySelector(".load-btn");
loadMoreBtn.addEventListener("click", handleLoadMoreBtn);

let pagen = 1;
let search_text;

function handleSubmit(event) {
  event.preventDefault();
  const currentForm = event.target;
  search_text = currentForm.elements["search-text"].value;  
  
  if (search_text.trim() === "") {
    return;
  } else {
	pagen = 1;
  clearGallery();
	showLoader();
  	getImagesByQuery(search_text, pagen)
		.then(hits => {
			if (hits.length === 0) {
				iziToast.error({
				    title: '',
				    position: 'topRight',
				    message: 'Sorry, there are no images matching your search query. Please try again!',
				});
			} else {
				createGallery(hits);
				showLoadMoreButton();
			}

		})
		.catch( (error) => {
			iziToast.error({
			    title: 'Error',
			    message: 'Something went wrong.',
			    position: 'topRight',
			});
			console.log(error);
			console.log(error.status);
			console.log(error.statusText);
		})
		.finally( () => {
			 hideLoader();
		});
  }
}

function  handleLoadMoreBtn (event) {
	pagen++;

	getImagesByQuery(search_text, pagen)
	.then(hits => {
		createGallery(hits);
		showLoadMoreButton();
	})
	.catch( (error) => {
			iziToast.error({
			    title: 'Error',
			    message: 'Something went wrong.',
			    position: 'topRight',
			});
	})
	.finally( () => {
			 hideLoader();
	});
}

