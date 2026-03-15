document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  // Create overlay element
  const overlay = document.createElement("div");
  overlay.className = "menu-overlay";
  document.body.appendChild(overlay);

  // Toggle menu
  menuToggle.addEventListener("click", function () {
    mainNav.classList.toggle("active");
    overlay.classList.toggle("active");

    // Change icon
    const icon = menuToggle.querySelector("i");
    if (mainNav.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
      document.body.style.overflow = ""; // Enable scrolling
    }
  });

  // Close menu when clicking overlay
  overlay.addEventListener("click", function () {
    mainNav.classList.remove("active");
    overlay.classList.remove("active");

    const icon = menuToggle.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
    document.body.style.overflow = "";
  });

  // Close menu when clicking a link (for single page apps)
  const navLinks = mainNav.querySelectorAll("a");
  navLinks.forEach((link, index) => {
    link.style.setProperty("--i", index);
    link.addEventListener("click", function () {
      mainNav.classList.remove("active");
      overlay.classList.remove("active");

      const icon = menuToggle.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
      document.body.style.overflow = "";
    });
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      mainNav.classList.remove("active");
      overlay.classList.remove("active");

      const icon = menuToggle.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
      document.body.style.overflow = "";
    }
  });
});

// Wait for DOM to load completely
document.addEventListener("DOMContentLoaded", function () {
  /* =========================
           PRODUCTS SLIDER
        ========================= */
  const slides = document.querySelector(".slides");
  const groups = document.querySelectorAll(".slide-group");
  const dotsContainer = document.querySelector(".dots");

  // Only run if products slider exists
  if (slides && groups.length > 0 && dotsContainer) {
    // Clear existing dots
    dotsContainer.innerHTML = "";

    let index = 0;

    // Create dots based on number of slide groups
    groups.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });

    function updateDots() {
      const dots = document.querySelectorAll(".dots span");
      dots.forEach((dot) => dot.classList.remove("active"));
      if (dots[index]) {
        dots[index].classList.add("active");
      }
    }

    function goToSlide(i) {
      if (i >= 0 && i < groups.length) {
        index = i;
        slides.style.transform = `translateX(-${index * 100}%)`;
        updateDots();
      }
    }

    // Arrows
    const nextBtn = document.querySelector(".product-next");
    const prevBtn = document.querySelector(".product-prev");

    if (nextBtn) {
      nextBtn.onclick = () => {
        index = (index + 1) % groups.length;
        goToSlide(index);
      };
    }

    if (prevBtn) {
      prevBtn.onclick = () => {
        index = (index - 1 + groups.length) % groups.length;
        goToSlide(index);
      };
    }

    // Auto slide
    let autoSlide = setInterval(() => {
      index = (index + 1) % groups.length;
      goToSlide(index);
    }, 4000);

    // Pause auto slide on hover
    const sliderContainer = document.querySelector(".slider");
    if (sliderContainer) {
      sliderContainer.addEventListener("mouseenter", () => {
        clearInterval(autoSlide);
      });

      sliderContainer.addEventListener("mouseleave", () => {
        autoSlide = setInterval(() => {
          index = (index + 1) % groups.length;
          goToSlide(index);
        }, 4000);
      });
    }

    // Initialize products slider
    goToSlide(0);
  }
});
