document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash-screen");
  const mainContent = document.getElementById("main-content");
  const exploreBtn = document.getElementById("explore-btn");

  if (exploreBtn) {
    exploreBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // Fade out splash
      splash.style.opacity = "0";
      splash.style.transition = "opacity 0.8s ease";

      setTimeout(() => {
        splash.style.display = "none";

        // Reveal sticky navbar
        mainContent.classList.add("show");
        document.body.classList.add("loaded");

        // Scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 800);
    });
  }
});



document.addEventListener('DOMContentLoaded', function () {
  // enable horizontal wheel scroll on collapsed scroll areas
  document.querySelectorAll('.experience-scroll').forEach(function(container) {
    container.addEventListener('wheel', function(e) {
      // if collapsed -> make vertical wheel scroll horizontally
      if (container.classList.contains('collapsed')) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    }, { passive: false });
  });

  // Toggle show more / show less on each category
  document.querySelectorAll('.exp-toggle-btn').forEach(function(btn) {
    btn.addEventListener('click', function () {
      // find the adjacent experience-scroll for this category
      const wrap = btn.closest('.exp-category-wrap');
      const scrollContainer = wrap.querySelector('.experience-scroll');
      const expanded = scrollContainer.classList.toggle('expanded');
      scrollContainer.classList.toggle('collapsed', !expanded);

      // update aria + label
      btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      btn.textContent = expanded ? 'Show less' : 'Show more';

      // when expanding, scroll to top of the container so user sees items
      if (expanded) {
        scrollContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });

  // Optional: if user resizes window while expanded, reflow layout
  window.addEventListener('resize', function() {
    document.querySelectorAll('.experience-scroll.expanded').forEach(function(c) {
      // small no-op to force repaint if needed
      c.style.transition = 'none';
      setTimeout(()=> c.style.transition = '', 50);
    });
  });
});

 
document.addEventListener("DOMContentLoaded", () => {

  // ===== Filter Logic =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const researchItems = document.querySelectorAll('.research-item');
  const seeMoreBtn = document.getElementById('seeMoreBtn');

  const itemsToShow = 3;
  let showingAllByCategory = {}; // separate state for each category
  let activeCategory = 'all';

  // function to update visibility
  function updateResearchVisibility() {
    const visibleItems = [...researchItems].filter(item => {
      return activeCategory === 'all' || item.dataset.category === activeCategory;
    });

    const showingAll = showingAllByCategory[activeCategory] || false;

    visibleItems.forEach((item, index) => {
      if (!showingAll && index >= itemsToShow) {
        item.classList.add('hide');
      } else {
        item.classList.remove('hide');
      }
    });

    // hide items not in the selected category
    researchItems.forEach(item => {
      if (activeCategory !== 'all' && item.dataset.category !== activeCategory) {
        item.classList.add('hide');
      }
    });

    // update button text
    seeMoreBtn.textContent = showingAll ? 'See Less' : 'See More';
  }

  // filter button click logic
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      activeCategory = btn.getAttribute('data-filter');
      if (!(activeCategory in showingAllByCategory)) {
        showingAllByCategory[activeCategory] = false;
      }

      updateResearchVisibility();
    });
  });

  // see more / less logic per category
  seeMoreBtn.addEventListener('click', () => {
    showingAllByCategory[activeCategory] = !showingAllByCategory[activeCategory];
    updateResearchVisibility();
  });

  // initialize
  showingAllByCategory['all'] = false;
  updateResearchVisibility();

});






// ===== Projects Swiper =====
new Swiper(".project-slider", {
  slidesPerView: 1,
  spaceBetween: 25,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  }
});


// ===== Show More / Less Details in Project Cards =====
const projectToggleBtn = document.getElementById('projectToggleBtn');
const projectCards = document.querySelectorAll('.project-card');
let showAllDetails = false;

projectToggleBtn.addEventListener('click', () => {
  showAllDetails = !showAllDetails;

  projectCards.forEach(card => {
    if (showAllDetails) {
      card.classList.add('show-details');
    } else {
      card.classList.remove('show-details');
    }
  });

  projectToggleBtn.textContent = showAllDetails ? 'See Less' : 'See More';
});



const btn = document.getElementById("seeMoreBtn");
const text = document.querySelector(".research-details p");

let expanded = false;

btn.addEventListener("click", () => {
  expanded = !expanded;

  if (expanded) {
    text.classList.add("expanded");
    btn.innerText = "See Less";
  } else {
    text.classList.remove("expanded");
    btn.innerText = "See More";
  }
});



const scrollContainer = document.querySelector(".cert-awards-container");

document.querySelector(".right-btn").addEventListener("click", () => {
  scrollContainer.scrollBy({
    left: 350,
    behavior: "smooth"
  });
});

document.querySelector(".left-btn").addEventListener("click", () => {
  scrollContainer.scrollBy({
    left: -350,
    behavior: "smooth"
  });
});





// Navbar (Sidebar)
const menuToggle = document.querySelector('.menu-toggle');
const closeBtn = document.querySelector('.close-btn');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.add('active');
});

