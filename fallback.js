(() => {
        window.__TMI_INLINE_VERSION = "36";

        const bootFallback = () => {
          if (window.__TMI_SCRIPT_READY || window.__TMI_INLINE_FALLBACK_READY) return;
          window.__TMI_INLINE_FALLBACK_READY = true;

          const $ = (selector, scope = document) => scope.querySelector(selector);
          const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
          const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          const body = document.body;
          document.querySelectorAll("video[data-src]").forEach((video) => {
            video.src = video.dataset.src;
            video.poster = video.dataset.poster || "";
          });

          const fallbackCopy = {
            es: {
              navToggle: "Abrir menu",
              navAbout: "Sobre",
              navServices: "Servicios",
              navProcess: "Proceso",
              navMaterials: "Materiales",
              navPalettes: "Paletas",
              navWorkshop: "Taller",
              navContact: "Contacto",
              navQuote: "Cotizacion",
              languageToggle: "Cambiar lenguaje",
              viewServices: "Ver servicios",
              requestQuote: "Solicitar cotizacion",
              contactNow: "Contactar ahora",
              formChooseFiles: "Seleccionar archivos",
              formNoFiles: "Ningun archivo seleccionado",
              formSending: "Enviando solicitud...",
              formSuccess: "Solicitud recibida.",
              formError: "No se pudo enviar. Intenta de nuevo o llama al 787-752-2795.",
              formFileTooMany: "Puedes adjuntar hasta {count} archivos.",
              formFileTooLarge: "Los archivos superan el limite recomendado de 10MB.",
              footerLocation: "Localización",
              projectsGalleryLabel: "Galería de proyectos completados",
              projectsEyebrow: "Proyectos completados",
              projectsTitle: "Superficies terminadas con detalle, precisión y acabado premium.",
              projectsControls: "Controles de proyectos completados",
              projectsPrevious: "Proyecto anterior",
              projectsNext: "Siguiente proyecto",
              projectsExpand: "Agrandar proyecto",
              projectsClose: "Cerrar proyecto",
              workshopVideoControls: "Controles de video del taller",
              workshopVideoLabel: "Videos del taller",
              workshopVideoClose: "Cerrar video"
            },
            en: {
              navToggle: "Open menu",
              navAbout: "About",
              navServices: "Services",
              navProcess: "Process",
              navMaterials: "Materials",
              navPalettes: "Palettes",
              navWorkshop: "Workshop",
              navContact: "Contact",
              navQuote: "Quote",
              languageToggle: "Change language",
              viewServices: "View services",
              requestQuote: "Request quote",
              contactNow: "Contact now",
              formChooseFiles: "Choose files",
              formNoFiles: "No files selected",
              formSending: "Sending request...",
              formSuccess: "Email received.",
              formError: "Could not send. Please try again or call 787-752-2795.",
              formFileTooMany: "You can attach up to {count} files.",
              formFileTooLarge: "Files are over the recommended 10MB limit.",
              footerLocation: "Location",
              projectsGalleryLabel: "Completed projects gallery",
              projectsEyebrow: "Completed projects",
              projectsTitle: "Finished surfaces with detail, precision and a premium finish.",
              projectsControls: "Completed project controls",
              projectsPrevious: "Previous project",
              projectsNext: "Next project",
              projectsExpand: "Expand project",
              projectsClose: "Close project",
              workshopVideoControls: "Workshop video controls",
              workshopVideoLabel: "Workshop videos",
              workshopVideoClose: "Close video"
            }
          };

          const activeCopy = () => fallbackCopy[document.documentElement.dataset.lang || document.documentElement.lang] || fallbackCopy.es;

          const applyLanguage = (language) => {
            const copy = fallbackCopy[language] || fallbackCopy.es;
            document.documentElement.lang = language;
            document.documentElement.dataset.lang = language;

            $$("[data-i18n]").forEach((element) => {
              const key = element.dataset.i18n;
              if (copy[key]) element.textContent = copy[key];
            });

            $$("[data-i18n-aria]").forEach((element) => {
              const key = element.dataset.i18nAria;
              if (copy[key]) element.setAttribute("aria-label", copy[key]);
            });

            $$("[data-i18n-placeholder]").forEach((element) => {
              const key = element.dataset.i18nPlaceholder;
              if (copy[key]) element.setAttribute("placeholder", copy[key]);
            });

            const languageField = $("[data-language-field]");
            if (languageField) languageField.value = language;

            const toggle = $("[data-language-toggle]");
            const nextLanguage = language === "en" ? "es" : "en";
            if (toggle) {
              toggle.dataset.currentLanguage = language;
              toggle.dataset.nextLanguage = nextLanguage;
              toggle.setAttribute("aria-label", copy.languageToggle);
              toggle.setAttribute("title", copy.languageToggle);
              toggle.classList.remove("is-switching");
              void toggle.offsetWidth;
              toggle.classList.add("is-switching");
              window.setTimeout(() => toggle.classList.remove("is-switching"), 620);
            }

            const flag = $("[data-language-flag]");
            if (flag) {
              flag.setAttribute("src", language === "en" ? "assets/language-usa.svg" : "assets/language-spain.svg");
            }

            const tooltip = $("[data-language-tooltip]");
            if (tooltip) tooltip.textContent = copy.languageToggle;
          };

          $$("[data-language]").forEach((button) => {
            button.addEventListener("click", () => {
              applyLanguage(button.dataset.language || "es");
              const gate = $("#languageGate");
              if (gate) gate.classList.add("is-hidden");
              body.classList.remove("language-pending");
            });
          });

          const languageSwitch = $("[data-language-toggle]");
          if (languageSwitch) languageSwitch.addEventListener("click", () => {
            const toggle = $("[data-language-toggle]");
            const nextLanguage = toggle && toggle.dataset.nextLanguage ? toggle.dataset.nextLanguage : (document.documentElement.dataset.lang === "en" ? "es" : "en");
            applyLanguage(nextLanguage);
          });

          if (!document.documentElement.dataset.lang) applyLanguage(document.documentElement.lang || "es");
          $$(".reveal").forEach((element) => element.classList.add("is-visible"));

          const header = $("[data-header]");
          const setHeaderState = () => {
            if (!header) return;
            header.classList.toggle("is-scrolled", window.scrollY > 16);
          };
          setHeaderState();
          window.addEventListener("scroll", setHeaderState, { passive: true });

          const navToggle = $(".nav-toggle");
          const navMenu = $("#navMenu");
          if (navToggle) navToggle.addEventListener("click", () => {
            const isOpen = navMenu ? navMenu.classList.toggle("is-open") : false;
            navToggle.classList.toggle("is-open", Boolean(isOpen));
            navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
          });

          if (navMenu) navMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
              navMenu.classList.remove("is-open");
              if (navToggle) {
                navToggle.classList.remove("is-open");
                navToggle.setAttribute("aria-expanded", "false");
              }
            });
          });

          const closeMaterialModal = (modal = $(".material-modal.is-open")) => {
            if (!modal) return;
            modal.classList.remove("is-open");
            modal.setAttribute("aria-hidden", "true");
            body.classList.remove("modal-open");
          };

          const openMaterialModal = (modal) => {
            if (!modal) return;
            modal.classList.add("is-open");
            modal.setAttribute("aria-hidden", "false");
            body.classList.add("modal-open");
            const closeButton = modal.querySelector(".modal-close");
            if (closeButton) closeButton.focus();
          };

          $$("[data-material-modal-open]").forEach((button) => {
            button.addEventListener("click", () => openMaterialModal($(button.dataset.materialModalOpen)));
          });

          $$("[data-material-modal-close]").forEach((button) => {
            button.addEventListener("click", () => closeMaterialModal(button.closest(".material-modal")));
          });

          document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
              closeMaterialModal();
              closeVideoLightbox();
            }
          });

          const videoLightbox = $("[data-video-lightbox]");
          const lightboxPlayer = $("[data-video-lightbox-player]");

          const closeVideoLightbox = () => {
            if (!videoLightbox || !lightboxPlayer) return;
            videoLightbox.classList.remove("is-open");
            videoLightbox.setAttribute("aria-hidden", "true");
            lightboxPlayer.pause();
            lightboxPlayer.removeAttribute("src");
            lightboxPlayer.load();
            body.classList.remove("modal-open");
          };

          const openVideoLightbox = (video) => {
            if (!videoLightbox || !lightboxPlayer || !video || (!video.currentSrc && !video.src)) return;
            lightboxPlayer.src = video.currentSrc || video.src;
            videoLightbox.classList.add("is-open");
            videoLightbox.setAttribute("aria-hidden", "false");
            body.classList.add("modal-open");
            lightboxPlayer.play().catch(() => {});
          };

          $$("[data-video-lightbox-close]").forEach((button) => button.addEventListener("click", closeVideoLightbox));

          $$("[data-video-rotator]").forEach((rotator) => {
            const videos = $$(".workshop-video", rotator);
            const dots = $$(".workshop-video-dots button", rotator);
            let activeIndex = 0;
            let timer = null;

            const setActiveVideo = (index) => {
              const available = videos.filter((video) => !video.dataset.failed);
              if (!available.length) return;
              let nextIndex = ((index % videos.length) + videos.length) % videos.length;
              let guard = 0;
              while (videos[nextIndex] && videos[nextIndex].dataset.failed && guard < videos.length) {
                nextIndex = (nextIndex + 1) % videos.length;
                guard += 1;
              }
              activeIndex = nextIndex;
              videos.forEach((video, videoIndex) => {
                const isActive = videoIndex === activeIndex;
                video.classList.toggle("is-active", isActive);
                if (isActive) {
                  video.currentTime = 0;
                  video.play().catch(() => {});
                } else {
                  video.pause();
                }
              });
              dots.forEach((dot, dotIndex) => dot.classList.toggle("is-active", dotIndex === activeIndex));
            };

            const start = () => {
              if (reducedMotion || timer) return;
              timer = window.setInterval(() => setActiveVideo(activeIndex + 1), 6500);
            };
            const stop = () => {
              if (!timer) return;
              window.clearInterval(timer);
              timer = null;
            };
            const restart = () => {
              stop();
              start();
            };

            videos.forEach((video, index) => {
              video.addEventListener("error", () => {
                video.dataset.failed = "true";
                video.classList.add("is-missing");
                if (dots[index]) dots[index].disabled = true;
                if (index === activeIndex) setActiveVideo(index + 1);
              });
              video.addEventListener("click", () => {
                if (index !== activeIndex || video.dataset.failed) return;
                stop();
                openVideoLightbox(video);
              });
              video.addEventListener("ended", () => {
                setActiveVideo(index + 1);
                restart();
              });
            });

            dots.forEach((dot, index) => {
              dot.addEventListener("click", (event) => {
                event.stopPropagation();
                setActiveVideo(index === activeIndex ? activeIndex + 1 : index);
                restart();
              });
            });

            rotator.addEventListener("mouseenter", stop);
            rotator.addEventListener("mouseleave", start);
            setActiveVideo(0);
            start();
          });

          const initProjectSlideshow = () => {
            if (window.__TMI_PROJECTS_READY) return;
            window.__TMI_PROJECTS_READY = true;

            const slider = $("[data-project-slideshow]");
            if (!slider) return;

            const slides = $$("[data-project-slide]", slider);
            const dots = $$("[data-project-dot]", slider);
            const currentCounter = $("[data-project-current]", slider);
            const totalCounter = $("[data-project-total]", slider);
            const stage = $("[data-project-stage]", slider);
            const lightbox = $("[data-project-lightbox]");
            const lightboxImage = $("[data-project-lightbox-image]");
            const lightboxVideo = $("[data-project-lightbox-video]");
            let activeIndex = 0;
            let lightboxIndex = 0;
            let timer = null;

            if (!slides.length) return;
            if (totalCounter) totalCounter.textContent = String(slides.length).padStart(2, "0");

            const sourcesFor = (slide) => (slide.dataset.mediaSources || "").split("|").map((source) => source.trim()).filter(Boolean);
            const fallbackFor = (slide) => slide.dataset.fallbackSrc || "assets/optimized/tecnomarmol-real-1.webp";

            slides.forEach((slide) => {
              slide.style.setProperty("--project-fallback", `url("${fallbackFor(slide)}")`);
              if (slide.dataset.mediaType === "video") {
                const video = $("[data-project-video]", slide);
                const sources = sourcesFor(slide);
                let index = 0;
                const nextSource = () => {
                  if (!video) return;
                  if (index >= sources.length) {
                    video.dataset.failed = "true";
                    video.classList.add("is-missing");
                    slide.classList.add("is-missing");
                    video.removeAttribute("src");
                    video.load();
                    return;
                  }
                  video.src = sources[index];
                  index += 1;
                  video.load();
                };
                if (video) {
                  video.addEventListener("error", nextSource);
                  video.addEventListener("loadedmetadata", () => slide.classList.remove("is-missing"));
                  video.addEventListener("ended", () => {
                    setActiveSlide(activeIndex + 1);
                    restart();
                  });
                  nextSource();
                }
              } else {
                const image = $("[data-project-image]", slide);
                const sources = [...sourcesFor(slide), fallbackFor(slide)];
                let index = 0;
                const nextSource = () => {
                  if (!image) return;
                  if (index >= sources.length) {
                    slide.classList.add("is-missing");
                    image.removeAttribute("src");
                    return;
                  }
                  image.src = sources[index];
                  index += 1;
                };
                if (image) {
                  image.addEventListener("error", nextSource);
                  image.addEventListener("load", () => slide.classList.remove("is-missing"));
                  nextSource();
                }
              }
            });

            const pauseVideos = () => slides.forEach((slide) => $("[data-project-video]", slide)?.pause());

            function setActiveSlide(index) {
              activeIndex = ((index % slides.length) + slides.length) % slides.length;
              pauseVideos();
              slides.forEach((slide, slideIndex) => slide.classList.toggle("is-active", slideIndex === activeIndex));
              dots.forEach((dot, dotIndex) => dot.classList.toggle("is-active", dotIndex === activeIndex));
              if (currentCounter) currentCounter.textContent = String(activeIndex + 1).padStart(2, "0");
              const video = $("[data-project-video]", slides[activeIndex]);
              if (video && !video.dataset.failed && (video.currentSrc || video.src)) {
                video.currentTime = 0;
                video.play().catch(() => {});
              }
            }

            const start = () => {
              if (reducedMotion || timer) return;
              timer = window.setInterval(() => setActiveSlide(activeIndex + 1), 7800);
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

            const setLightboxMedia = (index) => {
              if (!lightboxImage || !lightboxVideo) return;
              lightboxIndex = ((index % slides.length) + slides.length) % slides.length;
              const slide = slides[lightboxIndex];
              const video = $("[data-project-video]", slide);
              const image = $("[data-project-image]", slide);
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
              body.classList.add("modal-open");
            };

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
              body.classList.remove("modal-open");
              start();
            };

            $("[data-project-prev]", slider)?.addEventListener("click", () => {
              setActiveSlide(activeIndex - 1);
              restart();
            });
            $("[data-project-next]", slider)?.addEventListener("click", () => {
              setActiveSlide(activeIndex + 1);
              restart();
            });
            $("[data-project-expand]", slider)?.addEventListener("click", () => openLightbox(activeIndex));
            stage?.addEventListener("click", (event) => {
              if (event.target.closest("button")) return;
              openLightbox(activeIndex);
            });
            dots.forEach((dot, index) => dot.addEventListener("click", () => {
              setActiveSlide(index);
              restart();
            }));
            slider.addEventListener("mouseenter", stop);
            slider.addEventListener("mouseleave", start);
            slider.addEventListener("focusin", stop);
            slider.addEventListener("focusout", start);
            $$("[data-project-lightbox-close]").forEach((button) => button.addEventListener("click", closeLightbox));
            $("[data-project-lightbox-prev]")?.addEventListener("click", () => setLightboxMedia(lightboxIndex - 1));
            $("[data-project-lightbox-next]")?.addEventListener("click", () => setLightboxMedia(lightboxIndex + 1));
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

          const quoteForm = $("[data-quote-form]");
          const filePicker = $("[data-file-picker]");
          const fileSummary = $("[data-file-summary]");
          const formStatus = $("[data-form-status]");
          const submitButton = quoteForm ? quoteForm.querySelector(".form-submit") : null;
          const maxFiles = Number(filePicker ? filePicker.dataset.maxFiles || 5 : 5);
          const maxTotalBytes = Number(filePicker ? filePicker.dataset.maxTotal || 10485760 : 10485760);

          const setFormStatus = (message, type = "") => {
            if (!formStatus) return;
            formStatus.textContent = message;
            formStatus.dataset.type = type;
          };

          const updateFileSummary = (files) => {
            if (!fileSummary) return;
            const copy = activeCopy();
            if (!files.length) {
              fileSummary.textContent = copy.formNoFiles;
              return;
            }
            fileSummary.textContent = files.length === 1 ? files[0].name : `${files.length} files selected`;
          };

          if (filePicker) filePicker.addEventListener("change", () => {
            const files = Array.from(filePicker.files);
            const copy = activeCopy();
            const total = files.reduce((sum, file) => sum + file.size, 0);
            if (files.length > maxFiles) setFormStatus(copy.formFileTooMany.replace("{count}", String(maxFiles)), "error");
            else if (total > maxTotalBytes) setFormStatus(copy.formFileTooLarge, "error");
            else setFormStatus("", "");
            updateFileSummary(files.slice(0, maxFiles));
          });

          if (quoteForm) quoteForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const copy = activeCopy();
            if (!quoteForm.checkValidity()) {
              quoteForm.reportValidity();
              return;
            }
            if (quoteForm.elements.website && quoteForm.elements.website.value) {
              setFormStatus(copy.formSuccess, "success");
              quoteForm.reset();
              updateFileSummary([]);
              return;
            }

            const files = filePicker ? Array.from(filePicker.files) : [];
            const total = files.reduce((sum, file) => sum + file.size, 0);
            if (files.length > maxFiles) {
              setFormStatus(copy.formFileTooMany.replace("{count}", String(maxFiles)), "error");
              return;
            }
            if (total > maxTotalBytes) {
              setFormStatus(copy.formFileTooLarge, "error");
              return;
            }

            const endpoint = quoteForm.dataset.apiEndpoint || "https://api.tecnomarmolpr.com/api/quote";
            submitButton && (submitButton.disabled = true);
            setFormStatus(copy.formSending, "loading");
            try {
              const response = await fetch(endpoint, {
                method: "POST",
                body: new FormData(quoteForm),
                headers: { Accept: "application/json" }
              });
              const result = await response.json().catch(() => ({}));
              if (!response.ok) throw new Error(result.message || copy.formError);
              setFormStatus(result.message || copy.formSuccess, "success");
              quoteForm.reset();
              updateFileSummary([]);
            } catch (error) {
              setFormStatus(error.message || copy.formError, "error");
            } finally {
              submitButton && (submitButton.disabled = false);
            }
          });
        };

        window.__TMI_BOOT_FALLBACK = bootFallback;

        const scheduleFallback = () => {
          window.setTimeout(() => {
            if (!window.__TMI_SCRIPT_READY) bootFallback();
          }, 1200);
        };

        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", scheduleFallback, { once: true });
        } else {
          scheduleFallback();
        }
      })();
