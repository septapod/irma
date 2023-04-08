const form = document.getElementById("user-data-form");
const adviceContainer = document.getElementById("advice");
const adviceContent = document.getElementById("advice-content");

form.addEventListener("submit", async (event) => {
  try {
    event.preventDefault();

    console.log("Form submitted");

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
    console.log("Advice received:", advice);
    adviceContent.innerText = advice;
    adviceContainer.style.display = "block";
  } catch (error) {
    console.error("Error:", error);
  }
});

async function getFinancialAdvice(prompt) {
  const response = await fetch('/api/get_advice', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  const advice = await response.text();
  return advice;
}

  const data = await response.json();
  console.log("Advice received:", data.choices[0].text.trim());
  return data.choices[0].text.trim();
}
