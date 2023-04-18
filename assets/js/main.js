(function() {
  "use strict";

  //Easy selector helper function
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  // Easy event listener function
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  // Mobile nav toggle
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  // Mobile nav dropdowns activate
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  //Initiate portfolio lightbox 
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  //Initiate portfolio details lightbox 
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  //Portfolio details slider
  new Swiper('.portfolio-details-slider', {
    speed: 1000,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  // Animation on scroll
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

   // Menu button activation upon scrolling
   new Waypoint({
    element: document.getElementById('hero'),
    handler: function(direction) {
      if (direction === "down") {
        document.getElementById('hero-menu').classList.add("active");
        document.getElementById('about-menu').classList.remove("active");
        document.getElementById('works-menu').classList.remove("active");
        document.getElementById('contact-menu').classList.remove("active");
      }
    },
    offset: '-20%'
  })

  new Waypoint({
    element: document.getElementById('hero'),
    handler: function(direction) {
      if (direction === "up") {
        document.getElementById('hero-menu').classList.add("active");
        document.getElementById('about-menu').classList.remove("active");
        document.getElementById('works-menu').classList.remove("active");
        document.getElementById('contact-menu').classList.remove("active");
      }
    },
    offset: '-50%'
  })

  new Waypoint({
    element: document.getElementById('about'),
    handler: function(direction) {
      if (direction === "down") {
        document.getElementById('hero-menu').classList.remove("active");
        document.getElementById('about-menu').classList.add("active");
        document.getElementById('works-menu').classList.remove("active");
        document.getElementById('contact-menu').classList.remove("active");
      }
    },
    offset: '20%'
  })

  new Waypoint({
    element: document.getElementById('about'),
    handler: function(direction) {
      if (direction === "up") {
        document.getElementById('hero-menu').classList.remove("active");
        document.getElementById('about-menu').classList.add("active");
        document.getElementById('works-menu').classList.remove("active");
        document.getElementById('contact-menu').classList.remove("active");
      }
    },
    offset: '-50%'
  })

  new Waypoint({
    element: document.getElementById('portfolio'),
    handler: function(direction) {
      if (direction === "down") {
        document.getElementById('hero-menu').classList.remove("active");
        document.getElementById('about-menu').classList.remove("active");
        document.getElementById('works-menu').classList.add("active");
        document.getElementById('contact-menu').classList.remove("active");
      }
    },
    offset: '50%'
  })

  new Waypoint({
    element: document.getElementById('portfolio'),
    handler: function(direction) {
      if (direction === "up") {
        document.getElementById('hero-menu').classList.remove("active");
        document.getElementById('about-menu').classList.remove("active");
        document.getElementById('works-menu').classList.add("active");
        document.getElementById('contact-menu').classList.remove("active");
      }
    },
    offset: '-20%'
  })

  new Waypoint({
    element: document.getElementById('contact'),
    handler: function(direction) {
      if (direction === "down") {
        document.getElementById('hero-menu').classList.remove("active");
        document.getElementById('about-menu').classList.remove("active");
        document.getElementById('works-menu').classList.remove("active");
        document.getElementById('contact-menu').classList.add("active");
      }
    },
    offset: '40%'
  })

  new Waypoint({
    element: document.getElementById('contact'),
    handler: function(direction) {
      if (direction === "up") {
        document.getElementById('hero-menu').classList.remove("active");
        document.getElementById('about-menu').classList.remove("active");
        document.getElementById('works-menu').classList.remove("active");
        document.getElementById('contact-menu').classList.add("active");
      }
    },
    offset: 'bottom-in-view'
  })

// Typewrite animation
  var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };

  TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
  };

  window.onload = function() {
    setTimeout(() => {
      var elements = document.getElementsByClassName('typewrite');
      for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
      }
      // INJECT CSS
      var css = document.createElement("style");
      css.type = "text/css";
      css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
      document.body.appendChild(css);
    }, 400);
      
  };

  // Image Gallery
  const lightbox = GLightbox({
    loop: true,
    touchNavigation: true,
    keyboardNavigation: true,
    closeOnOutsideClick: true,
  });

  const imageGallery = GLightbox({
    elements: [
        {
            'href': 'assets/img/portfolio/esghub1.png',
            'type': 'image',
        },
        {
          'href': 'assets/img/portfolio/esghub3b.png',
          'type': 'image',
        },
        {
          'href': 'assets/img/portfolio/esghub2.png',
          'type': 'image',
        },
        {
          'href': 'assets/img/portfolio/esghub4.png',
          'type': 'image',
        },
        {
          'href': 'assets/img/portfolio/apartment3.png',
          'type': 'image',
        },
        {
          'href': 'assets/img/portfolio/apartment1.png',
          'type': 'image',
        },
        {
          'href': 'assets/img/portfolio/apartment2.png',
          'type': 'image',
        },
        {
          'href': 'assets/img/portfolio/noteup1.png',
          'type': 'image',
        },
        {
          'href': 'assets/img/portfolio/noteup2.png',
          'type': 'image',
        },
        {
          'href': 'assets/img/portfolio/vba6.png',
          'type': 'image',
        },
        {
          'href': 'assets/img/portfolio/vba4.png',
          'type': 'image',
        },
        {
          'href': 'assets/img/portfolio/vba5.png',
          'type': 'image',
        },
    ],
  });
  
  document.getElementById('imageGallery-btn').onclick = () => {
    imageGallery.open();
  };

  // Add eventlistener to menu hrefs to collapse menu on click
  const navLinks = document.querySelectorAll('.nav-item')
  const menuToggle = document.getElementById('navbarToggler')
  const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle:false})
  navLinks.forEach((l) => {
    l.addEventListener('click', () => { bsCollapse.toggle() })
  })


})()