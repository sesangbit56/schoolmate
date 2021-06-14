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

// active answer wrap
const activeAnswerBtn = document.querySelector(".answerBtn");
let statusCheck = false;
activeAnswerBtn.addEventListener("click", () => {
  const answerWrap = document.querySelector(".answer-wrap");
  if (statusCheck === false) {
    answerWrap.classList.add("active");
    statusCheck = true;
  } else if (statusCheck === true) {
    answerWrap.classList.remove("active");
    statusCheck = false;
  }
});

// post_answer

const postAnswerBtn = document.querySelector(".postAnswerBtn");
postAnswerBtn.addEventListener("click", () => {
  transportAnswerInfo();
});

const transportAnswerInfo = () => {
  const answerValue = document.getElementById("answer-textcontent").value;
  const nameValue = document.getElementById("name").textContent;
  const qnaPid = document.URL.split("/")[5];
  const answerData = {
    main_text: answerValue,
    writer_id: nameValue,
    pointer: qnaPid,
  };
  fetch("/qna/detail/answer", {
    method: "POST",
    body: JSON.stringify(answerData), //
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      datatype: "text",
    },
  })
    .then((res) => res.json())
    .then((response) => {});
};

//CSR

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
};
