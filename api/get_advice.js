const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { prompt } = req.body;

  const apiKey = process.env.GPT_API_KEY;
  const apiUrl = "https://api.openai.com/v1/chat/completions?organization=org-g89WT42eik6s4L7X6msERoYW&model=gpt-4";

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({ prompt, max_tokens: 150 })
  });

  const data = await response.json();
  res.status(200).json(data.choices[0].text.trim());
};
