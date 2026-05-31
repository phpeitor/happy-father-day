document.addEventListener("DOMContentLoaded", function () {
    const lines = [
        "<b>Querido Papá,</b>",
        "Recuerdo con cariño esas largas noches en las",
        "que a pesar del cansancio, seguías trabajando.",
        "No solo por cumplir con tus responsabilidades,",
        "sino por el amor inquebrantable hacia la familia.",
        "Eres nuestro héroe particular, ese <b>debugger</b> de",
        "la vida que siempre encuentra la solución perfecta",
        "a cualquier problema que se presente.",
        "Deja a un lado el teclado y disfruta.<br>",
        "Con todo mi cariño",
        "♥ <b>PHPeitor</b> ♥",
        "<a href='photo.html' style='color:rgba(240, 69, 69, 0.8);'>see photos</a>"
    ];

    const typedOutput = document.getElementById("typed-output");
    
    // Crear los elementos dinámicamente
    lines.forEach((_, index) => {
        const p = document.createElement("p");
        p.id = `line${index + 1}`;
        if (index >= 9) { // Las últimas 3 líneas
            p.className = "text-right";
        }
        typedOutput.appendChild(p);
    });

    let currentLine = 0;

    function typeNextLine() {
        if (currentLine < lines.length) {
            const targetId = `line${currentLine + 1}`;
            const element = document.getElementById(targetId);
            
            if (currentLine === 4 || currentLine === 7) {
                element.classList.add("spaced-line");
            }
            
            new Typed(`#${targetId}`, {
                strings: [lines[currentLine]],
                typeSpeed: 30,
                showCursor: false,
                onComplete: function () {
                    currentLine++;
                    typeNextLine();
                }
            });
        }
    }

    typeNextLine();

    // ===================== Slider principal =====================
    (function () {
        const box = document.querySelector('.card .Box');
        if (!box) return;

        const sliderImage = box.querySelector('img');
        if (!sliderImage) return;

        const slides = [];

        for (let index = 1; index <= 6; index += 1) {
            slides.push(`./resources/${index}.gif`);
        }

        slides.forEach(function (slideSrc) {
            const preloadImage = new Image();
            preloadImage.src = slideSrc;
        });

        function buildTransparentLogo(src) {
            return new Promise(function (resolve, reject) {
                const sourceImage = new Image();

                sourceImage.onload = function () {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');

                    if (!context) {
                        reject(new Error('Canvas no disponible'));
                        return;
                    }

                    canvas.width = sourceImage.naturalWidth;
                    canvas.height = sourceImage.naturalHeight;
                    context.drawImage(sourceImage, 0, 0);

                    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                    const pixels = imageData.data;
                    const backgroundRed = pixels[0];
                    const backgroundGreen = pixels[1];
                    const backgroundBlue = pixels[2];
                    const threshold = 44;

                    for (let index = 0; index < pixels.length; index += 4) {
                        const redDelta = pixels[index] - backgroundRed;
                        const greenDelta = pixels[index + 1] - backgroundGreen;
                        const blueDelta = pixels[index + 2] - backgroundBlue;
                        const distance = Math.sqrt(redDelta * redDelta + greenDelta * greenDelta + blueDelta * blueDelta);

                        if (distance <= threshold) {
                            pixels[index + 3] = 0;
                        }
                    }

                    context.putImageData(imageData, 0, 0);
                    canvas.className = 'box-slider__text-logo';
                    canvas.setAttribute('aria-hidden', 'true');
                    resolve(canvas);
                };

                sourceImage.onerror = reject;
                sourceImage.src = src;
            });
        }

        buildTransparentLogo('./resources/text.gif').then(function (textLogo) {
            const textBadge = document.createElement('div');
            textBadge.className = 'box-slider__text-badge';
            textBadge.appendChild(textLogo);
            box.appendChild(textBadge);
        }).catch(function () {
            const textBadge = document.createElement('div');
            textBadge.className = 'box-slider__text-badge';

            const textLogoFallback = document.createElement('img');
            textLogoFallback.className = 'box-slider__text-logo';
            textLogoFallback.src = './resources/text.gif';
            textLogoFallback.alt = 'Father Day logo';
            textBadge.appendChild(textLogoFallback);
            box.appendChild(textBadge);
        });

        let currentSlide = 3;
        let autoPlayTimer = null;

        sliderImage.classList.add('box-slider__image');
        sliderImage.alt = 'Father day slider';
        sliderImage.src = slides[currentSlide];

        const indicator = document.createElement('div');
        indicator.className = 'box-slider__indicator';

        slides.forEach(function (_, index) {
            const dot = document.createElement('span');
            dot.className = 'box-slider__dot';
            if (index === currentSlide) {
                dot.classList.add('box-slider__dot--active');
            }
            indicator.appendChild(dot);
        });

        box.appendChild(indicator);

        const dots = Array.from(indicator.children);

        function syncSlider() {
            sliderImage.src = slides[currentSlide];
            dots.forEach(function (dot, index) {
                dot.classList.toggle('box-slider__dot--active', index === currentSlide);
            });
        }

        function goToSlide(nextIndex) {
            currentSlide = (nextIndex + slides.length) % slides.length;
            syncSlider();
        }

        function restartAutoplay() {
            window.clearInterval(autoPlayTimer);
            autoPlayTimer = window.setInterval(function () {
                goToSlide(currentSlide + 1);
            }, 3200);
        }

        syncSlider();
        restartAutoplay();
    }());

    // ===================== Logo Lightbox =====================
    (function () {
        const logoEl = document.querySelector('.logo');
        if (!logoEl) return;
        const logoImg = logoEl.querySelector('.box img');
        if (!logoImg) return;

        logoEl.addEventListener('click', function () {
            if (document.querySelector('.logo-lightbox')) {
                return;
            }

            const rect = logoEl.getBoundingClientRect();
            const logoCX = rect.left + rect.width / 2;
            const logoCY = rect.top + rect.height / 2;
            const vpCX = window.innerWidth / 2;
            const vpCY = window.innerHeight / 2;
            const dx = logoCX - vpCX;
            const dy = logoCY - vpCY;

            const overlay = document.createElement('div');
            overlay.className = 'logo-lightbox';
            overlay.style.setProperty('--lbx', dx + 'px');
            overlay.style.setProperty('--lby', dy + 'px');

            const img = document.createElement('img');
            img.src = logoImg.src;
            img.className = 'logo-lightbox__img';
            img.alt = 'Logo';

            const closeBtn = document.createElement('button');
            closeBtn.className = 'logo-lightbox__close';
            closeBtn.setAttribute('aria-label', 'Cerrar');
            closeBtn.innerHTML = '&times;';

            overlay.appendChild(img);
            overlay.appendChild(closeBtn);
            document.body.appendChild(overlay);

            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    overlay.classList.add('logo-lightbox--open');
                });
            });

            function onKey(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                }
            }

            function closeLightbox() {
                document.removeEventListener('keydown', onKey);
                overlay.classList.remove('logo-lightbox--open');
                overlay.classList.add('logo-lightbox--closing');
                window.setTimeout(function () {
                    overlay.remove();
                }, 420);
            }

            closeBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                closeLightbox();
            });

            overlay.addEventListener('click', function (e) {
                if (e.target === overlay) closeLightbox();
            });

            document.addEventListener('keydown', onKey);
        });
    }());
});