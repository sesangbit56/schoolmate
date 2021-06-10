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

const answerBtn = document.querySelector(".answerBtn");
answerBtn.addEventListener("click", () => {});

const qnaPid = document.URL.split("/")[5];
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

const questionTextDom = document.querySelector(".questionText");
const questionTextareaDom = document.querySelector(".questionDetailTextarea");
const writer_idDom = document.getElementById("writer_id");
const timestampDom = document.getElementById("timestamp");
let inputData = (dataObj) => {
  const timestamp = dataObj.timestamp;
  const timestampDate = timestamp.split("T")[0];
  const timestampTime = timestamp.split("T")[1].split(".")[0];

  questionTextDom.innerText = dataObj.title;
  questionTextareaDom.innerText = dataObj.main_text;
  writer_idDom.innerText = dataObj.writer_id;
  timestampDom.innerText = `${timestampDate},  ${timestampTime}`;
  console.log(dataObj);
};
