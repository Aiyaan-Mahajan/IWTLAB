// public/script.js
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  console.log("umar")
  const responseMessage = document.getElementById('responseMessage');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Gather form data
    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim()
    };

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      responseMessage.textContent = 'All fields are required.';
      responseMessage.className = 'error show';
      return;
    }

    console.log("sahil");
    try {
      // Send POST request to the server
      const res = await fetch('http://localhost:4000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(formData)
      });

      // const response = await fetch(...);
      console.log("sahil");

      const result = await res.json();


      // console.log(res.);
      // Display success message
      responseMessage.textContent = result.message || 'Submitted!';
      responseMessage.className = 'success show';
      form.reset();
    } catch (err) {
      console.error('Error submitting form:', err);
      responseMessage.textContent = 'Submission failed. Please try again.';
      responseMessage.className = 'error show';
    }

    // Hide message after a few seconds
    setTimeout(() => {
      responseMessage.textContent = '';
      responseMessage.className = '';
    }, 5000);
  });
});
