# Mapa de flujos · Credi Bancrea

Sitio estático con el mapa completo de flujos de la app (arranque, formas de ingresar,
flujo del colaborador, KYC del cliente, estados, documentos, validaciones, hallazgos
y las 114 pantallas reales del PDF de QA verificadas contra el código).

## Ver en local

Abrir `index.html` directamente en el navegador, o servirlo:

```bash
cd mapa_flujos_web
python3 -m http.server 8080
# http://localhost:8080
```

## Estructura

- `index.html` — todo el contenido
- `assets/css/styles.css` — identidad Bancrea (Inter, #0099D8, #242A57, #A4CD39)
- `assets/js/app.js` — lightbox de la galería
- `assets/img/shots/xNN.jpeg` — las 114 capturas (NN = objeto del PDF de QA = imgNN.jpg de la extracción)
- `assets/fonts/` — Inter subseteada en WOFF2 (tomada de `fonts/` del repo de la app)
