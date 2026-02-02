"use strict"

const { SESClient, SendTemplatedEmailCommand } = require("@aws-sdk/client-ses")

const sesClient = new SESClient({})

module.exports.contactForm = async (event) => {
  let response = {
    statusCode: 500,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "OPTIONS,POST",
    },
    body: JSON.stringify({ success: false }),
  }

  // Handle CORS preflight (if API Gateway sends OPTIONS here)
  if (event?.httpMethod === "OPTIONS") {
    return { ...response, statusCode: 204, body: "" }
  }

  try {
    const data = JSON.parse(event.body || "{}")
    data.currentYear = new Date().getFullYear()

    await sendContactFormToDingoBytes(data)

    response = {
      ...response,
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    }
  } catch (err) {
    console.error(err)
    response = {
      ...response,
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: err?.message || "Unknown error",
      }),
    }
  }

  return response
}

async function sendContactFormToDingoBytes(data) {
  const toEmail = process.env.TO_EMAIL || ""
  const sourceEmail = process.env.SOURCE_EMAIL
  const replyToEmail = process.env.REPLY_TO_EMAIL
  const stage = process.env.STAGE

  if (!toEmail || !sourceEmail || !replyToEmail || !stage) {
    throw new Error("Missing required environment variables for SES templated email.")
  }

  const payload = {
    Destination: {
      ToAddresses: toEmail.split(",").map((s) => s.trim()).filter(Boolean),
    },
    Source: sourceEmail,
    Template: `dingobytes-contact_${stage}`,
    TemplateData: JSON.stringify(data),
    ReplyToAddresses: [replyToEmail],
  }
  console.log("sendContactFormToDingoBytes SendTemplatedEmailCommand payload:", payload)

  try {
    const command = new SendTemplatedEmailCommand(payload)
    await sesClient.send(command)
    console.log("SendTemplatedEmailCommand completed successfully:")
  } catch (err) {
    console.error(err)
  }

}
