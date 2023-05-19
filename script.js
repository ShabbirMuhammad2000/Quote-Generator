const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const categorySelect = document.getElementById('category-select');

let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

function newQuote() {
  showLoadingSpinner();

  const selectedCategory = categorySelect.value;
  const selectedOption = categorySelect.options[categorySelect.selectedIndex];

  let filteredQuotes;
  if (selectedCategory === 'all') {
    filteredQuotes = apiQuotes;
  } else {
    filteredQuotes = apiQuotes.filter(quote => quote.tag === selectedCategory);
  }

  console.log('filteredQuotes:', filteredQuotes); // Debugging statement

  if (!filteredQuotes || filteredQuotes.length === 0) {
    console.log('Error: No quotes found for the selected category'); // Debugging statement
    quoteText.textContent = 'No quotes found';
    authorText.textContent = '';
  } else {
    const quote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
    console.log('quote:', quote); // Debugging statement

    if (!quote || !quote.text) {
      console.log('Error: Invalid quote object or missing text property'); // Debugging statement
      quoteText.textContent = 'Invalid quote';
    } else {
      quoteText.textContent = quote.text;
    }

    if (!quote || !quote.author) {
      console.log('Error: Invalid quote object or missing author property'); // Debugging statement
      authorText.textContent = 'Unknown';
    } else {
      authorText.textContent = quote.author;
    }

    if (quote && quote.text.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }

    // Set background based on category
    const backgroundImage = selectedOption.dataset.bg;
    document.body.style.backgroundImage = `url('${backgroundImage}')`;
  }

  removeLoadingSpinner();
}



// Get Quotes From API
async function getQuotes() {
  showLoadingSpinner();
  const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

  try {
    const response = await fetch(apiURL);
    const allQuotes = await response.json();

    apiQuotes = allQuotes;

    newQuote();
    removeLoadingSpinner();
  } catch (error) {
    console.log(error);
    // Catch Error Here
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
