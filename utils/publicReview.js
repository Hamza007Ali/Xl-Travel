var popup = document.getElementById("popup");
// var scroll =
function showModal() {
  if (popup.classList.contains("d-none")) {
    popup.classList.remove("d-none");
    document.body.style.overflow = "hidden";
    active[i].classList.add("display-block");
  }
}
function hideModal() {
  popup.classList.add("d-none");
  document.body.style.overflow = "visible";
}
