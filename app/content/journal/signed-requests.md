---
title: Generating a Signed Request
description: Secure your API like an ancient empire with signed requests, using HMAC "digital seals" to ensure every message is authentic and untampered. This guide shows you how to ditch vulnerable API keys for a more "badass" security handshake in Nuxt.js and Node.js.
last_updated_at: 2026-03-29T14:56:00
categories: 
  - node
  - vue
  - nuxt
changeFreq: never
backgroundImage: /img/code/signed-request.jpg
---

Signed requests aren't exactly the new kid on the block—frameworks like Laravel have been rocking them for years. 
But if you’re building secure APIs, they are the undisputed heavyweight champions of "Trust but Verify."

Think of a signed request like a **wax seal on an Emperor’s decree**. 
The contents aren't hidden (that’s encryption’s job), but the seal proves two things:

1. The decree hasn't been tampered with by a sneaky messenger.
2. It definitely came from the **Emperor** (and not some rebel with a stolen quill).

### The 3 Pillars of Trust

To keep your data safe, signed requests rely on three core concepts:

* **Who are you? (Authentication):** Since only you and the server know the "Secret Key," the server can be sure the request is actually from you.
* **What did you say? (Integrity):** If a "Man-in-the-Middle" intercepts your request and tries to change a `price` from **$10** to **$100**, the signature breaks. The server will see the math doesn't add up and hit the "Reject" button.
* **When did you say it? (Non-Replay):** By tagging the request with a timestamp, you ensure a hacker can't "record" a valid request and "replay" it an hour later to double-charge a user.

### The Secret Handshake: How It Works

Instead of sending your secret key over the internet (which is like leaving your palace keys in the door lock), you use the key to perform a "digital handshake."

| Step | Persona | Action |
| :--- | :--- | :--- |
| **1. The Bundle** | **Sender** | Grab your data (e.g., `{ "id": 123 }`) and the current time. |
| **2. The Math** | **Sender** | Run that bundle through an **HMAC algorithm** using your Secret Key. This spits out a long string of gibberish called the **Signature**. |
| **3. The Send** | **Network** | Ship the data, the timestamp, and the signature to the server. |
| **4. The Test** | **Receiver** | The server takes your data and performs the **exact same math** using its copy of the Secret Key. |
| **5. The Match** | **Receiver** | If the server’s calculated gibberish matches *your* gibberish, we’re in business! |

### Why not just use a regular API Key?

Great question! 
If you send a standard `API_KEY` in a header, anyone "sniffing" the traffic can steal it and use it forever. 
It’s like a permanent hall pass.

With a **Signed Request**, the key itself never touches the wire. 
You’re sending a one-time-use proof that you *possess* the key without ever actually showing it. 
It’s significantly more badass.

> ⚠️ **The JSON Trap:** In Node.js, watch out for "Object jitter." If the sender sends `{ "a": 1, "b": 2 }` but the receiver sees `{ "b": 2, "a": 1 }`, the signature will fail. Even a single extra space will break the hash!

### Let’s Look at the Code 💻

Here’s how you’d handle the "Secret Handshake" in Node.js. 
For our example, we have created middleware for our Nuxt.js/Vue.js application.

#### 1. The Server-Side Verification (Nitro)

For our needs, we created a file at `server/middleware/signature.ts`. 
This middleware will run before every API request to verify the HMAC.

```javascript
import { createHmac, timingSafeEqual } from 'node:crypto'

export default defineEventHandler(async (event) => {
    // Only check API routes (adjust the path to match your project)
    if (!getRequestPath(event).startsWith('/api')) return

    const headers = getHeaders(event)
    const signature = headers['x-signature']
    const timestamp = headers['x-timestamp']
    const secret = process.env.ROUTE_SECRET

    if (!signature || !timestamp || !secret) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    // 1. Check if the request has expired (5 minute window)
    const drift = Math.abs(Date.now() - parseInt(timestamp))
    if (drift > 5 * 60 * 1000) {
        throw createError({ statusCode: 401, message: 'Request expired' })
    }

    // 2. Get the raw body as a string for consistent hashing
    const body = await readRawBody(event) || ''
    const dataToSign = timestamp + body

    // 3. Generate expected HMAC
    const expectedSignature = createHmac('sha256', secret)
        .update(dataToSign)
        .digest('hex')

    // 4. Constant-time comparison
    const isValid = timingSafeEqual(
        Buffer.from(signature as string),
        Buffer.from(expectedSignature)
    )

    if (!isValid) {
        throw createError({ statusCode: 403, message: 'Invalid signature' })
    }
})
```

#### 2. The Client-Side Signing (Vue/Nuxt App)

To make our requests from the frontend, we created a composable that automatically adds these headers. 
Here is our `composables/useSignedFetch.ts` file.

```javascript
import { createHmac } from 'node:crypto'

export const useSignedFetch = async (url: string, options: any = {}) => {
    const secret = 'your-shared-secret' // In Nuxt, use runtimeConfig for this
    const timestamp = Date.now().toString()

    // Ensure we are signing the exact string being sent
    const bodyString = options.body ? JSON.stringify(options.body) : ''
    const dataToSign = timestamp + bodyString

    const signature = createHmac('sha256', secret)
        .update(dataToSign)
        .digest('hex')

    return $fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'x-signature': signature,
            'x-timestamp': timestamp
        }
    })
}
```

### TL;DR: Wrap It Up 🎁

Signed requests are the ultimate way to level up your API security without overcomplicating your architecture. 
By using an **Imperial Seal** (HMAC) instead of just a naked API key, you ensure that:

* Your users are who they say they are.
* Your data arrives exactly as it was sent.
* Old requests can't be "replayed" by bad actors.

It takes a little extra math up front, but the peace of mind is worth every CPU cycle. 
Now go forth and secure your empire!
