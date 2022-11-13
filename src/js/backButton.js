(function () {
    // 'use strict';
  
    function trackScroll() {
      var scrolled = window.pageYOffset;
      var coords = document.documentElement.clientHeight;
  
      if (scrolled > coords) {
        goTopBtn.classList.add('button-back-show');
      }
      if (scrolled < coords) {
        goTopBtn.classList.remove('button-back-show');
      }
    }
  
    function backToTop() {
      var scrollStep = window.pageYOffset / 40;
      if (window.pageYOffset > 0) {
        window.scrollBy(0, -scrollStep);
        setTimeout(backToTop, 0);
      }
    }
  
    var goTopBtn = document.querySelector('.button-back-to-menu');
  
    window.addEventListener('scroll', trackScroll);
    goTopBtn.addEventListener('click', backToTop);
  })();
  