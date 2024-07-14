function logoutUser() {
  $.post(
    "/api/userlogout.php",
    function (data) {
      fetchSessionData();
      notify("Logging out...");
    }
  );
}

$("#logout").click(function () {
  notify("Logging out...");
  logoutUser();
});
