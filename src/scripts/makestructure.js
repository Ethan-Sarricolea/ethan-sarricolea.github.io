document.addEventListener("DOMContentLoaded", function () {
    let pathParts = window.location.pathname.split("/").filter(p => p !== "");
    let depth = pathParts.length - 1; // Calcula la profundidad correctamente
    console.log("Profundidad:", depth);
    console.log("Ruta actual:", window.location.pathname);

    const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    // const repoName = "MiWeb";

    let basePath = "";

    if (isLocal) {
        basePath = depth > 0 ? "../".repeat(depth) + "src/includes/" : "src/includes/";
    } else {
        basePath = depth > 0 ? "../".repeat(depth) /*+ repoName*/ + "src/includes/" : `src/includes/`;
    }

    console.log("basePath:", basePath);

    // Cargar el header y el footer
    let headerEl = document.getElementById("header");
    let footerEl = document.getElementById("footer");

    if (headerEl) {
        fetch(basePath + "header.html")
            .then(response => response.ok ? response.text() : Promise.reject("Header no encontrado"))
            .then(data => {
                headerEl.innerHTML = data;

                // Activar botón de modo oscuro
                const darkModeButton = document.getElementById("darkModeSwitch");
                if (darkModeButton) {
                    darkModeButton.addEventListener("click", function () {
                        document.body.classList.toggle("dark-mode");
                    });
                }

                // Ajustar rutas de los enlaces de navegación
                document.querySelectorAll("#header .nav-link").forEach(link => {
                    let originalHref = link.getAttribute("href");
                    console.log("Original:", originalHref);

                    if (originalHref && !originalHref.startsWith("http")) {
                        let ifrepo = isLocal ? "" : `/${repoName}`;
                        
                        // Construir la nueva ruta
                        let newHref = "../".repeat(depth) + ifrepo + "/" + originalHref;
                        newHref = newHref.replace(/\/+/g, "/"); // Eliminar dobles barras `/`

                        console.log("Nuevo:", newHref);
                        link.setAttribute("href", newHref);
                    }
                });
            })
            .catch(error => console.error("Error cargando el header:", error));
    }

    if (footerEl) {
        fetch(basePath + "footer.html")
            .then(response => response.ok ? response.text() : Promise.reject("Footer no encontrado"))
            .then(data => {
                footerEl.innerHTML = data;
            })
            .catch(error => console.error("Error cargando el footer:", error));
    }
});


// document.addEventListener("DOMContentLoaded", function () {
//     let depth = window.location.pathname.split("/").length - 2;
//     console.log("Profundidad:", depth);
//     console.log("Ruta actual:", window.location.pathname);

//     const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
//     const repoName = "/MiWeb"; // Cambia esto según tu configuración en GitHub Pages

//     // Definir basePath correctamente
//     let basePath = depth > 0 ? "../".repeat(depth) + "src/includes/" : "src/includes/";
//     if (!isLocal) {
//         basePath = repoName + "/" + basePath;
//     }

//     console.log("basePath:", basePath);

//     // Cargar el header y el footer
//     let headerEl = document.getElementById("header");
//     let footerEl = document.getElementById("footer");

//     if (headerEl) {
//         fetch(basePath + "header.html")
//             .then(response => response.text())
//             .then(data => {
//                 headerEl.innerHTML = data;

//                 // Activar botón de modo oscuro
//                 const darkModeButton = document.getElementById("darkModeSwitch");
//                 if (darkModeButton) {
//                     darkModeButton.addEventListener("click", function () {
//                         document.body.classList.toggle("dark-mode");
//                     });
//                 }

//                 // Ajustar rutas de los enlaces de navegación
//                 document.querySelectorAll("#header .nav-link").forEach(link => {
//                     let originalHref = link.getAttribute("href");
//                     console.log("Original:", originalHref);

//                     if (originalHref && !originalHref.startsWith("http")) {
//                         let ifrepo = isLocal ? "" : repoName;
                        
//                         // Asegurar que no se duplique la barra `/`
//                         let newHref = "../".repeat(depth) + ifrepo + (ifrepo.endsWith("/") ? "" : "/") + originalHref;
//                         newHref = newHref.replace(/\/+/g, "/"); // Evitar dobles barras `//`
                        
//                         console.log("Nuevo:", newHref);
//                         link.setAttribute("href", newHref);
//                     }
//                 });
//             })
//             .catch(error => console.error("Error cargando el header:", error));
//     }

//     if (footerEl) {
//         fetch(basePath + "footer.html")
//             .then(response => response.text())
//             .then(data => {
//                 footerEl.innerHTML = data;
//             })
//             .catch(error => console.error("Error cargando el footer:", error));
//     }
// });


// document.addEventListener("DOMContentLoaded", function () {
//     // Obtener la "profundidad" y ruta base de la pagina actual
//     let depth = window.location.pathname.split("/").length - 2;
//     console.log(depth);
//     console.log(window.location.pathname);
    
//     // Ajustar la ruta base según el entorno (local o GitHub Pages)
//     // let basePath = window.location.hostname === 'localhost' ? "src/includes/" : "/src/includes/";
//     const local1 = "localhost";
//     const local2 = "127.0.0.1";
//     let isLocal = window.location.hostname === local1 || window.location.hostname === local2;

//     let repoName = "/MiWeb"; // Cambia esto por el nombre de tu repositorio en GitHub Pages si es necesario

//     /**
//      * Solo usar en desarrollo
//      */
//     const localPath = (isLocal && local1===window.location.hostname ? local1 : local2);
//     let basePath = (depth > 1 ? "/../".repeat(depth) + "src/includes/" : "/src/includes/");
//     basePath = (isLocal ? basePath : repoName + basePath);

