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
            });
}