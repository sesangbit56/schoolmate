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

const searchData = decodeURI(document.URL.split("=")[1].split("&")[0]);
searchInput.value = searchData;

// newpost location event
const connectPostBtn = document.querySelector(".newQna-box");
connectPostBtn.addEventListener("click", () => {
  const idCookie = document.cookie;
  if (idCookie) {
    location.href = "/qna/newpost";
  } else {
    alert("로그인을 해주세요");
    location.href = "/sign";
  }
});
