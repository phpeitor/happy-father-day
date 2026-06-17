const wrapper = document.querySelector('.wrapper');
const preview = wrapper.querySelector('.gallery-preview');
const previewImage = wrapper.querySelector('.gallery-preview__image');
const sourceImages = 6;
const totalCards = 18;

const showPreview = (item) => {
	if (!item) {
		preview.classList.remove('gallery-preview--active');
		previewImage.removeAttribute('src');
		previewImage.alt = '';
		return;
	}

	const image = item.querySelector('img');
	previewImage.src = image.src;
	previewImage.alt = image.alt;
	preview.classList.add('gallery-preview--active');
};

const showPreviewFromHash = () => {
	const id = window.location.hash.slice(1);
	showPreview(id ? document.getElementById(id) : null);
};

wrapper.style.setProperty('--cards', totalCards);

for (let i = 1; i <= totalCards; i += 1) {
	const imageNumber = ((i - 1) % sourceImages) + 1;
	const imagePath = `./resources/${imageNumber}.gif`;
	const item = document.createElement('div');
	item.id = `item-${i}`;
	item.dataset.title = `Image ${imageNumber}`;
	item.style.setProperty('--i', i);
	item.style.setProperty('--bg-img', `url(${imagePath})`);

	const link = document.createElement('a');
	link.href = `#item-${i}`;

	const image = document.createElement('img');
	image.src = imagePath;
	image.alt = `Father's Day image ${imageNumber}`;

	link.append(image);
	item.append(link);
	wrapper.insertBefore(item, preview);
}

showPreviewFromHash();
window.addEventListener('hashchange', showPreviewFromHash);
