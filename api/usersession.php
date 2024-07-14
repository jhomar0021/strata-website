<?php
session_start();

// Check if session variables are set
if (isset($_SESSION['user_id']) && isset($_SESSION['username'])) {
    // Session is active; return user session data
    $response = [
        'success' => true,
        'message' => 'Session is active.',
        'data' => [
            'user_id' => $_SESSION['user_id'],
            'username' => $_SESSION['username'],
            'fname' => $_SESSION['fname'] ?? '',
            'lname' => $_SESSION['lname'] ?? '',
            'img_url' => $_SESSION['img_url'] ?? ''
        ]
    ];
} else {
    // Session is not active; return error message
    $response = [
        'success' => false,
        'message' => 'No active session found.'
    ];
}

// Set header to return JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
