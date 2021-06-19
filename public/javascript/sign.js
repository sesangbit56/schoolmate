//login Post

const transportLoginInfo = () => {
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
      if (response.login) {
        location.href = "/";
      } else {
        alert("가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.");
      }
    })
    .catch((error) => console.error("Error:", error));
};

const emailInput = document.querySelector(".email");
const pwdInput = document.querySelector(".password");

emailInput,
  pwdInput.addEventListener("keyup", () => {
    if (window.event.keyCode == 13) {
      transportLoginInfo();
    }
  });
const loginBtn = document.querySelector(".login-button");
loginBtn.addEventListener("click", () => {
  transportLoginInfo();
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
      if (response.register) {
        alert("회원가입 성공 !");
        location.href = "/sign";
      } else if (!response.register) {
        alert("제대로 된 값을 입력해주세요 !");
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
