document.addEventListener("DOMContentLoaded", function () {
    const lines = [
        "Querido Papá,",
        "Recuerdo con cariño esas largas noches en las",
        "que a pesar del cansancio, seguías trabajando.",
        "No solo por cumplir con tus responsabilidades,",
        "sino por el amor inquebrantable hacia la familia.",
        "Eres nuestro héroe particular, ese 'debugger' de",
        "la vida que siempre encuentra la solución perfecta",
        "a cualquier problema que se presente.",
        "Deja a un lado el teclado y disfruta.",
        "Con todo mi cariño",
        "♥ PHPeitor",
        "<a href='./photo' style='color:rgba(230, 12, 12, 0.8);'>see photos</a>"
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

        const textLogo = document.createElement('img');
        textLogo.className = 'box-slider__text-logo';
        textLogo.src = './resources/text.gif';
        textLogo.alt = 'Father Day logo';
        box.appendChild(textLogo);

        let currentSlide = 0;
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