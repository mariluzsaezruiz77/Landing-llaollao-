/* ==========================================================================
   Mi llaollao · Interacciones comunes
   - Acordeón de preguntas frecuentes
   - Carrusel de testimonios (móvil)
   - Botón flotante "Crear mi cuenta" (móvil)
   - Animación de aparición al hacer scroll
   - Año actual en el footer
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- FAQ (acordeón accesible) ---------- */
  document.querySelectorAll(".faq__pregunta").forEach(function (boton) {
    boton.addEventListener("click", function () {
      var item = boton.closest(".faq__item");
      var respuesta = document.getElementById(boton.getAttribute("aria-controls"));
      var abierto = boton.getAttribute("aria-expanded") === "true";
      boton.setAttribute("aria-expanded", String(!abierto));
      respuesta.hidden = abierto;
      item.classList.toggle("abierto", !abierto);
    });
  });

  /* ---------- Carrusel de testimonios ---------- */
  var lista = document.querySelector(".testimonios");
  var puntos = document.querySelector(".puntos-carrusel");
  if (lista && puntos) {
    var tarjetas = Array.prototype.slice.call(lista.children);
    tarjetas.forEach(function (tarjeta, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Ver opinión " + (i + 1) + " de " + tarjetas.length);
      b.addEventListener("click", function () {
        lista.scrollTo({ left: tarjeta.offsetLeft - lista.offsetLeft, behavior: "smooth" });
      });
      puntos.appendChild(b);
    });
    var marcar = function () {
      var indice = Math.round(lista.scrollLeft / (lista.clientWidth || 1));
      Array.prototype.forEach.call(puntos.children, function (b, i) {
        b.setAttribute("aria-current", i === indice ? "true" : "false");
      });
    };
    lista.addEventListener("scroll", function () { window.requestAnimationFrame(marcar); }, { passive: true });
    marcar();
  }

  /* ---------- Botón flotante: aparece tras el hero y se oculta en el formulario ---------- */
  var flotante = document.querySelector(".cta-flotante");
  var hero = document.querySelector(".hero");
  var registro = document.getElementById("registro");
  if (flotante && hero && "IntersectionObserver" in window) {
    var heroVisible = true, registroVisible = false;
    var actualizar = function () {
      var mostrar = !heroVisible && !registroVisible;
      flotante.classList.toggle("visible", mostrar);
      flotante.setAttribute("aria-hidden", String(!mostrar));
      flotante.querySelector("a").tabIndex = mostrar ? 0 : -1;
    };
    new IntersectionObserver(function (e) { heroVisible = e[0].isIntersecting; actualizar(); }).observe(hero);
    if (registro) new IntersectionObserver(function (e) { registroVisible = e[0].isIntersecting; actualizar(); }, { threshold: 0.1 }).observe(registro);
  }

  /* ---------- Aparición suave de secciones ---------- */
  var animables = document.querySelectorAll(".aparecer");
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("visible"); obs.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    animables.forEach(function (el) { obs.observe(el); });
  } else {
    animables.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Año del copyright ---------- */
  document.querySelectorAll("[data-anio]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
