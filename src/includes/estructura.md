# Navegación y footer

Parte superior

```html
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Mi web</title>
        <!-- Importar Bootstrap desde la CDN -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
        <!-- Css modo oscuro -->
        <link rel="stylesheet" href="src\styles\darkmode.css">
        <link rel="stylesheet" href="src/styles/style.css">
    </head>
    <body>
```

Para colocar el header

```html
    <script src="src/scripts/makestructure.js"></script>
    <!-- Barra de navegación básica -->
    <div id="header"></div>
    <main>
    </main>
```

Colocar el footer

```html
        <!-- Footer -->
        <div id="footer"></div>

        <!-- Bootstrap JS (necesario para el menú responsive) -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
        <script src="src\scripts\darkmode.js"></script>
    </body>
</html>
```