(function () {
  const cfg = window.ANT_CONFIG || {};
  const isLive = typeof window.ANT_isLiveCA === "function"
    ? window.ANT_isLiveCA(cfg.CA)
    : /^0x[a-fA-F0-9]{40}$/.test(String(cfg.CA || ""));

  const ca = String(cfg.CA || "0xCommingSoon").trim();
  const chain = cfg.CHAIN || "Ethereum";
  const ticker = cfg.TICKER || ("$" + (cfg.SYMBOL || "ANT"));
  const xLink = cfg.X_LINK || "https://x.com/";
  const embedUrl = cfg.EMBED_POST_URL || ("https://x.com/AnthropicAI/status/" + (cfg.EMBED_POST_ID || ""));
  const secLink = cfg.SEC_LINK || cfg.SEC_SEARCH || "https://www.sec.gov/";
  const buyHref = isLive ? (cfg.BUY_BASE || "https://app.uniswap.org/swap?chain=ethereum&outputCurrency=") + ca : "#";
  const chartHref = isLive ? (cfg.CHART_BASE || "https://dexscreener.com/ethereum/") + ca : "#";

  document.querySelectorAll(".js-ca").forEach((el) => { el.textContent = ca; });
  document.querySelectorAll(".js-chain").forEach((el) => { el.textContent = chain; });
  document.querySelectorAll(".js-ticker").forEach((el) => { el.textContent = ticker; });

  document.querySelectorAll(".x-link").forEach((a) => {
    a.href = xLink;
    a.target = "_blank";
    a.rel = "noopener";
  });
  document.querySelectorAll(".embed-open").forEach((a) => {
    a.href = embedUrl;
    a.target = "_blank";
    a.rel = "noopener";
  });
  document.querySelectorAll(".sec-link").forEach((a) => {
    a.href = secLink;
    a.target = "_blank";
    a.rel = "noopener";
  });

  const allowBuy = isLive; // CA validity is the hard gate per brief
  document.querySelectorAll(".buy-link").forEach((a) => {
    if (allowBuy) {
      a.href = buyHref;
      a.removeAttribute("aria-disabled");
      a.classList.remove("is-disabled");
      a.target = "_blank";
      a.rel = "noopener";
    } else {
      a.href = "#";
      a.setAttribute("aria-disabled", "true");
      a.classList.add("is-disabled");
      a.addEventListener("click", (e) => e.preventDefault());
    }
  });

  document.querySelectorAll(".chart-link").forEach((a) => {
    if (isLive) {
      a.href = chartHref;
      a.removeAttribute("aria-disabled");
      a.classList.remove("is-disabled");
      a.target = "_blank";
      a.rel = "noopener";
    } else {
      a.href = "#";
      a.setAttribute("aria-disabled", "true");
      a.classList.add("is-disabled");
      a.addEventListener("click", (e) => e.preventDefault());
    }
  });

  const status = document.querySelector(".js-status");
  const dot = document.querySelector(".status-dot");
  if (status) {
    status.textContent = isLive ? "Live on Ethereum" : "Pre-launch · CA pending";
  }
  if (dot) {
    dot.classList.toggle("live", isLive);
  }

  const copyBtn = document.getElementById("copyCa");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(ca);
        copyBtn.textContent = "Copied";
        setTimeout(() => { copyBtn.textContent = "Copy"; }, 1400);
      } catch (_) {
        copyBtn.textContent = "Fail";
        setTimeout(() => { copyBtn.textContent = "Copy"; }, 1400);
      }
    });
  }

  // sticky nav
  const nav = document.getElementById("nav");
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle("is-stuck", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const toggle = document.getElementById("navToggle");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("is-open"));
    document.querySelectorAll("#navLinks a").forEach((a) => {
      a.addEventListener("click", () => nav.classList.remove("is-open"));
    });
  }

  // FAQ accordion
  document.querySelectorAll(".faq__q").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq__i");
      const open = item.classList.contains("is-open");
      document.querySelectorAll(".faq__i.is-open").forEach((el) => {
        el.classList.remove("is-open");
        const a = el.querySelector(".faq__a");
        if (a) a.style.maxHeight = "0";
      });
      if (!open) {
        item.classList.add("is-open");
        const a = item.querySelector(".faq__a");
        if (a) a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });

  // reveal on view
  const ios = "IntersectionObserver" in window;
  if (ios) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const d = e.target.getAttribute("data-delay");
          if (d) e.target.style.transitionDelay = d + "ms";
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll(".rv").forEach((el) => el.classList.add("in"));
  }

  // show embed fallback if widgets fail to hydrate after a while
  setTimeout(() => {
    const frame = document.querySelector(".embed-frame");
    if (!frame) return;
    const iframe = frame.querySelector("iframe");
    const fallback = frame.querySelector(".embed-fallback");
    if (!iframe && fallback) fallback.style.display = "block";
  }, 4500);
})();
