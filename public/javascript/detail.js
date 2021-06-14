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
  const qnaPid = document.URL.split("/")[5];
  const answerData = {
    main_text: answerValue,
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
    .then((response) => {
      if (response.post) {
        location.href = `/qna/detail/${qnaPid}`;
      } else {
        console.log("답변 달기에 실패하였습니다");
      }
    });
};

//CSR
// question api
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
    inputQuestionData(response);
  });

const questionTextDom = document.querySelector(".questionText");
const questionTextareaDom = document.querySelector(".questionDetailTextarea");
const writer_idDom = document.getElementById("writer_id");
const timestampDom = document.getElementById("timestamp");
let inputQuestionData = (dataObj) => {
  const timestamp = dataObj.timestamp;
  const timestampDate = timestamp.split("T")[0];
  const timestampTime = timestamp.split("T")[1].split(".")[0];

  questionTextDom.innerText = dataObj.title;
  questionTextareaDom.innerText = dataObj.main_text;
  writer_idDom.innerText = dataObj.writer_id;
  timestampDom.innerText = `${timestampDate},  ${timestampTime}`;
};

// answer api
fetch(`/qna/detail/answer/${qnaPid}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    datatype: "text",
  },
})
  .then((res) => res.json())
  .then((response) => {
    console.log(response);
    inputAnswerData(response);
  });

const answerTextDom = document.getElementsByClassName("answerTextContent");
const answerWriterIdDom = document.getElementsByClassName("answerWriterId");
const answerTimestampDom = document.getElementsByClassName("answerTimestamp");

let inputAnswerData = (dataObj) => {
  for (let i = 0; i < dataObj.msg.length; i++) {
    const timestamp = new Array();
    const timestampDate = new Array();
    const timestampTime = new Array();
    timestamp[i] = dataObj.msg[i].timestamp;
    timestampDate[i] = timestamp[i].split("T")[0];
    timestampTime[i] = timestamp[i].split("T")[1].split(".")[0];
    answerTextDom[i].innerText = dataObj.msg[i].main_text;
    answerWriterIdDom[i].innerText = dataObj.msg[i].writer_id;
    answerTimestampDom[
      i
    ].innerText = `${timestampDate[i]},  ${timestampTime[i]}`;
  }
};
