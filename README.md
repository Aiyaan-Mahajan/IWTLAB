# WeMarket Backend

This project implements a Node.js/Express backend for the WeMarket frontend. It serves static assets and provides a `/api/contact` endpoint for the contact form. Submissions are saved to MongoDB and an email notification is sent via Nodemailer.


## Usage

Fill out the form on the front-end and submit. On success, a “Contact form submitted” message is returned and the page shows an alert. Check your configured email for the notification.

