<?php

require "config.php";

$json = file_get_contents('php://input');
$data = json_decode($json, true); // Decode as an associative array

// Log the raw JSON data for debugging
error_log("Received JSON: " . $json);

// Check for JSON decoding errors
if (json_last_error() !== JSON_ERROR_NONE) {
    error_log("JSON Decode Error: " . json_last_error_msg());
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

// Retrieve results from the decoded JSON
$results = $data['results'] ?? [];

// Prepare the SQL statement for inserting data into the contents table
$query = "INSERT INTO contents (category, content, unitId) VALUES (?, ?, ?)";
$stmt = $mysqli->prepare($query);

if ($stmt) {
    foreach ($results as $result) {
        $category = $result['category'];
        $content = $result['content'];
        $unitId = $result['unitId'];

        $stmt->bind_param("ssi", $category, $content, $unitId);
        if (!$stmt->execute()) {
            error_log('MySQL execute error: ' . $stmt->error);
            echo json_encode(['error' => 'Failed to save data', 'sql_error' => $stmt->error]);
            $stmt->close();
            $mysqli->close();
            exit;
        }
    }
    $stmt->close();
    echo json_encode(['success' => 'Data saved successfully']);
} else {
    error_log('MySQL prepare error: ' . $mysqli->error);
    echo json_encode(['error' => 'Error preparing statement', 'sql_error' => $mysqli->error]);
}

$mysqli->close();
?>