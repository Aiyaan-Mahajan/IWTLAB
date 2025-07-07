document
  .getElementById("contactForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const responseMessage = document.getElementById("responseMessage");
    responseMessage.innerText = "";

    if (name.length < 3 || name.length > 50) {
      responseMessage.style.color = "red";
      responseMessage.innerText = "Name must be between 3 and 50 characters.";
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      responseMessage.style.color = "red";
      responseMessage.innerText = "Please enter a valid email address.";
      return;
    }

    if (message.length < 10 || message.length > 1000) {
      responseMessage.style.color = "red";
      responseMessage.innerText =
        "Message must be between 10 and 1000 characters.";
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        responseMessage.style.color = "green";
        responseMessage.innerText = data.message;
        document.getElementById("contactForm").reset(); // Clear form
      } else {
        responseMessage.style.color = "red";
        responseMessage.innerText =
          data.message || "Something went wrong!";
      }
    } catch (err) {
      responseMessage.style.color = "red";
      responseMessage.innerText = "Server error. Please try again later.";
    }
  });
