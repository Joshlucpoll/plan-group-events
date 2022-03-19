import type { VercelRequest, VercelResponse } from "@vercel/node";
import admin from "firebase-admin";
import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

const authenticateToken = (token, id, email) => {
  if (
    !token.hasOwnProperty("email") ||
    !token.hasOwnProperty("expirationDate") ||
    !token.hasOwnProperty("id")
  )
    return false;
  else if (token.expirationDate < new Date()) return false;
  else if (token.id != id || token.email != email) return false;
  else return true;
};

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
    try {
      token = request.query.token;
    } catch {}
  } catch (error) {
    response.status(400).send("Could not parse params\n\n" + error);
    await app.delete();
    return;
  }

  let snap;
  try {
    const ref = db.ref("/events/" + id);
    snap = await ref.get();
  } catch (error) {
    response.status(400).send("Invalid id format");
    await app.delete();
    return;
  }

  const data = snap.val();
  const email = data.organiser_email;
  delete data.organiser_email;

  if (!data) response.status(404).send("Event not found");
  else if (data && token) {
    let decoded;
    try {
      decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);

      if (authenticateToken(decoded, id, email))
        response.status(207).send({ data, authenticated: false });
      else response.status(200).send({ data, authenticated: true });
    } catch {
      response.status(207).send({ data, authenticated: false });
    }
  } else response.status(200).send({ data, authenticated: false });

  await app.delete();
};
