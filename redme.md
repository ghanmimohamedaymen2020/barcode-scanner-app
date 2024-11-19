# Barcode Scanner App with Google Drive Integration

This web app scans barcodes using your device's camera and uploads the scanned barcode data to Google Drive as a text file.

## Features
- Scans barcodes using the device camera.
- Uploads barcode data to Google Drive.
- Requires Google OAuth2.0 authentication.

## Setup Instructions

1. **Create a Google Project and Enable Drive API:**
    - Go to the [Google Developer Console](https://console.developers.google.com/).
    - Create a new project.
    - Enable the **Google Drive API**.
    - Set up **OAuth 2.0 credentials** (choose Web Application).
    - Download your **client_id** and **API key**.

2. **Add Your Credentials:**
    - Replace `YOUR_GOOGLE_API_KEY` and `YOUR_GOOGLE_CLIENT_ID` in the `script.js` file with your actual credentials.

3. **Running the Web App:**
    - Simply open `index.html` in a web browser.
    - Press the "Start Scanner" button to start scanning barcodes.
    - Sign in with your Google account to upload scanned data to Google Drive.

4. **Permissions:**
    - The app will request permission to access your Google Drive during the sign-in process.
    - Make sure to grant the necessary permissions.

5. **Styling:**
    - You can customize the `style.css` file to change the appearance of the app.

## Troubleshooting

- Ensure that you have properly enabled the Drive API in your Google Developer Console.
- If you encounter authentication issues, check that your `client_id` and `api_key` are correctly placed in the `script.js` file.
