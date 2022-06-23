const activeBorder = (id) => {
  var id = document.getElementById(id);
  if (id.classList.contains("border-2", "border")) {
    id.classList.remove("border-2", "border");
    id.classList.add("border-blue");
    console.log("if");
  } else {
    id.classList.remove("border-blue");
    id.classList.add("border-2", "border");
    console.log("else");
  }
};

const selectAllCicle = () => {
  active = document.querySelectorAll(".active");
  let bool = [];

  active.forEach((el) => {
    if (el.classList.contains("border-2", "border")) {
      bool.push(true);
    }
  });

  if (bool.includes(true)) {
    active.forEach((el) => {
      el.classList.remove("border-2", "border");
      el.classList.add("border-blue");
    });
  } else {
    active.forEach((el) => {
      el.classList.add("border-2", "border");
      el.classList.remove("border-blue");
    });
  }
};
