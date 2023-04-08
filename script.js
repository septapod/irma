const form = document.getElementById("user-data-form");
const adviceContainer = document.getElementById("advice");
const adviceContent = document.getElementById("advice-content");

form.addEventListener("submit", async (event) =>
  event.preventDefault();

  const income = document.getElementById("income").value;
  const expenses = document.getElementById("expenses").value;
  const savings = document.getElementById("savings").value;
  const debt = document.getElementById("debt").value;
  const financialGoal = document.getElementById("financial_goal").value;

  const prompt = `As a highly knowledgeable and experienced financial counselor, provide comprehensive and personalized financial advice for a user with the following financial situation and goals:
  - Monthly Income: ${income}
  - Monthly Expenses: ${expenses}
  - Current Savings: ${savings}
  - Current Debt: ${debt}
  - Financial Goal: ${financialGoal}
  Consider budgeting, savings, debt management, investments, retirement planning, and risk management in your response. Ensure the advice given is clear, actionable, and tailored to the user's unique needs and objectives. Keep in mind current financial trends, market conditions, and best practices in personal finance.`;

  const advice = await getFinancialAdvice(prompt);
  adviceContent.innerText = advice;
  adviceContainer.style.display = "block";
});

async function getFinancialAdvice(prompt) {
  // Replace with your actual GPT-4 API key and endpoint
  const apiKey = "GPT_API_KEY";
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
  return data.choices[0].text.trim();
}
