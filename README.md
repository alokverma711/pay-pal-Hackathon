# PayVanta – AI-Powered Payment Security

**Check before you pay. Think before you trust.**

PayVanta is an AI-powered pre-payment security platform that analyzes payment requests to identify potential scams before users proceed with a transaction.

It combines rule-based detection, a local spam detection model, and Google Gemini AI to evaluate suspicious messages, QR codes, screenshots, links, emails, and UPI requests.

### Key Features
- **AI Scam Detection:** Identifies suspicious payment requests and provides risk scores with explanations.
- **8 Checker Modes:** Message, QR Scanner, Screenshot, UPI, Link, Email, Phone, and AI Agent.
- **Smart Payment Authorization:** Signed, single-use tokens bind payment approval to the reviewed amount and currency.
- **PayPal Sandbox Integration:** Allows checkout only after successful server-side review.
- **Security Inspector:** Demonstrates token validation, tampering protection, replay prevention, and simulated attack testing.
- **Multilingual Support:** English, Hindi, and Hinglish.
- **Responsive UI:** Modern interface with dark and light themes.
- **Browser Extension:** Analyze selected webpage text for potential scams.

### Tech Stack
React, JavaScript, Node.js, Express.js, Google Gemini AI, PayPal Sandbox API, REST APIs, and Git.

### Security & Testing
- 100 server regression tests passed.
- Four simulated payment bypass attempts.
- Signed authorization tokens and replay protection.
- Verified PayPal webhook handling.
- Fail-closed payment authorization when AI review is unavailable.

### Live Demo
- **Website:** https://deplo-pay-pal-hackathon-web.vercel.app/
- **Payment Checker:** https://scam-shield-paypal.onrender.com/pay
- **GitHub:** https://github.com/alokverma711/pay-pal-Hackathon

### Our Vision
To make payment security smarter by checking the intent behind every payment request before authorization.

**Note:** PayVanta uses PayPal Sandbox only. No real money is transferred. A cleared request is not a guarantee that the recipient is genuine.

*Built for the PayPal AI Hackathon.*
