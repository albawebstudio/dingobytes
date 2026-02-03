"use strict"

const { SES } = require("@aws-sdk/client-ses");
const sesClient = new SES({
    // The key apiVersion is no longer supported in v3, and can be removed.
    // @deprecated The client uses the "latest" apiVersion.
    apiVersion: "2010-12-01",
})

module.exports.contactForm = async (event) => {
    let data
    try {
        data = JSON.parse(event.body || "{}")
    } catch (err) {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({
                success: false,
                message: "Invalid JSON body",
            }),
        }
    }

    const response = {
        statusCode: 500,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
    }

    try {
        await sendContactFormToDingobytes(data)

        response.statusCode = 200
        response.body = JSON.stringify({ success: true })
    } catch (err) {
        console.error(err)
        response.body = JSON.stringify({
            success: false,
            message: err?.message ?? "Unknown error",
        })
    }

    return response
}

const sendContactFormToDingobytes = async (data) => {
    await sesClient.sendTemplatedEmail({
        Destination: {
            ToAddresses: process.env.TO_EMAIL.split(","),
        },
        Source: process.env.SOURCE_EMAIL,
        Template: `dingobytes-contact_${process.env.STAGE}`,
        TemplateData: JSON.stringify(data),
        ReplyToAddresses: [data.email ?? process.env.REPLY_TO_EMAIL],
    })

    console.log("sendContactFormToDingobytes email queued")
}
