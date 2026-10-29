# Mi llaollao · Landing de registro

Prototipo web de la landing de registro de **Mi llaollao** (panel de usuario con tickets, puntos del Club llaollao, tiendas y ofertas locales).
Proyecto académico (ESIC). No es una web oficial de llaollao.

## Estructura

```
index.html          Landing principal (hero, beneficios, cómo funciona, vista previa, regalo, opiniones, registro, FAQ)
entrar.html         Acceso para usuarios con cuenta
bienvenida.html     Confirmación tras crear la cuenta
aviso-legal.html    Aviso legal (plantilla)
privacidad.html     Política de privacidad (plantilla)
cookies.html        Política de cookies (plantilla)
css/                Hoja de estilos y tipografías (Bree Serif, Fraunces, Nunito)
js/                 Interacciones: FAQ, carrusel, CTA flotante, validación de formularios, bienvenida
img/                Logotipo, pantallas de la app, avatares e iconos
```

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub y sube todos estos archivos (con las carpetas) a la raíz.
2. Ve a **Settings → Pages**.
3. En *Source* elige **Deploy from a branch**, rama **main** y carpeta **/ (root)**. Guarda.
4. En un par de minutos la web estará en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

## Notas

- Paleta y tipografías según el brandbook de llaollao. ITC Souvenir (de pago) se sustituye por Fraunces.
- Iconos de redes sociales y tiendas de apps: Font Awesome Free 6.5.2 (licencia en css/fontawesome/LICENSE.txt).
- Siluetas de países: Natural Earth (dominio público), vía world-atlas.
- El formulario valida en tiempo real pero no envía datos: simula el alta y lleva a `bienvenida.html`.
