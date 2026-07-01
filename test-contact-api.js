const payload = {
  name: "Teste API ChatGPT",
  email: "portoframebr@gmail.com",
  phone: "27999850087",
  projectType: "Residencial",
  message: "Teste automatizado realizado em " + new Date().toISOString()
};

fetch('http://localhost:3002/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(payload)
})
.then(async res => {
  console.log("STATUS HTTP:", res.status);
  console.log("RESPONSE BODY:", await res.text());
})
.catch(err => console.error("FETCH ERROR:", err));
