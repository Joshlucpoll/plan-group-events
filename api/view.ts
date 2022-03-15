import type { VercelRequest, VercelResponse } from "@vercel/node";
import admin from "firebase-admin";
import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

export default async (request: VercelRequest, response: VercelResponse) => {
  dotenv.config();
  const certs = JSON.parse(
    Buffer.from(process.env.GOOGLE_APPLICATION_CREDENTIALS, "base64").toString(
      "utf-8"
    )
  );

  const app = admin.initializeApp({
    credential: admin.credential.cert(certs),
    databaseURL: "https://plan-group-events-3fad0-default-rtdb.firebaseio.com",
  });

  const db = admin.database();

  let id;
  let token = null;

  try {
    id = request.query.id;
    if ("token" in request.query) {
      token = request.query.token;
    }
  } catch (error) {
    response.status(400).send("Could not parse params\n\n" + error);
    await app.delete();
    return;
  }

  const ref = db.ref("/events/" + id);
  const snap = await ref.get();

  const data = snap.val();
  const email = data.organiser_email;
  delete data.organiser_email;

  if (!data) response.status(404).send("Event not found");
  else if (data && token) {
    let decoded;
    // try {
    decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);

    if (
      !decoded.hasOwnProperty("email") ||
      !decoded.hasOwnProperty("expirationDate") ||
      !decoded.hasOwnProperty("id")
    )
      response.status(207).send({ data, authenticated: false });
    else if (decoded.expirationDate < new Date())
      response.status(207).send({ data, authenticated: false });
    else if (decoded.id != id || decoded.email != email)
      response.status(207).send({ data, authenticated: false });
    else response.status(200).send({ data, authenticated: true });
    // } catch {
    //   response.status(207).send({ data, authenticated: false });
    // }
  } else response.status(200).send({ data, authenticated: false });

  await app.delete();
};
