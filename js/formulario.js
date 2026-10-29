/* ==========================================================================
   Mi llaollao · Validación de formularios (registro y acceso)
   Validación en tiempo real con mensajes claros (heurística 9 de Nielsen).
   Es un prototipo: no envía datos a ningún servidor, simula el alta
   y redirige a la página de bienvenida.
   ========================================================================== */
(function () {
  "use strict";

  var reglas = {
    nombre: function (v) {
      if (!v.trim()) return "¿Cómo te llamamos? Escribe tu nombre.";
      if (v.trim().length < 2) return "Tu nombre necesita al menos 2 letras.";
      return "";
    },
    email: function (v) {
      if (!v.trim()) return "Necesitamos tu email para crear la cuenta.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return "Ups, a este email le falta algo. Revisa que tenga @ y dominio.";
      return "";
    },
    password: function (v) {
      if (v.length < 8 || !/\d/.test(v)) return "Tu contraseña necesita al menos 8 caracteres y un número.";
      return "";
    },
    clave: function (v) {
      return v ? "" : "Escribe tu contraseña para entrar.";
    },
    privacidad: function (v, input) {
      return input.checked ? "" : "Para crear tu cuenta tienes que aceptar la política de privacidad.";
    }
  };

  function validarCampo(input) {
    var regla = reglas[input.dataset.validar];
    if (!regla) return true;
    var error = regla(input.value, input);
    var contenedor = input.closest(".campo") || input.closest(".check");
    var mensaje = document.getElementById(input.getAttribute("aria-describedby"));
    if (mensaje) mensaje.textContent = error;
    input.setAttribute("aria-invalid", error ? "true" : "false");
    if (contenedor && contenedor.classList.contains("campo")) {
      contenedor.classList.toggle("campo--error", !!error);
      contenedor.classList.toggle("campo--ok", !error && input.value !== "");
    }
    return !error;
  }

  function irABienvenida(nombre, modo) {
    var params = new URLSearchParams();
    if (nombre) params.set("nombre", nombre);
    if (modo) params.set("modo", modo);
    window.location.href = "bienvenida.html" + (params.toString() ? "?" + params.toString() : "");
  }

  document.querySelectorAll("form[data-formulario]").forEach(function (form) {
    var campos = form.querySelectorAll("[data-validar]");

    campos.forEach(function (input) {
      // Valida al salir del campo y, si ya mostraba error, mientras se escribe
      input.addEventListener("blur", function () { if (input.value !== "" || input.type === "checkbox") validarCampo(input); });
      input.addEventListener("input", function () { if (input.getAttribute("aria-invalid") === "true") validarCampo(input); });
      input.addEventListener("change", function () { if (input.type === "checkbox") validarCampo(input); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var primeroConError = null;
      campos.forEach(function (input) {
        if (!validarCampo(input) && !primeroConError) primeroConError = input;
      });
      if (primeroConError) { primeroConError.focus(); return; }

      var boton = form.querySelector("[type=submit]");
      boton.disabled = true;
      boton.textContent = form.dataset.formulario === "entrar" ? "Entrando…" : "Creando tu cuenta…";
      var nombre = form.querySelector("[name=nombre]");
      setTimeout(function () {
        irABienvenida(nombre ? nombre.value.trim() : "", form.dataset.formulario);
      }, 700);
    });
  });

  /* Mostrar / ocultar contraseña */
  document.querySelectorAll(".pass__ver").forEach(function (b) {
    b.addEventListener("click", function () {
      var input = document.getElementById(b.getAttribute("aria-controls"));
      var oculto = input.type === "password";
      input.type = oculto ? "text" : "password";
      b.textContent = oculto ? "Ocultar" : "Ver";
      b.setAttribute("aria-pressed", String(oculto));
    });
  });

  /* Registro rápido con Google / Apple (simulado en el prototipo) */
  document.querySelectorAll("[data-social]").forEach(function (b) {
    b.addEventListener("click", function () { irABienvenida("", "social"); });
  });
})();
