(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.querySelector("[data-header]");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector("#navMenu");
  const year = document.querySelector("#year");

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
      gradient.addColorStop(0, "rgba(214, 180, 112, 0)");
      gradient.addColorStop(0.38, band % 2 ? "rgba(255, 255, 255, 0.045)" : "rgba(255, 112, 24, 0.07)");
      gradient.addColorStop(0.62, "rgba(214, 180, 112, 0.075)");
      gradient.addColorStop(1, "rgba(214, 180, 112, 0)");

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
      ctx.fillStyle = `rgba(240, 217, 164, ${particle.alpha})`;
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
