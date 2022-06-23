// Search Button Box show and hide functions
$(document).scroll(function () {
  searchHeader = document.getElementById("header-search-mobile");
  myID = document.getElementById("search-button-mobile-view");

  var myScrollFunc = function () {
    var y = window.scrollY;
    if (y >= 300) {
      myID.className = "search-mobile-index hide";
      searchHeader.className = "header-search-mobile show";
    } else {
      myID.className = "search-mobile-index show";
      searchHeader.className = "header-search-mobile hide";
    }
  };

  window.addEventListener("scroll", myScrollFunc);
});

// Typing Animation
$(document).ready(function () {
  $(".title").lettering();
  $(".button").lettering();
});

$(document).ready(function () {
  animation();
}, 100);
function animation() {
  var title1 = new TimelineMax();
  title1.to(".button", 0, { visibility: "hidden", opacity: 0 });
  title1.staggerFromTo(
    ".title span",
    0.5,
    { ease: Back.easeOut.config(1.7), opacity: 0, bottom: -80 },
    { ease: Back.easeOut.config(1.7), opacity: 1, bottom: 0 },
    0.05
  );
}

// Swiper*********************
const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  autoHeight: false,
  centeredSlides: true,
  slidesPerView: 1,
  // Responsive breakpoints
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  /*scrollbar: {
    el: '.swiper-scrollbar',
  },*/
});

// Carousel swipe fuction for mobile
$(".carousel").on("touchstart", function (event) {
  const xClick = event.originalEvent.touches[0].pageX;
  $(this).one("touchmove", function (event) {
    const xMove = event.originalEvent.touches[0].pageX;
    const sensitivityInPx = 5;

    if (Math.floor(xClick - xMove) > sensitivityInPx) {
      $(this).carousel("next");
    } else if (Math.floor(xClick - xMove) < -sensitivityInPx) {
      $(this).carousel("prev");
    }
  });
  $(this).on("touchend", function () {
    $(this).off("touchmove");
  });
});

// Header Place Holder Animation
// your custome placeholder goes here!
var ph = "Hey! Where do you want to go?",
  searchBar = $("#hero-search-mobile"),
  // placeholder loop counter
  phCount = 0;

// function to return random number between
// with min/max range
function randDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function printLetter(string, el) {
  var arr = string.split(""),
    input = el,
    origString = string,
    curPlace = $(input).attr("placeholder"),
    placeholder = curPlace + arr[phCount];

  setTimeout(function () {
    $(input).attr("placeholder", placeholder);
    phCount++;
    if (phCount < arr.length) {
      printLetter(origString, input);
    }
  }, randDelay(50, 90));
}

// function to init animation
function placeholder() {
  $(searchBar).attr("placeholder", "");
  printLetter(ph, searchBar);
}
placeholder();
