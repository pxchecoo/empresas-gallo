# Catálogo de materiales

Actualización limitada a Materiales: Mármol, Cuarzo y Granito. Se conservaron los estilos, las tres tarjetas y el lenguaje visual de los modales.

- Las cuatro fotografías originales están en `assets/materials/source/`. Nunca se solicitan desde la página.
- `assets/materials/manifest.json` registra la fotografía, las coordenadas del recorte, el nombre y las dimensiones/peso de cada WebP.
- `scripts/optimize_materials.py` permite regenerar las imágenes con Pillow. No amplía los originales ni reconstruye texturas.
- Mármol conserva sus seis entradas anteriores (corrigiendo «Travertino Romano»). Onix Verde y Travertino Romano usan fotografías reales identificables; se agregaron nueve muestras. Las otras cuatro entradas conservan sus imágenes originales porque no hay una asociación segura con las nuevas fotografías. Se muestran primero las muestras reales y ambas fotos completas al final.
- Cuarzo presenta diez recortes exclusivos de su display. Solo Mistral, Stardust White y Stardust Black tienen nombres legibles; las otras muestras están numeradas.
- Granito presenta veinte recortes de su display; las dos etiquetas dudosas están numeradas.
- Las fotos generales documentan el showroom fotografiado. Sus letreros de inventario pertenecen a la fecha de la foto y no representan una integración de inventario en tiempo real.
- Las referencias a porcelana de portada, servicios, proceso, pie, metadatos y fondos compartidos permanecen fuera del alcance. No hay referencias a esa categoría en las tarjetas, modales ni traducciones de Materiales.

`materials.js` gestiona los tres modales tanto con el script principal como con el fallback: carga de galerías al primer uso, imágenes diferidas, cierre con Escape/X/fondo, foco contenido y devuelto al disparador, y bloqueo de scroll compatible con Safari/iPhone.

## Verificación

Con un servidor estático en `http://127.0.0.1:4173` y Playwright disponible:

```sh
node scripts/verify-materials.cjs
node scripts/verify-performance.cjs
```

Ambos admiten `PLAYWRIGHT_MODULE` y `TEST_URL`. Las pruebas simulan las respuestas API y no envían cotizaciones reales. El catálogo se verifica en Chromium desktop y WebKit tablet/iPhone, además del fallback. Las capturas se guardan en `/tmp/tecnomarmol-materials-verification`.
