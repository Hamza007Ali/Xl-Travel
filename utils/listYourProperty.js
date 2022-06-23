////////// FEATURE SECTION FUNCTIONALITY ///////////////
const readMoreTexts = document.querySelectorAll(`.read-more__text`);
const featureTextParas = document.querySelectorAll(`.feature-text__para`);

const featureTexts = [];

featureTextParas.forEach((para) => {
  featureTexts.push(para.textContent);

  para.textContent = para.textContent.substring(0, 160) + `...`;
});

readMoreTexts.forEach((text, index) => {
  text.addEventListener(`click`, (e) => {
    if (e.target.textContent.trim() === `Read More`) {
      e.target.previousElementSibling.textContent = featureTexts[index];
      e.target.textContent = `Read Less`;
    } else {
      e.target.previousElementSibling.textContent =
        featureTexts[index].substring(0, 150) + `...`;
      e.target.textContent = `Read More`;
    }
  });
});

////////// LISTING SECTION FUNCTIONALITY ///////////////
const triangleSign = document.querySelectorAll(
  `.listing-container__item-triangle`
);

triangleSign.forEach((sign) => {
  sign.addEventListener(`click`, showAdjacentContent);
});

function showAdjacentContent() {
  triangleSign.forEach((sign) => {
    if (!sign.nextElementSibling.children[1].classList.contains(`hidden`)) {
      sign.nextElementSibling.children[1].classList.add(`hidden`);
      sign.style.transform = `rotate(45deg) scale(1)`;
      sign.style.backgroundColor = `#40d0d3`;
      sign.nextElementSibling.children[0].style.color = `#fff`;
      sign.nextElementSibling.children[0].style.fontWeight = `500`;
    }
  });

  this.nextElementSibling.children[1].classList.remove(`hidden`);
  this.style.transform = `rotate(0) scale(1.3)`;
  this.style.backgroundColor = `#fec657`;
  this.nextElementSibling.children[0].style.color = `#fec657`;
  this.nextElementSibling.children[0].style.fontWeight = `600`;
}

/////////////// BANNER SECTION TYPING FUNCTIONALITY ////////////
window.addEventListener(`scroll`, () => {
  const text1 = document.querySelector(`#laptop-text1 span`);
  const text2 = document.querySelector(`#laptop-text2 span`);
  const text3 = document.querySelector(`#laptop-text3`);
  if (elementInViewport(text3)) {
    text1.style.animation = `typing 2s linear .3s forwards`;
    text2.style.animation = `typing 2s linear 2s forwards`;
    text3.style.animation = `showText 1s linear 4s forwards`;
  } else {
    text1.style.animation = `none`;
    text2.style.animation = `none`;
    text3.style.animation = `none`;
  }
});

/* FUNCTION RETURNS TRUE WHEN THE ELEMENT IS VISIBLE ON VIEWPORT AND VICE VERSA */
function elementInViewport(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;
  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }
  return (
    top < window.pageYOffset + window.innerHeight &&
    left < window.pageXOffset + window.innerWidth &&
    top + height > window.pageYOffset &&
    left + width > window.pageXOffset
  );
}
