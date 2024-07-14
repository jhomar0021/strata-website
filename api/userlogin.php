<?php
session_start();
require 'config.php';

// Retrieve JSON from the request body and decode it
$json = file_get_contents('php://input');
$data = json_decode($json, true);

$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

if (!$username || !$password) {
    echo json_encode(['error' => 'Username and password are required']);
    exit;
}

$query = "SELECT id, fname, lname, password FROM users WHERE username = ?";
$stmt = $mysqli->prepare($query);

if ($stmt) {
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user && password_verify($password, $user['password'])) {
        // Set session variables
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $username;
        $_SESSION['fname'] = $user['fname'];
        $_SESSION['lname'] = $user['lname'];
        $_SESSION['email'] = $user['email'];
        // $_SESSION['img_url'] = $user['img_url'];

        echo json_encode([
            'success' => 'Logged in successfully',
            'user' => [
                'id' => $user['id'],
                'fname' => $user['fname'],
                'lname' => $user['lname'],
                'email' => $user['email'],
                'username' => $username
                // 'img_url' => $user['img_url']
            ]
        ]);
    } else {
        echo json_encode(['error' => 'Invalid username or password']);
    }
    $stmt->close();
} else {
    echo json_encode(['error' => 'Error preparing statement']);
}
$mysqli->close();
?>
