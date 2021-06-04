//Post
function postSignIn() {
  const email = document.querySelector(".email").value;
  const pwd = document.querySelector(".password").value;
  (async () => {
    const rawResponse = await fetch("/login", {
      method: "POST",
      headers: {
        contentType: "application/json; charset=utf-8",
        dataType: "text",
      },
      body: JSON.stringify({ email: email, password: pwd }),
    });
    const content = await rawResponse.json();

    console.log(content);
  })();
}

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
