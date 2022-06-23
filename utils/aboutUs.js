const itemsContent = document.querySelectorAll(`.item-content`);
const listItem = document.querySelectorAll(`.list-item`);

listItem.forEach((item, index) => {
  item.addEventListener(`click`, (e) => {
    listItem.forEach((item) => {
      item.style.color = `#fff`;
    });

    e.target.style.color = `#40d0d3`;
    itemsContent.forEach((content) => {
      if (!content.classList.contains(`d-sm-none`)) {
        content.classList.add(`d-sm-none`);
      }
    });

    itemsContent[index].classList.remove(`d-sm-none`);
  });
});

/////////// TYPING ANIMATION ///////////////////
const aboutUsTitle = document.getElementById(`about-us_title`);

let i = 0;
let text = `Welcome To Xl Travel`;

function typing() {
  if (i < text.length) {
    aboutUsTitle.textContent += text.charAt(i);
    i++;
    setTimeout(typing, 80);
  }
}

typing();
