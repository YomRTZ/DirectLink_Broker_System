const express = require("express");
const axios = require("axios").default;
const cors = require("cors");
const fs = require('fs');
const path = require('path');
const { render } = require("ejs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4400;
const CHAPA_URL = "https://api.chapa.co/v1/transaction/initialize";
const CHAPA_AUTH = process.env.CHAPA_AUTH; 

console.log("Chapa API Key: ", CHAPA_AUTH);

app.use(express.json());
app.set("view engine", "ejs");

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:3001", 
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Req header with Chapa secret key
const config = {
  headers: {
    Authorization: `Bearer ${CHAPA_AUTH}`,
  },
};

// Store the last payment data
let lastPaymentData = null;


app.get("/", (req, res) => {
  res.render("index");
});


app.post("/api/pay", async (req, res) => {
  const CALLBACK_URL = "http://localhost:4400/api/verify-payment/";
  const RETURN_URL = "http://localhost:4400/api/payment-success";

  try {
    const { amount, email, first_name, last_name } = req.body;

    // 2% service charge
    const serviceCharge = amount * 0.02;
    const netAmount = amount - serviceCharge;

    // Unique transaction reference
    const TEXT_REF = `tx-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    console.log("TEXT_REF", TEXT_REF);

    // Data to send to Chapa API
    const data = {
      amount: netAmount.toString(),
      currency: "ETB",
      email,
      first_name,
      last_name,
      tx_ref: TEXT_REF,
      callback_url: CALLBACK_URL + TEXT_REF,
      return_url: RETURN_URL,
      customizations: {
        title: "Property Rent Payment",
        description: `Payment for rent with 2% service charge deducted. Net Amount: ${netAmount} ETB`,
      },
    };

    
    const response = await axios.post(CHAPA_URL, data, config);

    lastPaymentData = response.data.data; 

    console.log("Checkout URL:", lastPaymentData.checkout_url);
    res.json({ checkout_url: lastPaymentData.checkout_url }); 
  } catch (err) {
    console.error("Payment initialization failed:", err);
    res.status(500).send("Payment initialization failed.");
  }
});
app.get("/api/verify-payment/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${req.params.id}`,
      config
    );
    lastPaymentData = response.data.data; 
    console.log("Payment verified:", lastPaymentData.reference);
    res.render("success", { payment: lastPaymentData }); 
  } catch (err) {
    console.log("Payment verification failed:", err);
    res.status(500).send("Payment verification failed.");
  }
});

app.get("/api/payment-success", async (req, res) => {
  if (!lastPaymentData) {
    return res.status(400).send("No recent payment found.");
  }

  const receiptUrl = `https://checkout.chapa.co/checkout/test-payment-receipt/${lastPaymentData.reference}`;

  try {
    // Fetch the content of the receipt page (HTML or downloadable content)
    const response = await axios.get(receiptUrl, { responseType: 'arraybuffer' });

    // Optionally, save the response content to a file
    const filePath = path.join(__dirname, `receipt_${lastPaymentData.reference}.html`);
    fs.writeFileSync(filePath, response.data);

    // Send the file as a download
    res.download(filePath, (err) => {
      if (err) {
        console.error("Error sending download:", err);
        res.status(500).send("Error downloading receipt.");
      } else {
        // Optionally delete the file after it's downloaded
        fs.unlinkSync(filePath);
      }
    });
  } catch (error) {
    console.error("Error fetching receipt:", error);
    res.status(500).send("Error downloading receipt.");
  }
});
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
