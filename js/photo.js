import {Pane} from 'https://cdn.jsdelivr.net/npm/tweakpane@4.0.5/dist/tweakpane.min.js';

let density = 2;
let distance = 0;
let speed = 150;
const directions = ['top', 'right', 'bottom', 'left'];
let isPaused = false;

const baseImages = Array.from({ length: 6 }, (_, i) => `./resources/${i + 1}.gif`);
const imageCache = new Map();
const imageMaskCache = new Map();

function preloadImages(srcArray, callback) {
  let loaded = 0;
  srcArray.forEach(src => {
    const img = new Image();
    img.onload = () => {
      imageCache.set(src, img);
      const maskCanvas = document.createElement('canvas');
      maskCanvas.width = img.naturalWidth;
      maskCanvas.height = img.naturalHeight;
      const maskContext = maskCanvas.getContext('2d', { willReadFrequently: true });
      maskContext.drawImage(img, 0, 0);
      imageMaskCache.set(src, maskCanvas);

      loaded++;
      if (loaded === srcArray.length) callback();
    };
    img.src = src;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  preloadImages(baseImages, () => { renderWalls(); });
});

const allGridElements = [];
let intervalId;
let gridClickBound = false;

function renderWalls() {
  const gridContainer = document.querySelector('.inf-grid-hero-container');
  gridContainer.style.setProperty('--grid-sz', density);
  gridContainer.style.setProperty('--rev-dis', distance);

  bindGridClick(gridContainer);

  allGridElements.length = 0;

  directions.forEach(dir => {
    const parent = document.querySelector(`.${dir}`);
    if (!parent) return;
    parent.innerHTML = '';
    const total = density * density;
    for (let i = 1; i <= total; i++) {
      const div = document.createElement('div');
      div.classList.add(`${dir.charAt(0)}${i}`);
      parent.appendChild(div);
      allGridElements.push(div);
    }
  });

  startImageInterval();
}

let loadedCount = 0;
let totalElementsToLoad = 0;

function startImageInterval() {
  if (intervalId) clearInterval(intervalId);
  loadedCount = 0;
  totalElementsToLoad = allGridElements.length;

  intervalId = setInterval(() => {
    if (isPaused) return;
    const unloadedElements = allGridElements.filter(el => !el.classList.contains('loaded'));
    if (unloadedElements.length === 0) return;

    const randomElement = unloadedElements[Math.floor(Math.random() * unloadedElements.length)];
    const randomImage = baseImages[Math.floor(Math.random() * baseImages.length)];
    randomElement.style.background = `url('${randomImage}')`;
    randomElement.dataset.src = randomImage;
    randomElement.classList.add('loaded');
    loadedCount++;

    if (loadedCount >= totalElementsToLoad) {
      clearInterval(intervalId);
      document.dispatchEvent(new Event('allImagesLoaded'));
    }
  }, speed);
}

function pauseInterval() {
  isPaused = true;
}

function bindGridClick(gridContainer) {
  if (gridClickBound) return;
  gridClickBound = true;

  gridContainer.addEventListener('click', (event) => {
    const hits = document.elementsFromPoint(event.clientX, event.clientY);
    const tile = hits.find((element) => element.classList?.contains('loaded'));

    if (!tile || !gridContainer.contains(tile)) return;
    if (!isOpaqueTilePoint(tile, event.clientX, event.clientY)) return;

    openLightbox(tile.dataset.src || tile.style.backgroundImage || '');
  });
}

function isOpaqueTilePoint(tile, clientX, clientY) {
  const src = tile.dataset.src;
  const maskCanvas = imageMaskCache.get(src);
  const image = imageCache.get(src);

  if (!maskCanvas || !image) return true;

  const rect = tile.getBoundingClientRect();
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const tileRatio = rect.width / rect.height;

  let drawWidth = rect.width;
  let drawHeight = rect.height;
  let offsetX = 0;
  let offsetY = 0;

  if (imageRatio > tileRatio) {
    drawHeight = rect.width / imageRatio;
    offsetY = (rect.height - drawHeight) / 2;
  } else {
    drawWidth = rect.height * imageRatio;
    offsetX = (rect.width - drawWidth) / 2;
  }

  const localX = clientX - rect.left - offsetX;
  const localY = clientY - rect.top - offsetY;

  if (localX < 0 || localY < 0 || localX > drawWidth || localY > drawHeight) {
    return false;
  }

  const sampleX = Math.max(0, Math.min(image.naturalWidth - 1, Math.floor((localX / drawWidth) * image.naturalWidth)));
  const sampleY = Math.max(0, Math.min(image.naturalHeight - 1, Math.floor((localY / drawHeight) * image.naturalHeight)));
  const context = maskCanvas.getContext('2d', { willReadFrequently: true });
  const startX = Math.max(0, sampleX - 1);
  const startY = Math.max(0, sampleY - 1);
  const sampleWidth = Math.min(3, image.naturalWidth - startX);
  const sampleHeight = Math.min(3, image.naturalHeight - startY);
  const pixels = context.getImageData(startX, startY, sampleWidth, sampleHeight).data;

  let alphaTotal = 0;
  let brightnessTotal = 0;
  const pixelCount = sampleWidth * sampleHeight;

  for (let index = 0; index < pixels.length; index += 4) {
    alphaTotal += pixels[index + 3];
    brightnessTotal += (pixels[index] + pixels[index + 1] + pixels[index + 2]) / 3;
  }

  const alphaAverage = alphaTotal / pixelCount;
  const brightnessAverage = brightnessTotal / pixelCount;

  return alphaAverage > 24 && brightnessAverage < 200;
}

function openLightbox(src) {
  if (!src) return;

  const existing = document.querySelector('.lightbox-overlay');
  if (existing) existing.remove();

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox-overlay';

  const img = document.createElement('img');
  img.className = 'lightbox-img';
  img.src = src;
  img.alt = 'Vista ampliada';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'lightbox-close';
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label', 'Cerrar');
  closeBtn.innerHTML = '&times;';

  lightbox.appendChild(img);
  lightbox.appendChild(closeBtn);
  document.body.appendChild(lightbox);

  requestAnimationFrame(() => {
    lightbox.classList.add('is-open');
  });

  pauseInterval();

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    window.setTimeout(() => {
      lightbox.remove();
      resumeInterval();
    }, 220);
  };

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  img.addEventListener('click', (event) => event.stopPropagation());
  closeBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    closeLightbox();
  });
}

