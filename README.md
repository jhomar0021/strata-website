# Strata Document Reader

## Table of Contents

1. [Introduction](#introduction)
2. [Technologies](#technologies)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Pages](#pages)
6. [Contributing](#contributing)
7. [License](#license)

## Introduction

The Strata Document Reader is a web application designed to help users read and analyze strata building bylaws and regulations. This tool extracts specific information about pets, rentals, smoking, BBQs, move-in/out procedures, noise and decorations, air conditioning, occupancy, and flooring from provided PDF documents.

## Technologies

- **Front End**: jQuery, HTML, CSS, Bootstrap
- **Back End**: PHP, Python
- **Hosting**: Cloudways

## Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/yourusername/strata-website.git
   cd strata-document-reader
   ```

2. **Set up your environment**:

   - Ensure you have PHP and Python installed on your server.
   - Set up your hosting environment on Cloudways.

3. **Configure the database**:

   - Set up your database and import the initial schema.
   - Update your configuration files to connect to your database.

4. **Install dependencies**:
   - For PHP, install necessary packages using Composer:
     ```sh
     composer install
     ```
   - For Python, install necessary packages using pip:
     ```sh
     pip install -r requirements.txt
     ```

## Usage

1. **Login Page**: Users need to log in to access the application.
2. **Report Listing Page**: Users can view all the reports they have created.
3. **Create Report Page**: Users can create a new report by inputting the address, unit number, and uploading the necessary documents.
4. **Report View Page**: Displays detailed data for a specific report.

## Pages

### Login Page

- Allows users to log in to the application using their credentials.

### Report Listing Page

- Lists all the reports created by the user.
- Users can view, edit, or delete reports from this page.

### Create Report Page

- Provides a form for users to input the address, unit number, and upload required documents.
- On submission, a new report is created and added to the report listing page.

### Report View Page

- Displays detailed information extracted from the uploaded documents for a specific report.

## Contributing

We welcome contributions from the community. If you wish to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## Support

For any queries or support, please contact [jhomar@oceanswelldigital.com](mailto:jhomar@oceanswelldigital.com).

---

Generated on 2024-07-14
