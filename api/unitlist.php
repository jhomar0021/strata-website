<?php
require 'config.php';

// Retrieve JSON from the request body
$json = file_get_contents('php://input');
$data = json_decode($json, true); // Decode as an associative array

// Retrieve data from the decoded JSON
$userId = $data['userId'] ?? ''; // Get userId from the JSON payload

// Check for required userId field
if (!$userId) {
    echo json_encode(['error' => 'userId is required']);
    exit;
}

// Assuming $mysqli is already created and connected to your database

// Prepare statement to select data from units table where userId matches
$query = "SELECT * FROM units WHERE userId = ? ORDER BY id DESC"; // Query to select units
$stmt = $mysqli->prepare($query);

if ($stmt) {
    // Bind userId parameter
    $stmt->bind_param("i", $userId); // Assuming userId is an integer. Use "s" if it's a string.

    // Execute query
    if ($stmt->execute()) {
        // Get the result of the query
        $result = $stmt->get_result();

        // Fetch all units as an associative array
        $units = $result->fetch_all(MYSQLI_ASSOC);

        // Check if units were found
        if ($units) {
            echo json_encode(['success' => 'units retrieved successfully', 'units' => $units]);
        } else {
            echo json_encode(['error' => 'No units found for the provided userId']);
        }
    } else {
        // If execution fails
        echo json_encode(['error' => 'Failed to retrieve units']);
    }

    // Close statement
    $stmt->close();
} else {
    // If statement preparation fails
    echo json_encode(['error' => 'Error preparing statement']);
}

// Close database connection
$mysqli->close();
?>