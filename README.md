# Credi Bancrea · Documentación técnica

Sitio estático **protegido con acceso** (usuario + contraseña) y dos secciones, navegables desde la landing (`index.html`).

## Acceso y cifrado

GitHub Pages no tiene servidor, así que el control de acceso se hace **cifrando las páginas**: cada ruta publicada es una pantalla de login cuyo contenido real viaja cifrado (AES-256-GCM, clave derivada de la contraseña con PBKDF2-SHA256, 600k iteraciones). Sin la contraseña el HTML publicado es ilegible; el usuario se publica solo como hash SHA-256. La sesión dura lo que dure la pestaña (`sessionStorage`).

Las fuentes en claro viven en `_src/` (**ignorado por git, no se sube**). Para regenerar tras editar una fuente:

```bash
node _tools/build.mjs        # pide usuario y contraseña
# o: CB_USER=... CB_PASS=... node _tools/build.mjs
```

Límites conocidos: la protección es tan fuerte como la contraseña; los recursos estáticos del mapa (`flujos/assets/`, imágenes) no están cifrados; y el historial de git anterior al cifrado conserva las páginas en claro.

## Secciones


- **`flujos/`** — Mapa de flujos de la app.
- **`incode/`** — Sesiones Incode: cómo nacen, se reusan y se renuevan, y dónde afecta la deprecación de Session Restart.

## Mapa de flujos (`flujos/`)

Sitio estático con el mapa completo de flujos de la app (arranque, formas de ingresar,
flujo del colaborador, KYC del cliente, estados, documentos, validaciones, hallazgos
y las 114 pantallas reales del PDF de QA verificadas contra el código).

## Ver en local

Abrir `index.html` (landing) directamente en el navegador, o servir la raíz:

```bash
cd mapa_flujos_web
python3 -m http.server 8080
# http://localhost:8080
```

## Estructura

- `index.html`, `flujos/index.html`, `incode/index.html` — gates cifrados (generados)
- `_tools/build.mjs`, `_tools/gate.html` — generador y plantilla del login
- `_src/` — fuentes en claro (gitignored): `landing.html`, `flujos.html`, `incode.html`
- `flujos/assets/css/styles.css` — identidad Bancrea (Inter, #0099D8, #242A57, #A4CD39)
- `flujos/assets/js/app.js` — lightbox de la galería
- `flujos/assets/img/shots/xNN.jpeg` — las 114 capturas (NN = objeto del PDF de QA = imgNN.jpg de la extracción)
- `flujos/assets/fonts/` — Inter subseteada en WOFF2 (tomada de `fonts/` del repo de la app)
