import type { VercelRequest, VercelResponse } from "@vercel/node";
import admin from "firebase-admin";
import dotenv from "dotenv";

export default (request: VercelRequest, response: VercelResponse) => {
  dotenv.config();
  const certs = JSON.parse(
    Buffer.from(process.env.GOOGLE_APPLICATION_CREDENTIALS, "base64").toString(
      "utf-8"
    )
  );

  const app = admin.initializeApp({
    credential: admin.credential.cert(certs),
    databaseURL:
      "https://plan-group-events-default-rtdb.europe-west1.firebasedatabase.app",
  });

  const db = admin.database();

  const { id } = request.query;

  const delApp = () => app.delete();

  const ref = db.ref("/events/" + id);
  ref.once("value", function (snap) {
    const val = snap.val();
    if (val) {
      response.status(200).send(val);
      delApp();
    } else {
      response.status(404).send("Event not found");
      delApp();
    }
  });
};
