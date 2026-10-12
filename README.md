# Reto Corralito — Encuentra el flan

Web app para celular: el cliente escanea el QR de la TV, juega a seguir el flan escondido bajo uno de 3 vasos de barro y, si lo encuentra, se gana un flan gratis.
Antes del premio nada dice que hay algo que ganar: es un misterio hasta el final.
Versión de prueba de una semana: sin base de datos, sin cuentas, sin costo (GitHub Pages).

| Ruta | Para qué |
|---|---|
| `/pantalla` | Lo que se pone en la TV: logo, QR y llamado en español e inglés |
| `/reto` | Bienvenida → juego → premio (lo que ve el cliente) |

## Cómo funciona el control "1 flan por mesa"

No hay sistema: lo controla el mesero. La pantalla del premio muestra **la fecha de hoy y un reloj en vivo con segundos corriendo**, más un borde dorado que gira.
El mesero solo revisa:

1. Que la fecha sea de hoy.
2. Que el reloj se mueva (una captura de pantalla no se mueve).
3. Que su mesa no haya pedido ya otro flan.

## Probar en tu celular (antes de publicar)

1. Abre una terminal en esta carpeta y corre:
   ```
   npm run dev -- -H 0.0.0.0
   ```
2. Tu celular debe estar en el **mismo wifi** que la computadora.
3. En el celular abre `http://IP-DE-TU-COMPU:3000/reto` (en esta compu hoy es `http://192.168.1.71:3000/reto`; la IP sale con el comando `ipconfig`).
4. Para ver la pantalla de la TV: abre `http://192.168.1.71:3000/pantalla` en la compu y escanea el QR con el celular.

> Si Windows pregunta si permite a Node.js en redes privadas, di que sí.

## Publicar (GitHub Pages, gratis)

El sitio vive en la organización de GitHub **Corralitosteakhouse**, repositorio `corralitosteakhouse.github.io`:

- Juego: <https://corralitosteakhouse.github.io/>
- TV: <https://corralitosteakhouse.github.io/pantalla/>

Cada vez que se suben cambios a la rama `main`, GitHub construye y publica solo (en el repositorio, pestaña **Actions**, se ve el avance; tarda 1–2 minutos).

Para subir cambios desde esta carpeta:
```
git add -A
git commit -m "Describe el cambio"
git push
```

Configuración inicial (una sola vez): en el repositorio → **Settings → Pages → Build and deployment → Source: GitHub Actions**.

**Dominio propio (opcional):** el dominio corralitosteakhouse.com se administra en Wix. Para usar `reto.corralitosteakhouse.com`: en Wix → Domains → ⋯ → Manage DNS Records → CNAME con host `reto` apuntando a `corralitosteakhouse.github.io`; luego en GitHub → Settings → Pages → Custom domain → `reto.corralitosteakhouse.com` y activar **Enforce HTTPS**.

## Poner la TV

1. En el navegador de la TV (o una computadora conectada a la TV) abre `https://corralitosteakhouse.github.io/pantalla/`.
2. Toca/da clic una vez en la pantalla para ponerla en pantalla completa.
3. La pantalla se mantiene encendida sola (si el navegador lo permite) y se recarga cada 6 horas para tomar cambios.

El QR siempre apunta a la misma dirección desde la que abriste `/pantalla`.

## Cambiar textos

Todos los textos están en `messages/es.json` (español) y `messages/en.json` (inglés). Edita el texto entre comillas, guarda y sube los cambios (`git push`).

Otros ajustes en `config/reto.ts`:

- `shuffle`: dificultad de los vasos por intento (cuántos cruces y qué tan rápido). Cada intento es más lento; el último nivel se repite, así todos terminan ganando.
- `instagram`: pon tu usuario (ej. `"@corralitosteakhouse"`) para que el premio invite a compartir. Vacío = no se muestra.

## Estructura

```
app/
  reto/            bienvenida, juego (juego/) y premio (premio/)
  pantalla/        TV
components/        piezas de pantalla (ShellGame = juego de vasos, Flan, Vaso, premio, QR…)
config/            reto.ts (ajustes y dificultad)
lib/               idioma, fecha del premio
messages/          textos ES / EN
public/            logo.png
```

## Notas técnicas

- Next.js 16 (App Router) + TypeScript + Tailwind 4. Todo es estático (`output: "export"`): `npm run build` genera la carpeta `out/`, que es lo que publica GitHub Pages.
- El idioma se elige por el idioma del celular (inglés si el celular está en inglés; cualquier otro → español) y se recuerda si el cliente lo cambia.
- La vibración al fallar funciona en Android; iPhone no permite vibrar desde una página web.
- "Hoy" se calcula en hora de El Paso (`America/Denver`).
