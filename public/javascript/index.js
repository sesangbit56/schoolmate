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

const mainNavContentList = document.getElementsByClassName("main-nav-contents");
let checkarray = new Array();
for (let i = 0; i < 4; i++) {
  mainNavContentList[i].addEventListener("click", () => {
    checkarray[i] = i;
    const mainNav = document.querySelector(".main-nav");
    mainNav.classList.add("selected");
    mainNavContentList[i].classList.add("selected");
    localStorage.setItem("checkNav", checkarray[i]);
  });
}
for (let i = 0; i < 4; i++) {
  if (localStorage.getItem("checkNav") == i) {
    const mainNav = document.querySelector(".main-nav");
    mainNav.classList.add("selected");
    mainNavContentList[i].classList.add("selected");
  }
}
console.log(localStorage.getItem("checkNav"));

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
    profile.classList.remove("active");
  }
});

//search event
const transportSerachInfo = () => {
  const inputValue = document.querySelector(".searchTerm").value;
  location.href = `/qna?search=${inputValue}&list=1`;
};
const searchInput = document.querySelector(".searchTerm");
searchInput.addEventListener("keyup", () => {
  if (window.event.keyCode == 13) {
    transportSerachInfo();
  }
});

const searchBtn = document.querySelector(".searchButton");
searchBtn.addEventListener("click", () => {
  transportSerachInfo();
});
