/* ==========================================================================
   PATLI · TARJETA
   Componente reutilizable. Una tarjeta por producto, en cualquier sección.
   Solo se renderiza lo que existe en los datos: los campos `null` se omiten.
   No se inventa contenido: si no hay dato, no se imprime nada.

   Las tarjetas son TOTALMENTE ESTÁTICAS: no tienen ningún evento, listener,
   volteo, modal ni acción asociada al toque/click.
   ========================================================================== */

(function (global) {
  "use strict";

  var MARCA = "PATLI";

  /** Crea un elemento con clase y texto. */
  function el(tag, clase, texto) {
    var n = document.createElement(tag);
    if (clase) n.className = clase;
    if (texto != null) n.textContent = texto;
    return n;
  }

  /** Nombre legible de la sección a la que pertenece el producto. */
  function nombreSeccion(id) {
    var cats = (global.PATLI.datos && global.PATLI.datos.categorias) || [];
    for (var i = 0; i < cats.length; i++) {
      if (cats[i].id === id) return cats[i].nombre;
    }
    return "";
  }

  /** Iniciales para el marcador de posición. */
  function monograma(nombre) {
    var palabras = String(nombre).trim().split(/\s+/);
    if (palabras.length === 1) return palabras[0].slice(0, 2).toUpperCase();
    return (palabras[0][0] + palabras[1][0]).toUpperCase();
  }

  /* ------------------------------------------------------------------
     Marcador reservado para cuando llegue la fotografía real del producto.
     No es una imagen inventada: es un marco vacío identificado por nombre.
     ------------------------------------------------------------------ */
  function marcadorFoto(producto) {
    var box = el("div", "tarjeta__sin-foto");
    box.appendChild(el("span", "tarjeta__monograma", monograma(producto.nombre)));
    box.appendChild(el("span", "tarjeta__sin-foto-etq", nombreSeccion(producto.seccion)));
    return box;
  }

  /* ------------------------------------------------------------------
     Contenido frontal: la foto, la marca y el nombre.
     Es lo único que muestra la tarjeta, siempre igual.
     ------------------------------------------------------------------ */
  function caraFrontal(producto) {
    var front = el("div", "tarjeta__cara tarjeta__cara--frente");

    if (producto.imagen) {
      var img = el("img", "tarjeta__foto");
      img.src = producto.imagen;
      img.alt = producto.nombre;
      img.loading = "lazy";
      img.decoding = "async";
      front.appendChild(img);
    } else {
      front.appendChild(marcadorFoto(producto));
    }

    front.appendChild(el("div", "tarjeta__marco"));
    front.appendChild(el("span", "tarjeta__watermark", MARCA));

    var pie = el("div", "tarjeta__pie");
    pie.appendChild(el("span", "tarjeta__nombre", producto.nombre));

    if (producto.sublinea) {
      pie.appendChild(el("span", "tarjeta__sublinea", producto.sublinea));
    }

    /* Descripción muy breve solo si ya existe: ej. "Hash", "Rosin". */
    if (producto.subtipo) {
      pie.appendChild(el("span", "tarjeta__breve", producto.subtipo));
    }

    pie.appendChild(el("span", "tarjeta__filamento"));
    front.appendChild(pie);
    return front;
  }

  /* ------------------------------------------------------------------
     Tarjeta completa. Estática: sin listeners, sin tabindex, sin ARIA de
     acción. Crear y devolver el artículo no le asocia ningún evento.
     ------------------------------------------------------------------ */
  function crearTarjeta(producto) {
    var tarjeta = el("article", "tarjeta");

    var interior = el("div", "tarjeta__interior");
    interior.appendChild(caraFrontal(producto));
    tarjeta.appendChild(interior);

    return tarjeta;
  }

  /** Renderiza una lista de productos dentro de un contenedor. */
  function renderizar(contenedor, productos) {
    contenedor.textContent = "";
    if (!productos || !productos.length) {
      contenedor.appendChild(el("p", "vacio", "Sin productos que mostrar."));
      return;
    }
    var frag = document.createDocumentFragment();
    productos.forEach(function (p) {
      frag.appendChild(crearTarjeta(p));
    });
    contenedor.appendChild(frag);
  }

  global.PATLI = global.PATLI || {};
  global.PATLI.tarjeta = {
    crear: crearTarjeta,
    renderizar: renderizar
  };
})(window);