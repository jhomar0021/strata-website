function loginUser() {
  let username = $("#username").val();
  let password = $("#password").val();
  console.log(username, password);
  $.post(
    "api/userlogin.php",
    {
      username: username,
      password: password,
    },
    function (data) {
      alert(data.message); // Adjust based on your actual JSON response
      if (data.success) {
        notify("Login successful");
        window.location.href = "../user/reports/index.html";
        // Optionally redirect or update UI
      }
    },
    "json"
  );
}
