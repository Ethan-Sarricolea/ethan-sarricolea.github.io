/**
 * Metodo para mostrar los md
 * @param {*} link 
 */

async function loadReadme(link) {
    const url = link; 

    try {
        const response = await fetch(url);
        const content = await response.text();

        // Convertir Markdown a HTML
        const converter = new showdown.Converter();
        document.getElementById("readme").innerHTML = converter.makeHtml(content);
    } catch (error) {
        console.error("Error cargando el README:", error);
        document.getElementById("readme").innerText = `Error cargando la información. ${error}`;
    }

    hljs.highlightAll();
}

document.addEventListener('DOMContentLoaded', () => {
    // Obtener la URL de la imagen desde el atributo data-imagen-url
    const url = document.getElementById('readme').getAttribute('data-imagen-url');
    console.log(url)
    loadReadme(url); // Llamar la función pasando el link
});

// <script src="https://cdnjs.cloudflare.com/ajax/libs/showdown/2.1.0/showdown.min.js"></script>