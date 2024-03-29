const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 4000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: false }));

// Function to generate a random alphanumeric string
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Route for generating a random transaction code
app.get('/generate-transaction-code', (req, res) => {
    const transactionCode = generateRandomString(10); // Generate a random 10-character alphanumeric string

    // Write the transaction code to a file
    fs.writeFile('public/transaction-code.html', transactionCode, (err) => {
        if (err) {
            console.error('Error writing transaction code to file:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json({ code: transactionCode }); // Send the transaction code as JSON response
        }
    });
});

// Route for serving HTML files
app.get('/:page', (req, res) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, 'public', `${page}.html`);
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Error accessing HTML file:', err);
            res.status(404).send('Page not found');
        } else {
            res.sendFile(filePath);
        }
    });
});

// Route for serving the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for handling form submission
app.post('/submit-order', (req, res) => {
    // Extract data from the request body
    const screenshot = req.body.screenshot;
    const transactionCode = req.body.transactionCode;
    const affiliateLink = req.body.affiliateLink;
    const name = req.body.name;

    // Add logic to handle the submitted data (e.g., save to database)

    // Redirect to another HTML page
    res.redirect('order-submitted.html');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
