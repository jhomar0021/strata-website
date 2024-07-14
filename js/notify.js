function ensureNotificationContainer() {
  let container = document.getElementById("extension-notification-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "extension-notification-container";
    document.body.appendChild(container);

    Object.assign(container.style, {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      zIndex: "10000", // Increased to ensure it's on top
      maxWidth: "300px",
      backgroundColor: "transparent", // Adding a background color to make it stand out
      padding: "10px", // Add some padding
      borderRadius: "5px", // Optional: rounded corners
      color: "white", // Text color
      textAlign: "center", // Center align text
      display: "block", // Ensure it is always a block element
    });
  }
  return container;
}

function notify(message) {
  console.log(" notify message", message);
  const container = ensureNotificationContainer();

  // Create the notification element
  const notificationElement = document.createElement("div");
  notificationElement.className =
    "alert alert-success alert-dismissible fade show";
  notificationElement.setAttribute("role", "alert");
  notificationElement.style.marginBottom = "10px";

  // Create a text node for the message to properly escape HTML special characters
  const messageTextNode = document.createTextNode(message);
  notificationElement.appendChild(messageTextNode);

  // Append the notification element to the container
  container.appendChild(notificationElement);
  setTimeout(function () {
    notificationElement.remove();
  }, 2000);
}
