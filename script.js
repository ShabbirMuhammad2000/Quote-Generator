const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')


let apiQuotes = []

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}


//Show New Quote
function newQuote() {
  showLoadingSpinner();

  // Get the selected category from the select element
  const categorySelect = document.getElementById('category-select');
  const selectedCategory = categorySelect.value;

  // Filter quotes based on the selected category
  let filteredQuotes;
  if (selectedCategory === 'all') {
    filteredQuotes = apiQuotes;
  } else {
    filteredQuotes = apiQuotes.filter(quote => quote.category === selectedCategory);
  }

  // Pick a random quote from the filtered quotes array
  const quote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];

  //check if author field is blank and replace it wuth unknown
  if(!quote.author) {
    authorText.textContent = 'Unknown'
  } else {
    authorText.textContent = quote.author;
  }
  // check Quote length to determine styling
  if(quote.text.length > 120) {
    quoteText.classList.add('long-quote')
  } else {
    quoteText.classList.remove('long-quote')
  }
  // Set Quote, Hide Loader
   quoteText.textContent = quote.text
   removeLoadingSpinner()
}

// Get Quotes From API
// Get Quotes From API
async function getQuotes() {
  showLoadingSpinner();
  const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

  try {
    const response = await fetch(apiURL);
    let allQuotes = await response.json();

    // Filter quotes based on the selected category
    const categorySelect = document.getElementById('category-select');
    const selectedCategory = categorySelect.value;

    if (selectedCategory === 'all') {
      apiQuotes = allQuotes;
    } else {
      apiQuotes = allQuotes.filter(quote => quote.category === selectedCategory);
    }

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
  window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

//On Load
getQuotes();


