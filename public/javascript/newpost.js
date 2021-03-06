const searchCategoryValue = () => {
  const category = document.getElementById("category");
  for (let i = 1; i < category.options.length; i++) {
    if (category.options[i].selected == true) {
      var categoryValue = category[i].text;
    }
  }
  return categoryValue;
};

const scanOther = () => {
  if (searchCategoryValue() === "직접 입력") {
    const otherValue = document.querySelector(".otherText").value;
    return otherValue;
  } else return searchCategoryValue();
};
const transportPostInfo = () => {
  const titleValue = document.getElementById("title-textcontent").value;
  const questionValue = document.getElementById("main-textcontent").value;
  const data = {
    title: titleValue,
    category: scanOther(),
    main_text: questionValue,
  };
  fetch("/qna/question", {
    method: "POST",
    body: JSON.stringify(data), //
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      datatype: "text",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      if (!response.post) {
        alert(response.err, response.err);
      } else if (response.post) {
        alert("글 올리기 성공 !");
        location.href = "/qna?search=&list=1";
      }
    });
};

const postBtn = document.querySelector(".postBtn");
postBtn.addEventListener("click", () => {
  transportPostInfo();
});

const categorySelect = document.getElementById("category");
categorySelect.addEventListener("change", () => {
  const otherText = document.querySelector(".otherText");
  if (searchCategoryValue() === "직접 입력") {
    otherText.classList.add("active");
  } else {
    otherText.classList.remove("active");
  }
});
