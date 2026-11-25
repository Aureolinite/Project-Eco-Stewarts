document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("lightbox-close");
  const zoomableContainers = document.querySelectorAll(".photo-wrapper, .bill-wrapper");

  // Open lightbox when clicking any action photo or electric bill
  zoomableContainers.forEach((container) => {
    container.addEventListener("click", () => {
      const img = container.querySelector("img");
      if (img && img.src) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || "Expanded view";
        lightbox.classList.add("active");
      }
    });
  });

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove("active");
  }

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });

  // Show a placeholder graphic if local images haven't been added yet
  document.querySelectorAll("img[data-placeholder]").forEach((img) => {
    const applyPlaceholder = () => {
      const label = img.getAttribute("data-placeholder");
      const isBeforeBill = img.dataset.theme === "before";
      const bg = isBeforeBill ? "%23fee2e2" : "%23dcfce7";
      const fg = isBeforeBill ? "%23991b1b" : "%23166534";

      img.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="100%" height="100%" fill="${bg}"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="15" fill="${fg}">${encodeURIComponent(label)}</text></svg>`;
    };

    img.addEventListener("error", applyPlaceholder, { once: true });

    if (img.complete && img.naturalWidth === 0) {
      applyPlaceholder();
    }
  });
});
