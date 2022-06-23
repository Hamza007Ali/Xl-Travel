const ratingReview = document.getElementById("rate-reviews");
const starsEl = document.querySelectorAll(`.star`);

console.log(starsEl);

starsEl.forEach((star, index) => {
  star.addEventListener(`click`, () => {
    switch (index) {
      case 0:
        ratingReview.textContent = `excellent`;
        break;
      case 1:
        ratingReview.textContent = `great`;
        break;
      case 2:
        ratingReview.textContent = `good`;
        break;
      case 3:
        ratingReview.textContent = `fair`;
        break;
      case 4:
        ratingReview.textContent = `poor`;
        break;
        default: return;
    }
  });
});
