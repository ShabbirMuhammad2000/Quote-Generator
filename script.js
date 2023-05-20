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

  if (!filteredQuotes || filteredQuotes.length === 0) {
    quoteText.textContent = 'No quotes found';
    authorText.textContent = '';
  } else {
    const quote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];

    if (!quote || !quote.text) {
      quoteText.textContent = 'Invalid quote';
    } else {
      quoteText.textContent = quote.text;
    }

    if (!quote || !quote.author) {
      authorText.textContent = 'Unknown';
    } else {
      authorText.textContent = quote.author;
    }

    if (quote && quote.text.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }

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
