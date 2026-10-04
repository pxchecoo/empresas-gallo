# Servicio de cotizaciones

Backend Express para el sitio estático de TecnoMármol. POST `/api/cotizacion`
(también acepta `/api/quote`) recibe FormData y envía por la API server-side de
Resend a `info@tecnomarmolpr.com`, desde `cotizaciones@tecnomarmolpr.com`.
Reply-To corresponde al cliente. No guarda datos del cliente ni imprime el
contenido de las cotizaciones en logs.

## Configuración

- Proyecto Vercel ligado a este repositorio, con Root Directory `backend`.
- Verificar `tecnomarmolpr.com` en Resend mediante sus registros DNS de envío.
  Conservar los registros MX y SPF del servicio de correo existente.
- Crear una API key de envío restringida al dominio y guardarla como
  `RESEND_API_KEY` en Vercel (variable privada del servidor), luego redeploy.
- Usar el URL público de Vercel para el atributo `data-api-endpoint` del
  formulario. Esto permite conservar GitHub Pages y el dominio del sitio.
- La API pública de cotizaciones debe estar libre de autenticación de Vercel
  en producción; los previews pueden seguir protegidos.

## Límites y protección

Hasta 5 archivos PDF/JPG/JPEG/PNG/WEBP y **3 MiB en total**, con validación de
extensión, MIME y firma inicial del archivo. Vercel limita los cuerpos de
solicitud a 4.5 MB; el margen permite los campos y el multipart. No se aceptan
DWG/DXF en este envío. La firma identifica el formato; no sustituye un análisis
antivirus. El HTML del correo escapa datos proporcionados por el usuario.

El honeypot descarta bots, CORS permite los dominios del sitio y el límite
es 5 solicitudes por IP cada 15 minutos **por instancia**. Para alto volumen
o abuso distribuido, utilizar una regla de Vercel Firewall o un almacén
compartido; el contador en memoria se reinicia con cada instancia.
Resend deduplica solicitudes idénticas con la misma fecha mediante su
Idempotency-Key. Un error de Resend, timeout o falta de configuración nunca
devuelve un éxito al cliente. `ok: true` indica aceptación del envío por
Resend; verificar `delivered` en Resend para comprobar entrega al destinatario.

## Desarrollo y pruebas

```sh
cd backend
npm ci
cp .env.example .env
npm start
npm test
```

Las pruebas usan HTTP multipart real y un transporte Resend simulado. Cubren
adjuntos, Reply-To, contenido escapado, validación, errores, CORS, honeypot,
límites e idempotencia. Una prueba real de entrega requiere el dominio
verificado y la clave del entorno de producción.
