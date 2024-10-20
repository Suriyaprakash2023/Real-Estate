(function ($) {
  var Spanizer = (function () {
    var settings = {
      letters: $(".js-letters"),
    };
    return {
      init: function () {
        this.bind();
      },
      bind: function () {
        Spanizer.doSpanize();
      },
      doSpanize: function () {
        settings.letters.html(function (i, el) {
          var spanize = $.trim(el).split("");
          var template = "<span>" + spanize.join("</span><span>") + "</span>";
          return template;
        });
      },
    };
  })();
  // Let's GO!

  if (matchMedia("only screen and (min-width: 991px)").matches) {
    Spanizer.init();
  }
})(jQuery);

if ($(".thumbs-swiper-column").length > 0) {
  var swiperthumbs = new Swiper(".thumbs-swiper-column1", {
    spaceBetween: 0,
    slidesPerView: 4,
    freeMode: true,
    direction: "vertical",
    watchSlidesProgress: true,
  });

  var swiper2 = new Swiper(".thumbs-swiper-column", {
    spaceBetween: 0,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 500,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    thumbs: {
      swiper: swiperthumbs,
    },
  });
}

if ($(".slider-sw-home2").length > 0) {
  var swiper2 = new Swiper(".slider-sw-home2", {
    spaceBetween: 0,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    speed: 2000,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
  });
}

if ($(".tf-sw-location").length > 0) {
  var previewLg = $(".tf-sw-location").data("preview-lg");
  var previewMd = $(".tf-sw-location").data("preview-md");
  var previewSm = $(".tf-sw-location").data("preview-sm");
  var spacing = $(".tf-sw-location").data("space");
  var centered = $(".tf-sw-location").data("centered");
  var loop = $(".tf-sw-location").data("loop");
  var swiper = new Swiper(".tf-sw-location", {
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    speed: 2000,
    navigation: {
      clickable: true,
      nextEl: ".nav-prev-location",
      prevEl: ".nav-next-location",
    },
    pagination: {
      el: ".swiper-pagination1",
      clickable: true,
    },
    slidesPerView: 1,
    loop: loop,
    spaceBetween: spacing,
    centeredSlides: centered,
    breakpoints: {
      600: {
        slidesPerView: previewSm,
        spaceBetween: 20,
        centeredSlides: false,
      },
      991: {
        slidesPerView: previewMd,
        spaceBetween: 20,
        centeredSlides: false,
      },

      1520: {
        slidesPerView: previewLg,
        spaceBetween: spacing,
      },
    },
  });
}

if ($(".tf-sw-testimonial").length > 0) {
  var previewLg = $(".tf-sw-testimonial").data("preview-lg");
  var previewMd = $(".tf-sw-testimonial").data("preview-md");
  var previewSm = $(".tf-sw-testimonial").data("preview-sm");
  var spacing = $(".tf-sw-testimonial").data("space");
  var swTestimonial = new Swiper(".tf-sw-testimonial", {
    slidesPerView: 1,
    spaceBetween: spacing,
    navigation: {
      clickable: true,
      nextEl: ".nav-prev-testimonial",
      prevEl: ".nav-next-testimonial",
    },
    pagination: {
      el: ".sw-pagination-testimonial",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: previewSm,
        spaceBetween: 20,
      },
      991: {
        slidesPerView: previewMd,
        spaceBetween: 20,
      },

      1550: {
        slidesPerView: previewLg,
        spaceBetween: spacing,
      },
    },
  });
}

if ($(".tf-sw-partner").length > 0) {
  var previewLg = $(".tf-sw-partner").data("preview-lg");
  var previewMd = $(".tf-sw-partner").data("preview-md");
  var previewSm = $(".tf-sw-partner").data("preview-sm");
  var spacing = $(".tf-sw-partner").data("space");
  var swiper = new Swiper(".tf-sw-partner", {
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    slidesPerView: 2,
    loop: true,
    spaceBetween: 30,
    speed: 3000,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      450: {
        slidesPerView: previewSm,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: previewMd,
        spaceBetween: 30,
      },

      992: {
        slidesPerView: previewLg,
        spaceBetween: spacing,
      },
    },
  });
}
$(".tf-sw-partner").hover(
  function () {
    this.swiper.autoplay.stop();
  },
  function () {
    this.swiper.autoplay.start();
  }
);

