$("#login").on("submit", function (e) {
  e.preventDefault();
  console.log("Login button clicked");
  loginUser();
});
$("#signup").on("submit", function (e) {
  e.preventDefault();
  console.log("Signup button clicked");
  registerUser();
});
function checkSessionStatus() {
  console.log("Checking session status...");
  $.get(
    "api/usersession.php",
    function (data) {
      console.log(data.message);
      if (data.success) {
        window.location.href = "/user/reports/index.html";
        console.log("Session active: ", data.sessionData.username);
        // Optionally display more session info
      } else {
        console.log("Session not active");
        notify("Session not active");
      }
    }
  );
}

function loginUser() {
  let username = $("#username").val();
  let password = $("#password").val();
  console.log(username, password);
  $.ajax({
    url: "api/userlogin.php",
    type: "POST",
    contentType: "application/json", // Set the content type to application/json
    data: JSON.stringify({
      username: username,
      password: password,
    }),
    dataType: "json",
    success: function (data) {
      if (data.success) {
        console.log("Login successful");
        notify("Login successful"); // Replace with your notification function or use alert
        window.location.href = "/user/reports/index.html";
      } else if (data.error) {
        console.log("Login failed: " + data.error);
        notify("Login failed: " + data.error); // Replace with your notification function or use alert
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Request failed: " + textStatus + ", " + errorThrown);
      notify("An error occurred during the login process. Please try again."); // Replace with your notification function or use alert
    },
  });
}

checkSessionStatus();
