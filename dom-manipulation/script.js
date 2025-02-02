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
  const category = optionsFilter.value;

  localStorage.setItem("lastSelectedCategory", category);

  const filteredQuotes = quotes.filter((q) => q.category === category);

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

window.addEventListener("DOMContentLoaded", function () {
  populateCategories();
  restoreLastSelectedCategory();
});
