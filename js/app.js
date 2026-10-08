/* ==========================================================================
   PATLI · APLICACIÓN
   Navegación, enrutado por hash, portada, destacados y búsqueda.
   Este archivo NO contiene datos de producto: solo los consume de
   window.PATLI.datos y window.PATLI.tarjeta.
   ========================================================================== */

(function (global) {
  "use strict";

  var doc = global.document;
  var datos = global.PATLI.datos;
  var tarjeta = global.PATLI.tarjeta;

  /* ------------------------------------------------------------------
     Piezas destacadas de la portada.
     Son productos reales ya cargados en datos.js. La selección es una
     decisión de presentación: no añade, quita ni altera información.
     ------------------------------------------------------------------ */
  var DESTACADOS = [
    "ak-47",
    "cherry-gelato",
    "hachis",
    "kiwi-rosin",
    "ice-specie",
    "guayaba-kush"
  ];

  function el(tag, clase, texto) {
    var n = doc.createElement(tag);
    if (clase) n.className = clase;
    if (texto != null) n.textContent = texto;
    return n;
  }

  function nombreSeccion(id) {
    for (var i = 0; i < datos.categorias.length; i++) {
      if (datos.categorias[i].id === id) return datos.categorias[i].nombre;
    }
    return "";
  }

  /* ==================================================================
     NAVEGACIÓN
     ================================================================== */
  function construirNav(contenedor) {
    contenedor.textContent = "";
    datos.categorias.forEach(function (cat) {
      // Home no aparece en la barra: la marca (logo PATLI) vuelve a Home.
      if (cat.id === "home" || cat.id === "busqueda") return;
      // Categorías sin productos no se muestran.
      if (!datos.seccion(cat.id).length) return;
      var a = el("a", "nav__enlace", cat.nombre);
      a.href = "#/" + cat.id;
      a.dataset.seccion = cat.id;
      contenedor.appendChild(a);
    });
  }

  function marcarNav(seccionActual) {
    var enlaces = doc.querySelectorAll(".nav__enlace");
    Array.prototype.forEach.call(enlaces, function (a) {
      if (seccionActual && a.dataset.seccion === seccionActual) {
        a.setAttribute("aria-current", "page");
      } else {
        a.removeAttribute("aria-current");
      }
    });
  }

  /* ==================================================================
     PORTADA
     ================================================================== */
  /* La portada es una landing de marca: identidad y poco texto.
     Sin párrafos de relleno ni avisos de origen. */
  function portada() {
    var div = el("div", "portada");

    div.appendChild(el("h1", null, "PATLI"));
    div.appendChild(el("p", "portada__lema", "Echa un vistazo…"));

    var acciones = el("div", "portada__acciones");
    var a1 = el("a", "boton boton--primario", "Ver Flores");
    a1.href = "#/flores";
    var a2 = el("a", "boton boton--linea", "Ver Extractos");
    a2.href = "#/extractos";
    acciones.appendChild(a1);
    acciones.appendChild(a2);
    div.appendChild(acciones);

    return div;
  }

  /* Acceso a categorías: fila compacta, sin texto instructivo.
      La marca manda; las secciones son un acceso secundario. */
  function bloqueCategorias() {
    var wrap = el("section", "categorias");
    wrap.appendChild(el("h2", "categorias__titulo", "Categorías"));

    var rejilla = el("div", "categorias__rejilla");
    datos.categorias.forEach(function (cat) {
      if (cat.id === "home") return;
      var n = datos.seccion(cat.id).length;
      if (!n) return;

      var a = el("a", "categoria");
      a.href = "#/" + cat.id;
      a.appendChild(el("span", "categoria__nombre", cat.nombre));
      rejilla.appendChild(a);
    });

    wrap.appendChild(rejilla);
    return wrap;
  }

  /* Carril de destacados con tarjetas reales. Sin texto explicativo. */
  function bloqueDestacados() {
    var wrap = el("section", "destacados");
    wrap.appendChild(el("h2", "destacados__titulo", "Destacados"));

    var carril = el("div", "destacados__carril");
    var piezas = [];

    DESTACADOS.forEach(function (id) {
      var p = datos.porId(id);
      if (p) piezas.push(p);
    });

    piezas.forEach(function (p) {
      carril.appendChild(tarjeta.crear(p));
    });

    wrap.appendChild(carril);
    return wrap;
  }

  /* ==================================================================
     SECCIONES
     ================================================================== */
  function construirSecciones(contenedor) {
    contenedor.textContent = "";

    datos.categorias.forEach(function (cat) {
      var productos = datos.seccion(cat.id);
      // No se construye una sección vacía: sin productos no hay catálogo que mostrar.
      if (cat.id !== "home" && !productos.length) return;
      var seccion = el("section", "seccion");
      seccion.id = "seccion-" + cat.id;
      seccion.dataset.seccion = cat.id;
      seccion.hidden = true;

      if (cat.id === "home") {
        seccion.appendChild(portada());
        seccion.appendChild(bloqueCategorias());
        seccion.appendChild(bloqueDestacados());
        contenedor.appendChild(seccion);
        return;
      }

      var cab = el("header", "seccion__cabecera");
      var titulo = el("h2", "seccion__titulo", cat.nombre);
      cab.appendChild(titulo);

      if (cat.resumen) cab.appendChild(el("p", "seccion__resumen", cat.resumen));
      seccion.appendChild(cab);

      var rejilla = el("div", "rejilla");
      rejilla.dataset.rejilla = cat.id;
      seccion.appendChild(rejilla);

      contenedor.appendChild(seccion);
    });
  }

  /* ==================================================================
     BÚSQUEDA
     Solo consulta datos reales: nombre, subtipo, línea y sección.
     ================================================================== */
  function normalizar(texto) {
    return String(texto == null ? "" : texto)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function coincide(producto, consulta) {
    var campos = [
      producto.nombre,
      producto.sublinea,
      producto.subtipo,
      nombreSeccion(producto.seccion)
    ];
    for (var i = 0; i < campos.length; i++) {
      if (campos[i] && normalizar(campos[i]).indexOf(consulta) !== -1) return true;
    }
    return false;
  }

  function buscar(consulta) {
    var q = normalizar(consulta).trim();
    if (!q) return [];
    return datos.productos.filter(function (p) {
      return coincide(p, q);
    });
  }

  function construirResultados() {
    var seccion = el("section", "seccion resultados");
    seccion.id = "seccion-busqueda";
    seccion.dataset.seccion = "busqueda";
    seccion.hidden = true;
    doc.getElementById("secciones").appendChild(seccion);
    return seccion;
  }

  function pintarResultados(seccion, encontrados, consulta) {
    seccion.textContent = "";
    seccion.appendChild(el("h2", "resultados__titulo", "Resultados"));

    var sub = el(
      "p",
      "destacados__subtitulo",
      encontrados.length === 1
        ? "1 producto para «" + consulta + "»"
        : encontrados.length + " productos para «" + consulta + "»"
    );
    seccion.appendChild(sub);

    if (!encontrados.length) {
      seccion.appendChild(el("p", "vacio", "No hay productos que coincidan con la búsqueda."));
      return;
    }

    var ul = el("ul", "resultados__lista");

    encontrados.forEach(function (p) {
      var li = el("li");
      var a = el("a", "resultado");
      a.href = "#/" + p.seccion;
      a.dataset.resultado = p.id;

      if (p.imagen) {
        var img = el("img", "resultado__miniatura");
        img.src = p.imagen;
        img.alt = "";
        img.loading = "lazy";
        a.appendChild(img);
      }

      var texto = el("div", "resultado__texto");
      texto.appendChild(el("span", "resultado__nombre", p.nombre));
      var meta = nombreSeccion(p.seccion);
      if (p.subtipo) meta += " · " + p.subtipo;
      texto.appendChild(el("span", "resultado__meta", meta));
      a.appendChild(texto);

      // Solo se muestra lo que existe en los datos.
      if (p.presentacion && p.presentacion.length) {
        a.appendChild(el("span", "resultado__presentacion", p.presentacion.join(" · ")));
      }

      li.appendChild(a);
      ul.appendChild(li);
    });

    seccion.appendChild(ul);
  }

  function aplicarBusqueda() {
    var campo = doc.getElementById("buscador");
    var boton = doc.querySelector(".buscador");
    var seccionBusqueda = doc.getElementById("seccion-busqueda");
    var consulta = campo ? campo.value : "";

    if (boton) boton.classList.toggle("buscador--activo", consulta.length > 0);

    var activa = consulta.trim().length > 0;

    Array.prototype.forEach.call(doc.querySelectorAll(".seccion"), function (s) {
      if (s.dataset.seccion !== "busqueda") s.hidden = activa;
    });

    if (!activa) {
      seccionBusqueda.hidden = true;
      mostrar(seccionDelHash());
      return;
    }

    var encontrados = buscar(consulta);
    pintarResultados(seccionBusqueda, encontrados, consulta.trim());
    seccionBusqueda.hidden = false;
    marcarNav(null);
    seccionBusqueda.focus({ preventScroll: true });
    global.scrollTo({ top: 0, behavior: "auto" });
  }

  function limpiarBusqueda() {
    var campo = doc.getElementById("buscador");
    if (campo) campo.value = "";
    aplicarBusqueda();
  }

  /* ==================================================================
     RUTAS
     ================================================================== */
  function seccionDelHash() {
    var hash = (global.location.hash || "").replace(/^#\/?/, "");
    var valida = datos.categorias.some(function (c) {
      return c.id === hash;
    });
    return valida ? hash : "home";
  }

  function mostrar(id) {
    Array.prototype.forEach.call(doc.querySelectorAll(".seccion"), function (s) {
      s.hidden = s.dataset.seccion !== id;
    });
    marcarNav(id);

    var activa = doc.getElementById("seccion-" + id);
    if (activa) {
      activa.setAttribute("tabindex", "-1");
      // Enfocar sin salto: evita que la página salte al cambiar de sección.
      activa.focus({ preventScroll: true });
    }
    global.scrollTo({ top: 0, behavior: "auto" });
  }

  /* ==================================================================
     ARRANQUE
     ================================================================== */
  function iniciar() {
    construirNav(doc.querySelector(".nav"));
    construirSecciones(doc.getElementById("secciones"));
    construirResultados();

    // Rejillas: todas las secciones pintan tarjetas.
    datos.categorias.forEach(function (cat) {
      if (cat.id === "home") return;
      var rejilla = doc.querySelector('[data-rejilla="' + cat.id + '"]');
      if (rejilla) tarjeta.renderizar(rejilla, datos.seccion(cat.id));
    });

    var campo = doc.getElementById("buscador");
    if (campo) {
      campo.addEventListener("input", aplicarBusqueda);
      campo.addEventListener("search", aplicarBusqueda);
    }

    var limpiar = doc.getElementById("buscador-limpiar");
    if (limpiar) {
      limpiar.addEventListener("click", function () {
        limpiarBusqueda();
        if (campo) campo.focus();
      });
    }

    mostrar(seccionDelHash());

    global.addEventListener("hashchange", function () {
      // Navegar desde un resultado cierra la búsqueda.
      if (campo && campo.value) limpiarBusqueda();
      else mostrar(seccionDelHash());
    });
  }

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }

  global.PATLI.app = {
    mostrar: mostrar,
    seccionDelHash: seccionDelHash,
    buscar: buscar
  };
})(window);