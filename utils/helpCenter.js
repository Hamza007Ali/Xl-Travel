// Host fiter for Hepl Center Page
var iso = new Isotope(".filter-host", {
  itemSelector: ".element-item",
  layoutMode: "fitRows",
});

// filter functions
var filterFns = {
  // show if name ends with -ium
  ium: function (itemElem) {
    var name = itemElem.querySelector(".name").textContent;
    return name.match(/ium$/);
  },
};

// bind filter button click
var filtersElem = document.querySelector(".filters-button-group");
filtersElem.addEventListener("click", function (event) {
  // only work with buttons
  if (!matchesSelector(event.target, "button")) {
    return;
  }
  var filterValue = event.target.getAttribute("data-filter");
  // use matching filter function
  filterValue = filterFns[filterValue] || filterValue;
  iso.arrange({ filter: filterValue });
});

// change is-checked class on buttons
var buttonGroups = document.querySelectorAll(".button-group");
for (var i = 0, len = buttonGroups.length; i < len; i++) {
  var buttonGroup = buttonGroups[i];
  radioButtonGroup(buttonGroup);
}
function radioButtonGroup(buttonGroup) {
  buttonGroup.addEventListener("click", function (event) {
    // only work with buttons
    if (!matchesSelector(event.target, "button")) {
      return;
    }
    buttonGroup.querySelector(".is-checked").classList.remove("is-checked");
    event.target.classList.add("is-checked");
  });
}

// guest fiter for Hepl Center Page

// init Isotope
var isoGuest = new Isotope(".filter-guest", {
  itemSelector: ".element-item-guest",
  layoutMode: "fitRows",
});

// filter functions
var filterFnsGroup = {
  // show if name ends with -ium
  ium: function (itemElem) {
    var name = itemElem.querySelector(".name").textContent;
    return name.match(/ium$/);
  },
};

// bind filter button click
var filtersElemGuest = document.querySelector(".filters-button-group-guest");

filtersElemGuest.addEventListener("click", function (event) {
  // only work with buttons
  if (!matchesSelector(event.target, "button")) {
    return;
  }
  var filterValue = event.target.getAttribute("data-filter-guest");
  // use matching filter function
  filterValue = filterFnsGroup[filterValue] || filterValue;
  isoGuest.arrange({ filter: filterValue });
});

// change is-checked class on buttons
var buttonGroups = document.querySelectorAll(".button-group-guest");
for (var i = 0, len = buttonGroups.length; i < len; i++) {
  var buttonGroup = buttonGroups[i];
  radioButtonGroup(buttonGroup);
}
function radioButtonGroup(buttonGroup) {
  buttonGroup.addEventListener("click", function (event) {
    // only work with buttons
    if (!matchesSelector(event.target, "button")) {
      return;
    }
    buttonGroup.querySelector(".is-checked").classList.remove("is-checked");
    event.target.classList.add("is-checked");
  });
}

// Yellow button Add Class For Help Center Page
function addYellowBg(value) {
  var element = document.getElementById(value);
  element.classList.add("bg-yellow-no-border");
  window.scrollTo(0, 900);
}
function removeYellowBg(value) {
  var element = document.getElementById(value);
  element.classList.remove("bg-yellow-no-border");
}
