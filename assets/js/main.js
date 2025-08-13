
(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /*
   * Pricing Toggle
   */

  const pricingContainers = document.querySelectorAll('.pricing-toggle-container');

  pricingContainers.forEach(function(container) {
    const pricingSwitch = container.querySelector('.pricing-toggle input[type="checkbox"]');
    const monthlyText = container.querySelector('.monthly');
    const yearlyText = container.querySelector('.yearly');

    pricingSwitch.addEventListener('change', function() {
      const pricingItems = container.querySelectorAll('.pricing-item');

      if (this.checked) {
        monthlyText.classList.remove('active');
        yearlyText.classList.add('active');
        pricingItems.forEach(item => {
          item.classList.add('yearly-active');
        });
      } else {
        monthlyText.classList.add('active');
        yearlyText.classList.remove('active');
        pricingItems.forEach(item => {
          item.classList.remove('yearly-active');
        });
      }
    });
  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();


// New

// Blur on scroll + auto-close mobile menu
window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  const navMenu = document.getElementById('navmenu');
  
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
    // Close mobile menu when scrolling
    navMenu.classList.remove('mobile-active'); 
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile menu toggle functionality
document.querySelector('.mobile-nav-toggle').addEventListener('click', function() {
  const navMenu = document.getElementById('navmenu');
  navMenu.classList.toggle('mobile-active');
});

document.addEventListener('click', function(e) {
  if (!e.target.closest('#navmenu') && !e.target.closest('.mobile-nav-toggle')) {
    document.getElementById('navmenu').classList.remove('mobile-active');
  }
});

// Me VEry OWn

// Initialize Hero Carousel
// document.addEventListener('DOMContentLoaded', function() {
//   const heroCarousel = new Swiper('.hero-carousel', {
//     loop: true,
//     autoplay: {
//       delay: 5000,
//       disableOnInteraction: false,
//     },
//     speed: 800,
//     effect: 'fade',
//     fadeEffect: {
//       crossFade: true
//     },
//     pagination: {
//       el: '.hero-carousel .swiper-pagination',
//       clickable: true,
//     },
//   });
// });

// const heroCarousel = new Swiper('.hero-carousel', {
//   loop: true, // Infinite looping
//   autoplay: {
//     delay: 5000, // 5 seconds between slides
//     disableOnInteraction: false, // Continue autoplay after user interaction
//   },
//   speed: 800, // Transition speed in ms
//   effect: 'fade', // Smooth fade transition
//   fadeEffect: {
//     crossFade: true // Crossfade between slides
//   },
//   pagination: {
//     el: '.hero-carousel .swiper-pagination',
//     clickable: true, // Allow clicking pagination to navigate
//   },
//   // Add these if you want navigation arrows
//   navigation: {
//     nextEl: '.hero-carousel .swiper-button-next',
//     prevEl: '.hero-carousel .swiper-button-prev',
//   },
// });


document.addEventListener('DOMContentLoaded', function() {
  const heroCarousel = new Swiper('.hero-carousel', {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    speed: 800,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    pagination: {
      el: '.hero-carousel .swiper-pagination',
      clickable: true,
      type: 'bullets',
      dynamicBullets: false, // Disable dynamic bullets
      renderBullet: function (index, className) {
        // Only render bullets for the first 3 slides (0, 1, 2)
        if (index < 3) {
          return '<span class="' + className + '"></span>';
        }
        return '';
      }
    },
    // Fix for loop mode pagination
    on: {
      init: function() {
        this.pagination.bullets.forEach((bullet, index) => {
          if (index >= 3) {
            bullet.style.display = 'none';
          }
        });
      },
      slideChange: function() {
        // Hide any additional bullets that might appear
        this.pagination.bullets.forEach((bullet, index) => {
          if (index >= 3) {
            bullet.style.display = 'none';
          }
        });
      }
    }
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const testimonialCarousel = new Swiper('.testimonial-carousel', {
    loop: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    speed: 800,
    spaceBetween: 30,
    slidesPerView: 1,
    centeredSlides: true,
    pagination: {
      el: '.testimonial-carousel .swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.testimonial-carousel .swiper-button-next',
      prevEl: '.testimonial-carousel .swiper-button-prev',
    },
    breakpoints: {
      576: {
        slidesPerView: 1.2
      },
      768: {
        slidesPerView: 1.5
      },
      992: {
        slidesPerView: 2,
        centeredSlides: false
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 40
      }
    }
  });
});

