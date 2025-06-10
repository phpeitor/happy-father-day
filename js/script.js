document.addEventListener("DOMContentLoaded", function () {
    const lines = [
        "Querido Papá,",
        "Recuerdo con cariño esas largas noches en las que,",
        "a pesar del cansancio, seguías trabajando.",
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
});
