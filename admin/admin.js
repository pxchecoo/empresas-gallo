(() => {
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  const formatNumber = (value) => new Intl.NumberFormat("es-PR").format(Number(value || 0));
  const formatDate = (value) => value ? new Date(value.replace(" ", "T")).toLocaleString("es-PR", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }) : "";

  const params = () => {
    const search = $("[data-search]")?.value.trim() || "";
    const from = $("[data-from]")?.value || "";
    const to = $("[data-to]")?.value || "";
    const query = new URLSearchParams();
    if (search) query.set("search", search);
    if (from) query.set("from", from);
    if (to) query.set("to", to);
    return query;
  };

  const request = async (url, options = {}) => {
    const response = await fetch(url, {
      credentials: "same-origin",
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      ...options
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || "No se pudo completar la solicitud.");
    return data;
  };

  const loginForm = $("[data-admin-login]");
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const error = $("[data-login-error]");
      const button = loginForm.querySelector("button");
      if (error) error.textContent = "";
      if (button) button.disabled = true;

      try {
        const form = new FormData(loginForm);
        const data = await request("/api/admin/login", {
          method: "POST",
          body: JSON.stringify({ password: form.get("password") || "" })
        });
        window.location.href = data.redirect || "/admin/dashboard";
      } catch (err) {
        if (error) error.textContent = err.message;
      } finally {
        if (button) button.disabled = false;
      }
    });
    return;
  }

  const statConfig = [
    ["today", "Visitantes de hoy", "M12 3v18M3 12h18"],
    ["week", "Esta semana", "M4 19V5m16 14V5M4 12h16"],
    ["month", "Este mes", "M7 3v4m10-4v4M4 9h16v11H4z"],
    ["total", "Total visitantes", "M4 12a8 8 0 1 0 16 0A8 8 0 0 0 4 12z"],
    ["uniqueUsers", "Usuarios únicos", "M16 21v-2a4 4 0 0 0-8 0v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
    ["activeNow", "Activos ahora", "M5 12h4l2 7 4-14 2 7h2"]
  ];

  const icon = (path) => `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="${path}"></path>
    </svg>
  `;

  const empty = (text = "Sin datos todavía") => `<div class="empty-state">${text}</div>`;

  const renderStats = (stats) => {
    const container = $("[data-stat-cards]");
    if (!container) return;
    container.innerHTML = statConfig.map(([key, label, path]) => `
      <article class="stat-card">
        <div class="stat-icon">${icon(path)}</div>
        <div>
          <span>${label}</span>
          <strong>${formatNumber(stats[key])}</strong>
        </div>
      </article>
    `).join("");
  };

  const renderRank = (selector, rows, suffix = "") => {
    const container = $(selector);
    if (!container) return;
    if (!rows?.length) {
      container.innerHTML = empty();
      return;
    }
    const max = Math.max(...rows.map(row => Number(row.value || 0)), 1);
    container.innerHTML = rows.map(row => `
      <div class="rank-item">
        <div class="rank-row">
          <span class="rank-label">${row.label || "Sin etiqueta"}</span>
          <span class="rank-value">${formatNumber(row.value)}${suffix}</span>
        </div>
        <div class="bar-track"><div class="bar-fill" style="width:${Math.max(4, (Number(row.value || 0) / max) * 100)}%"></div></div>
      </div>
    `).join("");
  };

  const renderPills = (selector, rows) => {
    const container = $(selector);
    if (!container) return;
    if (!rows?.length) {
      container.innerHTML = empty();
      return;
    }
    container.innerHTML = rows.map(row => `
      <div class="pill"><span>${row.label || "Otros"}</span><b>${row.percent ?? 0}%</b></div>
    `).join("");
  };

  const renderFlows = (rows) => {
    const container = $("[data-flows]");
    if (!container) return;
    if (!rows?.length) {
      container.innerHTML = empty();
      return;
    }
    container.innerHTML = rows.map(row => `
      <div class="flow-item">
        <strong>${row.label}</strong>
        <span class="event-muted">${formatNumber(row.value)} sesiones</span>
      </div>
    `).join("");
  };

  const renderCountries = (rows) => {
    const container = $("[data-countries]");
    if (!container) return;
    if (!rows?.length) {
      container.innerHTML = empty();
      return;
    }
    container.innerHTML = rows.map(row => `
      <div class="country-item">
        <div class="country-row">
          <strong>${row.label || "Desconocido"}</strong>
          <span class="country-value">${row.percent ?? 0}%</span>
        </div>
        <div class="bar-track"><div class="bar-fill" style="width:${Math.max(4, Number(row.percent || 0))}%"></div></div>
      </div>
    `).join("");
  };

  const eventText = (event) => {
    const map = {
      site_enter: "entró al sitio",
      page_view: "viendo",
      page_duration: "tiempo en",
      quote_open: "abrió cotización",
      quote_submit: "envió cotización",
      heartbeat: "viendo",
      site_exit: "salió desde"
    };
    return map[event] || event;
  };

  const renderActive = (rows) => {
    const container = $("[data-active]");
    if (!container) return;
    if (!rows?.length) {
      container.innerHTML = empty("Sin visitantes activos ahora");
      return;
    }
    container.innerHTML = rows.map(row => `
      <div class="activity-item">
        <div class="activity-row">
          <strong>Visitante ${eventText(row.event_type)} ${row.page}</strong>
          <span>${formatDate(row.created_at)}</span>
        </div>
        <span class="event-muted">${row.device || "Dispositivo"} · ${row.browser || "Navegador"} · ${row.country || "País"}</span>
      </div>
    `).join("");
  };

  const renderEvents = (rows) => {
    const body = $("[data-events]");
    if (!body) return;
    if (!rows?.length) {
      body.innerHTML = `<tr><td colspan="5">Sin eventos todavía</td></tr>`;
      return;
    }
    body.innerHTML = rows.map(row => `
      <tr>
        <td>${formatDate(row.created_at)}</td>
        <td>${eventText(row.event_type)}</td>
        <td>${row.page}</td>
        <td>${row.device} / ${row.browser}</td>
        <td>${row.country}</td>
      </tr>
    `).join("");
  };

  const drawLineChart = (canvas, rows, color = "#d86018") => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const ratio = window.devicePixelRatio || 1;
    const width = canvas.clientWidth || 420;
    const height = Number(canvas.getAttribute("height")) || 220;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const padding = 28;
    const values = rows?.length ? rows.map(row => Number(row.value || 0)) : [0];
    const max = Math.max(...values, 1);

    ctx.strokeStyle = "rgba(45, 35, 26, 0.08)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 4; i += 1) {
      const y = padding + ((height - padding * 2) / 3) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    if (!rows?.length) {
      ctx.fillStyle = "#746b61";
      ctx.font = "700 14px Inter, sans-serif";
      ctx.fillText("Sin datos todavía", padding, height / 2);
      return;
    }

    const points = rows.map((row, index) => ({
      x: padding + (index / Math.max(rows.length - 1, 1)) * (width - padding * 2),
      y: height - padding - (Number(row.value || 0) / max) * (height - padding * 2)
    }));

    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, "rgba(216, 96, 24, 0.24)");
    gradient.addColorStop(1, "rgba(216, 96, 24, 0)");
    ctx.beginPath();
    points.forEach((point, index) => index ? ctx.lineTo(point.x, point.y) : ctx.moveTo(point.x, point.y));
    ctx.lineTo(points[points.length - 1].x, height - padding);
    ctx.lineTo(points[0].x, height - padding);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    points.forEach((point, index) => index ? ctx.lineTo(point.x, point.y) : ctx.moveTo(point.x, point.y));
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();

    points.forEach(point => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#fffaf2";
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  };

  const drawDonut = (canvas, rows) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const ratio = window.devicePixelRatio || 1;
    const width = canvas.clientWidth || 300;
    const height = Number(canvas.getAttribute("height")) || 220;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const total = rows?.reduce((sum, row) => sum + Number(row.value || 0), 0) || 0;
    if (!total) {
      ctx.fillStyle = "#746b61";
      ctx.font = "700 14px Inter, sans-serif";
      ctx.fillText("Sin datos todavía", 20, height / 2);
      return;
    }

    const colors = ["#d86018", "#326bba", "#1f9d6b", "#f49b49", "#6b7280"];
    let start = -Math.PI / 2;
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) * 0.36;
    rows.forEach((row, index) => {
      const angle = (Number(row.value || 0) / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, start, start + angle);
      ctx.lineWidth = 22;
      ctx.strokeStyle = colors[index % colors.length];
      ctx.stroke();
      start += angle;
    });
  };

  const renderCharts = (data) => {
    drawLineChart($('[data-chart="days"]'), data.charts.days);
    drawLineChart($('[data-chart="weeks"]'), data.charts.weeks, "#326bba");
    drawLineChart($('[data-chart="months"]'), data.charts.months, "#1f9d6b");
    drawDonut($('[data-chart="devices"]'), data.devices);
  };

  const updateExportLinks = () => {
    const query = params().toString();
    const suffix = query ? `?${query}` : "";
    const pdf = $("[data-export-pdf]");
    const excel = $("[data-export-excel]");
    if (pdf) pdf.href = `/api/admin/export/pdf${suffix}`;
    if (excel) excel.href = `/api/admin/export/excel${suffix}`;
  };

  let currentData = null;
  let timer = null;

  const loadDashboard = async () => {
    updateExportLinks();
    const query = params().toString();
    const response = await request(`/api/admin/analytics${query ? `?${query}` : ""}`);
    currentData = response.data;
    renderStats(currentData.stats);
    renderRank("[data-top-pages]", currentData.topPages);
    renderRank("[data-avg-time]", currentData.avgTime, "s");
    renderRank("[data-abandonment]", currentData.abandonment.map(row => ({ ...row, value: row.percent })), "%");
    renderFlows(currentData.flows);
    renderPills("[data-devices]", currentData.devices);
    renderPills("[data-browsers]", currentData.browsers);
    renderPills("[data-operating-systems]", currentData.operatingSystems);
    renderCountries(currentData.countries);
    renderPills("[data-referrers]", currentData.referrers);
    renderActive(currentData.active);
    renderEvents(currentData.events);
    renderCharts(currentData);
  };

  const setAutoRefresh = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
    if ($("[data-auto-refresh]")?.checked) {
      timer = window.setInterval(loadDashboard, 6000);
    }
  };

  $("[data-apply-filters]")?.addEventListener("click", loadDashboard);
  $("[data-search]")?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") loadDashboard();
  });
  $("[data-auto-refresh]")?.addEventListener("change", setAutoRefresh);
  window.addEventListener("resize", () => {
    if (currentData) renderCharts(currentData);
  });
  $("[data-logout]")?.addEventListener("click", async () => {
    await request("/api/admin/logout", { method: "POST", body: "{}" });
    window.location.href = "/admin";
  });

  loadDashboard().then(setAutoRefresh).catch((error) => {
    if (/autorizado|expirada/i.test(error.message)) window.location.href = "/admin";
    console.error(error);
  });
})();
