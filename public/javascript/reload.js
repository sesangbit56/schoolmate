$(document).ready(() => {
  fetch("/login", {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      authorization: localStorage.getItem("sessionId"),
    },
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.login) {
        // localstorage, 리다이렉션
        console.log(response);
        fetch("/signIn", {
          method: "POST",
          body: JSON.stringify(response),
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            datatype: "text",
          },
        });
        console.log("sucess");
      }
    });
});
