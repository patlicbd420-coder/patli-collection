/* ==========================================================================
   PATLI · CAPA DE DATOS
   --------------------------------------------------------------------------
   Este archivo contiene SOLO datos. Sin DOM, sin CSS, sin lógica de UI.
   Para agregar un producto basta con añadir un objeto al arreglo correspondiente.

   FUENTES
   A) Flores / Extractos / Comestibles / Más -> materiales locales: Media/
      La información completa de estos productos NO está en el PDF.
      Los campos desconocidos se guardan como `null` y la UI los oculta.
      NUNCA inventar: porcentaje THC/CBD, peso, precio, efectos, aromas, genética.

   B) CBD / Cuidado Personal / Mascotas -> "PATLI - CATALOGO PRODUCTOS.pdf"
      Fuente de verdad. `presentacion`, `badges` y `cedula` están verificados.
      `beneficiosPDF` contiene el texto original del PDF y NO se publica:
      incluye afirmaciones sobre enfermedad que están en revisión.

   CONVENCIONES
   - `null`  = dato desconocido. La UI no lo renderiza.
   - `revision: [motivo]` = contenido retenido a la espera de aprobación.
   - Las rutas de medios apuntan a la carpeta Media/<categoría>/<producto>/.
   ========================================================================== */

(function (global) {
  "use strict";

  /* ------------------------------------------------------------------
     1. CATEGORÍAS DE NAVEGACIÓN
     La marca (logo PATLI) vuelve a Home; no hay enlace "Home" en la barra.
     ------------------------------------------------------------------ */
  var CATEGORIAS = [
    { id: "home", nombre: "Home", grupo: "principal" },
    {
      id: "flores",
      nombre: "Flores",
      grupo: "productos",
      resumen: "Colección visual",
      origen: "Media/flores"
    },
    {
      id: "comestibles",
      nombre: "Comestibles",
      grupo: "productos",
      origen: "Media/comestibles"
    },
    {
      id: "extractos",
      nombre: "Extractos",
      grupo: "productos",
      resumen: "Hash · Rosin",
      origen: "Media/Extractos"
    },
    {
      id: "cbd",
      nombre: "CBD",
      grupo: "productos",
      resumen: "Uso oral",
      origen: "PDF páginas 15-21 · Media/CBD"
    },
    {
      id: "cuidado-personal",
      nombre: "Cuidado Personal",
      grupo: "productos",
      resumen: "Uso tópico",
      origen: "PDF páginas 4-12 · Media/Cuidado personal"
    },
    {
      id: "mascotas",
      nombre: "Mascotas",
      grupo: "productos",
      resumen: "CBD y premios",
      origen: "PDF páginas 23-25 · Media/Mascotas"
    },
    {
      id: "hongos-y-lsd",
      nombre: "Hongos y LSD",
      grupo: "productos",
      origen: "Media/Más"
    },
    {
      id: "mas",
      nombre: "Más",
      grupo: "productos",
      origen: "Media/Más"
    }
  ];

  /* ------------------------------------------------------------------
     2. FLORES — fuente: Media/flores
     Único dato verificado: nombre, archivo de video y fotograma.
     `subtipo` = null cuando el material NO confirma la clasificación.
     ------------------------------------------------------------------ */
  var FLORES = [
    {
      id: "ak-47",
      nombre: "Ak-47",
      seccion: "flores",
      sublinea: null,
      subtipo: null,
      video: "Media/flores/ak-47 media/Ak-47.mp4",
      imagen: "Media/flores/ak-47 media/ak-47-a.jpg",
      imagenSecundaria: "Media/flores/ak-47 media/ak-47-b.jpg"
    },
    {
      id: "cherry-gelato",
      nombre: "Cherry Gelato",
      seccion: "flores",
      sublinea: null,
      subtipo: null,
      video: "Media/flores/Cherry Gelato media/Cherry Gelato.mp4",
      imagen: "Media/flores/Cherry Gelato media/cherry-gelato-a.jpg",
      imagenSecundaria: "Media/flores/Cherry Gelato media/cherry-gelato-b.jpg"
    },
    {
      id: "cherry-tartz",
      nombre: "Cherry Tartz",
      seccion: "flores",
      sublinea: null,
      subtipo: null,
      video: "Media/flores/Cherry Tartz Media/Cherry Tartz.mp4",
      imagen: "Media/flores/Cherry Tartz Media/cherry-tartz-a.jpg",
      imagenSecundaria: "Media/flores/Cherry Tartz Media/cherry-tartz-b.jpg"
    },
    {
      id: "gorilla-rush",
      nombre: "Gorilla Rush",
      seccion: "flores",
      sublinea: null,
      subtipo: null,
      video: "Media/flores/Gorilla Rush Media/Gorilla Rush.mp4",
      imagen: "Media/flores/Gorilla Rush Media/gorilla-rush-a.jpg",
      imagenSecundaria: "Media/flores/Gorilla Rush Media/gorilla-rush-b.jpg"
    },
    {
      id: "guayaba-kush",
      nombre: "Guayaba Kush",
      seccion: "flores",
      sublinea: null,
      subtipo: null,
      video: "Media/flores/Guayaba Kush media/Guayaba Kush.mp4",
      imagen: "Media/flores/Guayaba Kush media/guayaba-kush-a.jpg",
      imagenSecundaria: "Media/flores/Guayaba Kush media/guayaba-kush-b.jpg"
    },
    {
      id: "ice-specie",
      nombre: "Ice Specie",
      seccion: "flores",
      sublinea: "ICE",
      subtipo: null,
      video: "Media/flores/Ice Specie Media/Ice specie.mp4",
      imagen: "Media/flores/Ice Specie Media/ice-specie-a.jpg",
      imagenSecundaria: "Media/flores/Ice Specie Media/ice-specie-b.jpg"
    },
    {
      id: "kryptonite",
      nombre: "Kryptonite",
      seccion: "flores",
      sublinea: null,
      subtipo: null,
      video: "Media/flores/Kryptonite media/Kryptonite.mp4",
      imagen: "Media/flores/Kryptonite media/kryptonite-a.jpg",
      imagenSecundaria: "Media/flores/Kryptonite media/kryptonite-b.jpg"
    },
    {
      id: "lemon-sour",
      nombre: "Lemon Sour",
      seccion: "flores",
      sublinea: null,
      subtipo: null,
      video: "Media/flores/Lemon Sour Media/Lemon Sour.mp4",
      imagen: "Media/flores/Lemon Sour Media/lemon-sour-a.jpg",
      imagenSecundaria: "Media/flores/Lemon Sour Media/lemon-sour-b.jpg"
    },
    {
      id: "orange-specie",
      nombre: "Orange Specie",
      seccion: "flores",
      sublinea: null,
      subtipo: null,
      video: "Media/flores/Orange Specie media/Oragne specie.mp4",
      imagen: "Media/flores/Orange Specie media/orange-specie-a.jpg",
      imagenSecundaria: "Media/flores/Orange Specie media/orange-specie-b.jpg"
    },
    {
      id: "oreo-interior",
      nombre: "Oreo Interior",
      seccion: "flores",
      sublinea: null,
      subtipo: null,
      video: "Media/flores/Oreo Interior Media/Oreo Interior.mp4",
      imagen: "Media/flores/Oreo Interior Media/oreo-interior-a.jpg",
      imagenSecundaria: "Media/flores/Oreo Interior Media/oreo-interior-b.jpg"
    },
    {
      id: "tropical-pina-interior",
      nombre: "Tropical Piña Interior",
      seccion: "flores",
      sublinea: null,
      subtipo: null,
      video: "Media/flores/Tropical Piña Int. media/Tropical Piña interior.mp4",
      imagen: "Media/flores/Tropical Piña Int. media/tropical-pina-interior-a.jpg",
      imagenSecundaria: "Media/flores/Tropical Piña Int. media/tropical-pina-interior-b.jpg"
    },
    {
      id: "zkittlez",
      nombre: "Zkittlez",
      seccion: "flores",
      sublinea: null,
      subtipo: null,
      video: "Media/flores/Zkittlez media/Zkittlez indoor.mp4",
      imagen: "Media/flores/Zkittlez media/zkittlez-a.jpg",
      imagenSecundaria: "Media/flores/Zkittlez media/zkittlez-b.jpg"
    }
  ];

  /* ------------------------------------------------------------------
     3. EXTRACTOS — fuente: Media/Extractos
     Solo entran productos cuya propia denominación confirma la categoría.
     ------------------------------------------------------------------ */
  var EXTRACTOS = [
    {
      id: "hachis",
      nombre: "Hachis",
      seccion: "extractos",
      sublinea: null,
      subtipo: "Hash",
      video: "Media/Extractos/Hashish/Hachis.mp4",
      imagen: "Media/Extractos/Hashish/hachis-a.jpg",
      imagenSecundaria: "Media/Extractos/Hashish/hachis-b.jpg"
    },
    {
      id: "kiwi-rosin",
      nombre: "Kiwi Rosin",
      seccion: "extractos",
      sublinea: null,
      subtipo: "Rosin",
      video: "Media/Extractos/Rosin/Rosin Kiwi Media/Rosin Kiwi.mp4",
      imagen: "Media/Extractos/Rosin/Rosin Kiwi Media/kiwi-rosin-a.jpg",
      imagenSecundaria: "Media/Extractos/Rosin/Rosin Kiwi Media/kiwi-rosin-b.jpg"
    },
    {
      id: "rosin-hash",
      nombre: "Rosin Hash",
      seccion: "extractos",
      sublinea: null,
      subtipo: "Rosin",
      video: "Media/Extractos/Rosin/Rosin Hash media/Rosin Hash.mp4",
      imagen: "Media/Extractos/Rosin/Rosin Hash media/rosin-hash-a.jpg",
      imagenSecundaria: "Media/Extractos/Rosin/Rosin Hash media/rosin-hash-b.jpg"
    },
    {
      id: "rosin-sauce",
      nombre: "Rosin Sauce",
      seccion: "extractos",
      sublinea: null,
      subtipo: "Rosin",
      video: "Media/Extractos/Rosin/Rosin Sauce media/Rosin Sauce.mp4",
      imagen: "Media/Extractos/Rosin/Rosin Sauce media/rosin-sauce-a.jpg",
      imagenSecundaria: "Media/Extractos/Rosin/Rosin Sauce media/rosin-sauce-b.jpg"
    }
  ];

  /* ------------------------------------------------------------------
     3b. COMESTIBLES — fuente: Media/comestibles
     Productos identificados por la fotografía de su empaque.
     Sin ficha técnica verificada: sin presentación ni compuestos.
     ------------------------------------------------------------------ */
  var COMESTIBLES = [
    {
      id: "chocolates",
      nombre: "Chocolates",
      seccion: "comestibles",
      sublinea: null,
      subtipo: null,
      imagen: "Media/comestibles/Chocolates media/Chocolates.jpg",
      imagenSecundaria: null
    },
    {
      id: "gomitas-chile-mango",
      nombre: "Gomitas Chile y Mango",
      seccion: "comestibles",
      sublinea: null,
      subtipo: null,
      imagen: "Media/comestibles/Gomitas Chile y Mango Media/Gomitas Chile y Mango.jpg",
      imagenSecundaria: null
    },
    {
      id: "trufas",
      nombre: "Trufas",
      seccion: "comestibles",
      sublinea: null,
      subtipo: null,
      imagen: "Media/comestibles/Trufas Media/Trufas.jpg",
      imagenSecundaria: null
    }
  ];

  /* ------------------------------------------------------------------
     4. CBD / CUIDADO PERSONAL / MASCOTAS — transcripción literal del PDF
     `beneficiosPDF` = texto original RETENIDO (no se publica).
     Motivo: el PDF lo presenta como afirmación de salud y contiene referencias
     a cáncer, diabetes, SIDA, Alzheimer y propiedad antitumorales.
     Regla de este sitio: ningún texto de `beneficiosPDF` se muestra.
     ------------------------------------------------------------------ */

  var USO_ORAL = [
    {
      id: "cbd-full-spectrum",
      nombre: "CBD Full Spectrum",
      seccion: "cbd",
      sublinea: null,
      imagen: "Media/CBD/CBD Full Spectrum/CBD Full spectrum.jpg",
      imagenSecundaria: null,
      presentacion: ["10ml", "30ml"],
      badges: ["Producto 100% Mexicano", "Producto Alotropizado"],
      cedula: null,
      beneficiosPDF: "Combate: Cáncer, diabetes, hipertensión, glaucoma, SIDA, epilepsia, mal de Parkinson, ansiedad, estrés, insomnio, dolor físico, antiséptico, antioxidante, relajante muscular, estimulación del apetito, regeneración celular.",
      revision: ["beneficios-medicos", "termino-alotropizado"],
      pdfPagina: 15
    },
    {
      id: "cbd-aislado",
      nombre: "CBD Aislado",
      seccion: "cbd",
      sublinea: null,
      imagen: "Media/CBD/CBD Aislado/CBD aislado.jpg",
      imagenSecundaria: null,
      presentacion: ["30ml"],
      badges: ["Producto 100% Mexicano", "Producto Alotropizado"],
      cedula: null,
      beneficiosPDF: "Combate: Cáncer, diabetes, hipertensión, glaucoma, SIDA, epilepsia, mal de Parkinson, ansiedad, estrés, insomnio, dolor físico, antiséptico, antioxidante, relajante muscular, estimulación del apetito, regeneración celular.",
      revision: ["beneficios-medicos", "termino-alotropizado"],
      pdfPagina: 16
    },
    {
      id: "gomitas-cbd-aislado",
      nombre: "Gomitas CBD Aislado",
      seccion: "cbd",
      sublinea: null,
      imagen: "Media/CBD/Gomtas CBD Aislado/Gomitas CBD Aislado.jpg",
      imagenSecundaria: null,
      presentacion: ["80gr"],
      badges: ["Producto 100% Mexicano", "Producto Alotropizado"],
      cedula: null,
      beneficiosPDF: "Ansiedad, Depresión, Adicción a drogas, Epilepsia, Dolor, Insomnio, Glaucoma, Presión alta, Parkinson.",
      detallesVerificados: ["Libre de THC", "Uso Terapéutico"],
      revision: ["beneficios-medicos", "termino-alotropizado"],
      pdfPagina: 17
    },
    {
      id: "gomitas-full-spectrum",
      nombre: "Gomitas Full Spectrum",
      seccion: "cbd",
      sublinea: null,
      imagen: "Media/CBD/Gomitas Full Spectrum/gomitas-full-spectrum.png",
      imagenSecundaria: null,
      presentacion: ["80gr"],
      badges: ["Producto 100% Mexicano", "Producto Alotropizado"],
      cedula: null,
      beneficiosPDF: "Ansiedad, Depresión, Adicción a drogas, Epilepsia, Dolor, Insomnio, Glaucoma, Presión alta, Parkinson.",
      detallesVerificados: ["Uso Terapéutico"],
      revision: ["beneficios-medicos", "termino-alotropizado"],
      pdfPagina: 18
    },
    {
      id: "gomitas-melatonina",
      nombre: "Gomitas CBD con Melatonina",
      seccion: "cbd",
      sublinea: null,
      imagen: "Media/CBD/Gomitas CBD con Melatonina/gomitas-melatonina.png",
      imagenSecundaria: null,
      presentacion: ["80gr"],
      badges: ["Producto 100% Mexicano", "Producto Alotropizado"],
      cedula: null,
      beneficiosPDF: "La Melatonina es una hormona del cuerpo que juega un papel clave en la regulación del sueño: Antioxidante, refuerza el sistema inmunológico, controla la obesidad, Alzheimer, protege la piel, frena la caída del cabello.",
      revision: ["beneficios-medicos", "termino-alotropizado"],
      pdfPagina: 19
    },
    {
      id: "regenerador-celular",
      nombre: "Regenerador Celular",
      seccion: "cbd",
      sublinea: "RC Patli",
      imagen: "Media/CBD/Regenerador Celular/Regenerador Celular.jpg",
      imagenSecundaria: null,
      presentacion: ["30ml", "100ml"],
      badges: ["Producto 100% Mexicano", "Producto Alotropizado"],
      cedula: null,
      beneficiosPDF: "Regenerador Celular 100% Natural a base de extractos de Enzimas de diversas Mieles y una selección de Plantas Especiales, además de Proteínas, Lípidos e Hidratos de Carbono (RC). Contiene todos los Aminoacidos escenciales, numerosas Vitaminas del Grupo B, Sustancias Minerales, Oligoelementos y Enzimas.",
      revision: ["beneficios-medicos", "termino-alotropizado", "ubicacion-seccion"],
      pdfPagina: 20
    },
    {
      id: "tierra-diatomeas",
      nombre: "Tierra de Diatomeas",
      seccion: "cbd",
      sublinea: "Grado Alimenticio",
      imagen: "Media/CBD/Tierra de Diatomeas/tierra-diatomeas.png",
      imagenSecundaria: null,
      presentacion: ["250gr"],
      badges: ["Producto 100% Mexicano", "Producto Alotropizado"],
      cedula: null,
      beneficiosPDF: "Reduce presión arterial y colesterol alto. Para la Osteoporosis y alivio de las articulaciones. Para cálculos renales. El Cáncer no puede sobrevivir en las células que contienen altos niveles de Silicio. Ayuda en la diabetes estimulando la producción de elastasa en el páncreas. Desinfectante, ayuda contra el insomnio y dolores de cabeza. Alivia el Alzheimer, previniendo que el cuerpo absorba aluminio.",
      revision: ["beneficios-medicos", "termino-alotropizado", "ubicacion-seccion"],
      pdfPagina: 21
    }
  ];

  var USO_TOPICO = [
    {
      id: "crema-corporal",
      nombre: "Crema Corporal Cannabica",
      seccion: "cuidado-personal",
      sublinea: null,
      imagen: "Media/Cuidado personal/Crema Corporal Cannabica/Crema Corporal Cannabica.jpg",
      imagenSecundaria: null,
      presentacion: ["250gr"],
      badges: ["Producto 100% Mexicano", "Producto Alotropizado"],
      cedula: null,
      beneficiosPDF: "Ideal para: Piel reseca, Protector solar, Dolor muscular, Artrosis, Artritis. Brinda flexibilidad e hidratación profunda.",
      revision: ["beneficios-medicos", "termino-alotropizado"],
      pdfPagina: 4
    },
    {
      id: "crema-facial",
      nombre: "Crema Facial Cannabica",
      seccion: "cuidado-personal",
      sublinea: null,
      imagen: "Media/Cuidado personal/Crema Facial Cannabica/crema-facial.png",
      imagenSecundaria: null,
      presentacion: ["30gr"],
      badges: ["Producto 100% Mexicano", "Producto Alotropizado"],
      cedula: null,
      beneficiosPDF: "Ayuda a mantener la piel sana y tonificada. Regeneradora, acné, manchas, psoriasis, dermatitis y piel reseca.",
      revision: ["beneficios-medicos", "termino-alotropizado"],
      pdfPagina: 5
    },
    {
      id: "gel-cannabico",
      nombre: "Gel Cannabico",
      seccion: "cuidado-personal",
      sublinea: null,
      imagen: "Media/Cuidado personal/Gel Cannabico/gel-cannabico.png",
      imagenSecundaria: null,
      presentacion: ["125gr", "250gr"],
      badges: ["Producto 100% Mexicano", "Producto Alotropizado"],
      cedula: null,
      beneficiosPDF: "Alivia el dolor agudo y crónico de problemas reumatológicos y traumatológicos, como: Dolor muscular, Reumático, Articular, Lumbar, Esguinces, Rotura, Luxación.",
      revision: ["beneficios-medicos", "termino-alotropizado"],
      pdfPagina: 6
    },
    {
      id: "gel-contorno-ojos",
      nombre: "Gel Contorno de Ojos",
      seccion: "cuidado-personal",
      sublinea: null,
      imagen: "Media/Cuidado personal/Gel Contorno de Ojos/gel-contorno-ojos.png",
      imagenSecundaria: null,
      presentacion: ["20gr"],
      badges: ["Producto 100% Mexicano", "Producto Alotropizado"],
      cedula: null,
      beneficiosPDF: "Despicmenta las ojeras y disminuye líneas de expresión, drena bajando la inflamación de bolsas de los ojos, Suavizante.",
      revision: ["beneficios-medicos", "termino-alotropizado"],
      pdfPagina: 7
    },
    {
      id: "lubricante-cannabico",
      nombre: "Lubricante Cannabico",
      seccion: "cuidado-personal",
      sublinea: null,
      imagen: "Media/Cuidado personal/Lubricante Cannabico/gel-lubricante.png",
      imagenSecundaria: null,
      presentacion: ["60ml"],
      badges: ["Producto 100% Mexicano", "Producto Alotropizado"],
      cedula: null,
      beneficiosPDF: "El Gel Cannabico a base agua se aplica igual que todos los geles, de forma externa, vía tópica, en zonas erógenas, principalmente la zona genital o anal. Mayor relajación, mayor sensibilidad, mayor flujo sanguíneo, aumento y prolongación del orgasmo. Indicado para resequedad vaginal.",
      revision: ["beneficios-medicos", "termino-alotropizado", "revision-contenido"],
      pdfPagina: 8
    },
    {
      id: "jabon-cannabico",
      nombre: "Jabón Cannabico",
      seccion: "cuidado-personal",
      sublinea: null,
      imagen: "Media/Cuidado personal/Jabón Cannabico/jabon-cannabico.png",
      imagenSecundaria: null,
      presentacion: ["120gr"],
      badges: ["Producto 100% Mexicano", "Producto Alotropizado"],
      cedula: null,
      beneficiosPDF: "Antioxidante, Regenerador y Oxigenación de células, hidratante, Antiacné ayuda a combatir psoriasis y Eczema.",
      revision: ["beneficios-medicos", "termino-alotropizado"],
      pdfPagina: 9
    },
    {
      id: "pomada-cannabica",
      nombre: "Pomada Cannabica",
      seccion: "cuidado-personal",
      sublinea: null,
      imagen: "Media/Cuidado personal/Pomada Cannabica/Pomada Cannabica.jpg",
      imagenSecundaria: null,
      presentacion: ["30gr", "60gr", "120gr"],
      badges: ["Producto 100% Mexicano", "Producto Alotropizado"],
      cedula: null,
      beneficiosPDF: "Alivia el dolor agudo y crónico de problemas reumatológicos y traumatológicos, como: Dolor muscular, Reumático, Articular, Lumbar, Esguince, Rotura, Luxación. Auxiliar en el tratamiento de Hemorroides y Tatuajes.",
      revision: ["beneficios-medicos", "termino-alotropizado"],
      pdfPagina: 10
    },
    {
      id: "vela-soya-cannabica",
      nombre: "Vela de Soya Cannabica",
      seccion: "cuidado-personal",
      sublinea: null,
      imagen: "Media/Cuidado personal/Vela de Soya Cannabica/vela-soya.png",
      imagenSecundaria: null,
      presentacion: ["120gr"],
      badges: ["Producto 100% Mexicano", "Producto Alotropizado"],
      cedula: null,
      beneficiosPDF: "Humecta. Reduce dolor. Cura hematomas. Ideal para acompañar masajes.",
      revision: ["beneficios-medicos", "termino-alotropizado"],
      pdfPagina: 11
    },
    {
      id: "alcoholatura-axihuitl",
      nombre: "Alcoholatura Cannabica con Axihuitl",
      seccion: "cuidado-personal",
      sublinea: null,
      imagen: "Media/Cuidado personal/Alcoholatura Cannabica con axihuitl/alcoholatura-axihuitl.png",
      imagenSecundaria: null,
      presentacion: ["250ml", "500ml"],
      badges: ["Producto 100% Mexicano", "Producto Alotropizado"],
      cedula: null,
      beneficiosPDF: "Dolor, Antiinflamatorio, Analgésico, Cicatrizante, antibacterial. Inflamación, Calor y Escozor. Reumas, Artritis o fibromialgia. Lesiones, Tendinitis, Contracturas. Piernas cansadas y Golpes.",
      revision: ["beneficios-medicos", "termino-alotropizado"],
      pdfPagina: 12
    }
  ];

  var MASCOTAS = [
    {
      id: "cbd-mascotas",
      nombre: "CBD Mascotas",
      seccion: "mascotas",
      sublinea: null,
      imagen: "Media/Mascotas/CBD Mascotas/CBD Mascotas.jpg",
      imagenSecundaria: null,
      presentacion: ["30ml"],
      badges: ["Producto 100% Mexicano", "Producto Alotropizado"],
      cedula: null,
      beneficiosPDF: "El CBD puede mejorar la calidad de vida de su mascota, puede ayudar a aliviar y controlar: Ansiedad, Inflamación, Pérdida de apetito, Cáncer, Artritis, Dolor, Convulsiones.",
      revision: ["beneficios-medicos", "termino-alotropizado"],
      pdfPagina: 23
    },
    {
      id: "premios-refrescantes",
      nombre: "Premios Refrescantes Patli",
      seccion: "mascotas",
      sublinea: "CBD Mascotas",
      imagen: "Media/Mascotas/Premios Refrescantes/premios-refrescantes.png",
      imagenSecundaria: null,
      presentacion: ["70gr"],
      badges: ["Producto 100% Mexicano", "Producto Alotropizado"],
      cedula: null,
      beneficiosPDF: "Ayuda a limpiar los dientes y refrescar el aliento. Ingredientes naturales y adecuados para tu mascota. Elaborado 100% de manera artesanal.",
      revision: ["beneficios-medicos", "termino-alotropizado"],
      pdfPagina: 24
    },
    {
      id: "premios-atun",
      nombre: "Premios de Atún Patli",
      seccion: "mascotas",
      sublinea: "CBD Mascotas",
      imagen: "Media/Mascotas/Premios de Atún/Premios de Atún.jpg",
      imagenSecundaria: null,
      presentacion: ["70gr"],
      badges: ["Producto 100% Mexicano", "Producto Alotropizado"],
      cedula: null,
      beneficiosPDF: "Ingredientes naturales y adecuados para tu mascota. Elaborado 100% de manera artesanal.",
      revision: ["beneficios-medicos", "termino-alotropizado"],
      pdfPagina: 25
    }
  ];

  /* ------------------------------------------------------------------
     4b. HONGOS Y LSD
     - fuente de psilocibina: Media/Más/psilocybin/<Variedad>/<Variedad>.jpg
       (tres variedades, mapeadas 1:1 por nombre: Albino Teacher, Jack
       Frost, Yeti).
     - Media/Más/Acid contiene LSD Paper/LSD.jpg y Micropunto/micropunto.jpg,
       fuente de los productos LSD y Micropunto.
     - Identidad comercial sin confirmar; se mantienen los nombres de
       archivo tal como llegaron hasta confirmación del cliente.
     ------------------------------------------------------------------ */
  var OTROS = [
    {
      id: "albino-teacher",
      nombre: "Albino Teacher",
      seccion: "hongos-y-lsd",
      sublinea: null,
      subtipo: "Psilocibina",
      imagen: "Media/Más/psilocybin/Albino Teacher/Albino Teacher.jpg",
      imagenSecundaria: null,
      revision: ["nombre-sujeto-a-confirmacion"]
    },
    {
      id: "jack-frost",
      nombre: "Jack Frost",
      seccion: "hongos-y-lsd",
      sublinea: null,
      subtipo: "Psilocibina",
      imagen: "Media/Más/psilocybin/Jack Frost/Jack Frost.jpg",
      imagenSecundaria: null,
      revision: ["nombre-sujeto-a-confirmacion"]
    },
    {
      id: "yeti",
      nombre: "Yeti",
      seccion: "hongos-y-lsd",
      sublinea: null,
      subtipo: "Psilocibina",
      imagen: "Media/Más/psilocybin/Yeti/Yeti.jpg",
      imagenSecundaria: null,
      revision: ["nombre-sujeto-a-confirmacion"]
    },
    {
      id: "lsd",
      nombre: "LSD",
      seccion: "hongos-y-lsd",
      sublinea: null,
      subtipo: null,
      imagen: "Media/Más/Acid/LSD Paper/LSD.jpg",
      imagenSecundaria: null,
      revision: ["nombre-sujeto-a-confirmacion"]
    },
    {
      id: "micropunto",
      nombre: "Micropunto",
      seccion: "hongos-y-lsd",
      sublinea: null,
      subtipo: null,
      imagen: "Media/Más/Acid/Micropunto/micropunto.jpg",
      imagenSecundaria: null,
      revision: ["nombre-sujeto-a-confirmacion"]
    }
  ];

  /* ------------------------------------------------------------------
     5. ÍNDICE
     ------------------------------------------------------------------ */
  var PRODUCTOS = [].concat(FLORES, EXTRACTOS, COMESTIBLES, USO_ORAL, USO_TOPICO, MASCOTAS, OTROS);

  var POR_SECCION = PRODUCTOS.reduce(function (acc, p) {
    (acc[p.seccion] = acc[p.seccion] || []).push(p);
    return acc;
  }, {});

  var CATEGORIAS_CON_PRODUCTOS = CATEGORIAS.filter(function (c) {
    return (POR_SECCION[c.id] || []).length > 0;
  });

  global.PATLI = global.PATLI || {};
  global.PATLI.datos = {
    categorias: CATEGORIAS,
    categoriasConProductos: CATEGORIAS_CON_PRODUCTOS,
    productos: PRODUCTOS,
    porSeccion: POR_SECCION,
    seccion: function (id) {
      return POR_SECCION[id] || [];
    },
    porId: function (id) {
      for (var i = 0; i < PRODUCTOS.length; i++) {
        if (PRODUCTOS[i].id === id) return PRODUCTOS[i];
      }
      return null;
    }
  };
})(window);