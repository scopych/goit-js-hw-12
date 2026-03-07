import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, hideLoader, showLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions.js';
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

let pagen = 1;
let maxPage = 1;
const hitsPerPage = 15;
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
		hideLoadMoreButton();
		showLoader();
	  clearGallery();
		pagen = 1;
		try {
  		const data = await getImagesByQuery(search_text, pagen);
			if (data.hits.length === 0) {
				iziToast.error({
				    title: '',
				    position: 'topRight',
				    message: 'Sorry, there are no images matching your search query. Please try again!',
				});
				hideLoader();
			} else {
				createGallery(data.hits);
				showLoadMoreButton();
				hideLoader();
			}

			maxPage = Math.ceil(data.totalHits / hitsPerPage);
			if (maxPage == pagen) {
				iziToast.info({
    			title: '',
					position: 'topRight',
    			message: "We're sorry, but you've reached the end of search results.",
				});
				hideLoadMoreButton();
			}
		} catch (error) {
				hideLoad();
				hideLoadMoreButton();
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
	hideLoadMoreButton();
	showLoader();
	try {
		const data = await getImagesByQuery(search_text, pagen);
		createGallery(data.hits);
		galleryScroll();
		if (maxPage == pagen) {
			hideLoadMoreButton();
			hideLoader();
			iziToast.info({
    		title: '',
				position: 'topRight',
    		message: "We're sorry, but you've reached the end of search results.",
			});
		} else {
			showLoadMoreButton();
			hideLoader();
		}
	} catch ( error) {
			hideLoad();
			iziToast.error({
			    title: 'Error',
			    message: 'Something went wrong.',
			    position: 'topRight',
			});
	}
	
}

function galleryScroll () {
	const imageCard = document.querySelector(".imageCard");
	const rect = imageCard.getBoundingClientRect();
	const imageCardHeight = rect.height;

	const options = {
		top: imageCardHeight * 2,
		behavior: 'smooth',
	}

	scrollBy(options);
}