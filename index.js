// server.js
const express = require('express');
const bodyParser = require('body-parser');
const SibApiV3Sdk = require('sib-api-v3-sdk');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 3001;

//middleware
app.use(bodyParser.json());

// Configure & API key
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = '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';

// Initialize API instance
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// Endpoint
app.post('/api/subscribe', async (req, res) => {
    const { name, email } = req.body;

    const sender = {
        email : "ashifmd9@gmail.com",
        name : "md ashif reza",
    }

    const receivers = [{
        email :  req.body.email
    }]

    try {
        const data = await apiInstance.sendTransacEmail({
            sender,
            to : receivers,
            subject : "Test Email Using Brevo APIs ",
            textContent : "Test Email",
        });
        res.status(200).json({ message: 'Subscription successful' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
