// Function to fetch a quote based on the selected mood
const fetchCorrespondingQuotes = async (mood) => {
    try {
        // Fetch data from local API
        const response = await fetch(`http://localhost:3000/${mood}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json(); // Convert response to JSON
    } catch (error) {
        console.error(`Error fetching quote: ${error}`);
        throw `Error fetching quote: ${error}`;
    }
};

// Function to display the fetched quote in a card
const displayQuote = (quote) => {
    let quoteSection = document.getElementById("quote-section");

    // Create or update the card
    let card = document.getElementById("quote-card");
    if (!card) {
        card = document.createElement("div");
        card.id = "quote-card";
        card.className = "quote-card";
        quoteSection.appendChild(card);
    }

    card.innerHTML = `<p>${quote}</p>`;
};

// Generate a random number between min and max.
// min and max are included.
//
// Comes from https://stackoverflow.com/a/7228322/29476271
//
const randomNumberBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Function to handle mood button clicks
const showRandomQuote = async (mood) => {
    // Fetch the quotes corresponding to the mood from the BE
    const fetchedQuotes = await fetchCorrespondingQuotes(mood);

    // Select a random quote from the fetched quotes
    const lastArrayIndex = fetchedQuotes.length - 1
    const selectedQuoteIndex = randomNumberBetween(0, lastArrayIndex)
    const selectedQuote = fetchedQuotes[selectedQuoteIndex];

    // Display the selected quote
    const selectedQuoteText = selectedQuote.q;
    displayQuote(selectedQuoteText);
};


// What and How separation:
// -----------------------
// With a function correctly named, you can use the function for what it does, without having
// to know how it does it
//
// That's why it's important to give good names to functions.
//
// A good name for a function is a name which:
//   1. tell what the function does
//   2. the function only does what the names says and nothing more
// 
// With such function, you don't need to read the code to know what it does.
// So that when you use it, you know what is happening in your program and can avoid to care about how it's done.