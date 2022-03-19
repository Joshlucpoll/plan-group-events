import type { VercelRequest, VercelResponse } from "@vercel/node";
import admin from "firebase-admin";
import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";
import nodemailer from "nodemailer";
import { serialize } from "cookie";
const { readFileSync } = require("fs");
const { join } = require("path");

const makeToken = (email: string, id: string) => {
  const expirationDate = new Date();
  expirationDate.setHours(new Date().getHours() + 1);
  return jsonwebtoken.sign(
    { email, id, expirationDate },
    process.env.JWT_SECRET_KEY
  );
};

const emailTemplate = ({ id, username, title, token }) => {
  let rawHTML: string = readFileSync(
    join(__dirname, "email_template_event_creation.html"),
    "utf8"
  );

  rawHTML = rawHTML.replace(/{event_title}/g, title);
  rawHTML = rawHTML.replace(/{word_blend}/g, id.split("-").join("."));
  rawHTML = rawHTML.replace(/{id}/g, id);
  rawHTML = rawHTML.replace(/{token}/g, token);
  rawHTML = rawHTML.replace(
    /{current_year}/g,
    new Date().getFullYear().toString()
  );

  return rawHTML;
};

const stringCheckBool = (str: string) =>
  str == "true" || str == "false" ? str == "true" : str;

const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
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
  var data;
  var token;

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

    let checkedEmail = stringCheckBool(email as string);
    if (checkedEmail) {
      checkedEmail = validateEmail(checkedEmail as string)
        ? checkedEmail
        : false;
    }

    data = {
      title,
      description: stringCheckBool(description as string),
      datetime: parseInt(datetime as string),
      location: stringCheckBool(location as string),
      organiser: organiser,
      organiser_email: checkedEmail,
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

  await ref.set(data);
  if (data.organiser_email) {
    // payload["token"] = makeToken(data.organiser_email, id);
    // send event creation email

    token = makeToken(data.organiser_email, id);

    const mailOptions = {
      from: '"pge no-reply" <no-reply@verify.plangroup.events>',
      to: data.organiser_email,
      subject: `${data.title} event has been created!`,
      html: emailTemplate({
        id,
        username: data.organiser,
        title: data.title,
        token,
      }),
    };

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 587,
      auth: {
        user: "hello@plangroup.events",
        pass: process.env.SES_SMTP_PASS,
      },
    });

    // should implement error contingency
    await transporter.sendMail(mailOptions, (error) => {});

    const cookie = serialize(id, token);
    response.setHeader("Set-Cookie", [cookie]);
  }

  response
    .status(201)
    .send({ id, email_active: data.organiser_email != false });

  await app.delete();
};
