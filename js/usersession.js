let username = "";
let fname = "";
let lname = "";
let imgUrl = "";
let userId ; // Assuming you want to capture the image URL as well

function fetchSessionData() {
  $.ajax({
    url: "/api/usersession.php", // Set the correct path to your API
    type: "GET", // Assuming the request is a GET request
    dataType: "json", // Expecting JSON response
    success: function (response) {
      if (response.success) {
        // Session is active, handle success case here
        console.log("Session Active: ", response.message);
        console.log("User Data: ", response.data);
        userId = response.data.user_id; // Corrected from 'id' to 'user_id'
        username = response.data.username;
        fname = response.data.fname;
        lname = response.data.lname;
        imgUrl = response.data.img_url; // Capturing the image URL
      } else {
        // Session is not active, handle accordingly
        console.log("No Active Session: ", response.message);
        window.location.href = "../index.html"; // Redirects to the home page
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      // An error occurred with the request, handle failure case here
      console.log("AJAX Error: ", textStatus, errorThrown);
      // window.location.href = "../index.html";
    },
  });
}

fetchSessionData();
