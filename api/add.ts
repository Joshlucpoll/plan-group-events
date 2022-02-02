import type { VercelRequest, VercelResponse } from "@vercel/node";
import admin from "firebase-admin";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

const stringCheckBool = (str: string) =>
  str == "true" || str == "false" ? str == "true" : str;

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

  const delApp = () => app.delete();
  const db = admin.database();

  try {
    const { title, description, datetime, location, participants } =
      request.query;

    const data = {
      title,
      description: stringCheckBool(description as string),
      datetime: parseInt(datetime as string),
      location: stringCheckBool(location as string),
      participants: (participants as string).split(","),
      created_at: Math.trunc(Date.now() / 1000),
      updated_at: Math.trunc(Date.now() / 1000),
    };
    const id = uuidv4();

    const ref = db.ref("/events/" + id);
    ref.set(data).then((outcome) => {
      response.status(201).send(id);
      delApp();
    });
  } catch (error) {
    response.status(400).send("Could not parse params");
    delApp();
  }
};
