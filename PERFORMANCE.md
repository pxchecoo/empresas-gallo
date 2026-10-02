# Optimización de rendimiento

Se mantienen las secciones, textos, colores, tipografía, texturas y losa 3D. No se añadieron dependencias de ejecución ni se modificaron el backend o el panel administrativo.

## Cambios

- Imágenes WebP y videos H.264/YUV420p con `faststart`, resolución máxima de 1280 px, bitrate limitado y audio conservado. Los originales permanecen en `assets/`; la web utiliza `assets/optimized/`.
- Videos con `preload="none"` y asignación de fuentes al entrar en pantalla. Las galerías, partículas y animaciones decorativas se pausan fuera de pantalla, con un modal abierto o con la página oculta; se recuperan al volver.
- `prefers-reduced-motion` se respeta desde la carga inicial y al cambiar la preferencia. Se conservan navegación manual y reproducción solicitada por el usuario. El ahorro de datos también desactiva la reproducción automática.
- Menos partículas y resolución de canvas en dispositivos táctiles. Parallax y seguimiento del puntero reservados a ratón; lecturas y escrituras agrupadas por frame.
- Revelados sin blur animado, sombras y desplazamientos más discretos, menor desenfoque en móvil y fondos sin `background-attachment: fixed` en dispositivos táctiles.
- Centrado corregido de la losa durante su animación en móvil, espacio reservado para imágenes, scroll de anclas bajo la navegación, controles de formulario de 16 px para evitar zoom automático de iOS y altura de modales basada en el viewport estable.
- Código de respaldo extraído a `fallback.js`: solo se solicita si el script principal falla. Se conserva ese modo de emergencia.
- Las galerías usan primero archivos existentes. Se retiró únicamente el séptimo video del taller que no existe en el proyecto, junto con su indicador vacío. Se conservan los seis videos disponibles y se conectan sus controles y ampliación.

## Mediciones locales

| Assets convertidos | Originales | Versiones web | Reducción |
| --- | ---: | ---: | ---: |
| Imágenes | 9,10 MB | 2,24 MB | 75,4 % |
| Videos | 105,26 MB | 33,46 MB | 68,2 % |
| Total | 114,36 MB | 35,70 MB | 68,8 % |

Las cifras corresponden a los archivos convertidos, excluyen posters nuevos y no representan el tamaño del directorio completo: se guardan también los originales. Detalle por archivo en `assets/optimized/sizes.json`.

Una comparación con caché vacía, viewport de 390 × 844 y el mismo servidor estático local registró 90,69 MB de recursos locales antes y 0,75 MB después al abrir la página. Las solicitudes de video iniciales pasaron de 10 a 0. Esta comparación refleja también la precarga agresiva del código anterior y el comportamiento del servidor local con solicitudes de video; no equivale a una medición de producción.

## Validación

Pruebas con Chromium de escritorio y WebKit con perfil de iPhone 13, sin excepciones de JavaScript ni assets locales fallidos en el flujo normal:

- Anchos de 320, 375, 390, 430, 768, 820, 1024, 1280 y 1440 px sin desbordamiento horizontal.
- Cambio de idioma, menú móvil, ambos catálogos y cierre con Escape.
- Selección de videos, ampliación, navegación de proyectos y pausa de los videos detrás de los modales.
- Movimiento reducido desde la primera carga y al cambiar la preferencia, navegación manual, reproducción por interacción y ausencia de bucles JavaScript continuos fuera del hero.
- Pausa y recuperación mediante eventos `pagehide`/`pageshow`, y carga del modo de emergencia al bloquear deliberadamente el script principal.
- Formulario y adjuntos mediante respuesta API simulada. No se enviaron cotizaciones reales ni se validó la entrega del backend de producción.

WebKit emulado no sustituye una prueba en un iPhone físico. No se afirma una garantía de 60 FPS; queda pendiente medir FPS y temperatura en dispositivos reales y con la red de producción.

## Reproducir

Servir la carpeta mediante `python3 -m http.server 4173 --bind 127.0.0.1`.

Con Playwright y sus motores Chromium/WebKit disponibles, ejecutar `node scripts/verify-performance.cjs`. Si Playwright está instalado fuera del proyecto, indicar su ruta con `PLAYWRIGHT_MODULE`. Las APIs se interceptan para no enviar datos reales. Las capturas y resultados se escriben en `/tmp/tecnomarmol-verification`, configurable mediante `TEST_OUTPUT`.

Para regenerar los assets: `python3 scripts/optimize_assets.py` (requiere `cwebp` y `ffmpeg`). Publicar también `fallback.js` y toda la carpeta `assets/optimized/` junto a los tres archivos principales.

## Refinamiento visual posterior

- Portada móvil más compacta, título sin “Inc” aislado y cotización como acción principal; enlaces y textos conservados.
- Mármol de fondo más discreto detrás de la portada, bordes y espacios de tarjetas unificados y sombras menos intensas. Se mantiene el vidrio en la navegación y los paneles destacados.
- Muestras del catálogo sin realce artificial de color/contraste y con zoom de hover más sutil. No se sustituyeron fotografías: los seis originales de mármol disponibles solo tienen 140 × 140 px; hacen falta fuentes mayores de los mismos materiales para mejorar su detalle real.
- Indicadores de galerías con áreas táctiles independientes de 44 × 44 px. Los puntos visibles siguen siendo pequeños y el cambio de forma ocurre dentro del control, sin desplazar los botones vecinos.
- Validación funcional con Chromium y WebKit emulando iPhone, más comprobación de pulsaciones en los bordes de los nuevos controles y revisión del título en anchos intermedios.
