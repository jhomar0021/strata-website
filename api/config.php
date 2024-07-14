<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

// Function to check if the script is running on a local development server

// Production settings
define('DB_HOST', 'localhost');
define('DB_USER', 'eksfjbwydr');
define('DB_PASSWORD', 'QKDcTbM4Rn');
define('DB_NAME', 'eksfjbwydr');


// Create a connection to the MySQL database
$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

// Check the connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}
