<div align="center">
  <h1>Father's Day 👔</h1>

  [![forthebadge](http://forthebadge.com/images/badges/uses-css.svg)](https://www.linkedin.com/in/drphp/)
  [![forthebadge](http://forthebadge.com/images/badges/made-with-javascript.svg)](https://www.linkedin.com/in/drphp/)
  [![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](https://www.linkedin.com/in/drphp/)
  
  [![Video](https://img.youtube.com/vi/hDpEK6Yq-PM/0.jpg)](https://www.youtube.com/watch?v=hDpEK6Yq-PM)

  [![Video Demo](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube)](https://www.youtube.com/watch?v=hDpEK6Yq-PM)
</div>

## About

**Happy Father's Day** is an interactive greeting card built with HTML, CSS, and JavaScript. The experience presents a 3D book-style card with a handwritten message, animated photo slider, optional video mode, a dedicated photo page, and a responsive circular GIF gallery.

> "Espero que hoy puedas desconectar un poco y disfrutar de tu día. Mereces todos los elogios y mucho más. Con todo mi cariño, PHPeitor."

## Features

- 3D card interaction using CSS transforms and perspective.
- Animated handwritten letter powered by a typing effect.
- Responsive layout tuned for different viewport sizes and reduced browser height.
- Photo slider with automatic playback and visual indicators.
- Video mode using `resources/main.mp4`, selectable outside the card for better UX.
- Media switch links to the circular gallery (`image.html`) and photo view (`photo.html`).
- Circular gallery generated dynamically from `resources/1.gif` to `resources/6.gif`, repeated to complete the ring.
- Gallery preview shows the selected image in the center and includes a Home button back to `index.html`.
- Logo lightbox interaction with smooth open and close animation.
- Lightweight static frontend with no build step required.

## Project Structure

```text
happy-father-day/
├── css/
│   ├── style.css
│   ├── image.css
│   └── photo.css
├── js/
│   ├── script.js
│   ├── image.js
│   ├── photo.js
│   └── typed.min.js
├── resources/
│   ├── 1.gif ... 6.gif
│   ├── logo.png
│   ├── main.mp4
│   └── text.gif
├── index.html
├── image.html
├── photo.html
└── FRONTEND_RULES.md
```

## Local Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/phpeitor/happy-father-day.git
   cd happy-father-day
   ```

2. Run it with a local static server.

   If you are using Apache, place the folder inside `htdocs` and open:

   ```text
   http://127.0.0.1/happy-father-day/
   ```

   You can also use VS Code Live Server or any static server.

## Media Modes And Navigation

The main card switch supports four options:

- `Fotos`: uses the GIF slider from `resources/1.gif` to `resources/6.gif`.
- `Video`: plays `resources/main.mp4` inside the card.
- `Gallery`: opens `image.html`, the circular gallery.
- `Photo`: opens `photo.html`, the photo view.

The selector is rendered outside the card to avoid triggering the book hover animation when switching modes. The gallery page also includes a fixed `Home` button that returns to `index.html`.

## Circular Gallery

- `image.html` keeps only page structure and external asset references.
- `js/image.js` creates 18 cards by looping over the six GIFs and repeating them to complete the circle.
- `css/image.css` controls the circular layout, center preview, Home button, responsive sizing, and background.
- The gallery uses the same visual background direction as the main page without adding extra curtain-like overlay effects.

## Customization

- Update the letter content in `js/script.js` inside the `lines` array.
- Replace slider images in `resources/` while keeping the `1.gif` to `6.gif` naming pattern.
- Replace `resources/main.mp4` to change the video mode content.
- Adjust card sizing, responsive behavior, and visual effects in `css/style.css`, `css/image.css`, or `css/photo.css` depending on the page.

## Notes

- Use a local server instead of opening `index.html` directly if browser media behavior or asset loading becomes inconsistent.
- After changing CSS or JS, update the query string versions in `index.html` or perform a hard refresh with `Ctrl + F5`.
- Frontend guidelines are documented in [FRONTEND_RULES.md](./FRONTEND_RULES.md).
