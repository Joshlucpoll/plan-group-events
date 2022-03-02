import type { VercelRequest, VercelResponse } from "@vercel/node";
import admin from "firebase-admin";
import dotenv from "dotenv";
import { readFileSync } from "fs";

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
    databaseURL:
      "https://plan-group-events-default-rtdb.europe-west1.firebasedatabase.app",
  });

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

    // const id = uuidv4();
    var id: string;
    var ref;
    while (true) {
      const file = readFileSync("./nouns.txt", "utf-8");
      const nouns = file.split("\n");
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
  } catch (error) {
    response.status(400).send("Could not parse params");
  }
  await app.delete();
};
