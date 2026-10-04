(() => {
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  let prefersReducedMotion = motionQuery.matches;
  const saveData = navigator.connection?.saveData === true;
  let pageHidden = document.hidden;
  let overlayOpen = document.body.matches(".language-pending, .modal-open");
  const activities = new Map();
  const pageIsActive = () => !pageHidden && !overlayOpen;
  const autoMotion = () => pageIsActive() && !prefersReducedMotion && !saveData;
  const updateActivities = () => {
    const paused = !autoMotion();
    if (document.body.classList.contains("effects-paused") !== paused) {
      document.body.classList.toggle("effects-paused", paused);
    }
    activities.forEach((activity) => activity.update(activity.visible));
  };
  const activityObserver = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const activity = activities.get(entry.target);
      if (!activity) return;
      activity.visible = entry.isIntersecting;
      activity.update(activity.visible);
    });
  }) : null;
  const watchActivity = (element, update) => {
    if (!element) return;
    activities.set(element, { visible: !activityObserver, update });
    update(!activityObserver);
    activityObserver?.observe(element);
  };
  new MutationObserver(() => {
    const next = document.body.matches(".language-pending, .modal-open");
    if (next === overlayOpen) return;
    overlayOpen = next;
    updateActivities();
  }).observe(document.body, { attributes: true, attributeFilter: ["class"] });
  motionQuery.addEventListener("change", () => {
    prefersReducedMotion = motionQuery.matches;
    if (prefersReducedMotion) document.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible"));
    updateActivities();
  });
  document.addEventListener("visibilitychange", () => {
    pageHidden = document.hidden;
    updateActivities();
    if (pageHidden) document.querySelectorAll("video").forEach((video) => video.pause());
  });
  window.addEventListener("pagehide", () => {
    pageHidden = true;
    updateActivities();
    document.querySelectorAll("video").forEach((video) => video.pause());
  });
  window.addEventListener("pageshow", () => {
    pageHidden = document.hidden;
    updateActivities();
  });
  updateActivities();
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
      material2Action: "Ver tipos",
      openGraniteCollection: "Abrir tipos de granito",
      graniteModalClose: "Cerrar tipos de granito",
      graniteModalEyebrow: "Granitos disponibles",
      graniteModalTitle: "Tipos de granito",
      graniteModalIntro: "Explora nuestras opciones de granito natural para cocinas, baños, topes, paredes y proyectos a la medida.",
      material2Text: "Natural, resistente y duradero. Ideal para cocinas, baños y espacios de alto uso.",
      material3Title: "Cuarzo",
      material3Text: "Moderno, uniforme y fácil de mantener. Excelente para topes contemporáneos.",
      material3Action: "Ver tipos",
      openQuartzCollection: "Abrir tipos de cuarzo",
      quartzModalClose: "Cerrar tipos de cuarzo",
      quartzModalEyebrow: "Cuarzos disponibles",
      quartzModalTitle: "Tipos de cuarzo",
      quartzModalIntro:
        "Explora nuestras opciones de cuarzo para cocinas, baños, topes y proyectos contemporáneos.",
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
      formPlansHelp: "Hasta 5 archivos PDF, JPG, PNG o WEBP; máximo 3 MB en total. Se enviarán junto con tu solicitud.",
      formSending: "Enviando...",
      formSuccess: "Cotización enviada. Gracias. Nuestro equipo revisará tu solicitud y se comunicará contigo.",
      formShareSuccess: "Se abrió WhatsApp con los detalles preparados.",
      formError: "No pudimos enviar tu solicitud. Intenta nuevamente.",
      formEndpointMissing: "El servicio de cotizaciones no está disponible. Intenta nuevamente más tarde.",
      formFileTooMany: "Solo puedes adjuntar hasta {count} archivos.",
      formFileTooLarge: "Los archivos no pueden pasar de 3 MB en total.",
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
      material2Action: "View types",
      openGraniteCollection: "Open granite types",
      graniteModalClose: "Close granite types",
      graniteModalEyebrow: "Available granites",
      graniteModalTitle: "Granite types",
      graniteModalIntro: "Explore our natural granite options for kitchens, bathrooms, countertops, walls and custom projects.",
      material2Text: "Natural, resistant and durable. Ideal for kitchens, bathrooms and high-use spaces.",
      material3Title: "Quartz",
      material3Text: "Modern, uniform and easy to maintain. Excellent for contemporary countertops.",
      material3Action: "View types",
      openQuartzCollection: "Open quartz types",
      quartzModalClose: "Close quartz types",
      quartzModalEyebrow: "Available quartz",
      quartzModalTitle: "Quartz types",
      quartzModalIntro:
        "Explore our quartz options for kitchens, bathrooms, countertops and contemporary projects.",
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
      formPlansHelp: "Up to 5 PDF, JPG, PNG or WEBP files; 3 MB total. Files are included with your request.",
      formSending: "Sending...",
      formSuccess: "Quote sent. Thank you. Our team will review your request and contact you.",
      formShareSuccess: "WhatsApp opened with the details prepared.",
      formError: "We could not send your request. Please try again.",
      formEndpointMissing: "The quote service is unavailable. Please try again later.",
      formFileTooMany: "You may attach up to {count} files.",
      formFileTooLarge: "Files cannot exceed 3 MB total.",
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
    const scrolled = window.scrollY > 18;
    if (header?.classList.contains("is-scrolled") !== scrolled) header?.classList.toggle("is-scrolled", scrolled);
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

    window.setInterval(() => { if (!document.hidden) send("heartbeat"); }, 30000);
    window.setTimeout(() => startPage("site_enter"), 250);

    return {
      visitorId,
      sessionId,
      send,
      finishPage
    };
  })();

  // Workshop media is attached only when visible or explicitly requested.
  const videoLightbox = document.querySelector("[data-video-lightbox]");
  const lightboxPlayer = document.querySelector("[data-video-lightbox-player]");
  let videoLastFocus = null;
  const closeVideoLightbox = () => {
    if (!videoLightbox?.classList.contains("is-open")) return;
    videoLightbox.classList.remove("is-open");
    videoLightbox.setAttribute("aria-hidden", "true");
    lightboxPlayer.pause();
    lightboxPlayer.removeAttribute("src");
    lightboxPlayer.load();
    document.body.classList.remove("modal-open");
    videoLastFocus?.focus({ preventScroll: true });
  };
  document.querySelectorAll("[data-video-lightbox-close]").forEach((button) => button.addEventListener("click", closeVideoLightbox));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeVideoLightbox(); });

  document.querySelectorAll("[data-video-rotator]").forEach((rotator) => {
    const videos = [...rotator.querySelectorAll(".workshop-video")];
    const dots = [...rotator.querySelectorAll(".workshop-video-dots button")];
    let activeIndex = 0;
    let rotationTimer = null;
    let visible = false;
    let hovered = false;
    let focused = false;
    let userPlayback = false;
    const stop = () => {
      window.clearTimeout(rotationTimer);
      rotationTimer = null;
    };
    const hydrate = (video) => {
      if (!video.getAttribute("src") && video.dataset.src) video.src = video.dataset.src;
      if (video.dataset.poster && !video.poster) video.poster = video.dataset.poster;
    };
    const sync = () => {
      stop();
      const canPlay = visible && pageIsActive() && (userPlayback || autoMotion());
      videos.forEach((video, index) => {
        if (index === activeIndex && visible && video.dataset.poster && !video.poster) video.poster = video.dataset.poster;
        if (index === activeIndex && canPlay && !video.dataset.failed) {
          hydrate(video);
          video.play().catch(() => {});
        } else video.pause();
      });
      if (visible && autoMotion() && !hovered && !focused && videos.some((video) => !video.dataset.failed)) {
        rotationTimer = window.setTimeout(() => setActiveVideo(activeIndex + 1), 8500);
      }
    };
    const setActiveVideo = (index, manual = false) => {
      stop();
      if (!videos.some((video) => !video.dataset.failed)) {
        rotator.classList.add("has-no-videos");
        videos.forEach((video) => video.pause());
        return;
      }
      activeIndex = (index + videos.length) % videos.length;
      while (videos[activeIndex].dataset.failed) activeIndex = (activeIndex + 1) % videos.length;
      userPlayback = manual;
      videos.forEach((video, i) => {
        video.classList.toggle("is-active", i === activeIndex);
        video.tabIndex = i === activeIndex ? 0 : -1;
        if (i === activeIndex && video.readyState) video.currentTime = 0;
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle("is-active", i === activeIndex);
        dot.setAttribute("aria-pressed", String(i === activeIndex));
      });
      sync();
    };
    const openVideo = (video) => {
      if (!videoLightbox || !lightboxPlayer || video.dataset.failed) return;
      hydrate(video);
      stop();
      video.pause();
      videoLastFocus = document.activeElement;
      lightboxPlayer.src = video.currentSrc || video.src;
      videoLightbox.classList.add("is-open");
      videoLightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
      videoLightbox.querySelector(".video-lightbox-close")?.focus({ preventScroll: true });
      lightboxPlayer.play().catch(() => {});
    };
    videos.forEach((video, index) => {
      video.addEventListener("error", () => {
        video.dataset.failed = "true";
        video.classList.add("is-missing");
        if (dots[index]) dots[index].disabled = true;
        if (index === activeIndex) setActiveVideo(index + 1);
      });
      video.addEventListener("ended", () => {
        if (visible && autoMotion()) setActiveVideo(index + 1);
      });
      video.addEventListener("click", () => openVideo(video));
      video.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openVideo(video);
        }
      });
    });
    dots.forEach((dot, index) => dot.addEventListener("click", () => setActiveVideo(index, true)));
    rotator.addEventListener("mouseenter", () => { hovered = finePointer.matches; sync(); });
    rotator.addEventListener("mouseleave", () => { hovered = false; sync(); });
    rotator.addEventListener("focusin", () => { focused = true; sync(); });
    rotator.addEventListener("focusout", (event) => { focused = rotator.contains(event.relatedTarget); sync(); });
    setActiveVideo(0);
    watchActivity(rotator, (inView) => {
      visible = inView;
      if (!visible || !pageIsActive() || prefersReducedMotion) userPlayback = false;
      sync();
    });
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
    let visible = false;
    let hovered = false;
    let focused = false;
    let lightboxLastFocus = null;

    if (!slides.length) return;
    if (totalCounter) totalCounter.textContent = String(slides.length).padStart(2, "0");

    const sourcesFor = (slide) => (slide.dataset.mediaSources || "").split("|").map((source) => source.trim()).filter(Boolean);
    const fallbackFor = (slide) => slide.dataset.fallbackSrc || "assets/optimized/tecnomarmol-real-1.webp";

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
      video.poster = candidates[0]?.replace(/\.mp4$/, "-poster.jpg") || "";
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
        if (visible && autoMotion() && !lightbox?.classList.contains("is-open")) {
          setActiveSlide(activeIndex + 1);
          restart();
        }
      });
      tryNext();
    };

    const ensureSlide = (slide) => {
      if (slide.dataset.initialized) return;
      slide.dataset.initialized = "true";
      setSlideFallback(slide);
      if (slide.dataset.mediaType === "video") {
        resolveVideo(slide);
      } else {
        resolveImage(slide);
      }
    };

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

      if (visible) ensureSlide(slides[activeIndex]);
      const video = activeVideo();
      if (video?.readyState) video.currentTime = 0;
      if (video && visible && autoMotion() && !video.dataset.failed) video.play().catch(() => {});
    }

    const next = () => setActiveSlide(activeIndex + 1);
    const previous = () => setActiveSlide(activeIndex - 1);

    const start = () => {
      if (!visible || !autoMotion() || hovered || focused || timer || lightbox?.classList.contains("is-open")) return;
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
      if (!lightbox?.classList.contains("is-open") || !lightboxImage || !lightboxVideo) return;
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      lightboxVideo.pause();
      lightboxVideo.removeAttribute("src");
      lightboxVideo.load();
      lightboxImage.removeAttribute("src");
      lightboxImage.classList.remove("is-active");
      lightboxVideo.classList.remove("is-active");
      document.body.classList.remove("modal-open");
      lightboxLastFocus?.focus({ preventScroll: true });
      start();
    };

    const setLightboxMedia = (index) => {
      if (!lightboxImage || !lightboxVideo) return;
      lightboxIndex = ((index % slides.length) + slides.length) % slides.length;
      const slide = slides[lightboxIndex];
      ensureSlide(slide);
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
      pauseVideos();
      lightboxLastFocus = document.activeElement;
      setLightboxMedia(index);
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
      lightbox.querySelector(".project-lightbox-close")?.focus({ preventScroll: true });
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
    slider.addEventListener("mouseenter", () => { hovered = finePointer.matches; if (hovered) stop(); });
    slider.addEventListener("mouseleave", () => { hovered = false; start(); });
    slider.addEventListener("focusin", () => { focused = true; stop(); });
    slider.addEventListener("focusout", (event) => { focused = slider.contains(event.relatedTarget); if (!focused) start(); });

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
    watchActivity(slider, (inView) => {
      visible = inView;
      stop();
      if (visible) ensureSlide(slides[activeIndex]);
      if (!visible || !autoMotion()) pauseVideos();
      else {
        const video = activeVideo();
        if (video && !video.dataset.failed) video.play().catch(() => {});
        start();
      }
    });
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
  const maxTotalBytes = Number(filePicker?.dataset.maxTotal || 3145728);

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
    if (submitButton?.disabled) return;
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
    if (submitButton) { submitButton.disabled = true; submitButton.textContent = copy.formSending; }
    quoteForm.setAttribute("aria-busy", "true");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: new FormData(quoteForm),
        signal: AbortSignal.timeout(30000),
        headers: {
          Accept: "application/json"
        }
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) {
        throw new Error(result.message || copy.formError);
      }

      setFormStatus(activeCopy().formSuccess, "success");
      quoteForm.reset();
      updateFileSummary([]);
      updateWhatsappHref();
    } catch (error) {
      setFormStatus(activeCopy().formError, "error");
    } finally {
      quoteForm.removeAttribute("aria-busy");
      if (submitButton) { submitButton.disabled = false; submitButton.textContent = activeCopy().formSend; }
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
            entry.target.addEventListener("transitionend", (event) => {
              if (event.target === entry.target) entry.target.style.removeProperty("transition-delay");
            }, { once: true });
          }
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px -24px" }
    );

    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min((index % 6) * 35, 140)}ms`;
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  // Coalesce pointer work into one frame and keep touch scrolling native.
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    let frame = 0;
    let pointer = null;
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      ["--rx", "--ry", "--raise", "--shine-x", "--shine-y"].forEach((name) => card.style.removeProperty(name));
    };
    card.addEventListener("pointermove", (event) => {
      if (!finePointer.matches || prefersReducedMotion || event.pointerType === "touch") return;
      pointer = { x: event.clientX, y: event.clientY };
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!finePointer.matches || prefersReducedMotion || !pageIsActive()) return;
        const rect = card.getBoundingClientRect();
        const px = Math.max(0, Math.min(1, (pointer.x - rect.left) / rect.width));
        const py = Math.max(0, Math.min(1, (pointer.y - rect.top) / rect.height));
        card.style.setProperty("--rx", `${((py - 0.5) * -5).toFixed(2)}deg`);
        card.style.setProperty("--ry", `${((px - 0.5) * 6).toFixed(2)}deg`);
        card.style.setProperty("--shine-x", `${(px * 100).toFixed(1)}%`);
        card.style.setProperty("--shine-y", `${(py * 100).toFixed(1)}%`);
        card.style.setProperty("--raise", "-4px");
      });
    }, { passive: true });
    card.addEventListener("pointerleave", reset);
    motionQuery.addEventListener("change", reset);
    finePointer.addEventListener("change", reset);
  });

  // Read all visible geometry before writing styles; skip parallax on touch.
  const visibleParallax = new Set();
  let parallaxFrame = 0;
  const updateParallax = () => {
    parallaxFrame = 0;
    if (!finePointer.matches || !autoMotion()) return;
    const viewport = window.innerHeight || 1;
    const positions = [...visibleParallax].map((item) => {
      const rect = item.getBoundingClientRect();
      return [item, (rect.top + rect.height / 2 - viewport / 2) * Number(item.dataset.parallax || 0.08) * -0.22];
    });
    positions.forEach(([item, y]) => item.style.setProperty("--parallax-y", `${y.toFixed(2)}px`));
  };
  const requestParallax = () => {
    if (!finePointer.matches || !autoMotion() || parallaxFrame || !visibleParallax.size) return;
    parallaxFrame = requestAnimationFrame(updateParallax);
  };
  document.querySelectorAll("[data-parallax]").forEach((item) => {
    // The video card already has an activity subscription.
    const observer = "IntersectionObserver" in window ? new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) visibleParallax.add(item);
      else visibleParallax.delete(item);
      requestParallax();
    }) : null;
    if (observer) observer.observe(item);
    else visibleParallax.add(item);
  });
  const resetParallax = () => {
    cancelAnimationFrame(parallaxFrame);
    parallaxFrame = 0;
    document.querySelectorAll("[data-parallax]").forEach((item) => item.style.removeProperty("--parallax-y"));
    requestParallax();
  };
  motionQuery.addEventListener("change", resetParallax);
  finePointer.addEventListener("change", resetParallax);
  window.addEventListener("scroll", requestParallax, { passive: true });
  window.addEventListener("resize", requestParallax, { passive: true });

  // Cinematic particle layer in the hero.
  const canvas = document.querySelector("#heroParticles");
  const ctx = canvas?.getContext("2d");
  let particles = [];
  let canvasWidth = 0;
  let canvasHeight = 0;
  let particleFrame = 0;
  let heroVisible = false;
  let lastParticleTime = 0;

  const resizeCanvas = () => {
    if (!canvas || !ctx) return;
    const ratio = Math.min(window.devicePixelRatio || 1, finePointer.matches ? 1.5 : 1);
    const rect = canvas.getBoundingClientRect();
    if (canvasWidth === rect.width && canvasHeight === rect.height) return;
    canvasWidth = rect.width;
    canvasHeight = rect.height;
    canvas.width = Math.max(1, Math.floor(rect.width * ratio));
    canvas.height = Math.max(1, Math.floor(rect.height * ratio));
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    const count = finePointer.matches ? 40 : 16;
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
    particleFrame = 0;
    if (!canvas || !ctx || !heroVisible || !autoMotion()) return;
    const step = lastParticleTime ? Math.min((time - lastParticleTime) / 16.667, 2) : 1;
    lastParticleTime = time;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    if (finePointer.matches) drawAuraBands(time);

    particles.forEach((particle) => {
      particle.y -= particle.speed * step;
      particle.x += particle.drift * step;

      if (particle.y < -10) particle.y = canvasHeight + 10;
      if (particle.x < -10) particle.x = canvasWidth + 10;
      if (particle.x > canvasWidth + 10) particle.x = -10;

      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 138, 61, ${particle.alpha})`;
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });

    particleFrame = requestAnimationFrame(drawParticles);
  };

  if (canvas && ctx) {
    const hero = document.querySelector(".hero");
    watchActivity(hero, (visible) => {
      heroVisible = visible;
      hero.classList.toggle("motion-paused", !visible || !autoMotion());
      cancelAnimationFrame(particleFrame);
      particleFrame = 0;
      lastParticleTime = 0;
      if (visible && autoMotion()) {
        resizeCanvas();
        particleFrame = requestAnimationFrame(drawParticles);
      } else ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    });
    if ("ResizeObserver" in window) new ResizeObserver(() => {
      if (heroVisible && autoMotion()) resizeCanvas();
    }).observe(canvas);
    else window.addEventListener("resize", resizeCanvas, { passive: true });
  }
  const palettes = document.querySelector(".palette-section");
  watchActivity(palettes, (visible) => palettes.classList.toggle("motion-paused", !visible || !autoMotion()));

  window.__TMI_SCRIPT_READY = true;
})();
