# WeMarket Backend

This project implements a Node.js/Express backend for the WeMarket frontend. It serves static assets and provides a `/api/contact` endpoint for the contact form. Submissions are saved to MongoDB and an email notification is sent via Nodemailer.

## Setup

1. Clone the repository and run `npm install` to install dependencies.
2. Create a `.env` file with the following variables:
   - `MONGODB_URI`: MongoDB connection string.
   - `EMAIL_SERVICE`: e.g. `gmail`.
   - `EMAIL_USER` and `EMAIL_PASS`: your email account credentials.
   - `EMAIL_TO`: the destination email for form notifications.
   - `PORT`: (optional) port number (defaults to 3000).
3. Run the server with `npm start`.
4. Open http://localhost:3000 in your browser to see the front-end.

The Express app uses `express.static('public')` to serve the front-end files:contentReference[oaicite:14]{index=14}. The contact submissions are stored using Mongoose (`Contact.create()` for insertion):contentReference[oaicite:15]{index=15}. An email is sent for each submission via Nodemailer (`transporter.sendMail()`):contentReference[oaicite:16]{index=16}.

## Usage

Fill out the form on the front-end and submit. On success, a “Contact form submitted” message is returned and the page shows an alert. Check your configured email for the notification.

