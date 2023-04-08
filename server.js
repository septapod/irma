const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/get-advice', async (req, res) => {
  const prompt = req.body.prompt;

  const apiKey = 'GPT_API_KE'; // Replace with your actual API key
  const apiUrl = 'https://api.openai.com/v1/chat/completions?organization=org-g89WT42eik6s4L7X6msERoYW&model=gpt-4'; // Replace with your actual API endpoint

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ prompt, max_tokens: 150 }),
    });

    const data = await response.json();
    res.status(200).json({ advice: data.choices[0].text.trim() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch advice' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
