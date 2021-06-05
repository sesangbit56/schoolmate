//login Post
const loginBtn = document.querySelector(".login-button");

loginBtn.addEventListener("click", () => {
  const email = document.querySelector(".email").value;
  const pwd = document.querySelector(".password").value;
  const url = "/login";
  const data = { email: email, password: pwd };
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data), //
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      datatype: "text",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response.login);
      if (response.login) {
        // localstorage, 리다이렉션
        console.log("sucess");
        localStorage.setItem("sessionId", response.token);
      } else {
        console.log("fail");
      }
    })
    .catch((error) => console.error("Error:", error));
});

//signup Post
const signUpBtn = document.querySelector(".signUp-button");

signUpBtn.addEventListener("click", () => {
  const email = document.querySelector(".signUpEmail").value;
  const pwd = document.querySelector(".signUpPassword").value;
  const name = document.querySelector(".name").value;
  const age = document.querySelector(".age").value;
  const url = "/register";
  const data = { email: email, password: pwd, name: name, age: age };
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data), //
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      datatype: "text",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(JSON.stringify(response));
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
