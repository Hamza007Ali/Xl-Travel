// Aos Animation
AOS.init();

// Increment Decrement Function
function increment(value) {
  document.getElementById(value).stepUp();
}
function decrement(value) {
  document.getElementById(value).stepDown();
}

// Auto Complete suggesstion for country name

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp &&
    inp.addEventListener("input", function (e) {
      var a,
        b,
        i,
        val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) {
        return false;
      }
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b &&
            b.addEventListener("click", function (e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
              closeAllLists();
            });
          a.appendChild(b);
        }
      }
    });
  /*execute a function presses a key on the keyboard:*/
  inp &&
    inp.addEventListener("keydown", function (e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) {
        //up
        /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
    });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}
/*An array containing all the country names in the world:*/
var countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua & Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia & Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Central Arfrican Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cuba",
  "Curacao",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauro",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre & Miquelon",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "St Kitts & Nevis",
  "St Lucia",
  "St Vincent",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Trinidad & Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks & Caicos",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), countries);
autocomplete(document.getElementById("myInputMobile"), countries);

// Save Location function
function summation() {
  var locationInput = document.getElementById("myInput").value;
  document.getElementById("filter-location").value = locationInput;
  // console.log("INNERHTML" , locationInput)
}

// Sticky price header
$(window).scroll(function () {
  if ($(this).scrollTop() > 1150) {
    $("#sticky-header").addClass("header-show");
  } else {
    $("#sticky-header").removeClass("header-show");
  }
});
// SearchBar Open OnCLick
function ShowSearchBar() {
  document.getElementById("search-bar-inner-elements").style.display = "block";
  document.getElementById("search-box-inner").style.width = "60%";
  document.getElementById("search-box-inner").style.backgroundColor = "#f8f8f8";
  document.getElementById("search-text-property-detail").style.display = "none";
}
//searchBar Close
document.addEventListener("mouseup", function (e) {
  var searchBarArea = document.getElementById("search-box-inner");
  if (searchBarArea && !searchBarArea.contains(e.target)) {
    document.getElementById("search-bar-inner-elements").style.display = "none";
    document.getElementById("search-text-property-detail").style.display =
      "block";
    document.getElementById("search-box-inner").style.width = "20%";
  }
});

// Data Block Hide Toggle common function
function displayToggle(value) {
  var element = document.getElementById(value);
  element.classList.toggle("display-block");
}
function closeDropDownFilter(value) {
  let facilitesModal = document.getElementById(value);
  facilitesModal.classList.remove("display-block");
}

// Display Block and none function
function displayBlock(value) {
  document.getElementById(value).style.display = "block";
}
function displayNone(value) {
  document.getElementById(value).style.display = "none";
}
//  Toggle Yellow color class
function toggleClassBg(value) {
  var element = document.getElementById(value);
  element.classList.toggle("bg-yellow-focus");
}

// Ouside Click Form
document.addEventListener("mouseup", function (e) {
  var loginFormArea = document.getElementById("login-form-inner");
  var SignUpForm = document.getElementById("signup-form-inner");
  if (loginFormArea && !loginFormArea.contains(e.target)) {
    document.getElementById("login-form").style.display = "none";
  }
  if (SignUpForm && !SignUpForm.contains(e.target)) {
    document.getElementById("signup-form").style.display = "none";
  }
});

//////////// LOING SIGNUP FORM FUNCIONALITY /////////////////////

/////// setting day and date
const formDate = document.getElementById(`form_date`);
const formDay = document.getElementById(`form_day`);

// formDate.textContent = new Date().toLocaleDateString(`pt-PT`);
formDate.textContent = new Date().toLocaleDateString();
formDay.textContent = new Date().toLocaleDateString(`en-US`, {
  weekday: `long`,
});

///////// switching between SIGN UP and LOGIN forms
const loginSignupBtn = document.querySelectorAll(`.login-signup_btn`);
const loginSignupForm = document.getElementById(`login_signup-form`);
const formHeading = document.getElementById(`login-signup_form-heading`);
const firstNameEl = document.getElementById(`first_name`);
const lastNameEl = document.getElementById(`last_name`);
const passwordEl = document.getElementById(`login_password`);
const formBtn = document.getElementById(`form_btn`);
const formLinks = document.getElementById(`form_links`);
const createAccountLink = document.getElementById(`create-account_link`);
const forgetPasswordLink = document.getElementById(`forget-password_link`);
const socialLoginLinks = document.getElementById(`social-login_links`);
const socialLoginTitle = document.getElementById(`social-login_title`);
const formLine = document.getElementById(`form_line`);
const alreadySignBtn = document.getElementById(`already_sign-btn`);
const loginPolicyText = document.getElementById(`login-policy`);

createAccountLink.addEventListener(`click`, () => {
  formHeading.textContent = `Sign Up`;
  firstNameEl.classList.remove(`d-none`);
  lastNameEl.classList.remove(`d-none`);
  passwordEl.classList.add(`d-none`);
  formBtn.textContent = `Sign Up`;
  formLinks.classList.add(`d-none`);
  socialLoginTitle.textContent = `or Sign Up With`;
  formLine.classList.remove(`d-none`);
  alreadySignBtn.classList.remove(`d-none`);
  loginPolicyText.classList.add(`d-none`);
});

alreadySignBtn.addEventListener(`click`, () => {
  formHeading.textContent = `Sign In`;
  firstNameEl.classList.add(`d-none`);
  lastNameEl.classList.add(`d-none`);
  passwordEl.classList.remove(`d-none`);
  formBtn.textContent = `Sign In`;
  formLinks.classList.remove(`d-none`);
  socialLoginTitle.textContent = `or Sign In With`;
  formLine.classList.add(`d-none`);
  alreadySignBtn.classList.add(`d-none`);
  loginPolicyText.classList.remove(`d-none`);
});

loginSignupBtn.forEach((btn) => {
  btn.addEventListener(`click`, () => {
    loginSignupForm.style.opacity = `1`;
    loginSignupForm.style.pointerEvents = `all`;
  });
});

loginSignupForm.addEventListener(`click`, (e) => {
  if (e.target === loginSignupForm) {
    loginSignupForm.style.opacity = `0`;
    loginSignupForm.style.pointerEvents = `none`;
  }
});
