<?php
require 'config.php';

// Retrieve JSON from the request body
$json = file_get_contents('php://input');
$data = json_decode($json, true); // Decode as an associative array

// Retrieve data from the decoded JSON
$unitId = $data['id'] ?? ''; // unit ID to identify the record to delete

// Assuming $mysqli is a mysqli object connected to your database

// Prepare statement to delete data from the units table
$query = "DELETE FROM units WHERE id = ?";
$stmt = $mysqli->prepare($query);

if ($stmt) {
    // Bind parameter for the marker
    $stmt->bind_param("i", $unitId);
    if ($stmt->execute()) {
        // Check if any rows were actually deleted
        if ($stmt->affected_rows > 0) {
            echo json_encode(['success' => 'unit deleted successfully']);
        } else {
            echo json_encode(['error' => 'No unit found with the given ID ' . $unitId]);
        }
    } else {
        // If execution fails
        echo json_encode(['error' => 'unit deletion failed: ' . $stmt->error]);
    }
    // Close statement
    $stmt->close();
} else {
    // If statement preparation fails
    echo json_encode(['error' => 'Error preparing statement: ' . $mysqli->error]);
}

// Close database connection
$mysqli->close();
