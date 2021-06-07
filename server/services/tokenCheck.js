const jwt = require("jsonwebtoken");

exports.checkSessionId = function (sessionId, callbackFunc) {
  if (!sessionID) {
    console.log("   !!!!SessionId is empty!!!!");
    callbackFunc(0);
  } else {
    try {
      var decodedToken = jwt.verify(sessionId, "ang")["uid"];
      callbackFunc(decodedToken);
    } catch (e) {
      console.log(e);
      callbackFunc(0);
    }
  }
};