if ($(".tf-sw-categories").length > 0) {
  var previewLg = $(".tf-sw-categories").data("preview-lg");
  var previewMd = $(".tf-sw-categories").data("preview-md");
  var previewSm = $(".tf-sw-categories").data("preview-sm");
  var spacing = $(".tf-sw-categories").data("space");
  var swiper = new Swiper(".tf-sw-categories", {
    slidesPerView: 2,
    spaceBetween: 30,
    navigation: {
      clickable: true,
      nextEl: ".nav-prev-category",
      prevEl: ".nav-next-category",
    },
    pagination: {
      el: ".sw-pagination-category",
      clickable: true,
    },
    breakpoints: {
      600: {
        slidesPerView: previewSm,
        spaceBetween: 30,
      },
      800: {
        slidesPerView: previewMd,
        spaceBetween: 30,
      },

      1300: {
        slidesPerView: previewLg,
        spaceBetween: spacing,
      },
    },
  });
}

if ($(".tf-sw-property").length > 0) {
  var swiper = new Swiper(".tf-sw-property", {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      clickable: true,
      nextEl: ".nav-prev-property",
      prevEl: ".nav-next-property",
    },
    pagination: {
      el: ".sw-pagination-property",
      clickable: true,
    },
  });
}

if ($(".tf-sw-benefit").length > 0) {
  var swiper = new Swiper(".tf-sw-benefit", {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      clickable: true,
      nextEl: ".nav-prev-benefit",
      prevEl: ".nav-next-benefit",
    },
    pagination: {
      el: ".sw-pagination-benefit",
      clickable: true,
    },
  });
}
if ($(".tf-sw-auto").length > 0) {
  var loop = $(".tf-sw-auto").data("loop");

  var swiper = new Swiper(".tf-sw-auto", {
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    speed: 2000,
    slidesPerView: "auto",
    spaceBetween: 0,
    loop: loop,
    navigation: {
      clickable: true,
      nextEl: ".nav-prev-category",
      prevEl: ".nav-next-category",
    },
  });
}

var pagithumbs = new Swiper(".thumbs-sw-pagi", {
  spaceBetween: 14,
  slidesPerView: "auto",
  freeMode: true,
  watchSlidesProgress: true,
  breakpoints: {
    375: {
      slidesPerView: 3,
      spaceBetween: 14,
    },
    500: {
      slidesPerView: "auto",
    },
  },
});

var swiperSingle = new Swiper(".sw-single", {
  spaceBetween: 16,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  speed: 500,
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  thumbs: {
    swiper: pagithumbs,
  },
  navigation: {
    clickable: true,
    nextEl: ".nav-prev-single",
    prevEl: ".nav-next-single",
  },
});

if ($(".tf-latest-property").length > 0) {
  var previewLg = $(".tf-latest-property").data("preview-lg");
  var previewMd = $(".tf-latest-property").data("preview-md");
  var previewSm = $(".tf-latest-property").data("preview-sm");
  var spacing = $(".tf-latest-property").data("space");
  var centered = $(".tf-latest-property").data("centered");
  var loop = $(".tf-latest-property").data("loop");
  var swiper = new Swiper(".tf-latest-property", {
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
      reverseDirection: false,
    },

    speed: 3000,
    slidesPerView: 1,
    loop: loop,
    spaceBetween: spacing,
    centeredSlides: centered,
    breakpoints: {
      600: {
        slidesPerView: previewSm,
        spaceBetween: 20,
        centeredSlides: false,
      },
      991: {
        slidesPerView: previewMd,
        spaceBetween: 20,
        centeredSlides: false,
      },

      1550: {
        slidesPerView: previewLg,
        spaceBetween: spacing,
      },
    },
  });
}
