let gapiClient;

// Start QuaggaJS Barcode Scanner
function startScanner() {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#scanner'),
            constraints: {
                facingMode: "environment" // Use the back camera on mobile
            }
        },
        decoder: {
            readers: ["code_128_reader", "ean_reader", "ean_13_reader", "upc_reader"]
        }
    }, function(err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Scanner initialized!");
        Quagga.start();
    });

    // Event listener when a barcode is detected
    Quagga.onDetected(function(result) {
        const barcode = result.codeResult.code;
        alert("Barcode Detected: " + barcode);
        saveToGoogleDrive(barcode);
    });
}

// Google Sign-In Authentication
function signIn() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: 'YOUR_GOOGLE_API_KEY',        // Replace with your actual API Key
        clientId: '58163441407-0s8gjui40g0l8ip4rv0n2vv5uinsdr4n.apps.googleusercontent.com', // Use your client ID
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
        scope: 'https://www.googleapis.com/auth/drive.file'
    }).then(function () {
        gapi.auth2.getAuthInstance().signIn().then(function () {
            console.log("Signed in to Google!");
        });
    });
}

// Sign out from Google
function signOut() {
    gapi.auth2.getAuthInstance().signOut().then(function () {
        console.log("Signed out!");
    });
}

// Save barcode data to Google Drive
function saveToGoogleDrive(barcode) {
    const fileContent = `Barcode Data: ${barcode}`;  // Text content of the file
    const file = new Blob([fileContent], {type: 'text/plain'});

    const metadata = {
        name: 'barcode-data.txt',  // Name of the file
        mimeType: 'text/plain'
    };

    const accessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;

    const formData = new FormData();
    formData.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
    formData.append('file', file);

    fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: new Headers({'Authorization': 'Bearer ' + accessToken}),
        body: formData
    }).then(response => response.json())
      .then(data => console.log('File uploaded to Google Drive: ', data))
      .catch(error => console.error('Error uploading file: ', error));
}
