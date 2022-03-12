import type { VercelRequest, VercelResponse } from "@vercel/node";
import admin from "firebase-admin";
import dotenv from "dotenv";
const { readFileSync } = require("fs");
const { join } = require("path");

const stringCheckBool = (str: string) =>
  str == "true" || str == "false" ? str == "true" : str;

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
  var data;

  try {
    const {
      title,
      description,
      datetime,
      location,
      organiser,
      email,
      participants,
    } = request.query;

    data = {
      title,
      description: stringCheckBool(description as string),
      datetime: parseInt(datetime as string),
      location: stringCheckBool(location as string),
      organiser: organiser,
      organiser_email: stringCheckBool(email as string),
      participants:
        (participants as string) == "false"
          ? false
          : (participants as string).split(","),
      created_at: Math.trunc(Date.now() / 1000),
      updated_at: Math.trunc(Date.now() / 1000),
    };
  } catch (error) {
    response.status(400).send("Could not parse params\n\n" + error);
    await app.delete();
    return;
  }

  var id: string;
  var ref;

  const file = readFileSync(join(__dirname, "nouns.txt"), "utf8");
  const nouns = file.split("\n");
  while (true) {
    const getRanNoun = () => nouns[Math.floor(Math.random() * nouns.length)];
    const randomNouns = [getRanNoun(), getRanNoun(), getRanNoun()];

    id = randomNouns.join("-");

    ref = db.ref("/events/" + id);
    if (await ref.get().then((snap) => !snap.exists())) {
      break;
    }
  }

  await ref.set(data).then((outcome) => {
    response.status(201).send(id);
  });
  await app.delete();
};
