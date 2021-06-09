//Dom event
const acoBtn = document.querySelector(".aco-click");
const acoContent = document.querySelector(".panel-container");
acoBtn.addEventListener("click", () => {
  if (acoContent.classList.contains("active")) {
    acoContent.classList.remove("active");
  } else {
    acoContent.classList.add("active");
  }
});

//logout
const logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click", () => {
  fetch("/logout", {
    method: "GET",

    headers: {
      "Content-Type": "application/json; charset=utf-8",
      datatype: "text",
    },
  })
    .then((res) => {
      res.json();
    })
    .then((response) => {
      console.log(response);
      location.href = "/";
    });
});
