//Dom event
const acoBtn = document.querySelector(".aco-click");
const acoContent = document.querySelector(".panel-container");
const profile = document.querySelector(".profile-container");
acoBtn.addEventListener("click", () => {
  if (acoContent.classList.contains("active")) {
    acoContent.classList.remove("active");
    profile.classList.remove("active");
  } else {
    acoContent.classList.add("active");
    profile.classList.add("active");
  }
});

//logout
const logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click", () => {
  let result = confirm("정말 로그아웃 하시겠습니까?");
  if (result === true) {
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
  } else {
    acoContent.classList.remove("active");
  }
});