closeBtn.addEventListener('click', () => {
  navLinks.classList.remove('active');
});

// Auto-close when a nav link is clicked
document.querySelectorAll("#nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});


// PDF Modal Functions
function openCertificate(pdfUrl) {
  document.getElementById("pdfViewer").src = pdfUrl;
  document.getElementById("pdfModal").style.display = "flex";
}
function closeModal() {
  document.getElementById("pdfModal").style.display = "none";
  document.getElementById("pdfViewer").src = "";
}


// ===== PDF Modal =====
function openCertificate(pdfUrl) {
  document.getElementById("pdfViewer").src = pdfUrl;
  document.getElementById("pdfModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("pdfModal").style.display = "none";
  document.getElementById("pdfViewer").src = "";
}







// Initialize Achievements Slider (Slick or Swiper)
document.addEventListener("DOMContentLoaded", () => {
  $('.achievement-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    dots: true,
    arrows: false,
    responsive: [
      { breakpoint: 900, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } }
    ]
  });
});





document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     Smooth Horizontal Scroll
  ========================= */

  const momentsContainer = document.querySelector(".moments-container");

  const leftBtn = document.querySelector(".moments-left-btn");

  const rightBtn = document.querySelector(".moments-right-btn");

  rightBtn.addEventListener("click", () => {
    momentsContainer.scrollBy({
      left: 350,
      behavior: "smooth"
    });
  });

  leftBtn.addEventListener("click", () => {
    momentsContainer.scrollBy({
      left: -350,
      behavior: "smooth"
    });
  });

  /* =========================
     Image Popup
  ========================= */

  const modal = document.getElementById("momentModal");

  const modalImg = document.getElementById("momentModalImg");

  const images = document.querySelectorAll(".moment-img");

  const closeBtn = modal.querySelector(".close-modal");

  images.forEach(img => {

    img.addEventListener("click", () => {

      modal.style.display = "block";

      modalImg.src = img.src;

    });

  });

  closeBtn.onclick = () => {

    modal.style.display = "none";

  };

  modal.onclick = (e) => {

    if (e.target === modal) {

      modal.style.display = "none";

    }

  };

});










// Rotating dancing text - continuous loop
(function() {
  const phrases = [
    "💡 Dedicated Learner",
    "Problem Solver",
    "Collaborative Team Player",
    "Research-Driven Thinker",
    "Tech Enthusiast"
  ];

  const el = document.getElementById("dancing-text");
  if (!el) return;

  let i = 0;
  const hold = 2200;   // how long each phrase stays visible (ms)
  const fadeDur = 320; // fade in/out duration (ms) — keep in sync with CSS

  // Initialize
  el.textContent = phrases[0];
  el.classList.add("fade-in");

  function nextPhrase() {
    // fade out
    el.classList.remove("fade-in");
    el.classList.add("fade-out");

    // after fade-out, change text and fade in
    setTimeout(() => {
      i = (i + 1) % phrases.length;
      el.textContent = phrases[i];

      el.classList.remove("fade-out");
      // trigger reflow to restart transition reliably
      void el.offsetWidth;
      el.classList.add("fade-in");
    }, fadeDur);

    // schedule next phrase after hold + fadeDur
    setTimeout(nextPhrase, hold + fadeDur);
  }

  // start the loop after the first hold period
  setTimeout(nextPhrase, hold);
})();



    // Smooth scroll + hide splash
    document.querySelector('.explore-btn').addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
      document.getElementById('splash-screen').style.display = 'none';
    });


  



    document.addEventListener("DOMContentLoaded", () => {

      const modal = document.getElementById("certificateModal");

      const modalImg = document.getElementById("modalImage");

      const images = document.querySelectorAll(".certificate-img");

      const closeBtn = document.querySelector(".close-modal");

      images.forEach(img => {

        img.addEventListener("click", () => {

          modal.style.display = "block";

          modalImg.src = img.src;

        });

      });

      closeBtn.onclick = () => {

        modal.style.display = "none";

      };

      modal.onclick = (e) => {

        if (e.target === modal) {

          modal.style.display = "none";

        }

      };

    });



  document.querySelectorAll(".video-card").forEach(card => {
    const video = card.querySelector(".moment-video");
    const btn = card.querySelector(".play-btn");

    // ▶ button click = play
    btn.addEventListener("click", () => {
      video.currentTime = 0;
      video.play();
      btn.style.display = "none";
    });

    // 🎬 video click = pause/play toggle
    video.addEventListener("click", () => {
      if (video.paused) {
        video.play();
        btn.style.display = "none";
      } else {
        video.pause();
        btn.innerHTML = "▶";
        btn.style.display = "flex";
      }
    });

    // ⏸ pause event
    video.addEventListener("pause", () => {
      if (!video.ended) {
        btn.innerHTML = "▶";
        btn.style.display = "flex";
      }
    });

    // 🔚 ended event
    video.addEventListener("ended", () => {
      btn.innerHTML = "↻";
      btn.style.display = "flex";
    });
  });
