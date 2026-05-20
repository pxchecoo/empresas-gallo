(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.querySelector("[data-header]");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector("#navMenu");
  const year = document.querySelector("#year");
  const languageGate = document.querySelector("#languageGate");
  const languageOptions = document.querySelectorAll("[data-language]");

  const translations = {
    es: {
      title: "Tecno Mármol, Inc | Superficies premium",
      metaDescription:
        "Tecno Mármol, Inc ofrece soluciones premium en mármol, granito, cuarzo, porcelana y piedras naturales para espacios residenciales y comerciales.",
      metaKeywords:
        "Tecno Mármol, Inc, mármol, granito, cuarzo, porcelana, piedra natural, topes, cocinas, baños, pisos, escaleras",
      ogDescription:
        "Transformamos cocinas, baños, pisos, paredes, escaleras y espacios comerciales con materiales de alta calidad.",
      navToggle: "Abrir menú",
      workshopGallery: "Fotos del taller",
      navAbout: "Sobre",
      navServices: "Servicios",
      navProcess: "Proceso",
      navMaterials: "Materiales",
      navWorkshop: "Taller",
      navQuote: "Cotización",
      heroSubtitle: "Superficies premium en mármol, granito, cuarzo, porcelana y piedras naturales.",
      heroText:
        "Transformamos cocinas, baños, pisos, paredes, escaleras y espacios comerciales con materiales de alta calidad, acabados elegantes e instalación profesional.",
      viewServices: "Ver servicios",
      requestQuote: "Solicitar cotización",
      premiumSelection: "Selección premium",
      premiumMaterials: "mármol, granito y cuarzo",
      aboutEyebrow: "Sobre Tecno Mármol, Inc",
      aboutTitle: "Diseño, precisión y materiales nobles para elevar cada espacio.",
      aboutText1:
        "Tecno Mármol, Inc. es una compañía dedicada a ofrecer soluciones en mármol, granito, cuarzo, porcelana y piedras naturales para espacios residenciales y comerciales. Nos enfocamos en brindar materiales de alta calidad, acabados elegantes y un servicio profesional para transformar cocinas, baños, pisos, paredes, escaleras y otros espacios.",
      aboutText2:
        "Nuestro trabajo combina experiencia, precisión y diseño para crear superficies duraderas, modernas y funcionales. Cada proyecto se trabaja con atención al detalle, desde la selección del material hasta la fabricación e instalación final.",
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
      material2Title: "Granito",
      material2Text: "Resistente, duradero y perfecto para cocinas, baños y superficies de alto uso.",
      material3Title: "Cuarzo",
      material3Text: "Moderno, uniforme y fácil de mantener. Excelente para topes contemporáneos.",
      material4Title: "Porcelana",
      material4Text: "Versátil, elegante y resistente. Ideal para diseños modernos.",
      material5Title: "Piedras naturales",
      material5Text: "Texturas únicas, belleza natural y acabados personalizados para resultados con identidad propia.",
      workshopEyebrow: "Conoce nuestro taller",
      workshopTitle: "Fabricación precisa, pulido profesional y tecnología para piezas a la medida.",
      workshopText:
        "Somos uno de los pocos talleres especializados donde se cortan piezas, se pulen superficies, se trabaja con medición láser y se cuida cada detalle desde la plantilla inicial hasta el acabado final. Nuestro proceso combina maquinaria, experiencia artesanal y control profesional para lograr piezas limpias, resistentes y listas para instalación.",
      missionEyebrow: "Misión",
      missionTitle: "Nuestra misión es ofrecer calidad, confianza y elegancia en cada proyecto.",
      missionText:
        "En Tecno Mármol, Inc. ayudamos a cada cliente a mejorar sus espacios con productos resistentes, estéticos y adaptados a sus necesidades. Combinamos experiencia, precisión y diseño para crear superficies modernas, duraderas y funcionales.",
      quoteEyebrow: "Cotización",
      quoteTitle: "¿Listo para transformar tu espacio?",
      quoteText:
        "Solicita una cotización y descubre cómo Tecno Mármol, Inc puede ayudarte a crear superficies modernas, resistentes y con acabado premium.",
      contactNow: "Contactar ahora",
      quoteEmail: "mailto:info@tecnomarmolpr.com?subject=Cotización%20para%20proyecto",
      footerDescription:
        "Soluciones premium en mármol, granito, cuarzo, porcelana y piedras naturales para espacios residenciales y comerciales.",
      footerServicesTitle: "Servicios",
      footerService1: "Cocinas y baños",
      footerService2: "Topes a la medida",
      footerService3: "Instalación profesional",
      footerContactTitle: "Contacto",
      appointmentOnly: "Servicio por cita",
      footerSocialTitle: "Redes sociales",
      rights: "Tecno Mármol, Inc. Derechos reservados."
    },
    en: {
      title: "Tecno Mármol, Inc | Premium Surfaces",
      metaDescription:
        "Tecno Mármol, Inc offers premium marble, granite, quartz, porcelain and natural stone solutions for residential and commercial spaces.",
      metaKeywords:
        "Tecno Mármol, Inc, marble, granite, quartz, porcelain, natural stone, countertops, kitchens, bathrooms, floors, stairs",
      ogDescription:
        "We transform kitchens, bathrooms, floors, walls, stairs and commercial spaces with high quality materials.",
      navToggle: "Open menu",
      workshopGallery: "Workshop photos",
      navAbout: "About",
      navServices: "Services",
      navProcess: "Process",
      navMaterials: "Materials",
      navWorkshop: "Workshop",
      navQuote: "Quote",
      heroSubtitle: "Premium surfaces in marble, granite, quartz, porcelain and natural stone.",
      heroText:
        "We transform kitchens, bathrooms, floors, walls, stairs and commercial spaces with high quality materials, elegant finishes and professional installation.",
      viewServices: "View services",
      requestQuote: "Request a quote",
      premiumSelection: "Premium selection",
      premiumMaterials: "marble, granite and quartz",
      aboutEyebrow: "About Tecno Mármol, Inc",
      aboutTitle: "Design, precision and noble materials to elevate every space.",
      aboutText1:
        "Tecno Mármol, Inc. is a company dedicated to offering marble, granite, quartz, porcelain and natural stone solutions for residential and commercial spaces. We focus on high quality materials, elegant finishes and professional service to transform kitchens, bathrooms, floors, walls, stairs and other spaces.",
      aboutText2:
        "Our work combines experience, precision and design to create durable, modern and functional surfaces. Every project is handled with attention to detail, from material selection to fabrication and final installation.",
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
      material2Title: "Granite",
      material2Text: "Resistant, durable and perfect for kitchens, bathrooms and high-use surfaces.",
      material3Title: "Quartz",
      material3Text: "Modern, uniform and easy to maintain. Excellent for contemporary countertops.",
      material4Title: "Porcelain",
      material4Text: "Versatile, elegant and resistant. Ideal for modern designs.",
      material5Title: "Natural stone",
      material5Text: "Unique textures, natural beauty and custom finishes for results with their own identity.",
      workshopEyebrow: "Meet our workshop",
      workshopTitle: "Precise fabrication, professional polishing and technology for custom pieces.",
      workshopText:
        "We are one of the few specialized workshops where pieces are cut, surfaces are polished, laser measurement is used and every detail is cared for from the initial template to the final finish. Our process combines machinery, craftsmanship and professional control to create clean, resistant pieces ready for installation.",
      missionEyebrow: "Mission",
      missionTitle: "Our mission is to deliver quality, trust and elegance in every project.",
      missionText:
        "At Tecno Mármol, Inc. we help every client improve their spaces with resistant, aesthetic products adapted to their needs. We combine experience, precision and design to create modern, durable and functional surfaces.",
      quoteEyebrow: "Quote",
      quoteTitle: "Ready to transform your space?",
      quoteText:
        "Request a quote and discover how Tecno Mármol, Inc can help you create modern, resistant surfaces with a premium finish.",
      contactNow: "Contact now",
      quoteEmail: "mailto:info@tecnomarmolpr.com?subject=Project%20quote",
      footerDescription:
        "Premium marble, granite, quartz, porcelain and natural stone solutions for residential and commercial spaces.",
      footerServicesTitle: "Services",
      footerService1: "Kitchens and bathrooms",
      footerService2: "Custom countertops",
      footerService3: "Professional installation",
      footerContactTitle: "Contact",
      appointmentOnly: "By appointment",
      footerSocialTitle: "Social media",
      rights: "Tecno Mármol, Inc. All rights reserved."
    }
  };

  const setMeta = (selector, value) => {
    const element = document.querySelector(selector);
    if (element) element.setAttribute("content", value);
  };

  const applyLanguage = (language) => {
    const copy = translations[language] || translations.es;
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

    document.querySelectorAll("[data-i18n-href]").forEach((element) => {
      const key = element.dataset.i18nHref;
      if (copy[key]) element.setAttribute("href", copy[key]);
    });
  };

  languageOptions.forEach((button) => {
    button.addEventListener("click", () => {
      applyLanguage(button.dataset.language);
      languageGate?.classList.add("is-hidden");
      document.body.classList.remove("language-pending");
      window.setTimeout(() => {
        languageGate?.setAttribute("hidden", "");
      }, 540);
    });
  });

  languageOptions[0]?.focus();

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

  // Keep workshop photo slots clean until the real image files are added.
  document.querySelectorAll(".workshop-photo img").forEach((image) => {
    image.addEventListener("error", () => {
      image.classList.add("is-missing");
    });
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

})();
