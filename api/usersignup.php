<?php

require 'config.php';
header('Content-Type: application/json');

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$response = [
    'success' => false,
    'message' => '',
    'data' => null
];

if (!$data) {
    $response['message'] = 'Invalid JSON';
    echo json_encode($response);
    exit;
}

$fname = $data['fname'] ?? '';
$lname = $data['lname'] ?? '';
$username = $data['username'] ?? '';
$password = $data['password'] ?? '';
$email = $data['email'] ?? '';

if (!$fname || !$lname || !$username || !$password || !$email) {
    $response['message'] = 'All fields are required';
    $response['data'] = $data; // Sending back the data might not be safe in all cases
    echo json_encode($response);
    exit;
}

$passwordHash = password_hash($password, PASSWORD_DEFAULT);

$query = "INSERT INTO users (fname, lname, username, password, email) VALUES (?, ?, ?, ?, ?)";

try {
    $stmt = $mysqli->prepare($query);

    if (!$stmt) {
        // Handle preparation errors
        throw new Exception("Error preparing statement: " . $mysqli->error);
    }

    $stmt->bind_param("sssss", $fname, $lname, $username, $passwordHash, $email);
    
    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = 'User registered successfully';
    } else {
        // This part may not be reached if an exception is thrown on execute()
        throw new Exception("Execution failed: " . $stmt->error);
    }

    $stmt->close();
} catch (mysqli_sql_exception $e) {
    // Catch duplicate entry exception
    if ($e->getCode() == 1062) {
        $response['message'] = 'Username or Email already exists.';
    } else {
        $response['message'] = 'An error occurred: ' . $e->getMessage();
    }
} catch (Exception $e) {
    // Catch any other exceptions
    $response['message'] = 'An error occurred: ' . $e->getMessage();
} finally {
    $mysqli->close();
}

echo json_encode($response);

?>
