const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')


let apiQuotes = [];

//Show New Quote
function newQuote() {
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
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

   quoteText.textContent = quote.text
}

// Get Quotes From API
async function getQuotes() {
  const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
  try {
    const response = await fetch(apiURL)
    apiQuotes = await response.json()
    newQuote()
  } catch (error) {
    
    // Catch Error Here
  }
}


//On Load
getQuotes();


