const inputText = document.getElementById("newQuoteText");
const inputCat = document.getElementById("newQuoteCategory");
const quoteDisplay = document.getElementById("quoteDisplay");

const quotes = [
  {
    category: "Fun",
    text: "Kasbar is not recognised",
  },
  {
    category: "Sports",
    text: "Mo Salah is Ugandan",
  },
  {
    category: "Science",
    text: "Math is a good language",
  },
];

function showRandomQuote() {
  const rand = Math.floor(Math.random() * quotes.length);
  const randQuote = quotes[rand];
  const q = document.createElement("p");
  q.textContent = randQuote.text;
  console.log(q);
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