//     console.log("basePath: " + basePath);

//     // let basePath = isLocal ? "src/includes/" : repoName + "/src/includes/";
    
//     // Encontrar los div header y footer
//     let headerEl = document.getElementById("header");
//     let footerEl = document.getElementById("footer");

//     // Si se encuentra el header mostrarlo
//     if (headerEl) {
//         fetch(basePath + "header.html")
//             .then(response => response.text())
//             .then(data => {
//                 headerEl.innerHTML = data;

//                 // 🔹 Asignar el evento para el botón de modo oscuro
//                 const darkModeButton = document.getElementById("darkModeSwitch");
//                 if (darkModeButton) {
//                     darkModeButton.addEventListener("click", function () {
//                         document.body.classList.toggle("dark-mode");
//                     });
//                 }

//                 // Ajustar rutas de los enlaces del nav
//                 document.querySelectorAll("#header .nav-link").forEach(link => {

//                     // Obtener los href del nav
//                     let originalHref = link.getAttribute("href");
//                     console.log("Original: " + originalHref);

//                     // Modificar segun las diferencias
//                     if (originalHref && !originalHref.startsWith("http")) {
//                         let secondBase = ("../".repeat(depth) + (isLocal ? "" : repoName));
//                         let newHref = secondBase + (secondBase.endsWith("/") ? "" : "/") + originalHref;
//                         console.log("Nuevo: " + newHref);
//                         link.setAttribute("href", newHref);
//                     }
//                 });
//             })
//             .catch(error => console.error("Error cargando el header:", error));
//     }

//     // Si se encuentra el footer, mostrarlo
//     if (footerEl) {
//         fetch(basePath + "footer.html")
//             .then(response => response.text())
//             .then(data => {
//                 footerEl.innerHTML = data;
//             })
//             .catch(error => console.error("Error cargando el footer:", error));
//     }
// });


// document.addEventListener("DOMContentLoaded", function () {
//     // Obtener la "profundidad" y ruta base de la pagina actual
//     let depth = window.location.pathname.split("/").length - 2;
//     let basePath = depth > 0 ? "../".repeat(depth) + "src/includes/" : "src/includes/";

//     // Encontrar los div header y footer
//     let headerEl = document.getElementById("header");
//     let footerEl = document.getElementById("footer");

//     // Si se encuentra el header mostrarlo
//     if (headerEl) {
//         fetch(basePath + "header.html")
//             .then(response => response.text())
//             .then(data => {
//                 headerEl.innerHTML = data;

//                 // 🔹 Asignar el evento para el botón de modo oscuro
//                 const darkModeButton = document.getElementById("darkModeSwitch");
//                 if (darkModeButton) {
//                     darkModeButton.addEventListener("click", function () {
//                         document.body.classList.toggle("dark-mode");
//                     });
//                 }

//                 // Ajustar rutas de los enlaces del nav
//                 document.querySelectorAll("#header .nav-link").forEach(link => {
//                     // Obtener los href del nav
//                     let originalHref = link.getAttribute("href");

//                     // Modificar segun las diferencias
//                     if (originalHref && !originalHref.startsWith("http")) {
//                         let newHref = "../".repeat(depth) + originalHref;
//                         link.setAttribute("href", newHref);
//                     }
//                 });
//             })
//             .catch(error => console.error("Error cargando el header:", error));
//     }

//     // Si se encuentra el footer, mostrarlo
//     if (footerEl) {
//         fetch(basePath + "footer.html")
//             .then(response => response.text())
//             .then(data => {
//                 footerEl.innerHTML = data;
//             })
//             .catch(error => console.error("Error cargando el footer:", error));
//     }
// });


// Fallido


// document.addEventListener("DOMContentLoaded", function () {
//     let depth = window.location.pathname.split("/").length - 2;
//     let basePath = depth > 0 ? "../".repeat(depth) + "src/includes/" : "src/includes/";

//     let headerEl = document.getElementById("header");
//     let footerEl = document.getElementById("footer");

//     if (headerEl) {
//         fetch(basePath + "header.html")
//             .then(response => response.text())
//             .then(data => {
//                 headerEl.innerHTML = data;

//                 // Ajustar las rutas de los enlaces del nav
//                 document.querySelectorAll("#header .nav-link").forEach(link => {
//                     let originalHref = link.getAttribute("href");
//                     if (originalHref && !originalHref.startsWith("http")) {
//                         let newHref = "../".repeat(depth) + originalHref;
//                         link.setAttribute("href", newHref);
//                     }
//                 });

//                 // 🔹 Ajustar la ruta de la hoja de estilo del modo oscuro (ahora en src/styles)
//                 const darkModeCssLink = document.getElementById("darkModeCss");
//                 if (darkModeCssLink) {
//                     darkModeCssLink.href = "../".repeat(depth) + "src/styles/darkmode.css";  // Ajusta la ruta de tu CSS
//                     console.log(darkModeCssLink.href)
//                 }

//                 // Asignar el evento para el botón de modo oscuro
//                 const darkModeButton = document.getElementById("darkModeButton");
//                 if (darkModeButton) {
//                     darkModeButton.addEventListener("click", function () {
//                         document.body.classList.toggle("dark-mode");
//                     });
//                 }
//             })
//             .catch(error => console.error("Error cargando el header:", error));
//     }

//     if (footerEl) {
//         fetch(basePath + "footer.html")
//             .then(response => response.text())
//             .then(data => {
//                 footerEl.innerHTML = data;
//             })
//             .catch(error => console.error("Error cargando el footer:", error));
//     }
// });
