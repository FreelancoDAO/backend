const axios = require('axios');

const gptVoting = async (prompt) => {

  const openAIRequest = await axios({
    url: "https://api.openai.com/v1/completions",
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
      'Content-Type': 'application/json',
    },
    data: {
      model: "curie:ft-personal-2023-05-13-23-00-29",
      prompt: prompt,
      temperature: 0,
      max_tokens: 1,
    },
  });

  const openAiResponse = openAIRequest.data;
  console.log("raw response", openAiResponse);

  const result = openAiResponse.choices[0].text;
  return result.trim();
}

module.exports = { gptVoting }