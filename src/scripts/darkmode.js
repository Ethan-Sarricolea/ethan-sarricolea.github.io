document.addEventListener("DOMContentLoaded", () => {
    const darkModeSwitch = document.getElementById("darkModeSwitch");
    if (!darkModeSwitch) return; // Evita errores si el switch no existe

    // Verificar la preferencia guardada
    const isDarkMode = localStorage.getItem("theme") === "dark";
    document.body.classList.toggle("dark-mode", isDarkMode);
    darkModeSwitch.checked = isDarkMode;

    // Evento para cambiar el tema cuando el usuario haga clic
    darkModeSwitch.addEventListener("change", () => {
        const enabledDarkMode = darkModeSwitch.checked;
        document.body.classList.toggle("dark-mode", enabledDarkMode);
        localStorage.setItem("theme", enabledDarkMode ? "dark" : "light");
    });
});

