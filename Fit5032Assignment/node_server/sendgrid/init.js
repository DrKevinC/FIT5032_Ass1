// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
import sendGridMail from '@sendgrid/mail'
import dotenv from 'dotenv'
import * as fs from 'fs';
dotenv.config()  // Attaches env variables to process object

console.log('Current directory:', process.cwd());

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY)

const pathToAttachment = `./node_server/sendgrid/attachments/CookingMama.png`;
const attachment = fs.readFileSync(pathToAttachment).toString("base64");

export async function sendWelcomeMessage(recipient) {
  const msg = {
    to: recipient,
    from: 'cheetah5i89@hotmail.com', // Change to your verified sender
    subject: 'Welcome to ElderConnect',
    text: `Welcome to ElderConnect!\n\nWe send warm regards from the thresholds of realms both seen and unseen, welcoming you to our sanctuary woven from the very fabric of the electromagnetic spectrum. It is our most solemn wish that the whispers of shared knowledge shall beckon you to traverse the dark corridors of this world and interface with likeminded peers to share in enlightenment.\n\nToday you stand at the precipice of enlightenment, and we foresee great things to come in your future.\n\nIf you did not use this email to create an account on ElderConnect,\nplease unsubscribe below.`,
    attachments: [
      {
          content: attachment, 
          filename: "attachment.png",
          type: "application/png",
          disposition: "attachment"
      }
  ]
  }
  sendGridMail.send(msg)
  .then(() => {
    console.log('Email sent to ', recipient)
    return true;
  })
  .catch((error) => {
    console.error(error)
    return false;
  })
}

export async function sendBulk(recipients, message){
  console.log(recipients)
  const msg = {
    to: "kcod0001@student.monash.edu", //
    cc: recipients,
    from: 'cheetah5i89@hotmail.com', // Change to your verified sender
    subject: 'Welcome to ElderConnect',
    text: message 
  }
  sendGridMail.send(msg)
  .then(() => {
    console.log('Bulk Email sent')
    return true;
  })
  .catch((error) => {
    console.error(error)
    return false;
  })
}