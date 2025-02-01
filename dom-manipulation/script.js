const inputText = document.getElementById("newQuoteText");
const inputCat = document.getElementById("newQuoteCategory");
const quoteDisplay = document.getElementById("quoteDisplay");

const quotes = [
  {
    text: "Kasbar is not recognised",
    category: "Fun",
  },
  {
    text: "Mo Salah is Ugandan",
    category: "Sports",
  },
  {
    text: "Math is a good language",
    category: "Science",
  },
];

function showRandomQuote() {
  const rand = Math.floor(Math.random() * quotes.length);
  const randQuote = quotes[rand];
  const q = document.createElement("p");
  quoteDisplay.innerHTML = "";
  q.textContent = randQuote.text;
  quoteDisplay.appendChild(q);
}

function createAddQuoteForm() {
  quotes.push({
    text: inputText.value,
    category: inputCat.value,
  });
  inputText.value = "";
  inputCat.value = "";
}
