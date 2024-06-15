document.addEventListener("DOMContentLoaded", function () {
    const lines = [
        "Querido Papá,",
        "Recuerdo todas esas noches en las que trabajabas",
        "hasta tarde, no solo para cumplir con tus proyectos,",
        "sino también para asegurarte de que tu familia tuviera",
        "todo lo que necesitaba.<br/><br/><br/>",
        "Eres nuestro 'debugger' personal siempre encontrando",
        "formas de resolver cualquier problema que se nos",
        "presente. Espero que hoy puedas desconectar un",
        "poco y disfrutar de tu día.",
        "Con todo mi cariño,",
        "♥PHPeitor"
    ];

    let currentLine = 0;

    function typeNextLine() {
        if (currentLine < lines.length) {
            new Typed(`#line${currentLine + 1}`, {
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
