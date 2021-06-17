//newpost- login
const newQuesBoxBtn = document.querySelector(".newQuesBox");
newQuesBoxBtn.addEventListener("click", () => {
  const idCookie = document.cookie;
  if (idCookie) {
    location.href = "/qna/newpost";
  } else {
    alert("로그인을 해주세요");
    location.href = "/sign";
  }
});
