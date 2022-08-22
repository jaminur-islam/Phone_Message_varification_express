const express = require("express");
const app = express();
require("dotenv").config();
const client = require("twilio")(process.env.accountSid, process.env.authToken);

app.post("/login", async (req, res) => {
  client.verify
    .services(process.env.VERIFY_SERVICE_SID)
    .verifications.create({
      // from: "Softenin",
      to: `+88${req.query.phoneNumber}`,
      // custom_friendly_name: "klwebco",
      channel: req.query.method,
    })
    .then((verification) => res.send(verification))
    .catch((e) => {
      res.status(500).send(e);
    });
});

app.post("/verify", async (req, res) => {
  client.verify
    .services(process.env.VERIFY_SERVICE_SID)
    .verificationChecks.create({
      to: `+88${req.query.phoneNumber}`,
      code: req.query.code,
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "OTP NOT RIGHT" });
    });
});

app.listen(3000, (port) => {
  console.log("http://localhost:3000");
});

//https://www.twilio.com/blog/verify-sms-express
//https://github.com/TwilioDevEd/verify-v2-quickstart-node/blob/next/routes/verify.js
//https://github.com/TwilioDevEd/verify-v2-quickstart-node/blob/next/routes/verify.js
