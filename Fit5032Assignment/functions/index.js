/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});
// const logger = require("firebase-functions/logger");


admin.initializeApp();
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.isAdmin = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const userEmail = req.query.email;
      if (!userEmail) {
        res.status(400).send("User Email is required.");
        return;
      }
      const userCollection=admin.firestore().collection("Users").doc(userEmail);
      const snapshot = await userCollection.get();
      if (!snapshot.exists) {
        res.status(404).send("User not found");
        return;
      }
      const isAdmin = snapshot.data().isAdmin;
      res.status(200).send({isAdmin});
    } catch (error) {
      console.error("Error checking Admin Status: ", error.message);
      res.status(500).send("Error checking Admin Status");
    }
  });
});
