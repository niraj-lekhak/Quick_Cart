/* eslint-disable quotes */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

const functions = require("firebase-functions");
const express = require("express");

const cors = require("cors");

// eslint-disable-next-line max-len
const stripe = require('stripe')('sk_test_51P6dauSEnkPmmCIHTwXZHsyKx1F7Cl5HRufmX2hbhspNmuniNRgUsnhKPTW3QMh3HBy5C1x9xaLSgS3b0MTWigsT00FE7vxmMI');

// API

// App config
const app = express();

// Middlewares
app.use(cors({origin: true}));
app.use(express.json());


// API Routes
app.get("/", (request, response) => response.status(200).send("hello world"));

// eslint-disable-next-line max-len
app.post("/payments/create", async (request, response) => {
  try {
    const total = request.query.total;
    console.log("Payment request received for amount:", total);

    if (!total) {
      return response.status(400).send({error: "Missing 'total' parameter."});
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // subunits of the currency
      currency: "usd",
    });

    // Ok created
    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    response.status(500).send({error: "Failed to process payment."});
  }
});

// Listen command
exports.api = functions.https.onRequest(app);


// Example end point
// http://127.0.0.1:5001/clone-c23c7/us-central1/api