function resumeInterval() {
document.querySelector('.selected')?.classList.remove('selected');
document.querySelector('.selectedPane')?.classList.remove('selectedPane');
  if (!isPaused) return;
  isPaused = false;
  startImageInterval();
}

document.getElementById('back-btn').addEventListener('click', resumeInterval);

// 'Ver' button removed — no global toggle attached now.

function animateDistance(toValue, duration = 600) {
  const el = document.querySelector('.inf-grid-hero-container');
  const fromValue = distance;
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    distance = fromValue + (toValue - fromValue) * eased;
    el.style.setProperty('--rev-dis', distance.toFixed(2));
    PARAMS.distance = Math.round(distance);
    pane.refresh();
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

document.addEventListener('allImagesLoaded', () => {
  document.body.classList.add('all-loaded');
});

/* Panel Control */
const PARAMS = {
  size: density,
  distance: distance,
  speed: speed,
};

const pane = new Pane();
const size = pane.addBinding( PARAMS, 'size', {min: 2, max: 8, step: 1});
size.on('change', function(ev) {
  density = ev.value;
  renderWalls();
});
const dis = pane.addBinding( PARAMS, 'distance', {min: 0, max: 100, step: 1} );
dis.on('change', function(ev) {
  distance = ev.value;
  document.querySelector('.inf-grid-hero-container').style.setProperty('--rev-dis', distance);
});
const spd = pane.addBinding( PARAMS, 'speed', {min: 50, max: 400, step: 50} );
spd.on('change', function(ev) {
  speed = ev.value;
  startImageInterval();
});