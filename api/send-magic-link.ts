import type { VercelRequest, VercelResponse } from "@vercel/node";
import admin from "firebase-admin";
import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";
import nodemailer from "nodemailer";
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

  rawHTML = rawHTML.replaceAll("{event_title}", title);
  rawHTML = rawHTML.replaceAll("{word_blend}", id.split("-").join("."));
  rawHTML = rawHTML.replaceAll("{id}", id);
  rawHTML = rawHTML.replaceAll("{token}", token);
  rawHTML = rawHTML.replaceAll(
    "{current_year}",
    new Date().getFullYear().toString()
  );

  return rawHTML;
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

  try {
    id = request.query.id;
  } catch (error) {
    response.status(400).send("Could not parse params\n\n" + error);
    await app.delete();
    return;
  }

  const ref = db.ref(`/events/${id}`);
  const snap = await ref.get();

  const val = snap.val();
  if (val.organiser_email) {
    // send email here
    const token = makeToken(val.organiser_email, id);

    const mailOptions = {
      from: '"pge no-reply" <no-reply@verify.plangroup.events>',
      to: val.organiser_email,
      subject: "Here's your magic link",
      html: emailTemplate({
        id,
        username: val.organiser,
        title: id,
        token,
      }),
    };

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 587,
      auth: {
        user: process.env.SES_SMTP_USER,
        pass: process.env.SES_SMTP_PASS,
      },
    });

    await transporter.sendMail(mailOptions, (error) => {
      if (error) response.status(500).send("Error sending email");
      else response.status(200).send(id);
    });
  } else response.status(404).send("Event not found");

  await app.delete();
};
