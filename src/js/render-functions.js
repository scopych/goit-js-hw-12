// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

const loader = document.querySelector(".loader");
const loadBtn = document.querySelector(".load-btn");
var lightbox = new SimpleLightbox('.gallery a', { /* options */ });

export function createGallery (images) {
	const listItems = images.map(obj => `
	<li>
		<a href="${obj.largeImageURL}">
			<img src="${obj.webformatURL}" alt="${obj.tags}">
		</a>
		<div class="captions">
			<p><strong>Likes:</strong> ${obj.likes}</p>
			<p><strong>views:</strong> ${obj.views}</p>
			<p><strong>Comments:</strong> ${obj.comments}</p>
			<p><strong>Downloads:</strong> ${obj.downloads}</p>
		</div>
	</li>`).join('');
	
//	document.querySelector('.gallery').innerHTML = listItems;
	document.querySelector('.gallery').insertAdjacentHTML('beforeend', listItems);
	lightbox.refresh();
	return 0;
}

export function clearGallery () {
	document.querySelector('.gallery').innerHTML = '';
}

export function showLoader () {
	loader.classList.remove("hidden");
}

export function hideLoader () {
	loader.classList.add("hidden");
}

export function showLoadMoreButton () {
	loadBtn.classList.remove("hidden");
}

export function hideLoadMoreButton () {
        loadBtn.classList.add("hidden");
}