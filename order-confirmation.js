// Function to fetch the transaction code from the file
async function fetchTransactionCode() {
    try {
        const response = await fetch('transaction-code.html');
        const data = await response.text();
        return data;
    } catch (error) {
        console.error('Error fetching transaction code:', error);
        return 'Error fetching transaction code';
    }
}

// Function to update the transaction code in the HTML
async function updateTransactionCode() {
    const transactionCode = await fetchTransactionCode();
    document.getElementById('transaction-code').innerText = transactionCode;
}

// Function to go back in the browser's history
function goBack() {
    window.history.back();
}

// Function to proceed to the next step
function nextStep() {
    // Add logic to handle the next step
    // For now, let's navigate to the submit-payment page
    window.location.href = 'order-submission.html';
}

// Call the updateTransactionCode function when the page loads
updateTransactionCode();
