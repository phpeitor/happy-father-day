const wrapper = document.querySelector('.wrapper');
const title = wrapper.querySelector('h1');
const sourceImages = 6;
const totalCards = 18;

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
	wrapper.insertBefore(item, title);
}
