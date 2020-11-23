const functions = require('firebase-functions');
const dotenv = require('dotenv');
const uuid = require('uuid')

dotenv.config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.completePayment = functions.https.onRequest((request, response) => {
  stripe.charges.create({
      amount: request.body.amount,
      currency: request.body.currency,
      source: request.body.token
  })
  // eslint-disable-next-line promise/always-return
  .then(charge => {
      response.send(charge)
  })
  .catch(error => {
      console.log(error)
  })
});
