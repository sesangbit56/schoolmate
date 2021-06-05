const acoBtn = document.querySelector(".aco-click");
const acoContent = document.querySelector(".panel-container");
acoBtn.addEventListener("click", () => {
  if (acoContent.classList.contains("active")) {
    acoContent.classList.remove("active");
  } else {
    acoContent.classList.add("active");
  }
});
