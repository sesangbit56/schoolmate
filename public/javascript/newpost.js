const postBtn = document.querySelector(".postBtn");
postBtn.addEventListener("click", () => {
  const category = document.getElementById("category");
  for (let i = 0; i < category.options.length; i++) {
    if (category.options[i].selected == true) {
      var categoryValue = category[i].text;
    }
  }
  const titleValue = document.getElementById("title-textcontent").value;
  const questionValue = document.getElementById("main-textcontent").value;
  const nameValue = document.getElementById("name").textContent;
  console.log(categoryValue, titleValue, questionValue, nameValue);
  const data = {
    title: titleValue,
    writer_id: nameValue,
    category: categoryValue,
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
        location.href = "/qna?list=1";
      }
    });
});
