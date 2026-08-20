# Credi Bancrea · Documentación técnica

Sitio estático con dos secciones, navegables desde la landing (`index.html`):

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

- `index.html` — landing de navegación
- `flujos/index.html` — mapa de flujos completo
- `incode/index.html` — análisis de sesiones Incode (documento autónomo)
- `flujos/assets/css/styles.css` — identidad Bancrea (Inter, #0099D8, #242A57, #A4CD39)
- `flujos/assets/js/app.js` — lightbox de la galería
- `flujos/assets/img/shots/xNN.jpeg` — las 114 capturas (NN = objeto del PDF de QA = imgNN.jpg de la extracción)
- `flujos/assets/fonts/` — Inter subseteada en WOFF2 (tomada de `fonts/` del repo de la app)
