/* ==========================================================================
   Mi llaollao · Página de bienvenida
   Personaliza el saludo con el nombre recibido desde el formulario.
   ========================================================================== */
(function () {
  "use strict";
  var params = new URLSearchParams(window.location.search);
  var nombre = (params.get("nombre") || "").trim().slice(0, 40);
  var modo = params.get("modo");
  var titulo = document.getElementById("saludo");
  var texto = document.getElementById("saludo-texto");
  if (!titulo) return;

  if (modo === "entrar") {
    titulo.textContent = nombre ? "¡Hola de nuevo, " + nombre + "!" : "¡Hola de nuevo!";
    texto.textContent = "Ya estás dentro de Mi llaollao. Tus puntos, tickets y ofertas te esperan.";
  } else if (nombre) {
    titulo.textContent = "¡Bienvenid@ a Mi llaollao, " + nombre + "!";
  }
})();
