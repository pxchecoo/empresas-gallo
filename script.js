(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.querySelector("[data-header]");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector("#navMenu");
  const year = document.querySelector("#year");
  const languageGate = document.querySelector("#languageGate");
  const languageOptions = document.querySelectorAll("[data-language]");
  const languageSwitch = document.querySelector("[data-language-toggle]");
  const languageFlag = document.querySelector("[data-language-flag]");
  const languageTooltip = document.querySelector("[data-language-tooltip]");

  const translations = {
    es: {
      title: "TecnoMármol, Inc | Superficies premium",
      metaDescription:
        "TecnoMármol, Inc ofrece soluciones premium en mármol, granito, cuarzo, porcelana y piedras naturales para espacios residenciales y comerciales.",
      metaKeywords:
        "TecnoMármol, Inc, mármol, granito, cuarzo, porcelana, piedra natural, topes, cocinas, baños, pisos, escaleras",
      ogDescription:
        "Transformamos cocinas, baños, pisos, paredes, escaleras y espacios comerciales con materiales de alta calidad.",
      navToggle: "Abrir menú",
      languageToggle: "Cambiar idioma",
      workshopGallery: "Fotos del taller",
      navAbout: "Sobre",
      navServices: "Servicios",
      navProcess: "Proceso",
      navMaterials: "Materiales",
      navPalettes: "Paletas",
      navWorkshop: "Taller",
      navQuote: "Cotización",
      heroSubtitle: "Superficies premium en mármol, granito, cuarzo, porcelana y piedras naturales.",
      heroText:
        "Transformamos cocinas, baños, pisos, paredes, escaleras y espacios comerciales con materiales de alta calidad, acabados elegantes e instalación profesional.",
      viewServices: "Ver servicios",
      requestQuote: "Solicitar cotización",
      premiumSelection: "Selección premium",
      premiumMaterials: "mármol, granito y cuarzo",
      aboutEyebrow: "Sobre TecnoMármol, Inc",
      aboutTitle: "50 años de tradición, artesanía y tecnología en piedra.",
      aboutText1:
        "TecnoMármol, Inc. es parte de Empresas Gallo y ha sido un nombre confiable en el negocio del mármol, granito y piedra en Puerto Rico durante los últimos 50 años. La familia Gallo proviene de maestros artesanos italianos que aprendieron a trabajar con la piedra caliza extraída en su natal Padula, Salerno, a una edad temprana.",
      aboutText2:
        "Su conocimiento adquirido ha sido pasado de generación en generación y hoy ese conocimiento se ha combinado efectivamente con tecnología moderna para enfrentar los desafíos más exigentes en las industrias locales de piedra de Puerto Rico, así como en los mercados de piedra del Caribe desde sus facilidades de 40,000 pies cuadrados ubicada en Río Piedras, Puerto Rico. En esta instalación, TecnoMármol ofrece un taller de piedra con todos los servicios.",
      aboutText3:
        "TecnoMármol se ha ganado la confianza y el respeto de arquitectos, ingenieros, contratistas generales y desarrolladores debido a su excelente mano de obra, servicio confiable y estrategias de gestión efectivas.",
      quality: "Calidad",
      precision: "Precisión",
      elegance: "Elegancia",
      durability: "Durabilidad",
      servicesEyebrow: "Servicios",
      servicesTitle: "Soluciones completas para superficies residenciales y comerciales.",
      servicesIntro:
        "Ofrecemos fabricación, diseño e instalación con materiales seleccionados para trabajos que requieren presencia, resistencia y acabado premium.",
      service1Title: "Mármol y granito para cocinas y baños",
      service1Text: "Superficies naturales con carácter, brillo elegante y resistencia para espacios de uso diario.",
      service2Title: "Topes de cuarzo y porcelana",
      service2Text: "Topes modernos, uniformes y fáciles de mantener para cocinas, baños y áreas de trabajo.",
      service3Title: "Pisos, paredes y escaleras en piedra natural",
      service3Text: "Revestimientos resistentes y expresivos para crear continuidad visual y valor arquitectónico.",
      service4Title: "Corte y fabricación a la medida",
      service4Text: "Piezas trabajadas con precisión para lograr cortes, formas, cantos y acabados personalizados.",
      service5Title: "Instalación profesional",
      service5Text: "Montaje limpio, cuidadoso y orientado a resultados sólidos, duraderos y visualmente impecables.",
      service6Title: "Diseño de superficies para hogares y negocios",
      service6Text: "Propuestas funcionales y elegantes adaptadas al estilo, uso y necesidades de cada proyecto.",
      processEyebrow: "Proceso de trabajo",
      processTitle: "Una experiencia clara desde la idea inicial hasta la instalación final.",
      step1Title: "Consulta inicial",
      step1Text: "Escuchamos las ideas del cliente y evaluamos las necesidades del proyecto.",
      step2Title: "Selección de material",
      step2Text: "Ayudamos a escoger entre mármol, granito, cuarzo, porcelana o piedra natural según el estilo y uso.",
      step3Title: "Medidas y fabricación",
      step3Text: "Trabajamos cada pieza con precisión para lograr cortes, formas y acabados a la medida.",
      step4Title: "Instalación final",
      step4Text: "Instalamos con cuidado profesional para asegurar un resultado resistente, limpio y elegante.",
      step5Title: "Resultado premium",
      step5Text: "Entregamos espacios modernos, funcionales y duraderos con acabado de alta calidad.",
      materialsEyebrow: "Materiales",
      materialsTitle: "Texturas naturales, acabados precisos y presencia arquitectónica.",
      material1Title: "Mármol",
      material1Text: "Elegante, natural y sofisticado. Ideal para espacios con presencia premium.",
      material1Action: "Ver tipos",
      openMarbleCollection: "Abrir tipos de mármol",
      marbleModalClose: "Cerrar tipos de mármol",
      marbleModalEyebrow: "Mármoles disponibles",
      marbleModalTitle: "Tipos de mármol",
      marbleModalIntro:
        "Explora las opciones de mármol disponibles para cocinas, baños, paredes, pisos y piezas a la medida.",
      material2Title: "Granito",
      material2Text: "Resistente, duradero y perfecto para cocinas, baños y superficies de alto uso.",
      material3Title: "Cuarzo",
      material3Text: "Moderno, uniforme y fácil de mantener. Excelente para topes contemporáneos.",
      material3Action: "Ver tipos",
      openQuartzCollection: "Abrir tipos de cuarzo",
      quartzModalClose: "Cerrar tipos de cuarzo",
      quartzModalEyebrow: "Cuarzos disponibles",
      quartzModalTitle: "Tipos de cuarzo",
      quartzModalIntro:
        "Explora las opciones de cuarzo disponibles para topes modernos, superficies resistentes y proyectos a la medida.",
      material4Title: "Porcelana",
      material4Text: "Versátil, elegante y resistente. Ideal para diseños modernos.",
      paletteEyebrow: "Paletas de materiales",
      paletteTitle: "Panel de paletas para seleccionar acabados.",
      paletteIntro:
        "Dejamos estos espacios listos para enlazar las paletas oficiales de materiales cuando las compartas.",
      paletteCard1Aria: "Abrir paleta de materiales 1",
      paletteCard1Title: "Paleta 01",
      paletteCard1Text: "Enlace pendiente para colección de materiales.",
      paletteCard2Aria: "Abrir paleta de materiales 2",
      paletteCard2Title: "Paleta 02",
      paletteCard2Text: "Enlace pendiente para catálogo de superficies.",
      paletteCard3Aria: "Abrir paleta de materiales 3",
      paletteCard3Title: "Paleta 03",
      paletteCard3Text: "Enlace pendiente para opciones premium.",
      paletteOpen: "Abrir enlace",
      workshopEyebrow: "Conoce nuestro taller",
      workshopTitle: "Fabricación precisa, pulido profesional y tecnología para piezas a la medida.",
      workshopText:
        "Somos uno de los pocos talleres especializados donde se cortan piezas, se pulen superficies, se trabaja con medición láser y se cuida cada detalle desde la plantilla inicial hasta el acabado final. Nuestro proceso combina maquinaria, experiencia artesanal y control profesional para lograr piezas limpias, resistentes y listas para instalación.",
      workshopPoint1: "Corte de piezas en máquina",
      workshopPoint2: "Pulido y brillo profesional",
      workshopPoint3: "Cantos y terminaciones a la medida",
      workshopPoint4: "Medición láser y control final",
      workshopVideoLabel: "Videos del taller",
      workshopVideoEyebrow: "Video del taller",
      workshopVideoTitle: "Corte, pulido y acabado en movimiento",
      projectsGalleryLabel: "Galería de proyectos completados",
      projectsEyebrow: "Proyectos completados",
      projectsTitle: "Superficies terminadas con detalle, precisión y acabado premium.",
      projectsControls: "Controles de proyectos completados",
      projectsPrevious: "Proyecto anterior",
      projectsNext: "Siguiente proyecto",
      projectsExpand: "Agrandar proyecto",
      projectsClose: "Cerrar proyecto",
      quoteEyebrow: "Cotización",
      quoteTitle: "¿Listo para transformar tu espacio?",
      quoteText:
        "Solicita una cotización y descubre cómo TecnoMármol, Inc puede ayudarte a crear superficies modernas, resistentes y con acabado premium.",
      contactNow: "Contactar ahora",
      quotePanelHref: "#cotizacion-panel",
      formEyebrow: "Panel de cotización",
      formTitle: "Cuéntanos los detalles de tu proyecto.",
      formIntro:
        "Completa la información del cliente, adjunta planos si los tienes y nuestro equipo revisará los detalles para preparar una respuesta precisa.",
      formName: "Nombre completo",
      formNamePlaceholder: "Nombre y apellido",
      formEmail: "Email",
      formEmailPlaceholder: "correo@ejemplo.com",
      formPhone: "Número de teléfono",
      formPhonePlaceholder: "787-000-0000",
      formProjectType: "Tipo de proyecto",
      formProjectPlaceholder: "Selecciona una opción",
      formProjectKitchen: "Cocina",
      formProjectBath: "Baño",
      formProjectFloors: "Pisos o paredes",
      formProjectStairs: "Escaleras",
      formProjectCommercial: "Comercial",
      formProjectOther: "Otro",
      formDetails: "Información del proyecto",
      formDetailsPlaceholder:
        "Medidas, material deseado, ubicación, tiempo estimado y cualquier detalle importante.",
      formPlans: "Planos o referencias",
      formChooseFiles: "Seleccionar archivos",
      formNoFiles: "Ningún archivo seleccionado",
      formFileSingle: "1 archivo seleccionado",
      formFileMultiple: "{count} archivos seleccionados",
      formPlansHelp: "Puedes adjuntar hasta 5 archivos PDF, imágenes o planos. Se enviarán junto con tu solicitud.",
      formSending: "Enviando solicitud...",
      formSuccess: "Solicitud enviada. Nuestro equipo revisará la información y te contactará pronto.",
      formShareSuccess: "Se abrió WhatsApp con los detalles preparados.",
      formError: "No se pudo enviar la solicitud. Intenta nuevamente o usa WhatsApp.",
      formEndpointMissing: "El backend de cotizaciones todavía no está configurado. Agrega el URL del API en index.html.",
      formFileTooMany: "Solo puedes adjuntar hasta {count} archivos.",
      formFileTooLarge: "Los archivos no pueden pasar de 10MB en total.",
      formMailSubject: "Nueva solicitud de cotización - TecnoMármol, Inc",
      formSelectedFiles: "Archivos seleccionados",
      formWhatsapp: "WhatsApp",
      formSend: "Enviar solicitud",
      footerDescription:
        "Soluciones premium en mármol, granito, cuarzo, porcelana y piedras naturales para espacios residenciales y comerciales.",
      footerServicesTitle: "Servicios",
      footerService1: "Cocinas y baños",
      footerService2: "Topes a la medida",
      footerService3: "Instalación profesional",
      footerContactTitle: "Contacto",
      footerLocation: "Localización",
      footerSocialTitle: "Redes sociales",
      rights: "TecnoMármol, Inc. Derechos reservados."
    },
    en: {
      title: "TecnoMármol, Inc | Premium Surfaces",
      metaDescription:
        "TecnoMármol, Inc offers premium marble, granite, quartz, porcelain and natural stone solutions for residential and commercial spaces.",
      metaKeywords:
        "TecnoMármol, Inc, marble, granite, quartz, porcelain, natural stone, countertops, kitchens, bathrooms, floors, stairs",
      ogDescription:
        "We transform kitchens, bathrooms, floors, walls, stairs and commercial spaces with high quality materials.",
      navToggle: "Open menu",
      languageToggle: "Change language",
      workshopGallery: "Workshop photos",
      navAbout: "About",
      navServices: "Services",
      navProcess: "Process",
      navMaterials: "Materials",
      navPalettes: "Palettes",
      navWorkshop: "Workshop",
      navQuote: "Quote",
      heroSubtitle: "Premium surfaces in marble, granite, quartz, porcelain and natural stone.",
      heroText:
        "We transform kitchens, bathrooms, floors, walls, stairs and commercial spaces with high quality materials, elegant finishes and professional installation.",
      viewServices: "View services",
      requestQuote: "Request a quote",
      premiumSelection: "Premium selection",
      premiumMaterials: "marble, granite and quartz",
      aboutEyebrow: "About TecnoMármol, Inc",
      aboutTitle: "50 years of tradition, craftsmanship and stone technology.",
      aboutText1:
        "TecnoMármol, Inc. is part of Empresas Gallo and has been a trusted name in the marble, granite and stone business in Puerto Rico for the last 50 years. The Gallo family comes from Italian master artisans who learned to work with limestone quarried in their native Padula, Salerno, at an early age.",
      aboutText2:
        "Their acquired knowledge has been passed down from generation to generation, and today that knowledge has been effectively combined with modern technology to meet the most demanding challenges in Puerto Rico's local stone industries, as well as in Caribbean stone markets, from their 40,000-square-foot facilities located in Río Piedras, Puerto Rico. In this facility, TecnoMármol offers a full-service stone workshop.",
      aboutText3:
        "TecnoMármol has earned the trust and respect of architects, engineers, general contractors and developers because of its excellent craftsmanship, reliable service and effective management strategies.",
      quality: "Quality",
      precision: "Precision",
      elegance: "Elegance",
      durability: "Durability",
      servicesEyebrow: "Services",
      servicesTitle: "Complete surface solutions for residential and commercial spaces.",
      servicesIntro:
        "We offer fabrication, design and installation with selected materials for work that requires presence, strength and a premium finish.",
      service1Title: "Marble and granite for kitchens and bathrooms",
      service1Text: "Natural surfaces with character, elegant shine and durability for everyday spaces.",
      service2Title: "Quartz and porcelain countertops",
      service2Text: "Modern, uniform and easy to maintain countertops for kitchens, bathrooms and work areas.",
      service3Title: "Natural stone floors, walls and stairs",
      service3Text: "Durable and expressive coverings that create visual continuity and architectural value.",
      service4Title: "Custom cutting and fabrication",
      service4Text: "Precision-made pieces with custom cuts, shapes, edges and finishes.",
      service5Title: "Professional installation",
      service5Text: "Clean, careful installation focused on strong, lasting and visually refined results.",
      service6Title: "Surface design for homes and businesses",
      service6Text: "Functional and elegant proposals adapted to the style, use and needs of each project.",
      processEyebrow: "Work process",
      processTitle: "A clear experience from the first idea to the final installation.",
      step1Title: "Initial consultation",
      step1Text: "We listen to the client's ideas and evaluate the needs of the project.",
      step2Title: "Material selection",
      step2Text: "We help choose between marble, granite, quartz, porcelain or natural stone based on style and use.",
      step3Title: "Measurements and fabrication",
      step3Text: "We work each piece with precision to achieve custom cuts, shapes and finishes.",
      step4Title: "Final installation",
      step4Text: "We install with professional care to ensure a resistant, clean and elegant result.",
      step5Title: "Premium result",
      step5Text: "We deliver modern, functional and durable spaces with a high quality finish.",
      materialsEyebrow: "Materials",
      materialsTitle: "Natural textures, precise finishes and architectural presence.",
      material1Title: "Marble",
      material1Text: "Elegant, natural and sophisticated. Ideal for spaces with premium presence.",
      material1Action: "View types",
      openMarbleCollection: "Open marble types",
      marbleModalClose: "Close marble types",
      marbleModalEyebrow: "Available marbles",
      marbleModalTitle: "Marble types",
      marbleModalIntro:
        "Explore marble options available for kitchens, bathrooms, walls, floors and custom pieces.",
      material2Title: "Granite",
      material2Text: "Resistant, durable and perfect for kitchens, bathrooms and high-use surfaces.",
      material3Title: "Quartz",
      material3Text: "Modern, uniform and easy to maintain. Excellent for contemporary countertops.",
      material3Action: "View types",
      openQuartzCollection: "Open quartz types",
      quartzModalClose: "Close quartz types",
      quartzModalEyebrow: "Available quartz",
      quartzModalTitle: "Quartz types",
      quartzModalIntro:
        "Explore quartz options available for modern countertops, resistant surfaces and custom projects.",
      material4Title: "Porcelain",
      material4Text: "Versatile, elegant and resistant. Ideal for modern designs.",
      paletteEyebrow: "Material palettes",
      paletteTitle: "A palette panel for selecting finishes.",
      paletteIntro:
        "These spaces are ready for the official material palette links when you send them.",
      paletteCard1Aria: "Open material palette 1",
      paletteCard1Title: "Palette 01",
      paletteCard1Text: "Pending link for a material collection.",
      paletteCard2Aria: "Open material palette 2",
      paletteCard2Title: "Palette 02",
      paletteCard2Text: "Pending link for a surface catalog.",
      paletteCard3Aria: "Open material palette 3",
      paletteCard3Title: "Palette 03",
      paletteCard3Text: "Pending link for premium options.",
      paletteOpen: "Open link",
      workshopEyebrow: "Meet our workshop",
      workshopTitle: "Precise fabrication, professional polishing and technology for custom pieces.",
      workshopText:
        "We are one of the few specialized workshops where pieces are cut, surfaces are polished, laser measurement is used and every detail is cared for from the initial template to the final finish. Our process combines machinery, craftsmanship and professional control to create clean, resistant pieces ready for installation.",
      workshopPoint1: "Machine cutting for custom pieces",
      workshopPoint2: "Professional polishing and shine",
      workshopPoint3: "Custom edges and finishing",
      workshopPoint4: "Laser measurement and final control",
      workshopVideoLabel: "Workshop videos",
      workshopVideoEyebrow: "Workshop video",
      workshopVideoTitle: "Cutting, polishing and finishing in motion",
      projectsGalleryLabel: "Completed projects gallery",
      projectsEyebrow: "Completed projects",
      projectsTitle: "Finished surfaces with detail, precision and a premium finish.",
      projectsControls: "Completed project controls",
      projectsPrevious: "Previous project",
      projectsNext: "Next project",
      projectsExpand: "Expand project",
      projectsClose: "Close project",
      quoteEyebrow: "Quote",
      quoteTitle: "Ready to transform your space?",
      quoteText:
        "Request a quote and discover how TecnoMármol, Inc can help you create modern, resistant surfaces with a premium finish.",
      contactNow: "Contact now",
      quotePanelHref: "#cotizacion-panel",
      formEyebrow: "Quote panel",
      formTitle: "Tell us about your project.",
      formIntro:
        "Complete the client information, attach plans if available, and our team will review the details to prepare an accurate response.",
      formName: "Full name",
      formNamePlaceholder: "First and last name",
      formEmail: "Email",
      formEmailPlaceholder: "email@example.com",
      formPhone: "Phone number",
      formPhonePlaceholder: "787-000-0000",
      formProjectType: "Project type",
      formProjectPlaceholder: "Select an option",
      formProjectKitchen: "Kitchen",
      formProjectBath: "Bathroom",
      formProjectFloors: "Floors or walls",
      formProjectStairs: "Stairs",
      formProjectCommercial: "Commercial",
      formProjectOther: "Other",
      formDetails: "Project information",
      formDetailsPlaceholder:
        "Measurements, desired material, location, estimated timeline and any important details.",
      formPlans: "Plans or references",
      formChooseFiles: "Select files",
      formNoFiles: "No files selected",
      formFileSingle: "1 file selected",
      formFileMultiple: "{count} files selected",
      formPlansHelp: "You may attach up to 5 PDF, image or plan files. They will be sent with your request.",
      formSending: "Sending request...",
      formSuccess: "Request sent. Our team will review the information and contact you soon.",
      formShareSuccess: "WhatsApp opened with the details prepared.",
      formError: "The request could not be sent. Please try again or use WhatsApp.",
      formEndpointMissing: "The quote backend is not configured yet. Add the API URL in index.html.",
      formFileTooMany: "You may attach up to {count} files.",
      formFileTooLarge: "Files cannot exceed 10MB total.",
      formMailSubject: "New quote request - TecnoMármol, Inc",
      formSelectedFiles: "Selected files",
      formWhatsapp: "WhatsApp",
      formSend: "Send request",
      footerDescription:
        "Premium marble, granite, quartz, porcelain and natural stone solutions for residential and commercial spaces.",
      footerServicesTitle: "Services",
      footerService1: "Kitchens and bathrooms",
      footerService2: "Custom countertops",
      footerService3: "Professional installation",
      footerContactTitle: "Contact",
      footerLocation: "Location",
      footerSocialTitle: "Social media",
      rights: "TecnoMármol, Inc. All rights reserved."
    }
  };

  const setMeta = (selector, value) => {
    const element = document.querySelector(selector);
    if (element) element.setAttribute("content", value);
  };

  const applyLanguage = (language) => {
    const copy = translations[language] || translations.es;
    document.documentElement.dataset.lang = language;
    document.documentElement.lang = language;
    document.title = copy.title;
    setMeta('meta[name="description"]', copy.metaDescription);
    setMeta('meta[name="keywords"]', copy.metaKeywords);
    setMeta('meta[property="og:title"]', copy.title);
    setMeta('meta[property="og:description"]', copy.ogDescription);

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (copy[key]) element.textContent = copy[key];
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
      const key = element.dataset.i18nAria;
      if (copy[key]) element.setAttribute("aria-label", copy[key]);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      const key = element.dataset.i18nPlaceholder;
      if (copy[key]) element.setAttribute("placeholder", copy[key]);
    });

    document.querySelectorAll("[data-i18n-href]").forEach((element) => {
      const key = element.dataset.i18nHref;
      if (copy[key]) element.setAttribute("href", copy[key]);
    });

    const languageField = document.querySelector("[data-language-field]");
    if (languageField) languageField.value = language;

    const nextLanguage = language === "en" ? "es" : "en";
    if (languageSwitch) {
      languageSwitch.dataset.currentLanguage = language;
      languageSwitch.dataset.nextLanguage = nextLanguage;
      languageSwitch.setAttribute("aria-label", copy.languageToggle);
      languageSwitch.setAttribute("title", copy.languageToggle);
      languageSwitch.classList.remove("is-switching");
      void languageSwitch.offsetWidth;
      languageSwitch.classList.add("is-switching");
      window.setTimeout(() => languageSwitch.classList.remove("is-switching"), 620);
    }

    if (languageFlag) {
      languageFlag.setAttribute("src", language === "en" ? "assets/language-usa.svg" : "assets/language-spain.svg");
    }

    if (languageTooltip) {
      languageTooltip.textContent = copy.languageToggle;
    }
  };

  languageOptions.forEach((button) => {
    button.addEventListener("click", () => {
      applyLanguage(button.dataset.language);
      if (filePicker) {
        updateFileSummary([...filePicker.files].slice(0, maxFiles));
      }
      languageGate?.classList.add("is-hidden");
      document.body.classList.remove("language-pending");
      window.setTimeout(() => {
        languageGate?.setAttribute("hidden", "");
      }, 540);
    });
  });

  languageOptions[0]?.focus();

  languageSwitch?.addEventListener("click", () => {
    const nextLanguage = languageSwitch.dataset.nextLanguage || (document.documentElement.lang === "en" ? "es" : "en");
    applyLanguage(nextLanguage);
    if (filePicker) {
      updateFileSummary([...filePicker.files].slice(0, maxFiles));
    }
  });

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Sticky navigation state and mobile menu.
  const setHeaderState = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 18);
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  navToggle?.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      navToggle?.classList.remove("is-open");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });

  document.querySelectorAll(".palette-card[href='#']").forEach((link) => {
    link.addEventListener("click", (event) => event.preventDefault());
  });

  const analytics = (() => {
    if (window.location.pathname.startsWith("/admin")) return null;

    const endpoint = "/api/analytics/event";
    const storageKey = "tm_visitor_id";
    const sessionKey = "tm_session_id";
    const pageMap = {
      "": "Inicio",
      inicio: "Inicio",
      servicios: "Servicios",
      taller: "Galería",
      galeria: "Galería",
      "cotizacion-panel": "Cotización",
      contacto: "Cotización",
      "contacto-footer": "Contacto",
      materiales: "Materiales",
      paletas: "Paletas",
      proceso: "Proceso",
      sobre: "Sobre"
    };

    const getId = (store, key) => {
      try {
        let value = store.getItem(key);
        if (!value) {
          value = crypto.randomUUID();
          store.setItem(key, value);
        }
        return value;
      } catch {
        return crypto.randomUUID();
      }
    };

    const visitorId = getId(window.localStorage, storageKey);
    const sessionId = getId(window.sessionStorage, sessionKey);
    let currentPage = pageFromLocation();
    let pageStartedAt = Date.now();
    let exitSent = false;

    function pageFromLocation() {
      const key = window.location.hash.replace("#", "");
      return pageMap[key] || "Inicio";
    }

    const payloadFor = (type, extra = {}) => ({
      type,
      visitorId,
      sessionId,
      page: currentPage,
      path: window.location.pathname,
      hash: window.location.hash,
      referrer: document.referrer || "Acceso directo",
      ...extra
    });

    const send = (type, extra = {}, useBeacon = false) => {
      const payload = payloadFor(type, extra);
      if (useBeacon && navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
        navigator.sendBeacon(endpoint, blob);
        return;
      }

      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: useBeacon,
        credentials: "same-origin"
      }).catch(() => {});
    };

    const finishPage = (type = "page_duration", useBeacon = false) => {
      const durationSeconds = Math.max(0, Math.round((Date.now() - pageStartedAt) / 1000));
      send(type, { durationSeconds }, useBeacon);
    };

    const startPage = (type = "page_view") => {
      currentPage = pageFromLocation();
      pageStartedAt = Date.now();
      send(type);
      if (currentPage === "Cotización") send("quote_open");
    };

    window.addEventListener("hashchange", () => {
      finishPage();
      startPage();
    });

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        finishPage("site_exit", true);
      } else {
        pageStartedAt = Date.now();
        send("heartbeat");
      }
    });

    window.addEventListener("pagehide", () => {
      if (exitSent) return;
      exitSent = true;
      finishPage("site_exit", true);
    });

    window.setInterval(() => send("heartbeat"), 30000);
    window.setTimeout(() => startPage("site_enter"), 250);

    return {
      visitorId,
      sessionId,
      send,
      finishPage
    };
  })();

  const materialModalOpenButtons = document.querySelectorAll("[data-material-modal-open]");
  const materialModalCloseButtons = document.querySelectorAll("[data-material-modal-close]");
  let materialLastFocusedElement = null;

  const closeMaterialModal = (modal = document.querySelector(".material-modal.is-open")) => {
    if (!modal || !modal.classList.contains("is-open")) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (materialLastFocusedElement instanceof HTMLElement) {
      materialLastFocusedElement.focus();
    }
  };

  const openMaterialModal = (modal) => {
    if (!modal) return;
    closeMaterialModal();
    materialLastFocusedElement = document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modal.querySelector(".modal-close")?.focus();
  };

  materialModalOpenButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openMaterialModal(document.querySelector(button.dataset.materialModalOpen));
    });
  });

  materialModalCloseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      closeMaterialModal(button.closest(".material-modal"));
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMaterialModal();
    }
  });

  document.querySelectorAll("[data-video-rotator]").forEach((rotator) => {
    const videos = [...rotator.querySelectorAll(".workshop-video")];
    const dots = [...rotator.querySelectorAll(".workshop-video-dots span")];
    let activeIndex = 0;
    let rotationTimer = null;

    const availableVideos = () => videos.filter((video) => !video.dataset.failed);

    const setActiveVideo = (index) => {
      const available = availableVideos();
      if (!available.length) {
        rotator.classList.add("has-no-videos");
        videos.forEach((video) => {
          video.classList.remove("is-active");
          video.pause();
        });
        dots.forEach((dot) => dot.classList.remove("is-active"));
        return;
      }

      activeIndex = ((index % videos.length) + videos.length) % videos.length;
      let guard = 0;
      while (videos[activeIndex]?.dataset.failed && guard < videos.length) {
        activeIndex = (activeIndex + 1) % videos.length;
        guard += 1;
      }

      videos.forEach((video, videoIndex) => {
        const isActive = videoIndex === activeIndex && !video.dataset.failed;
        video.classList.toggle("is-active", isActive);
        if (isActive) {
          video.currentTime = 0;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });

      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("is-active", dotIndex === activeIndex);
      });
    };

    videos.forEach((video, index) => {
      video.addEventListener("error", () => {
        video.dataset.failed = "true";
        video.classList.add("is-missing");
        if (index === activeIndex) setActiveVideo(activeIndex + 1);
      });

      video.addEventListener("ended", () => {
        setActiveVideo(index + 1);
      });
    });

    if (!prefersReducedMotion && videos.length > 1) {
      rotationTimer = window.setInterval(() => setActiveVideo(activeIndex + 1), 8500);
      rotator.addEventListener("mouseenter", () => window.clearInterval(rotationTimer));
      rotator.addEventListener("mouseleave", () => {
        rotationTimer = window.setInterval(() => setActiveVideo(activeIndex + 1), 8500);
      });
    }

    setActiveVideo(0);
  });

  // Keep workshop photo slots clean until the real image files are added.
  document.querySelectorAll(".workshop-photo img").forEach((image) => {
    image.addEventListener("error", () => {
      image.classList.add("is-missing");
    });
  });

  const initProjectSlideshow = () => {
    if (window.__TMI_PROJECTS_READY) return;
    window.__TMI_PROJECTS_READY = true;

    const slider = document.querySelector("[data-project-slideshow]");
    if (!slider) return;

    const slides = [...slider.querySelectorAll("[data-project-slide]")];
    const dots = [...slider.querySelectorAll("[data-project-dot]")];
    const currentCounter = slider.querySelector("[data-project-current]");
    const totalCounter = slider.querySelector("[data-project-total]");
    const stage = slider.querySelector("[data-project-stage]");
    const prevButton = slider.querySelector("[data-project-prev]");
    const nextButton = slider.querySelector("[data-project-next]");
    const expandButton = slider.querySelector("[data-project-expand]");
    const lightbox = document.querySelector("[data-project-lightbox]");
    const lightboxImage = document.querySelector("[data-project-lightbox-image]");
    const lightboxVideo = document.querySelector("[data-project-lightbox-video]");
    const lightboxPrev = document.querySelector("[data-project-lightbox-prev]");
    const lightboxNext = document.querySelector("[data-project-lightbox-next]");
    let activeIndex = 0;
    let lightboxIndex = 0;
    let timer = null;

    if (!slides.length) return;
    if (totalCounter) totalCounter.textContent = String(slides.length).padStart(2, "0");

    const sourcesFor = (slide) => (slide.dataset.mediaSources || "").split("|").map((source) => source.trim()).filter(Boolean);
    const fallbackFor = (slide) => slide.dataset.fallbackSrc || "assets/tecnomarmol-real-1.jpg";

    const setSlideFallback = (slide) => {
      slide.style.setProperty("--project-fallback", `url("${fallbackFor(slide)}")`);
    };

    const resolveImage = (slide) => {
      const image = slide.querySelector("[data-project-image]");
      if (!image) return;
      const candidates = [...sourcesFor(slide), fallbackFor(slide)];
      let index = 0;

      const tryNext = () => {
        if (index >= candidates.length) {
          slide.classList.add("is-missing");
          image.removeAttribute("src");
          return;
        }
        image.src = candidates[index];
        index += 1;
      };

      image.addEventListener("load", () => {
        slide.classList.remove("is-missing");
        image.dataset.ready = "true";
      });
      image.addEventListener("error", tryNext);
      tryNext();
    };

    const resolveVideo = (slide) => {
      const video = slide.querySelector("[data-project-video]");
      if (!video) return;
      const candidates = sourcesFor(slide);
      let index = 0;

      const tryNext = () => {
        if (index >= candidates.length) {
          video.dataset.failed = "true";
          video.classList.add("is-missing");
          slide.classList.add("is-missing");
          video.removeAttribute("src");
          video.load();
          return;
        }
        video.src = candidates[index];
        index += 1;
        video.load();
      };

      video.addEventListener("loadedmetadata", () => {
        video.dataset.ready = "true";
        slide.classList.remove("is-missing");
      });
      video.addEventListener("error", tryNext);
      video.addEventListener("ended", () => {
        setActiveSlide(activeIndex + 1);
        restart();
      });
      tryNext();
    };

    slides.forEach((slide) => {
      setSlideFallback(slide);
      if (slide.dataset.mediaType === "video") {
        resolveVideo(slide);
      } else {
        resolveImage(slide);
      }
    });

    const activeVideo = () => slides[activeIndex]?.querySelector("[data-project-video]");

    const pauseVideos = () => {
      slides.forEach((slide) => slide.querySelector("[data-project-video]")?.pause());
    };

    function setActiveSlide(index) {
      activeIndex = ((index % slides.length) + slides.length) % slides.length;
      pauseVideos();

      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === activeIndex);
      });
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("is-active", dotIndex === activeIndex);
      });
      if (currentCounter) currentCounter.textContent = String(activeIndex + 1).padStart(2, "0");

      const video = activeVideo();
      if (video && !video.dataset.failed && (video.currentSrc || video.src)) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    }

    const next = () => setActiveSlide(activeIndex + 1);
    const previous = () => setActiveSlide(activeIndex - 1);

    const start = () => {
      if (prefersReducedMotion || timer) return;
      timer = window.setInterval(next, 7800);
    };

    const stop = () => {
      if (!timer) return;
      window.clearInterval(timer);
      timer = null;
    };

    function restart() {
      stop();
      start();
    }

    const closeLightbox = () => {
      if (!lightbox || !lightboxImage || !lightboxVideo) return;
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      lightboxVideo.pause();
      lightboxVideo.removeAttribute("src");
      lightboxVideo.load();
      lightboxImage.removeAttribute("src");
      lightboxImage.classList.remove("is-active");
      lightboxVideo.classList.remove("is-active");
      document.body.classList.remove("modal-open");
      start();
    };

    const setLightboxMedia = (index) => {
      if (!lightboxImage || !lightboxVideo) return;
      lightboxIndex = ((index % slides.length) + slides.length) % slides.length;
      const slide = slides[lightboxIndex];
      const video = slide.querySelector("[data-project-video]");
      const image = slide.querySelector("[data-project-image]");
      const videoSource = video && !video.dataset.failed ? video.currentSrc || video.src : "";
      const imageSource = image?.currentSrc || image?.src || "";

      lightboxVideo.pause();
      lightboxVideo.removeAttribute("src");
      lightboxImage.removeAttribute("src");
      lightboxVideo.classList.remove("is-active");
      lightboxImage.classList.remove("is-active");

      if (slide.dataset.mediaType === "video" && videoSource) {
        lightboxVideo.src = videoSource;
        lightboxVideo.classList.add("is-active");
        lightboxVideo.load();
        lightboxVideo.play().catch(() => {});
      } else {
        lightboxImage.src = imageSource || fallbackFor(slide);
        lightboxImage.classList.add("is-active");
      }
    };

    const openLightbox = (index = activeIndex) => {
      if (!lightbox) return;
      stop();
      setLightboxMedia(index);
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
    };

    prevButton?.addEventListener("click", () => {
      previous();
      restart();
    });
    nextButton?.addEventListener("click", () => {
      next();
      restart();
    });
    expandButton?.addEventListener("click", () => openLightbox(activeIndex));
    stage?.addEventListener("click", (event) => {
      if (event.target.closest("button")) return;
      openLightbox(activeIndex);
    });
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        setActiveSlide(index);
        restart();
      });
    });
    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", start);
    slider.addEventListener("focusin", stop);
    slider.addEventListener("focusout", start);

    document.querySelectorAll("[data-project-lightbox-close]").forEach((button) => {
      button.addEventListener("click", closeLightbox);
    });
    lightboxPrev?.addEventListener("click", () => setLightboxMedia(lightboxIndex - 1));
    lightboxNext?.addEventListener("click", () => setLightboxMedia(lightboxIndex + 1));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeLightbox();
      if (!lightbox?.classList.contains("is-open")) return;
      if (event.key === "ArrowLeft") setLightboxMedia(lightboxIndex - 1);
      if (event.key === "ArrowRight") setLightboxMedia(lightboxIndex + 1);
    });

    setActiveSlide(0);
    start();
  };

  initProjectSlideshow();

  // Quote form flow: sends multipart data to the separate backend API.
  const quoteForm = document.querySelector("[data-quote-form]");
  const filePicker = document.querySelector("[data-file-picker]");
  const fileSummary = document.querySelector("[data-file-summary]");
  const formStatus = document.querySelector("[data-form-status]");
  const submitButton = quoteForm?.querySelector(".form-submit");
  const whatsappSubmit = document.querySelector("[data-whatsapp-submit]");
  const maxFiles = Number(filePicker?.dataset.maxFiles || 5);
  const maxTotalBytes = Number(filePicker?.dataset.maxTotal || 10485760);

  if (quoteForm && analytics) {
    [
      ["visitor_id", analytics.visitorId],
      ["session_id", analytics.sessionId]
    ].forEach(([name, value]) => {
      let field = quoteForm.querySelector(`input[name="${name}"]`);
      if (!field) {
        field = document.createElement("input");
        field.type = "hidden";
        field.name = name;
        quoteForm.appendChild(field);
      }
      field.value = value;
    });
  }

  const activeCopy = () => translations[document.documentElement.dataset.lang || document.documentElement.lang] || translations.es;

  const cleanFormText = (value) => String(value).replace(/\s+/g, " ").trim();

  const formValue = (name) => cleanFormText(quoteForm?.elements?.[name]?.value || "");

  const setFormStatus = (message = "", type = "") => {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.dataset.status = type;
  };

  const totalFileSize = (files = []) => files.reduce((total, file) => total + file.size, 0);

  const limitFileList = (files) => {
    if (!filePicker || files.length <= maxFiles || typeof DataTransfer === "undefined") return files.slice(0, maxFiles);
    const transfer = new DataTransfer();
    files.slice(0, maxFiles).forEach((file) => transfer.items.add(file));
    filePicker.files = transfer.files;
    return [...filePicker.files];
  };

  const updateFileSummary = (files = []) => {
    if (!fileSummary) return;
    const copy = activeCopy();
    if (!files.length) {
      fileSummary.textContent = copy.formNoFiles;
      return;
    }
    if (files.length === 1) {
      fileSummary.textContent = files[0].name;
      return;
    }
    const label = copy.formFileMultiple.replace("{count}", String(files.length));
    const names = files.map((file) => file.name).join(", ");
    fileSummary.textContent = `${label}: ${names}`;
  };

  filePicker?.addEventListener("change", () => {
    let files = [...filePicker.files];
    const copy = activeCopy();
    if (files.length > maxFiles) {
      setFormStatus(copy.formFileTooMany.replace("{count}", String(maxFiles)), "error");
      files = limitFileList(files);
    } else {
      setFormStatus();
    }

    if (totalFileSize(files) > maxTotalBytes) {
      setFormStatus(copy.formFileTooLarge, "error");
    }

    updateFileSummary(files);
  });

  const selectedFilesText = (files, copy) => {
    if (!files.length) return copy.formNoFiles;
    return files.map((file) => `- ${file.name}`).join("\n");
  };

  const buildQuoteMessage = (copy, files = []) => {
    const language = document.documentElement.lang === "en" ? "English" : "Español";
    const lines = [
      copy.formMailSubject,
      "",
      `${copy.formName}: ${formValue("name")}`,
      `${copy.formEmail}: ${formValue("email")}`,
      `${copy.formPhone}: ${formValue("phone")}`,
      `${copy.formProjectType}: ${formValue("project_type")}`,
      `Idioma / Language: ${language}`,
      "",
      `${copy.formDetails}:`,
      cleanFormText(quoteForm?.elements?.message?.value || ""),
      "",
      `${copy.formSelectedFiles}:`,
      selectedFilesText(files, copy)
    ];

    return lines.join("\n");
  };

  const getQuoteEndpoint = () => {
    const configured = quoteForm?.dataset.apiEndpoint || "";
    if (configured) return configured;

    const localHosts = new Set(["localhost", "127.0.0.1", ""]);
    if (localHosts.has(window.location.hostname)) {
      return "http://localhost:8787/api/quote";
    }

    return "";
  };

  const buildWhatsappUrl = () => {
    const copy = activeCopy();
    const phone = quoteForm?.dataset.whatsappNumber || "17877522795";
    const files = filePicker ? [...filePicker.files].slice(0, maxFiles) : [];
    return `https://wa.me/${phone}?text=${encodeURIComponent(buildQuoteMessage(copy, files))}`;
  };

  const updateWhatsappHref = () => {
    if (whatsappSubmit) whatsappSubmit.href = buildWhatsappUrl();
  };

  quoteForm?.addEventListener("input", updateWhatsappHref);
  quoteForm?.addEventListener("change", updateWhatsappHref);
  updateWhatsappHref();

  whatsappSubmit?.addEventListener("click", (event) => {
    if (!quoteForm?.checkValidity()) {
      event.preventDefault();
      quoteForm?.reportValidity();
      return;
    }
    whatsappSubmit.href = buildWhatsappUrl();
    setFormStatus(activeCopy().formShareSuccess, "success");
  });

  quoteForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const copy = activeCopy();
    const files = filePicker ? [...filePicker.files] : [];

    if (!quoteForm.checkValidity()) {
      quoteForm.reportValidity();
      return;
    }

    analytics?.send("quote_submit", { page: "Cotización", hash: "#cotizacion-panel" }, true);

    if (quoteForm.elements.website?.value) {
      setFormStatus(copy.formSuccess, "success");
      quoteForm.reset();
      updateFileSummary([]);
      updateWhatsappHref();
      return;
    }

    if (files.length > maxFiles) {
      setFormStatus(copy.formFileTooMany.replace("{count}", String(maxFiles)), "error");
      return;
    }

    if (totalFileSize(files) > maxTotalBytes) {
      setFormStatus(copy.formFileTooLarge, "error");
      return;
    }

    const endpoint = getQuoteEndpoint();
    if (!endpoint) {
      setFormStatus(copy.formEndpointMissing, "error");
      return;
    }

    setFormStatus(copy.formSending, "loading");
    if (submitButton) submitButton.disabled = true;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: new FormData(quoteForm),
        headers: {
          Accept: "application/json"
        }
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) {
        throw new Error(result.message || copy.formError);
      }

      setFormStatus(result.message || copy.formSuccess, "success");
      quoteForm.reset();
      updateFileSummary([]);
      updateWhatsappHref();
    } catch (error) {
      setFormStatus(error.message || copy.formError, "error");
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });

  // Scroll reveal with IntersectionObserver.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -70px" }
    );

    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min((index % 6) * 55, 275)}ms`;
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  // Premium 3D hover for service cards.
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    if (prefersReducedMotion) return;

    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const rotateX = (py - 0.5) * -8;
      const rotateY = (px - 0.5) * 10;

      card.style.setProperty("--rx", `${rotateX.toFixed(2)}deg`);
      card.style.setProperty("--ry", `${rotateY.toFixed(2)}deg`);
      card.style.setProperty("--shine-x", `${(px * 100).toFixed(1)}%`);
      card.style.setProperty("--shine-y", `${(py * 100).toFixed(1)}%`);
      card.style.setProperty("--raise", "-8px");
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
      card.style.setProperty("--raise", "0px");
    });
  });

  // Soft parallax on selected visual blocks.
  const parallaxItems = document.querySelectorAll("[data-parallax]");
  let parallaxTicking = false;

  const updateParallax = () => {
    const viewport = window.innerHeight || 1;
    parallaxItems.forEach((item) => {
      const speed = Number(item.dataset.parallax || 0.08);
      const rect = item.getBoundingClientRect();
      const centerOffset = rect.top + rect.height / 2 - viewport / 2;
      const y = centerOffset * speed * -0.22;
      item.style.setProperty("--parallax-y", `${y.toFixed(2)}px`);
    });
    parallaxTicking = false;
  };

  const requestParallax = () => {
    if (prefersReducedMotion || parallaxTicking) return;
    parallaxTicking = true;
    requestAnimationFrame(updateParallax);
  };

  updateParallax();
  window.addEventListener("scroll", requestParallax, { passive: true });
  window.addEventListener("resize", requestParallax);

  // Cinematic particle layer in the hero.
  const canvas = document.querySelector("#heroParticles");
  const ctx = canvas?.getContext("2d");
  let particles = [];
  let canvasWidth = 0;
  let canvasHeight = 0;

  const resizeCanvas = () => {
    if (!canvas || !ctx) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvasWidth = rect.width;
    canvasHeight = rect.height;
    canvas.width = Math.max(1, Math.floor(rect.width * ratio));
    canvas.height = Math.max(1, Math.floor(rect.height * ratio));
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    const count = window.innerWidth < 760 ? 32 : 62;
    particles = Array.from({ length: count }, (_, index) => ({
      x: (index * 97) % Math.max(canvasWidth, 1),
      y: (index * 53) % Math.max(canvasHeight, 1),
      size: 0.8 + ((index * 13) % 18) / 10,
      speed: 0.12 + ((index * 7) % 14) / 100,
      drift: -0.18 + ((index * 11) % 36) / 100,
      alpha: 0.16 + ((index * 5) % 22) / 100
    }));
  };

  const drawAuraBands = (time) => {
    if (!ctx) return;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (let band = 0; band < 4; band++) {
      const yBase = canvasHeight * (0.18 + band * 0.2);
      const drift = Math.sin(time * 0.00028 + band * 1.7) * canvasHeight * 0.055;
      const gradient = ctx.createLinearGradient(0, yBase, canvasWidth, yBase + 90);
      gradient.addColorStop(0, "rgba(216, 96, 24, 0)");
      gradient.addColorStop(0.38, band % 2 ? "rgba(255, 255, 255, 0.045)" : "rgba(255, 112, 24, 0.07)");
      gradient.addColorStop(0.62, "rgba(216, 96, 24, 0.075)");
      gradient.addColorStop(1, "rgba(216, 96, 24, 0)");

      ctx.beginPath();
      ctx.lineWidth = 34 + band * 8;
      ctx.strokeStyle = gradient;
      ctx.moveTo(-80, yBase + drift);
      for (let x = -80; x <= canvasWidth + 80; x += 90) {
        const y = yBase + drift + Math.sin(x * 0.009 + time * 0.00045 + band) * (30 + band * 8);
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.restore();
  };

  const drawParticles = (time = 0) => {
    if (!canvas || !ctx || prefersReducedMotion) return;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawAuraBands(time);

    particles.forEach((particle) => {
      particle.y -= particle.speed;
      particle.x += particle.drift;

      if (particle.y < -10) particle.y = canvasHeight + 10;
      if (particle.x < -10) particle.x = canvasWidth + 10;
      if (particle.x > canvasWidth + 10) particle.x = -10;

      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 138, 61, ${particle.alpha})`;
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(drawParticles);
  };

  if (canvas && ctx && !prefersReducedMotion) {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    requestAnimationFrame(drawParticles);
  }

  window.__TMI_SCRIPT_READY = true;
})();
