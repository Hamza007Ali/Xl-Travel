// Slider Function
$("#recipeCarousel").carousel({
    interval: 10000,
  });
  
  $(".carousel .carousel-item").each(function () {
    var minPerSlide = 3;
    var next = $(this).next();
    if (!next.length) {
      next = $(this).siblings(":first");
    }
    next.children(":first-child").clone().appendTo($(this));
  
    for (var i = 0; i < minPerSlide; i++) {
      next = next.next();
      if (!next.length) {
        next = $(this).siblings(":first");
      }
  
      next.children(":first-child").clone().appendTo($(this));
    }
  });


// Collapse button toggle text
$(document).ready(function () {
  $('[data-toggle="collapse"]').click(function () {
    $(this).toggleClass("active");
    if ($(this).hasClass("active")) {
      $(this).text("Show Less");
    } else {
      $(this).text("Show All");      
      window.scrollTo(0, 1300);
    }
  });
});

//   Swiper 

$(document).ready(function () {
    // Swiper: Slider
    new Swiper(".swiper-container", {
      loop: true,
      nextButton: ".swiper-button-next",
      prevButton: ".swiper-button-prev",
      slidesPerView: 3,
      paginationClickable: true,
      spaceBetween: 20,
      breakpoints: {
        1920: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1028: {
          slidesPerView: 1.4,
          spaceBetween: 30,
        },
        480: {
          slidesPerView: 1.4,
          spaceBetween: 10,
        },
      },
    });
  });
  $(document).ready(function () {
    // Swiper: Slider
    new Swiper(".swiper-container-hero-section", {
      loop: true,
      nextButton: ".swiper-button-next",
      prevButton: ".swiper-button-prev",
      slidesPerView: 1,
      paginationClickable: true,
      spaceBetween: 0,
      breakpoints: {
        1920: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        1028: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        480: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
      },
    });
  });
  $(document).ready(function () {
    // Swiper: Slider
    new Swiper(".swiper-container-rooms", {
      loop: true,
      nextButton: ".swiper-button-next",
      prevButton: ".swiper-button-prev",
      slidesPerView: 3,
      paginationClickable: true,
      spaceBetween: 20,
      breakpoints: {
        1920: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1028: {
          slidesPerView: 2.5,
          spaceBetween: 30,
        },
        480: {
          slidesPerView: 2.5,
          spaceBetween: 10,
        },
      },
    });
  });

  // Gallery for mobile
let modalId = $('#image-gallery');

$(document)
  .ready(function () {

    loadGallery(true, 'a.thumbnail');

    //This function disables buttons when needed
    function disableButtons(counter_max, counter_current) {
      $('#show-previous-image, #show-next-image')
        .show();
      if (counter_max === counter_current) {
        $('#show-next-image')
          .hide();
      } else if (counter_current === 1) {
        $('#show-previous-image')
          .hide();
      }
    }

    /**
     *
     * @param setIDs        Sets IDs when DOM is loaded. If using a PHP counter, set to false.
     * @param setClickAttr  Sets the attribute for the click handler.
     */

    function loadGallery(setIDs, setClickAttr) {
      let current_image,
        selector,
        counter = 0;

      $('#show-next-image, #show-previous-image')
        .click(function () {
          if ($(this)
            .attr('id') === 'show-previous-image') {
            current_image--;
          } else {
            current_image++;
          }

          selector = $('[data-image-id="' + current_image + '"]');
          updateGallery(selector);
        });

      function updateGallery(selector) {
        let $sel = selector;
        current_image = $sel.data('image-id');
        $('#image-gallery-title')
          .text($sel.data('title'));
        $('#image-gallery-image')
          .attr('src', $sel.data('image'));
        disableButtons(counter, $sel.data('image-id'));
      }

      if (setIDs == true) {
        $('[data-image-id]')
          .each(function () {
            counter++;
            $(this)
              .attr('data-image-id', counter);
          });
      }
      $(setClickAttr)
        .on('click', function () {
          updateGallery($(this));
        });
    }
  });

// build key actions
$(document)
  .keydown(function (e) {
    switch (e.which) {
      case 37: // left
        if ((modalId.data('bs.modal') || {})._isShown && $('#show-previous-image').is(":visible")) {
          $('#show-previous-image')
            .click();
        }
        break;

      case 39: // right
        if ((modalId.data('bs.modal') || {})._isShown && $('#show-next-image').is(":visible")) {
          $('#show-next-image')
            .click();
        }
        break;

      default:
        return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  });

