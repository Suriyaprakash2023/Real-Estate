/**
 * Parallax
 * Content box
 * Counter
 * Sidebar Toggle
 * Lightbox
 * Preloader
 * Show Pass
 * Button Quantity
 * Input file
 * Delete image
 * Handle Search Form
 * Datepicker
 * One Page
 * Handle dashboard
 * Go Top
 * Cursor
 */

(function ($) {
  "use strict";

  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };

  /* Parallax
  -------------------------------------------------------------------------------------*/
  var parallax = function () {
    if ($().parallax && isMobile.any() == null) {
      $(".parallax").parallax("50%", 0.2);
    }
  };
  /* Content box
  -------------------------------------------------------------------------------------*/
  var flatContentBox = function () {
    $(window).on("load resize", function () {
      var mode = "desktop";
      if (matchMedia("only screen and (max-width: 1199px)").matches)
        mode = "mobile";
      $(".themesflat-content-box").each(function () {
        var margin = $(this).data("margin");
        if (margin) {
          if (mode === "desktop") {
            $(this).attr("style", "margin:" + $(this).data("margin"));
          } else if (mode === "mobile") {
            $(this).attr("style", "margin:" + $(this).data("mobilemargin"));
          }
        }
      });
    });
  };
  /* Counter
  -------------------------------------------------------------------------------------*/
  var flatCounter = function () {
    if ($(document.body).hasClass("counter-scroll")) {
      var a = 0;
      $(window).scroll(function () {
        var oTop = $(".tf-counter").offset().top - window.innerHeight;
        if (a === 0 && $(window).scrollTop() > oTop) {
          if ($().countTo) {
            $(".tf-counter")
              .find(".number")
              .each(function () {
                var to = $(this).data("to"),
                  speed = $(this).data("speed"),
                  dec = $(this).data("dec");
                $(this).countTo({
                  to: to,
                  speed: speed,
                  decimals: dec,
                });
              });
          }
          a = 1;
        }
      });
    }
  };

  new WOW().init();

  /* Sidebar Toggle 
  -------------------------------------------------------------------------------------*/
  var sidebarToggle = function () {
    var args = { duration: 500 };

    $(".btn-show-advanced").click(function () {
      $(this).parent(".inner-filter").find(".wd-amenities").slideDown(args);
      $(".inner-filter").addClass("active");
    });
    $(".btn-hide-advanced").click(function () {
      $(this).parent(".inner-filter").find(".wd-amenities").slideUp(args);
      $(".inner-filter").removeClass("active");
    });

    $(".btn-show-advanced-mb").click(function () {
      $(this)
        .parent(".inner-filter")
        .find(".wd-show-filter-mb")
        .slideToggle(args);
    });
  };
  /* Lightbox
  -------------------------------------------------------------------------------------*/
  var popUpLightBox = function () {
    if ($(".lightbox-image").length) {
      $(".lightbox-image").fancybox({
        openEffect: "fade",
        closeEffect: "fade",
        helpers: {
          media: {},
        },
      });
    }
  };
  /* Preloader
  -------------------------------------------------------------------------------------*/
  var preloader = function () {
    setTimeout(function () {
      $(".preload").fadeOut("slow", function () {
        $(this).remove();
      });
    }, 200);
  };

  /* Show Pass
  -------------------------------------------------------------------------------------*/
  var showPass = function () {
    $(".show-pass").on("click", function () {
      $(this).toggleClass("active");
      if ($(".password-field").attr("type") == "password") {
        $(".password-field").attr("type", "text");
      } else if ($(".password-field").attr("type") == "text") {
        $(".password-field").attr("type", "password");
      }
    });

    $(".show-pass2").on("click", function () {
      $(this).toggleClass("active");
      if ($(".password-field2").attr("type") == "password") {
        $(".password-field2").attr("type", "text");
      } else if ($(".password-field2").attr("type") == "text") {
        $(".password-field2").attr("type", "password");
      }
    });
    $(".show-pass3").on("click", function () {
      $(this).toggleClass("active");
      if ($(".password-field3").attr("type") == "password") {
        $(".password-field3").attr("type", "text");
      } else if ($(".password-field3").attr("type") == "text") {
        $(".password-field3").attr("type", "password");
      }
    });
  };
  /* Button Quantity
  -------------------------------------------------------------------------------------*/
  var btnQuantity = function () {
    $(".minus-btn").on("click", function (e) {
      e.preventDefault();
      var $this = $(this);
      var $input = $this.closest("div").find("input");
      var value = parseInt($input.val());

      if (value > 0) {
        value = value - 1;
      }

      $input.val(value);
    });

    $(".plus-btn").on("click", function (e) {
      e.preventDefault();
      var $this = $(this);
      var $input = $this.closest("div").find("input");
      var value = parseInt($input.val());

      if (value > -1) {
        value = value + 1;
      }

      $input.val(value);
    });
  };

  /* Input file 
  -------------------------------------------------------------------------------------*/
  var flcustominput = function () {
    $("input[type=file]").change(function (e) {
      $(this)
        .parents(".uploadfile")
        .find(".file-name")
        .text(e.target.files[0].name);
    });
  };

  /* Delete image 
  -------------------------------------------------------------------------------------*/
  var delete_img = function (e) {
    $(".remove-file").on("click", function (e) {
      e.preventDefault();
      var $this = $(this);
      $this.closest(".file-delete").remove();
    });
  };
  /* Handle Search Form   
  -------------------------------------------------------------------------------------*/
  var clickSearchForm = function () {
    const widgetSearchForm = $(".wd-search-form");
    if (widgetSearchForm.length) {
      $(".pull-right").on("click", function () {
        widgetSearchForm.toggleClass("show");
      });
      $(document).on(
        "click.pull-right, click.offcanvas-backdrop",
        function (a) {
          if (
            $(a.target).closest(".pull-right, .wd-search-form").length === 0
          ) {
            widgetSearchForm.removeClass("show");
          }
        }
      );
    }
  };
  /* Datepicker  
  -------------------------------------------------------------------------------------*/
  var datePicker = function () {
    if ($("#datepicker1").length > 0) {
      $("#datepicker1").datepicker({
        firstDay: 1,
        dateFormat: "dd/mm/yy",
      });
    }
    if ($("#datepicker2").length > 0) {
      $("#datepicker2").datepicker({
        firstDay: 1,
        dateFormat: "dd/mm/yy",
      });
    }
    if ($("#datepicker3").length > 0) {
      $("#datepicker3").datepicker({
        firstDay: 1,
        dateFormat: "dd/mm/yy",
      });
    }
    if ($("#datepicker4").length > 0) {
      $("#datepicker4").datepicker({
        firstDay: 1,
        dateFormat: "dd/mm/yy",
      });
    }
  };

  /* One Page 
  -------------------------------------------------------------------------------------*/
  var onepageSingle = function () {
    if ($(".cate-single-tab").length) {
      var top_offset = $(".main-header").height() - 10;
      $(".cate-single-tab").onePageNav({
        currentClass: "active",
        scrollOffset: top_offset,
      });
    }
  };

  /* Handle dashboard
  -------------------------------------------------------------------------------------*/
  var showHideDashboard = function () {
    $(".button-show-hide").on("click", function () {
      $(".layout-wrap").toggleClass("full-width");
    });
    $(".mobile-nav-toggler,.overlay-dashboard").on("click", function () {
      $(".layout-wrap").removeClass("full-width");
    });
  };

  /* Go Top
  -------------------------------------------------------------------------------------*/
  var goTop = function () {
    if ($("div").hasClass("progress-wrap")) {
      var progressPath = document.querySelector(".progress-wrap path");
      var pathLength = progressPath.getTotalLength();
      progressPath.style.transition = progressPath.style.WebkitTransition =
        "none";
      progressPath.style.strokeDasharray = pathLength + " " + pathLength;
      progressPath.style.strokeDashoffset = pathLength;
      progressPath.getBoundingClientRect();
      progressPath.style.transition = progressPath.style.WebkitTransition =
        "stroke-dashoffset 10ms linear";
      var updateprogress = function () {
        var scroll = $(window).scrollTop();
        var height = $(document).height() - $(window).height();
        var progress = pathLength - (scroll * pathLength) / height;
        progressPath.style.strokeDashoffset = progress;
      };
      updateprogress();
      $(window).scroll(updateprogress);
      var offset = 200;
      var duration = 550;
      jQuery(window).on("scroll", function () {
        if (jQuery(this).scrollTop() > offset) {
          jQuery(".progress-wrap").addClass("active-progress");
        } else {
          jQuery(".progress-wrap").removeClass("active-progress");
        }
      });
      jQuery(".progress-wrap").on("click", function (event) {
        event.preventDefault();
        jQuery("html, body").animate({ scrollTop: 0 }, duration);
        return false;
      });
    }
  };

  /* Cursor
  -------------------------------------------------------------------------*/
  var cursor = function () {
    var myCursor = jQuery(".tf-mouse");
    if (myCursor.length) {
      if ($("body")) {
        const e = document.querySelector(".tf-mouse-inner"),
          t = document.querySelector(".tf-mouse-outer");
        let n,
          i = 0,
          o = !1;

        (window.onmousemove = function (s) {
          o ||
            (t.style.transform =
              "translate(" + s.clientX + "px, " + s.clientY + "px)"),
            (e.style.transform =
              "translate(" + s.clientX + "px, " + s.clientY + "px)"),
            (n = s.clientY),
            (i = s.clientX);
        }),
          (e.style.visibility = "visible"),
          (t.style.visibility = "visible");
      }
    }
  };

  // Dom Ready
  $(function () {
    flatContentBox();
    popUpLightBox();
    parallax();
    flatCounter();
    flcustominput();
    btnQuantity();
    delete_img();
    clickSearchForm();
    sidebarToggle();
    onepageSingle();
    showHideDashboard();
    goTop();
    showPass();
    datePicker();
    preloader();
    // cursor();
  });
})(jQuery);
