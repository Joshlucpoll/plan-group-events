import type { VercelRequest, VercelResponse } from "@vercel/node";
import admin from "firebase-admin";
import dotenv from "dotenv";

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

  let id, name;
  try {
    id = request.query.id;
    name = request.query.name;
  } catch (error) {
    response.status(400).send("Could not parse params\n\n" + error);
    await app.delete();
    return;
  }

  const ref = db.ref(`/events/${id}/participants`);

  let newParticipants = [];

  const snap = await ref.get();
  if (snap.exists()) {
    const rawParticipants = snap.val();
    newParticipants = rawParticipants == false ? [] : rawParticipants;

    newParticipants.push(name);
    await ref.set(newParticipants);
    response.status(200).send(newParticipants);
  } else {
    response.status(404).send("Event not found");
  }
  await app.delete();
};
