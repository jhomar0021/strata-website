function registerUser() {
  let fname = $("#rfname").val();
  let lname = $("#rlname").val();
  let username = $("#rusername").val();
  let password = $("#rpassword").val();
  let email = $("#remail").val();
  let password2 = $("#rpassword2").val();

  // Log this right before the AJAX call for debugging purposes
  console.log({
    fname: fname,
    lname: lname,
    username: username,
    password: password,
    email: email,
  });

  // Check if passwords match before proceeding
  if (password !== password2) {
    notify("Passwords do not match.");
    return;
  }

  // AJAX call to the server to register the user
  $.ajax({
    type: "POST",
    url: "https://phpstack-1205376-4454355.cloudwaysapps.com/api/register.php", // Ensure this URL is correct based on your project structure
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify({
      fname: fname,
      lname: lname,
      username: username,
      password: password,
      email: email,
    }),
    success: function (response) {
      // Check the success flag in the response
      if (response.success) {
        // Notify the user of success
        notify("Success: " + response.message);
        // Optionally redirect the user or perform other actions on success
      } else {
        // Notify the user of the error message returned from the server
        notify("Error: " + response.message);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      // Handle AJAX errors
      notify("error: " + textStatus + " - " + errorThrown);
    },
  });

  // Reset form fields after the AJAX call
  $("#rfname").val("");
  $("#rlname").val("");
  $("#rusername").val("");
  $("#rpassword").val("");
  $("#rpassword2").val("");
  $("#remail").val("");
}
