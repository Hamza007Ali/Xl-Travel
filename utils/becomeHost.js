let currentSelected = null;
let currentChildSelected = null;
function onRadioCheckChange(element, isChild = false) {
  const currentId = element.dataset.id;
  if (currentSelected && !isChild) {
    document.getElementById(currentSelected).style.display = "none";
  } else if (isChild) {
    if (currentId === "" && currentChildSelected)
      document.getElementById(currentChildSelected).style.display = "none";

    if (currentChildSelected) {
      document.getElementById(currentChildSelected).style.display = "none";
    }
    if (element.checked && currentId) {
      currentChildSelected = currentId;
      document.getElementById(currentId).style.display = "block";
    }
    return;
  }

  if (element.checked) {
    currentSelected = currentId;
    document.getElementById(currentId).style.display = "block";
  }
}

function topFunction(event) {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

//   Upload Image functions

function readURLFront(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $("#fronSide").css("background-image", "url(" + e.target.result + ")");
      $("#fronSide").hide();
      $("#fronSide").fadeIn(650);
    };
    reader.readAsDataURL(input.files[0]);
  }
}
$("#frontUpload").change(function () {
  readURLFront(this);
});
function readURLBack(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $("#backSide").css("background-image", "url(" + e.target.result + ")");
      $("#backSide").hide();
      $("#backSide").fadeIn(650);
    };
    reader.readAsDataURL(input.files[0]);
  }
}
$("#backUpload").change(function () {
  readURLBack(this);
});
function readURLChange(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $("#changeImage").css("background-image", "url(" + e.target.result + ")");
      $("#changeImage").hide();
      $("#changeImage").fadeIn(650);
    };
    reader.readAsDataURL(input.files[0]);
  }
}
$("#changeImageButton").change(function () {
  readURLChange(this);
});
function readURLSelfie(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $("#uploadSelife").css(
        "background-image",
        "url(" + e.target.result + ")"
      );
      $("#uploadSelife").hide();
      $("#uploadSelife").fadeIn(650);
    };
    reader.readAsDataURL(input.files[0]);
  }
}
$("#uploadSelifeButton").change(function () {
  readURLSelfie(this);
});

// Verify number Form
function getCodeBoxElement(index) {
  return document.getElementById("codeBox" + index);
}
function onKeyUpEvent(index, event) {
  const eventCode = event.which || event.keyCode;
  if (getCodeBoxElement(index).value.length === 1) {
    if (index !== 4) {
      getCodeBoxElement(index + 1).focus();
    } else {
      getCodeBoxElement(index).blur();
      console.log("submit code ");
    }
  }
  if (eventCode === 8 && index !== 1) {
    getCodeBoxElement(index - 1).focus();
  }
}
function onFocusEvent(index) {
  for (item = 1; item < index; item++) {
    const currentElement = getCodeBoxElement(item);
    if (!currentElement.value) {
      currentElement.focus();
      break;
    }
  }
}

//   Mobile Number with country code

var telInput = $("#phone , #whatsAppNumber , #officeNumber"),
  errorMsg = $("#error-msg"),
  validMsg = $("#valid-msg");

// initialise plugin
telInput.intlTelInput({
  allowExtensions: true,
  formatOnDisplay: true,
  autoFormat: true,
  autoHideDialCode: true,
  autoPlaceholder: true,
  defaultCountry: "auto",
  ipinfoToken: "yolo",

  nationalMode: false,
  numberType: "MOBILE",
  //onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
  preferredCountries: ["sa", "ae", "qa", "om", "bh", "kw", "ma"],
  preventInvalidNumbers: true,
  separateDialCode: true,
  initialCountry: "auto",
  geoIpLookup: function (callback) {
    $.get("http://ipinfo.io", function () {}, "jsonp").always(function (resp) {
      var countryCode = resp && resp.country ? resp.country : "";
      callback(countryCode);
    });
  },
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.9/js/utils.js",
});

var reset = function () {
  telInput.removeClass("error");
  errorMsg.addClass("hide");
  validMsg.addClass("hide");
};

// on blur: validate
telInput.blur(function () {
  reset();
  if ($.trim(telInput.val())) {
    if (telInput.intlTelInput("isValidNumber")) {
      validMsg.removeClass("hide");
    } else {
      telInput.addClass("error");
      errorMsg.removeClass("hide");
    }
  }
});

// on keyup / change flag: reset
telInput.on("keyup change", reset);

// Ouside Click Verify Number
document.addEventListener("mouseup", function (e) {
  var VerifyOtp = document.getElementById("verify-otp-form");
  if (VerifyOtp && !VerifyOtp.contains(e.target)) {
    document.getElementById("verify-number").style.display = "none";
  }
});

// verify Number OTP
let verifyOtpForm = document.getElementById("verify-otp-form");

verifyOtpForm.addEventListener("submit", (event) => {
  event.preventDefault();
  document.getElementById("verify-number").style.display = "none";
});

//////// ASK FOR PROPERTY POPUP FUNCTIONALITY //////////////////
const askForPropertyModal = document.getElementById(`ask-for-property`);

askForPropertyModal.addEventListener(`click`, (e) => {
  if (e.target === askForPropertyModal) {
    askForPropertyModal.style.display = `none`;
  }
});
