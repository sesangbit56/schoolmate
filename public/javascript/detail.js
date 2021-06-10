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

const qnaPid = document.URL.split("/")[5];

const answerBtn = document.querySelector(".answerBtn");
answerBtn.addEventListener("click", () => {
  const data = {
    pid: qnaPid,
  };
  fetch("/qna/detail/api", {
    method: "POST",
    body: JSON.stringify(data), //
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      datatype: "text",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      inputData(response);
    });
});

let inputData = (dataObj) => {
  console.log(dataObj);
};
