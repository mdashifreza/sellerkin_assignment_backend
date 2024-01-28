// server.js
const express = require('express');
const bodyParser = require('body-parser');
const SibApiV3Sdk = require('sib-api-v3-sdk');
const cors = require('cors');
const app = express();
app.use(cors());
require("dotenv").config();
const port = process.env.PORT || 3001;

//middleware
app.use(bodyParser.json());

// Configure & API key
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY;

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
        email : email,
        name : name,
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
app.get("/", (req, res)=>{
    res.json({endpoint : "https://sellerkin-assignment-backend.vercel.app/"})
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
