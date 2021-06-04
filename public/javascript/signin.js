function asdf() {
  const email = document.querySelector(".email").value;
  console.log(email);
}

//Post
const loginBtn = document.querySelector(".login-button");

loginBtn.addEventListener("click", () => {
  const email = document.querySelector(".email").value;
  const pwd = document.querySelector(".password").value;
  console.log(email);
  console.log(pwd);
  var url = "/login";
  var data = { email: email, password: pwd };

  fetch(url, {
    method: "POST", // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      datatype: "text",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      if (JSON.stringify(response).login) {
        // localstorage, 리다이렉션
      }
    })
    .catch((error) => console.error("Error:", error));
});

//Dom event
const signUp = document.querySelector("#signUp");
const signIn = document.querySelector("#signIn");
const contentDom_signIn = document.querySelector(".signIn-visiable");
const contentDom_signUp = document.querySelector(".signUp-visiable");

signUp.addEventListener("click", () => {
  contentDom_signIn.style.display = "none";
  contentDom_signUp.style.display = "flex";
});

signIn.addEventListener("click", () => {
  contentDom_signUp.style.display = "none";
  contentDom_signIn.style.display = "flex";
});
