// Retrieve elements from the DOM
const inputText = document.getElementById("newQuoteText");
const inputCat = document.getElementById("newQuoteCategory");
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuote = document.getElementById("newQuote");
const exportBtn = document.getElementById("exportQuotes");
const optionsFilter = document.getElementById("categoryFilter");

// get quotes from the LocalStorage
const quotes = initializeQuotes();

// Show random quotes
function showRandomQuote() {
  const rand = Math.floor(Math.random() * quotes.length);
  const randQuote = quotes[rand];
  const q = document.createElement("p");
  quoteDisplay.innerHTML = "";
  q.textContent = randQuote.text;
  quoteDisplay.appendChild(q);
  sessionStorage.setItem("viewedQuote", randQuote);
}

newQuote.addEventListener("click", showRandomQuote);

// Export Quotes to a json file
exportBtn.addEventListener("click", function () {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  console.log(url);
});

// Initialize quotes from localstorage
function initializeQuotes() {
  const availableQuotes = localStorage.getItem("quotes");
  return availableQuotes ? JSON.parse(availableQuotes) : [];
}

// Create new Quote
function createAddQuoteForm() {
  const fetchedQuotes = initializeQuotes();
  fetchedQuotes.push({
    text: inputText.value,
    category: inputCat.value,
  });
  localStorage.setItem("quotes", JSON.stringify(fetchedQuotes));
  inputText.value = "";
  inputCat.value = "";
  // populateCategories();
}

// Import quotes from a json file.
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
}

function populateCategories() {
  const uniqueCategories = new Set();
  quotes.map((q) => {
    if (!uniqueCategories.has(q.category)) {
      uniqueCategories.add(q.category);

      const option = document.createElement("option");
      option.innerText = q.category;
      option.value = q.category;
      optionsFilter.appendChild(option);
    }
  });
}

function filterQuotes() {
  const selectedCategory = optionsFilter.value;

  localStorage.setItem("lastSelectedCategory", selectedCategory);

  const filteredQuotes = quotes.filter((q) => q.category === selectedCategory);

  quoteDisplay.innerHTML = "";
  filteredQuotes.forEach((quote) => {
    const q = document.createElement("p");
    q.textContent = quote.text;
    quoteDisplay.appendChild(q);
  });
}

function restoreLastSelectedCategory() {
  const lastCategory = localStorage.getItem("lastSelectedCategory");

  if (lastCategory) {
    optionsFilter.value = lastCategory;
    filterQuotes();
  }
}

window.addEventListener("DOMContentLoaded", async function () {
  populateCategories();
  restoreLastSelectedCategory();
  await fetchQuotesFromServer();
});

const serverURL = "https://my-json-server.typicode.com/Abdul17rahman/fake/db";

async function fetchQuotesFromServer() {
  const res = await fetch(serverURL);
  const data = await res.json();
  // console.log(data);
}

async function postQuotes(data) {
  const res = await fetch(serverURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const results = await res.json();
}

async function fetchFakeData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
}

async function syncQuotes() {
  setInterval(async function () {
    await fetchQuotesFromServer();
  }, 5000);
}
