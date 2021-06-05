function authorization() {
  const userToken = localStorage.getItem("sessionId");
  console.log(userToken);
  fetch("/login", {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      authorization: userToken,
    },
  }).then((res) => {
    console.log(res);
  });
}
